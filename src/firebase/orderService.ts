export interface OrderItemPayload {
  productId: string;
  name: string;
  qty: number;
  price: number;
  sku?: string;
  image?: string;
}

export interface PlaceOrderParams {
  items: OrderItemPayload[];
  deliveryAddress: string;
  paymentMethod?: string;
  companyName?: string;
  customerName?: string;
  phone?: string;
}

export interface FirestoreOrder {
  id?: string;
  orderNumber: string;
  userId: string;
  userPhone: string;
  customerName?: string;
  companyName?: string;
  items: {
    productId: string;
    name: string;
    qty: number;
    price: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  createdAt: string;
  deliveryAddress: string;
  paymentMethod?: string;
}

export interface AdminNotification {
  id?: string;
  orderId: string;
  orderNumber: string;
  userPhone: string;
  customerName?: string;
  totalAmount: number;
  itemsCount: number;
  message: string;
  createdAt: string;
  read: boolean;
}

const STORAGE_KEY_ORDERS = 'giriraj_power_orders';
const STORAGE_KEY_NOTIFICATIONS = 'giriraj_power_admin_notifications';
const STORAGE_KEY_SESSION = 'giriraj_power_session_user';

// Helper to get orders from localStorage
export const getStoredOrders = (): FirestoreOrder[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ORDERS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('Could not read stored orders:', e);
  }
  return [
    {
      id: 'GP-789012-451',
      orderNumber: 'GP-789012-451',
      userId: 'user-contractor-001',
      userPhone: '+91 9007168561',
      customerName: 'Mahavir MEP & Electricals',
      companyName: 'Mahavir MEP & Electricals',
      items: [
        { productId: 'wire-polycab-25-red', name: 'Polycab 2.5 sq mm FRLS Copper Wire (Red)', qty: 4, price: 2320 },
        { productId: 'switch-schneider-16a', name: 'Schneider AvatarOn 16A 1-Way Switch', qty: 20, price: 185 },
      ],
      totalAmount: 12980,
      status: 'pending',
      createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      deliveryAddress: 'Topsia Industrial Area, Near EM Bypass, Kolkata - 700039, WB',
      paymentMethod: 'pod',
    },
    {
      id: 'GP-654321-892',
      orderNumber: 'GP-654321-892',
      userId: 'user-builder-002',
      userPhone: '+91 9874569712',
      customerName: 'Eden Realty Projects',
      companyName: 'Eden Realty Group',
      items: [
        { productId: 'mcb-havells-32a-dp', name: 'Havells 32A Double Pole C-Curve MCB', qty: 6, price: 680 },
        { productId: 'adhesive-roff-t20', name: 'Roff T20 Master Fix Tile Adhesive (20kg)', qty: 10, price: 440 },
      ],
      totalAmount: 8480,
      status: 'confirmed',
      createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
      deliveryAddress: 'Salt Lake Sector V, Kolkata - 700091, WB',
      paymentMethod: 'online',
    },
  ];
};

export const saveStoredOrders = (orders: FirestoreOrder[]) => {
  try {
    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
    window.dispatchEvent(new CustomEvent('giriraj_orders_updated'));
  } catch (e) {
    console.warn('Could not save orders:', e);
  }
};

/**
 * Place an order with instant local persistence and admin reactivity
 */
export const placeOrderWithTransaction = async (params: PlaceOrderParams): Promise<FirestoreOrder> => {
  let userId = `contractor-guest-${Date.now()}`;
  let verifiedPhone = params.phone || '+91 9007168561';
  let customerName = params.customerName || 'Valued Contractor';

  try {
    const rawSession = localStorage.getItem(STORAGE_KEY_SESSION);
    if (rawSession) {
      const parsed = JSON.parse(rawSession);
      if (parsed.user?.uid) userId = parsed.user.uid;
      if (parsed.user?.phoneNumber) verifiedPhone = parsed.user.phoneNumber;
      if (parsed.profile?.name) customerName = parsed.profile.name;
    }
  } catch (e) {
    console.warn('Could not read session:', e);
  }

  const orderId = `GP-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;
  const totalAmount = params.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const timestamp = new Date().toISOString();

  const newOrder: FirestoreOrder = {
    id: orderId,
    orderNumber: orderId,
    userId,
    userPhone: verifiedPhone,
    customerName,
    companyName: params.companyName || 'Contractor / MEP Site',
    items: params.items.map((i) => ({
      productId: i.productId,
      name: i.name,
      qty: i.qty,
      price: i.price,
    })),
    totalAmount,
    status: 'pending',
    createdAt: timestamp,
    deliveryAddress: params.deliveryAddress,
    paymentMethod: params.paymentMethod || 'pod',
  };

  const existingOrders = getStoredOrders();
  const updatedOrders = [newOrder, ...existingOrders];
  saveStoredOrders(updatedOrders);

  // Save admin notification
  try {
    const rawNotifs = localStorage.getItem(STORAGE_KEY_NOTIFICATIONS);
    const notifications: AdminNotification[] = rawNotifs ? JSON.parse(rawNotifs) : [];
    notifications.unshift({
      id: `notif-${Date.now()}`,
      orderId,
      orderNumber: orderId,
      userPhone: verifiedPhone,
      customerName,
      totalAmount,
      itemsCount: params.items.length,
      message: `New Express Order #${orderId} of ₹${totalAmount.toLocaleString('en-IN')} received from ${verifiedPhone}.`,
      createdAt: timestamp,
      read: false,
    });
    localStorage.setItem(STORAGE_KEY_NOTIFICATIONS, JSON.stringify(notifications.slice(0, 50)));
  } catch (e) {
    console.warn('Could not save admin notification:', e);
  }

  return newOrder;
};

/**
 * Seed initial products helper
 */
export const seedInitialProductsToFirestore = async (_initialProducts: any[]) => {
  return true;
};
