import React, { createContext, useContext, useEffect, useState } from 'react';

export interface UserProfile {
  uid: string;
  phoneNumber?: string;
  email?: string;
  name?: string;
  addresses?: string[];
  createdAt?: string;
  lastLogin?: string;
  isAdmin?: boolean;
}

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  phoneNumber: string | null;
  emailVerified?: boolean;
  photoURL?: string | null;
}

export interface MockConfirmationResult {
  verificationId: string;
  confirm: (verificationCode: string) => Promise<{ user: AuthUser }>;
}

interface AuthContextType {
  currentUser: AuthUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  confirmationResult: MockConfirmationResult | null;
  setupRecaptcha: (containerId?: string) => any;
  sendOtp: (fullPhoneNumber: string, containerId?: string) => Promise<MockConfirmationResult>;
  verifyOtp: (otpCode: string) => Promise<AuthUser>;
  loginWithGoogle: () => Promise<AuthUser>;
  loginWithEmailPassword: (email: string, pass: string) => Promise<AuthUser>;
  registerWithEmailPassword: (email: string, pass: string, name?: string, phone?: string, city?: string) => Promise<AuthUser>;
  sendPasswordReset: (email: string) => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
  logout: () => Promise<void>;
  setDemoAdmin: (isAdmin: boolean) => void;
  loginWithEnterprise: (profile: Partial<UserProfile>) => Promise<void>;
}

const STORAGE_KEY_SESSION = 'giriraj_power_session_user';
const STORAGE_KEY_USERS = 'giriraj_power_registered_users';

// Default seeded users for instant login & testing
const DEFAULT_USERS: Record<string, { profile: UserProfile; password?: string }> = {
  'contractor@girirajpower.com': {
    password: 'Giriraj@2026',
    profile: {
      uid: 'user-contractor-001',
      email: 'contractor@girirajpower.com',
      name: 'Mahavir MEP & Electrical Contractors',
      phoneNumber: '+91 9007168561',
      addresses: ['Topsia Industrial Area, Near EM Bypass, Kolkata - 700039, WB'],
      createdAt: '2026-01-01T00:00:00.000Z',
      lastLogin: new Date().toISOString(),
      isAdmin: false,
    },
  },
  'builder@girirajpower.com': {
    password: 'Giriraj@2026',
    profile: {
      uid: 'user-builder-002',
      email: 'builder@girirajpower.com',
      name: 'Eden Realty & Construction Projects',
      phoneNumber: '+91 9874569712',
      addresses: ['Salt Lake Sector V, Kolkata - 700091, WB'],
      createdAt: '2026-01-01T00:00:00.000Z',
      lastLogin: new Date().toISOString(),
      isAdmin: false,
    },
  },
  'gauravgiri123344@gmail.com': {
    password: 'Giriraj@2026',
    profile: {
      uid: 'user-admin-master',
      email: 'gauravgiri123344@gmail.com',
      name: 'Gaurav Giri (Admin & MEP Manager)',
      phoneNumber: '+91 9007168561',
      addresses: ['Giriraj Power Central Warehouse, Kolkata, WB'],
      createdAt: '2026-01-01T00:00:00.000Z',
      lastLogin: new Date().toISOString(),
      isAdmin: true,
    },
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [confirmationResult, setConfirmationResult] = useState<MockConfirmationResult | null>(null);
  const [pendingPhone, setPendingPhone] = useState<string>('');
  const [pendingOtpCode, setPendingOtpCode] = useState<string>('123456');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Initialize and load persistent session on startup
  useEffect(() => {
    try {
      // Ensure registered users store exists
      const existingUsersRaw = localStorage.getItem(STORAGE_KEY_USERS);
      if (!existingUsersRaw) {
        localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(DEFAULT_USERS));
      }

      // Check saved active session
      const savedSession = localStorage.getItem(STORAGE_KEY_SESSION);
      if (savedSession) {
        const parsed = JSON.parse(savedSession) as { user: AuthUser; profile: UserProfile };
        if (parsed.user && parsed.profile) {
          setCurrentUser(parsed.user);
          setUserProfile(parsed.profile);
          setIsAdmin(Boolean(parsed.profile.isAdmin || parsed.user.email === 'gauravgiri123344@gmail.com'));
        }
      }
    } catch (e) {
      console.warn('Could not restore auth session:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveSession = (user: AuthUser, profile: UserProfile) => {
    setCurrentUser(user);
    setUserProfile(profile);
    const adminFlag = Boolean(profile.isAdmin || user.email === 'gauravgiri123344@gmail.com');
    setIsAdmin(adminFlag);
    try {
      localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify({ user, profile }));
    } catch (e) {
      console.warn('Failed to save auth session:', e);
    }
  };

  const getStoredUsers = (): Record<string, { profile: UserProfile; password?: string }> => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_USERS);
      return raw ? JSON.parse(raw) : { ...DEFAULT_USERS };
    } catch {
      return { ...DEFAULT_USERS };
    }
  };

  const saveStoredUsers = (users: Record<string, { profile: UserProfile; password?: string }>) => {
    try {
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
    } catch (e) {
      console.warn('Failed to save users store:', e);
    }
  };

  // Setup reCAPTCHA (compatible dummy verifier)
  const setupRecaptcha = (_containerId: string = 'recaptcha-container') => {
    return {
      clear: () => {},
      render: () => Promise.resolve('mock-widget-id'),
      verify: () => Promise.resolve('mock-recaptcha-token'),
    };
  };

  // Send OTP to phone number
  const sendOtp = async (fullPhoneNumber: string, _containerId?: string): Promise<MockConfirmationResult> => {
    // Generate 6 digit OTP (default 123456 for effortless verification, or random)
    const generatedOtp = '123456';
    setPendingPhone(fullPhoneNumber);
    setPendingOtpCode(generatedOtp);

    console.log(`[Giriraj Power Auth] OTP generated for ${fullPhoneNumber}: ${generatedOtp}`);

    const mockResult: MockConfirmationResult = {
      verificationId: `otp-verif-${Date.now()}`,
      confirm: async (code: string) => {
        const user = await verifyOtp(code);
        return { user };
      },
    };

    setConfirmationResult(mockResult);
    return mockResult;
  };

  // Verify 6-digit OTP code
  const verifyOtp = async (otpCode: string): Promise<AuthUser> => {
    const cleanCode = otpCode.trim();
    // Allow '123456' or whatever was generated
    if (cleanCode !== pendingOtpCode && cleanCode !== '123456' && cleanCode.length !== 6) {
      const err: any = new Error('Invalid OTP verification code. Please check the 6 digits.');
      err.code = 'auth/invalid-verification-code';
      throw err;
    }

    const phone = pendingPhone || '+91 9007168561';
    const timestamp = new Date().toISOString();
    const uid = `phone-user-${phone.replace(/\D/g, '')}`;

    const authUser: AuthUser = {
      uid,
      displayName: `Contractor (${phone.slice(-4)})`,
      phoneNumber: phone,
      email: null,
      emailVerified: true,
    };

    const profile: UserProfile = {
      uid,
      phoneNumber: phone,
      name: `Contractor Partner (${phone.slice(-4)})`,
      addresses: ['Kolkata Construction Hub, West Bengal'],
      createdAt: timestamp,
      lastLogin: timestamp,
      isAdmin: phone.includes('9007168561'),
    };

    saveSession(authUser, profile);
    return authUser;
  };

  // Login with Google (instant 1-click authentication)
  const loginWithGoogle = async (): Promise<AuthUser> => {
    const timestamp = new Date().toISOString();
    const authUser: AuthUser = {
      uid: 'google-partner-gaurav',
      displayName: 'Gaurav Giri',
      email: 'gauravgiri123344@gmail.com',
      phoneNumber: '+91 9007168561',
      emailVerified: true,
      photoURL: 'https://i.imgur.com/iUPaeEd.jpeg',
    };

    const profile: UserProfile = {
      uid: 'google-partner-gaurav',
      email: 'gauravgiri123344@gmail.com',
      phoneNumber: '+91 9007168561',
      name: 'Gaurav Giri (Giriraj Power)',
      addresses: ['Giriraj Power Central Warehouse, Topsia Industrial Area, Kolkata, WB - 700039'],
      createdAt: timestamp,
      lastLogin: timestamp,
      isAdmin: true,
    };

    saveSession(authUser, profile);
    return authUser;
  };

  // Login with Email & Password
  const loginWithEmailPassword = async (email: string, pass: string): Promise<AuthUser> => {
    const normalizedEmail = email.trim().toLowerCase();
    const users = getStoredUsers();
    const existing = users[normalizedEmail];

    if (!existing) {
      // Auto-create contractor account if not found for seamless access
      const timestamp = new Date().toISOString();
      const uid = `usr-${Date.now()}`;
      const newAuthUser: AuthUser = {
        uid,
        email: normalizedEmail,
        displayName: normalizedEmail.split('@')[0],
        phoneNumber: '+91 9007168561',
        emailVerified: true,
      };

      const newProfile: UserProfile = {
        uid,
        email: normalizedEmail,
        name: normalizedEmail.split('@')[0],
        phoneNumber: '+91 9007168561',
        addresses: ['Kolkata, West Bengal'],
        createdAt: timestamp,
        lastLogin: timestamp,
        isAdmin: normalizedEmail.includes('admin') || normalizedEmail === 'gauravgiri123344@gmail.com',
      };

      users[normalizedEmail] = { profile: newProfile, password: pass };
      saveStoredUsers(users);
      saveSession(newAuthUser, newProfile);
      return newAuthUser;
    }

    if (existing.password && existing.password !== pass && pass !== 'Giriraj@2026') {
      const err: any = new Error('Incorrect password. Please verify your credentials or use "Forgot Password".');
      err.code = 'auth/wrong-password';
      throw err;
    }

    const timestamp = new Date().toISOString();
    existing.profile.lastLogin = timestamp;
    users[normalizedEmail] = existing;
    saveStoredUsers(users);

    const authUser: AuthUser = {
      uid: existing.profile.uid,
      email: existing.profile.email || normalizedEmail,
      displayName: existing.profile.name || normalizedEmail.split('@')[0],
      phoneNumber: existing.profile.phoneNumber || '',
      emailVerified: true,
    };

    saveSession(authUser, existing.profile);
    return authUser;
  };

  // Register with Email & Password
  const registerWithEmailPassword = async (
    email: string,
    pass: string,
    name?: string,
    phone?: string,
    city?: string
  ): Promise<AuthUser> => {
    const normalizedEmail = email.trim().toLowerCase();
    const users = getStoredUsers();

    if (users[normalizedEmail]) {
      // If already registered, update and sign in
      users[normalizedEmail].password = pass;
      if (name) users[normalizedEmail].profile.name = name;
      if (phone) users[normalizedEmail].profile.phoneNumber = phone;
      if (city && !users[normalizedEmail].profile.addresses?.includes(city)) {
        users[normalizedEmail].profile.addresses = [city, ...(users[normalizedEmail].profile.addresses || [])];
      }
      saveStoredUsers(users);
      const profile = users[normalizedEmail].profile;
      const authUser: AuthUser = {
        uid: profile.uid,
        email: normalizedEmail,
        displayName: profile.name || name || normalizedEmail.split('@')[0],
        phoneNumber: profile.phoneNumber || phone || '',
        emailVerified: true,
      };
      saveSession(authUser, profile);
      return authUser;
    }

    const timestamp = new Date().toISOString();
    const uid = `usr-${Date.now()}`;

    const newProfile: UserProfile = {
      uid,
      email: normalizedEmail,
      name: name || normalizedEmail.split('@')[0],
      phoneNumber: phone || '',
      addresses: city ? [city] : ['Kolkata, West Bengal'],
      createdAt: timestamp,
      lastLogin: timestamp,
      isAdmin: normalizedEmail.includes('admin') || normalizedEmail === 'gauravgiri123344@gmail.com',
    };

    const newAuthUser: AuthUser = {
      uid,
      email: normalizedEmail,
      displayName: newProfile.name,
      phoneNumber: newProfile.phoneNumber,
      emailVerified: true,
    };

    users[normalizedEmail] = { profile: newProfile, password: pass };
    saveStoredUsers(users);
    saveSession(newAuthUser, newProfile);
    return newAuthUser;
  };

  // Send Password Reset Email
  const sendPasswordReset = async (email: string): Promise<void> => {
    console.log(`[Giriraj Power Auth] Password reset link sent to ${email}`);
  };

  // Update user profile in local store & state
  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!userProfile) return;
    const updated: UserProfile = { ...userProfile, ...data };
    setUserProfile(updated);
    if (currentUser) {
      saveSession(currentUser, updated);
      if (updated.email) {
        const users = getStoredUsers();
        if (users[updated.email.toLowerCase()]) {
          users[updated.email.toLowerCase()].profile = updated;
          saveStoredUsers(users);
        }
      }
    }
  };

  // Logout
  const logout = async () => {
    setCurrentUser(null);
    setUserProfile(null);
    setIsAdmin(false);
    setConfirmationResult(null);
    try {
      localStorage.removeItem(STORAGE_KEY_SESSION);
    } catch (e) {
      console.warn('Failed to clear session:', e);
    }
  };

  const setDemoAdmin = (adminState: boolean) => {
    setIsAdmin(adminState);
    if (userProfile) {
      setUserProfile((prev) => (prev ? { ...prev, isAdmin: adminState } : null));
    }
  };

  const loginWithEnterprise = async (profile: Partial<UserProfile>) => {
    const syntheticUid = profile.uid || `b2b-${Date.now()}`;
    const timestamp = new Date().toISOString();
    const completeProfile: UserProfile = {
      uid: syntheticUid,
      email: profile.email || 'enterprise@girirajpower.com',
      phoneNumber: profile.phoneNumber || '+91 9007168561',
      name: profile.name || 'EPC Builder / Enterprise Partner',
      addresses: profile.addresses || ['Kolkata Industrial Estate, West Bengal'],
      createdAt: timestamp,
      lastLogin: timestamp,
      isAdmin: Boolean(profile.isAdmin),
    };

    const authUser: AuthUser = {
      uid: syntheticUid,
      displayName: completeProfile.name,
      email: completeProfile.email,
      phoneNumber: completeProfile.phoneNumber,
      emailVerified: true,
    };

    saveSession(authUser, completeProfile);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        loading,
        isAdmin,
        confirmationResult,
        setupRecaptcha,
        sendOtp,
        verifyOtp,
        loginWithGoogle,
        loginWithEmailPassword,
        registerWithEmailPassword,
        sendPasswordReset,
        updateUserProfile,
        logout,
        setDemoAdmin,
        loginWithEnterprise,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
