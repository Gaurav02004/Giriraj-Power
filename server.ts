import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // In-memory Stores for Zero-Config, Self-Contained Execution (No Supabase/PostgreSQL required)
  const otpStore = new Map<string, { otp: string; expiresAt: number; verificationId: string }>();
  const sessionsStore = new Map<string, any>();
  const profilesStore = new Map<string, any>();
  const ordersStore = new Map<string, any[]>();
  const quotesStore = new Map<string, any[]>();

  // Seed default admin / demo contractor profile
  profilesStore.set('phone-user-9007168561', {
    id: 'phone-user-9007168561',
    uid: 'phone-user-9007168561',
    phone: '+91 9007168561',
    phoneNumber: '+91 9007168561',
    fullName: 'Gaurav Giri',
    name: 'Gaurav Giri',
    email: 'gauravgiri123344@gmail.com',
    companyName: 'Giriraj Power & MEP Infrastructure Solutions',
    gstin: '19AAACG1234F1Z5',
    businessType: 'Electrical Contractor / MEP Firm',
    billingAddress: 'Topsia Industrial Area, Near EM Bypass, Kolkata, West Bengal - 700039',
    savedAddresses: [
      {
        id: 'addr-seed-1',
        label: 'Topsia Central Project Site',
        address: 'Plot 42, Topsia Industrial Estate, Near Science City, Kolkata - 700046',
        city: 'Kolkata',
        state: 'West Bengal',
        pincode: '700046',
        isDefault: true,
        contactName: 'Site Supervisor A. Das',
        contactPhone: '+91 98300 12345',
        type: 'Commercial Site',
      },
      {
        id: 'addr-seed-2',
        label: 'New Town Eco-Space High-Rise EPC',
        address: 'Tower 4, Action Area II, New Town Rajarhat, Kolkata - 700156',
        city: 'Kolkata',
        state: 'West Bengal',
        pincode: '700156',
        isDefault: false,
        contactName: 'Eng. R. Mukherjee',
        contactPhone: '+91 98311 54321',
        type: 'High-Rise EPC',
      },
    ],
    addresses: ['Topsia Industrial Area, Near EM Bypass, Kolkata, West Bengal - 700039'],
    isAdmin: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      mode: 'In-Memory Sessions & Fast2SMS Gateway (Zero External DB Required)',
      service: 'Giriraj Power Electricals & MEP Material Delivery API',
      timestamp: new Date().toISOString(),
    });
  });

  // Check in-memory system and Fast2SMS gateway status
  app.get('/api/system/status', (req, res) => {
    const key = (
      process.env.FAST2SMS_API_KEY ||
      'IhCSL45NJjZ2FQyTY7nbdl6BHP9KmctfkpwEXu8Dgx10reoAvODZzWNlUQVxHMIFtEc68frBObqm7Twd'
    )?.trim();
    const hasApiKey = Boolean(key && key !== '');
    res.json({
      configured: true,
      storageType: 'In-Memory + Client Cache',
      fast2smsActive: hasApiKey,
      provider: 'Fast2SMS Bulk V2 (Quick SMS)',
      route: 'q',
      endpoint: 'https://www.fast2sms.com/dev/bulkV2',
      info: hasApiKey
        ? 'Fast2SMS Quick SMS API Key active for instant OTP delivery (website verification bypassed). In-memory session state active.'
        : 'In-memory state active (Zero database dependencies). Test OTP 123456 ready.',
    });
  });

  app.get('/api/otp/status', (req, res) => {
    const key = (
      process.env.FAST2SMS_API_KEY ||
      'IhCSL45NJjZ2FQyTY7nbdl6BHP9KmctfkpwEXu8Dgx10reoAvODZzWNlUQVxHMIFtEc68frBObqm7Twd'
    )?.trim();
    const hasApiKey = Boolean(key && key !== '');
    res.json({
      configured: hasApiKey,
      provider: 'Fast2SMS Bulk V2 (Quick SMS)',
      route: 'q',
      endpoint: 'https://www.fast2sms.com/dev/bulkV2',
      info: hasApiKey
        ? 'Fast2SMS Quick SMS (route: q) active. SMS will be delivered directly to mobile numbers without website verification.'
        : 'Dynamic OTP generated locally with in-memory store. Test OTP 123456 also ready.',
    });
  });

  // In-Memory Profile Endpoints
  app.get('/api/user/profile', (req, res) => {
    const { userId, phone, email } = req.query as { userId?: string; phone?: string; email?: string };
    let foundProfile = null;

    if (userId && profilesStore.has(userId)) {
      foundProfile = profilesStore.get(userId);
    } else if (phone) {
      const cleanPhone = phone.replace(/\D/g, '').slice(-10);
      for (const p of profilesStore.values()) {
        const pPhone = String(p.phone || p.phoneNumber || '').replace(/\D/g, '').slice(-10);
        if (pPhone === cleanPhone) {
          foundProfile = p;
          break;
        }
      }
    } else if (email) {
      for (const p of profilesStore.values()) {
        if (p.email && p.email.toLowerCase() === email.toLowerCase()) {
          foundProfile = p;
          break;
        }
      }
    }

    res.json({ success: true, profile: foundProfile });
  });

  app.post('/api/user/profile', (req, res) => {
    const profile = req.body;
    const userId = profile.uid || profile.id;
    if (!userId) {
      return res.status(400).json({ success: false, error: 'User ID is required' });
    }

    const existing = profilesStore.get(userId) || {};
    const updated = {
      ...existing,
      ...profile,
      uid: userId,
      id: userId,
      updatedAt: new Date().toISOString(),
    };
    profilesStore.set(userId, updated);
    res.json({ success: true, profile: updated });
  });

  // In-Memory Orders Endpoints
  app.get('/api/user/orders', (req, res) => {
    const { userId } = req.query as { userId?: string };
    if (!userId) {
      return res.json({ success: true, orders: [] });
    }
    const orders = ordersStore.get(userId) || [];
    res.json({ success: true, orders });
  });

  app.post('/api/user/orders', (req, res) => {
    const { userId, order } = req.body;
    if (!userId || !order) {
      return res.status(400).json({ success: false, error: 'User ID and order data required' });
    }
    const userOrders = ordersStore.get(userId) || [];
    const newOrders = [order, ...userOrders];
    ordersStore.set(userId, newOrders);
    res.json({ success: true, order, totalOrders: newOrders.length });
  });

  // POST /api/otp/send - Generate dynamic 6-digit OTP & deliver via Fast2SMS Quick SMS (route: 'q')
  // Docs: https://www.fast2sms.com/dev/bulkV2
  app.post('/api/otp/send', async (req, res) => {
    try {
      const { phoneNumber } = req.body;
      if (!phoneNumber) {
        return res.status(400).json({ success: false, error: 'Phone number is required.' });
      }

      // Extract clean 10-digit Indian mobile number (e.g., from +91 9007168561 -> 9007168561)
      const digitsOnly = String(phoneNumber).replace(/\D/g, '');
      const tenDigitPhone = digitsOnly.slice(-10);

      if (tenDigitPhone.length < 10) {
        return res.status(400).json({
          success: false,
          error: 'Please provide a valid 10-digit Indian mobile number.',
        });
      }

      const fast2smsApiKey = (
        process.env.FAST2SMS_API_KEY ||
        'IhCSL45NJjZ2FQyTY7nbdl6BHP9KmctfkpwEXu8Dgx10reoAvODZzWNlUQVxHMIFtEc68frBObqm7Twd'
      )?.trim();

      if (!fast2smsApiKey) {
        console.error('[Fast2SMS Error] FAST2SMS_API_KEY environment variable is missing.');
        return res.status(400).json({
          success: false,
          error: 'FAST2SMS_API_KEY is not configured. Please add your Fast2SMS API key in Settings / Secrets.',
        });
      }

      // Generate dynamic 6-digit OTP
      const dynamicOtp = Math.floor(100000 + Math.random() * 900000).toString();
      const verificationId = `verif_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes validity

      // Store in memory for verification
      otpStore.set(tenDigitPhone, { otp: dynamicOtp, expiresAt, verificationId });
      otpStore.set(verificationId, { otp: dynamicOtp, expiresAt, verificationId });

      const otpMessage = `Your Giriraj Power login OTP is ${dynamicOtp}. Valid for 5 mins.`;

      // Construct Fast2SMS Quick SMS query parameters URL:
      // https://www.fast2sms.com/dev/bulkV2?authorization=API_KEY&route=q&message=...&language=english&flash=0&numbers=PHONE
      const fast2smsUrl = new URL('https://www.fast2sms.com/dev/bulkV2');
      fast2smsUrl.searchParams.set('authorization', fast2smsApiKey);
      fast2smsUrl.searchParams.set('route', 'q');
      fast2smsUrl.searchParams.set('message', otpMessage);
      fast2smsUrl.searchParams.set('language', 'english');
      fast2smsUrl.searchParams.set('flash', '0');
      fast2smsUrl.searchParams.set('numbers', tenDigitPhone);

      console.log(`[Fast2SMS Quick SMS] Initiating fetch for numbers: ${tenDigitPhone} (route: 'q')...`);

      try {
        const fast2smsRes = await fetch(fast2smsUrl.toString(), {
          method: 'GET',
          headers: {
            'cache-control': 'no-cache',
            authorization: fast2smsApiKey,
          },
        });

        const fast2smsData = (await fast2smsRes.json().catch(() => null)) as any;
        console.log(`[Fast2SMS Response] HTTP ${fast2smsRes.status}:`, JSON.stringify(fast2smsData));

        if (fast2smsData && fast2smsData.return === true) {
          return res.json({
            success: true,
            message: `6-digit OTP sent to +91 ${tenDigitPhone} via Fast2SMS Quick SMS.`,
            verificationId,
            fast2smsStatus: 'delivered',
            requestId: fast2smsData.request_id,
          });
        } else {
          // Fast2SMS returned an error response (e.g. low balance, invalid authorization, DND number)
          const errorDetail = Array.isArray(fast2smsData?.message)
            ? fast2smsData.message.join(', ')
            : fast2smsData?.message || `Fast2SMS gateway returned HTTP ${fast2smsRes.status}`;

          console.error(`[Fast2SMS Dispatch Failed]`, errorDetail);
          return res.status(400).json({
            success: false,
            error: `Fast2SMS Error: ${errorDetail}`,
            fast2smsDetails: fast2smsData,
          });
        }
      } catch (smsError: any) {
        console.error(`[Fast2SMS Network Error] Failed to connect to Fast2SMS:`, smsError);
        return res.status(502).json({
          success: false,
          error: `Could not connect to Fast2SMS gateway: ${smsError.message || 'Network timeout'}`,
        });
      }
    } catch (err: any) {
      console.error('Error in /api/otp/send:', err);
      res.status(500).json({ success: false, error: err.message || 'Server error generating OTP' });
    }
  });

  // POST /api/otp/verify - Verify dynamic OTP or test override
  app.post('/api/otp/verify', (req, res) => {
    try {
      const { phoneNumber, otpCode, verificationId } = req.body;
      const cleanCode = String(otpCode || '').trim();

      if (!cleanCode) {
        return res.status(400).json({ success: false, error: 'OTP code is required' });
      }

      const digitsOnly = String(phoneNumber || '').replace(/\D/g, '');
      const tenDigitPhone = digitsOnly.slice(-10);

      const storedByPhone = tenDigitPhone ? otpStore.get(tenDigitPhone) : null;
      const storedById = verificationId ? otpStore.get(verificationId) : null;
      const stored = storedByPhone || storedById;

      // Allow either fixed mock OTP '123456' OR matching stored dynamic OTP
      const isMockBypass = cleanCode === '123456';
      const isDynamicMatch = stored && stored.otp === cleanCode && Date.now() <= stored.expiresAt;

      if (isMockBypass || isDynamicMatch) {
        if (storedByPhone) otpStore.delete(tenDigitPhone);
        if (storedById) otpStore.delete(verificationId);

        const finalPhone = tenDigitPhone ? `+91 ${tenDigitPhone}` : phoneNumber || '+91 9007168561';
        return res.json({
          success: true,
          verified: true,
          message: 'OTP verified successfully',
          user: {
            uid: `phone-user-${tenDigitPhone || '9007168561'}`,
            phoneNumber: finalPhone,
            displayName: `Contractor (${tenDigitPhone ? tenDigitPhone.slice(-4) : '8561'})`,
          },
        });
      }

      if (stored && Date.now() > stored.expiresAt) {
        return res.status(400).json({
          success: false,
          error: 'OTP has expired (5 minute validity). Please request a new OTP.',
        });
      }

      return res.status(400).json({
        success: false,
        error: 'Invalid OTP. Please enter the 6-digit OTP sent to your phone or use test OTP 123456.',
      });
    } catch (err: any) {
      console.error('Error in /api/otp/verify:', err);
      res.status(500).json({ success: false, error: err.message || 'Server error verifying OTP' });
    }
  });

  // Vite middleware for development / static serving for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Giriraj Power Server with Fast2SMS OTP route running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
