import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import { PhoneLogin } from '../components/auth/PhoneLogin';
import { OtpVerify } from '../components/auth/OtpVerify';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import {
  Zap,
  Phone,
  Lock,
  Mail,
  Building,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  FileCheck,
  Truck,
  FileText,
  BadgePercent,
  Eye,
  EyeOff,
  UserCheck,
  LogOut,
  User,
  AlertCircle,
  KeyRound,
  Compass,
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useShop();
  const {
    currentUser,
    userProfile,
    logout,
    loginWithGoogle,
    loginWithEmailPassword,
    registerWithEmailPassword,
    sendPasswordReset,
    loginWithEnterprise,
  } = useAuth();

  // Active Login Mode Tab: 'phone' | 'email' | 'register'
  const [activeTab, setActiveTab] = useState<'phone' | 'email' | 'register'>('phone');
  
  // Phone OTP State
  const [sentPhoneNumber, setSentPhoneNumber] = useState('');
  const [isOtpStep, setIsOtpStep] = useState(false);

  // Email / Password Login State
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  // Register State
  const [regName, setRegName] = useState('');
  const [regFirmName, setRegFirmName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regGstin, setRegGstin] = useState('');
  const [regCity, setRegCity] = useState('');
  const [regBusinessType, setRegBusinessType] = useState('Electrical Contractor / MEP Firm');

  // Loading & Error states
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const handleOtpSuccess = () => {
    showToast(
      'Phone Verification Successful',
      'Namaste! Welcome back to Giriraj Power B2B Portal. GST rates & project credits are active.',
      'success'
    );
    navigate('/');
  };

  // Google OAuth Login
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const user = await loginWithGoogle();
      setIsLoading(false);
      showToast(
        'Google Login Successful',
        `Welcome ${user.displayName || user.email}! Connected via Google OAuth.`,
        'success'
      );
      navigate('/');
    } catch (err: any) {
      setIsLoading(false);
      console.error('Google login error:', err);
      let msg = 'Google Sign-In could not be completed. Please check your popup settings.';
      if (err.code === 'auth/popup-closed-by-user') {
        msg = 'Sign-in popup was closed before completing.';
      } else if (err.code === 'auth/cancelled-popup-request') {
        msg = 'Sign-in popup request cancelled.';
      } else if (err.code === 'auth/unauthorized-domain') {
        msg = `Unauthorized Domain: Please add "${window.location.hostname}" to Firebase Console -> Authentication -> Settings -> Authorized Domains.`;
      } else if (err.code === 'auth/operation-not-allowed') {
        msg = 'Google sign-in provider is not enabled in Firebase Console (Authentication > Sign-in method > Google).';
      } else if (err.message) {
        msg = err.message;
      }
      setAuthError(msg);
      showToast('Login Failed', msg, 'error');
    }
  };

  // Email & Password Submit
  const handleEmailLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError(null);

    try {
      await loginWithEmailPassword(emailInput.trim(), passwordInput);
      setIsLoading(false);
      showToast(
        'Login Successful',
        'Namaste! Welcome to Giriraj Power. GST rates & project pricing are active.',
        'success'
      );
      navigate('/');
    } catch (err: any) {
      setIsLoading(false);
      console.error('Email login error:', err);
      let msg = 'Invalid email or password. Please verify your credentials.';
      if (err.code === 'auth/user-not-found') {
        msg = 'No account found with this email. Please register below.';
      } else if (err.code === 'auth/wrong-password') {
        msg = 'Incorrect password. Try clicking "Forgot Password?" below.';
      } else if (err.code === 'auth/invalid-email') {
        msg = 'Please enter a valid email address.';
      } else if (err.message) {
        msg = err.message;
      }
      setAuthError(msg);
      showToast('Authentication Error', msg, 'error');
    }
  };

  // Register Submit
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError(null);

    if (regPassword.length < 6) {
      setAuthError('Password must be at least 6 characters long.');
      setIsLoading(false);
      return;
    }

    try {
      const fullName = regFirmName ? `${regName} (${regFirmName})` : regName;
      await registerWithEmailPassword(
        regEmail.trim(),
        regPassword,
        fullName,
        regPhone,
        regCity || 'Kolkata, WB'
      );
      setIsLoading(false);
      showToast(
        'Account Registered',
        `Dhanyawad! Registration for ${regFirmName || regName} completed successfully.`,
        'success'
      );
      navigate('/');
    } catch (err: any) {
      setIsLoading(false);
      console.error('Registration error:', err);
      let msg = 'Registration failed. Please try again.';
      if (err.code === 'auth/email-already-in-use') {
        msg = 'This email is already registered. Please sign in with your email or password.';
      } else if (err.code === 'auth/weak-password') {
        msg = 'Password should be at least 6 characters.';
      } else if (err.message) {
        msg = err.message;
      }
      setAuthError(msg);
      showToast('Registration Error', msg, 'error');
    }
  };

  // Password Reset
  const handlePasswordResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.trim()) return;

    try {
      await sendPasswordReset(resetEmail.trim());
      showToast(
        'Password Reset Email Sent',
        `A password reset link has been dispatched to ${resetEmail}. Check your inbox.`,
        'success'
      );
      setIsResetModalOpen(false);
      setResetEmail('');
    } catch (err: any) {
      showToast('Reset Error', err.message || 'Could not send password reset email.', 'error');
    }
  };

  // Demo Quick Fills
  const handleQuickFillContractor = () => {
    setActiveTab('phone');
    setSentPhoneNumber('+919007168561');
    setIsOtpStep(false);
    setAuthError(null);
    showToast('Contractor Number Loaded', 'Phone number +91 9007168561 ready for OTP.', 'info');
  };

  const handleQuickFillBuilder = () => {
    setActiveTab('email');
    setEmailInput('contractor@girirajpower.com');
    setPasswordInput('Giriraj@2026');
    setAuthError(null);
    showToast('Demo Credentials Loaded', 'Contractor credentials filled. Click "Sign In with Email" to proceed.', 'info');
  };

  return (
    <div className="bg-white min-h-screen pb-20 text-neutral-900">
      {/* Top Banner & Breadcrumbs */}
      <div className="bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <Breadcrumbs items={[{ label: 'Contractor & Customer Authentication' }]} />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
                Giriraj Power <span className="text-emerald-700">Account Access</span>
              </h1>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1">
                Sign in with Phone OTP, Email & Password, or Google to access wholesale prices and 60-minute site deliveries.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold bg-white border border-neutral-200 rounded-xl px-3.5 py-2 shadow-xs shrink-0">
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>Helpline: <a href="tel:+919007168561" className="text-black font-bold hover:underline">+91 9007168561</a></span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Login / Register Box */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-xs">
            {currentUser ? (
              /* Already Signed In View */
              <div className="space-y-6">
                <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
                    <User className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-black text-black">
                        {userProfile?.name || currentUser.displayName || 'Authorized Partner'}
                      </span>
                      <span className="bg-emerald-200 text-emerald-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Logged In
                      </span>
                    </div>
                    {currentUser.email && (
                      <p className="text-xs text-neutral-600 mt-1 font-mono">
                        Email: <strong>{currentUser.email}</strong>
                      </p>
                    )}
                    {currentUser.phoneNumber && (
                      <p className="text-xs text-neutral-600 mt-0.5 font-mono">
                        Phone: <strong>{currentUser.phoneNumber}</strong>
                      </p>
                    )}
                    <p className="text-[10px] text-neutral-500 mt-1">
                      Firebase UID: <code className="font-mono">{currentUser.uid}</code>
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/checkout"
                    className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs py-3 px-4 rounded-xl text-center transition-colors shadow-xs"
                  >
                    Proceed to 60-Min Checkout →
                  </Link>
                  <Link
                    to="/admin"
                    className="bg-black hover:bg-neutral-800 text-white font-bold text-xs py-3 px-4 rounded-xl text-center transition-colors shadow-xs"
                  >
                    Open Admin Dispatch
                  </Link>
                  <button
                    onClick={async () => {
                      await logout();
                      showToast('Signed Out', 'You have been safely signed out.', 'info');
                    }}
                    className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* 1-Click Google / Gmail Sign In */}
                <div className="mb-6">
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    className="w-full py-3.5 px-4 bg-white hover:bg-neutral-50 border-2 border-neutral-200 hover:border-neutral-400 text-neutral-800 font-bold text-sm rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xs cursor-pointer active:scale-98"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.37 7.32 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.97 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.32 0 3.25 2.63 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      />
                    </svg>
                    <span>Continue with Google / Gmail</span>
                  </button>

                  <div className="relative my-6 flex items-center justify-center">
                    <div className="border-t border-neutral-200 w-full"></div>
                    <span className="bg-white px-3 text-xs font-bold text-neutral-400 uppercase tracking-wider absolute">
                      or choose login option
                    </span>
                  </div>
                </div>

                {/* 3 Tab Switchers: Phone OTP | Email & Password | Register */}
                <div className="flex border-b border-neutral-200 mb-6 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('phone');
                      setAuthError(null);
                    }}
                    className={`flex-1 py-3 text-xs sm:text-sm font-bold text-center border-b-2 transition-all cursor-pointer ${
                      activeTab === 'phone'
                        ? 'border-black text-black font-black'
                        : 'border-transparent text-neutral-400 hover:text-neutral-700'
                    }`}
                  >
                    📱 Phone OTP
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('email');
                      setAuthError(null);
                    }}
                    className={`flex-1 py-3 text-xs sm:text-sm font-bold text-center border-b-2 transition-all cursor-pointer ${
                      activeTab === 'email'
                        ? 'border-black text-black font-black'
                        : 'border-transparent text-neutral-400 hover:text-neutral-700'
                    }`}
                  >
                    ✉️ Email / Password
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('register');
                      setAuthError(null);
                    }}
                    className={`flex-1 py-3 text-xs sm:text-sm font-bold text-center border-b-2 transition-all cursor-pointer ${
                      activeTab === 'register'
                        ? 'border-emerald-600 text-emerald-700 font-black'
                        : 'border-transparent text-neutral-400 hover:text-neutral-700'
                    }`}
                  >
                    🏢 New Register
                  </button>
                </div>

                {/* Auth Error Banner */}
                {authError && (
                  <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-2.5 text-xs text-rose-800">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{authError}</span>
                  </div>
                )}

                {/* Quick Demo Fill Buttons */}
                <div className="mb-6 p-3.5 bg-yellow-50/70 border border-yellow-200 rounded-2xl">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-yellow-600" />
                      <span>One-Click Test Login</span>
                    </span>
                    <span className="text-[10px] text-neutral-500 font-medium">Quick Credentials</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={handleQuickFillContractor}
                      className="text-xs bg-white hover:bg-neutral-100 border border-yellow-300 text-neutral-900 font-semibold px-3 py-1.5 rounded-lg transition-colors shadow-2xs cursor-pointer"
                    >
                      ⚡ Quick Fill Phone (+91 9007168561)
                    </button>
                    <button
                      type="button"
                      onClick={handleQuickFillBuilder}
                      className="text-xs bg-white hover:bg-neutral-100 border border-yellow-300 text-neutral-900 font-semibold px-3 py-1.5 rounded-lg transition-colors shadow-2xs cursor-pointer"
                    >
                      🏢 Quick Fill Email & Password
                    </button>
                  </div>
                </div>

                {/* Tab 1: Phone OTP */}
                {activeTab === 'phone' && (
                  <div>
                    {isOtpStep ? (
                      <OtpVerify
                        phoneNumber={sentPhoneNumber}
                        onSuccess={handleOtpSuccess}
                        onChangeNumber={() => setIsOtpStep(false)}
                      />
                    ) : (
                      <PhoneLogin
                        defaultPhone={sentPhoneNumber ? sentPhoneNumber.replace('+91', '') : ''}
                        onOtpSent={(phone) => {
                          setSentPhoneNumber(phone);
                          setIsOtpStep(true);
                          showToast('OTP Sent', `6-digit verification code sent to ${phone}`, 'success');
                        }}
                      />
                    )}
                  </div>
                )}

                {/* Tab 2: Email & Password */}
                {activeTab === 'email' && (
                  <form onSubmit={handleEmailLoginSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-800 mb-1">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3 pointer-events-none" />
                        <input
                          type="email"
                          required
                          placeholder="contractor@firm.com"
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 text-sm border border-neutral-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-neutral-800">
                          Password <span className="text-rose-500">*</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setResetEmail(emailInput);
                            setIsResetModalOpen(true);
                          }}
                          className="text-[11px] text-emerald-700 hover:text-emerald-900 font-semibold cursor-pointer"
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-3 pointer-events-none" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          placeholder="Enter your account password"
                          value={passwordInput}
                          onChange={(e) => setPasswordInput(e.target.value)}
                          className="w-full pl-9 pr-10 py-2.5 text-sm border border-neutral-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-neutral-400 hover:text-black cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-black hover:bg-emerald-600 text-white font-bold text-sm py-3 px-6 rounded-xl transition-all shadow-md active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2 mt-2 cursor-pointer"
                    >
                      <UserCheck className="w-4 h-4 text-yellow-400" />
                      <span>{isLoading ? 'Signing In...' : 'Sign In with Email & Password'}</span>
                    </button>
                  </form>
                )}

                {/* Tab 3: Registration */}
                {activeTab === 'register' && (
                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-800 mb-1">
                          Firm / Company Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Mahavir Electricals & MEP"
                          value={regFirmName}
                          onChange={(e) => setRegFirmName(e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-800 mb-1">
                          Contact Person Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rajesh Sharma"
                          value={regName}
                          onChange={(e) => setRegName(e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-800 mb-1">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="orders@firm.com"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-800 mb-1">
                          Create Password (Min 6 chars) <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="password"
                          required
                          minLength={6}
                          placeholder="••••••••"
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-800 mb-1">
                          WhatsApp Mobile Number
                        </label>
                        <input
                          type="tel"
                          maxLength={10}
                          placeholder="10-digit mobile number"
                          value={regPhone}
                          onChange={(e) => setRegPhone(e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-800 mb-1">
                          City & State
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Kolkata, West Bengal"
                          value={regCity}
                          onChange={(e) => setRegCity(e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-800 mb-1">
                        Primary Business Category
                      </label>
                      <select
                        value={regBusinessType}
                        onChange={(e) => setRegBusinessType(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
                      >
                        <option value="Electrical Contractor / MEP Firm">Electrical Contractor / MEP Firm</option>
                        <option value="Residential Builder / Real Estate Developer">Residential Builder / Real Estate Developer</option>
                        <option value="Industrial Factory Plant Engineer">Industrial Factory Plant Engineer</option>
                        <option value="EPC Infrastructure Contractor">EPC Infrastructure Contractor</option>
                        <option value="Electrical Wholesale Retailer">Electrical Wholesale Retailer</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3 px-6 rounded-xl transition-all shadow-md active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2 mt-2 cursor-pointer"
                    >
                      <FileCheck className="w-4 h-4 text-yellow-300" />
                      <span>{isLoading ? 'Creating Account...' : 'Create Account & Access B2B Slabs'}</span>
                    </button>
                  </form>
                )}
              </>
            )}
          </div>

          {/* Right Column: Portal Benefits */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-black text-white rounded-3xl p-6 sm:p-8 border border-neutral-800 shadow-lg space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-yellow-400">
                  <Zap className="w-6 h-6 fill-yellow-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Giriraj Power Partner Perks</h3>
                  <p className="text-xs text-neutral-400">Direct Mill Pricing & Guaranteed Authentic Stock</p>
                </div>
              </div>

              <div className="space-y-3.5 text-xs text-neutral-300 pt-2 border-t border-neutral-800">
                <div className="flex items-start gap-3">
                  <BadgePercent className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-bold text-sm">Wholesale Contractor Slabs</strong>
                    <span>Get additional 15% to 28% contractor discount on published Polycab, Havells, Schneider & Legrand rates.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-bold text-sm">Automated GST Invoicing</strong>
                    <span>Instant E-Way bills, Input Tax Credit (ITC) compliant tax invoices, and CPRI test reports for every drum.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-bold text-sm">60-Minute Site Offloading</strong>
                    <span>Direct yard dispatch with Hydra crane trucks for heavy HT/LT armored cable drums straight to your project basement.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-bold text-sm">Real-Time Dispatch Tracking</strong>
                    <span>Receive instant SMS notifications with rider details and direct phone contact.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Helpline Assistance Box */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-3xl p-6 space-y-3 text-xs text-neutral-800 shadow-2xs">
              <div className="flex items-center gap-2 font-bold text-black text-sm">
                <Phone className="w-4 h-4 text-emerald-700" />
                <span>Need Instant On-Call Assistance?</span>
              </div>
              <p className="text-neutral-700 leading-relaxed">
                Kindly speak directly with our senior MEP estimation engineers to open credit terms, submit physical BOQ blueprints, or get live copper rate calculations:
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-2 font-bold">
                <a
                  href="tel:+919007168561"
                  className="flex-1 text-center bg-black hover:bg-emerald-700 text-white py-2.5 px-3 rounded-xl transition-colors text-xs"
                >
                  Dial +91 9007168561
                </a>
                <a
                  href="tel:+919874569712"
                  className="flex-1 text-center bg-white hover:bg-neutral-100 border border-neutral-300 text-black py-2.5 px-3 rounded-xl transition-colors text-xs"
                >
                  Dial +91 9874569712
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {isResetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-neutral-200 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-emerald-600" />
                <h3 className="font-black text-base text-black">Reset Password</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsResetModalOpen(false)}
                className="text-neutral-400 hover:text-black font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-neutral-600">
              Enter your registered email address below. We'll send you a secure Firebase link to reset your account password.
            </p>

            <form onSubmit={handlePasswordResetSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1">
                  Registered Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="contractor@firm.com"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border border-neutral-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsResetModalOpen(false)}
                  className="flex-1 py-2.5 px-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 bg-black hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
                >
                  Send Reset Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default LoginPage;
