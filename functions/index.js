const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();
const messaging = admin.messaging();

// Replace with your designated admin device FCM registration token or store in adminConfig collection
const ADMIN_DEVICE_TOKEN = process.env.ADMIN_FCM_DEVICE_TOKEN || '';

/**
 * Callable Cloud Function: placeOrder
 * Validates authenticated user, verifies phone from server auth token/user doc,
 * checks stock availability, atomically decrements product inventory,
 * creates order, writes to adminNotifications, and pushes FCM alert.
 */
exports.placeOrder = functions.https.onCall(async (data, context) => {
  // 1. Ensure caller is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'You must be signed in with phone authentication to place an order.'
    );
  }

  const userId = context.auth.uid;
  const { items, deliveryAddress, customerName, companyName, paymentMethod } = data;

  if (!items || !Array.isArray(items) || items.length === 0) {
    throw new functions.https.HttpsError('invalid-argument', 'Cart must contain at least one item.');
  }

  if (!deliveryAddress) {
    throw new functions.https.HttpsError('invalid-argument', 'Site delivery address is required.');
  }

  // 2. Fetch verified phone number from Auth token or user document (Never trust client input)
  let verifiedPhone = context.auth.token.phone_number || '';
  let verifiedName = customerName || 'Contractor';

  const userDocRef = db.collection('users').doc(userId);
  const userDoc = await userDocRef.get();

  if (userDoc.exists) {
    const userData = userDoc.data();
    if (!verifiedPhone && userData.phoneNumber) {
      verifiedPhone = userData.phoneNumber;
    }
    if (userData.name) {
      verifiedName = userData.name;
    }
  }

  if (!verifiedPhone) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'No verified phone number found for this user account.'
    );
  }

  const orderId = `GP-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;
  const orderRef = db.collection('orders').doc(orderId);
  const notificationRef = db.collection('adminNotifications').doc();

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const timestamp = new Date().toISOString();

  // 3. Atomically validate stock and place order in a transaction
  await db.runTransaction(async (transaction) => {
    const productReads = [];

    for (const item of items) {
      const prodRef = db.collection('products').doc(item.productId);
      const prodDoc = await transaction.get(prodRef);

      if (!prodDoc.exists) {
        throw new functions.https.HttpsError(
          'not-found',
          `Product ${item.name || item.productId} was not found in catalog.`
        );
      }

      const prodData = prodDoc.data();
      const currentStock = Number(prodData.stock) || 0;

      if (currentStock < item.qty) {
        throw new functions.https.HttpsError(
          'resource-exhausted',
          `Insufficient stock for "${item.name}". Requested: ${item.qty}, In Stock: ${currentStock}`
        );
      }

      productReads.push({ ref: prodRef, currentStock, item });
    }

    // Decrement stock
    for (const { ref, currentStock, item } of productReads) {
      transaction.update(ref, {
        stock: currentStock - item.qty,
        updatedAt: timestamp,
      });
    }

    // Create Order Document
    const orderRecord = {
      orderNumber: orderId,
      userId,
      userPhone: verifiedPhone,
      customerName: verifiedName,
      companyName: companyName || 'Contractor / MEP Site',
      items: items.map((i) => ({
        productId: i.productId,
        name: i.name,
        qty: i.qty,
        price: i.price,
      })),
      totalAmount,
      status: 'pending',
      createdAt: timestamp,
      deliveryAddress,
      paymentMethod: paymentMethod || 'pod',
    };

    transaction.set(orderRef, orderRecord);

    // Create Admin Notification Document
    const notificationRecord = {
      orderId,
      orderNumber: orderId,
      userPhone: verifiedPhone,
      customerName: verifiedName,
      totalAmount,
      itemsCount: items.length,
      message: `⚡ New Site Order #${orderId} (₹${totalAmount.toLocaleString('en-IN')}) placed by ${verifiedPhone}`,
      createdAt: timestamp,
      read: false,
    };

    transaction.set(notificationRef, notificationRecord);
  });

  // 4. Send FCM Push Notification to Admin Device Token if available
  if (ADMIN_DEVICE_TOKEN) {
    try {
      await messaging.send({
        token: ADMIN_DEVICE_TOKEN,
        notification: {
          title: `⚡ New Order #${orderId} Received!`,
          body: `Customer: ${verifiedPhone} | Amount: ₹${totalAmount.toLocaleString('en-IN')} | Items: ${items.length}`,
        },
        data: {
          orderId,
          userPhone: verifiedPhone,
          totalAmount: String(totalAmount),
        },
      });
      console.log(`FCM push notification sent successfully to admin.`);
    } catch (fcmError) {
      console.warn('FCM push notification failed:', fcmError);
    }
  }

  return {
    success: true,
    orderId,
    userPhone: verifiedPhone,
    totalAmount,
    status: 'pending',
    createdAt: timestamp,
  };
});
