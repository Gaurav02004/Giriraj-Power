import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
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
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useShop();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [loginMethod, setLoginMethod] = useState<'otp' | 'password'>('otp');
  
  // Login states
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [emailOrGstin, setEmailOrGstin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Register states
  const [regFirmName, setRegFirmName] = useState('');
  const [regContactPerson, setRegContactPerson] = useState('');
  const [regMobile, setRegMobile] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regGstin, setRegGstin] = useState('');
  const [regBusinessType, setRegBusinessType] = useState('Electrical Contractor / MEP Firm');
  const [regCity, setRegCity] = useState('');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileNumber.length < 10) {
      showToast('Invalid Mobile Number', 'Kindly enter a valid 10-digit Indian mobile number.', 'error');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
      setOtp('7890'); // pre-fill demo OTP
      showToast('OTP Sent Successfully', `Verification OTP sent to +91 ${mobileNumber}. (Demo OTP: 7890)`, 'success');
    }, 600);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const userName = mobileNumber ? `Contractor (+91 ${mobileNumber})` : (emailOrGstin || 'Authorized Partner');
      showToast(
        'Login Successful',
        `Namaste! Welcome back to Giriraj Power B2B Portal. GST rates & project credits are active.`,
        'success'
      );
      // Redirect to previous page or home
      navigate('/');
    }, 700);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      showToast(
        'Registration Submitted',
        `Dhanyawad! Registration for ${regFirmName} received. Our contractor desk will verify your GSTIN within 2 working hours.`,
        'success'
      );
      setActiveTab('login');
      setLoginMethod('otp');
      setMobileNumber(regMobile);
    }, 800);
  };

  const handleQuickFillContractor = () => {
    setLoginMethod('otp');
    setMobileNumber('9007168561');
    setOtpSent(true);
    setOtp('7890');
    showToast('Demo Credentials Loaded', 'Registered ' + 'Contractor account loaded. Click "Verify OTP & Access Portal" to proceed.', 'info');
  };

  const handleQuickFillBuilder = () => {
    setLoginMethod('password');
    setEmailOrGstin('27AABCG1234F1Z5');
    setPassword('Giriraj@Power2026');
    showToast('Demo GSTIN Loaded', 'EPC Builder account loaded. Click "Sign In with GSTIN" to proceed.', 'info');
  };

  return (
    <div className="bg-white min-h-screen pb-20 text-neutral-900">
      <div className="bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <Breadcrumbs items={[{ label: 'Contractor & Partner Login' }]} />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
                Giriraj Power <span className="text-emerald-600">Contractor Portal</span>
              </h1>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1">
                Authorized B2B login for MEP Contractors, Builders, Electrical Consultants, and Industrial Buyers across India.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold bg-white border border-neutral-200 rounded-xl px-3.5 py-2 shadow-xs shrink-0">
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>Helpline: <a href="tel:+919007168561" className="text-black font-bold hover:underline">+91 9007168561</a> / <a href="tel:+919874569712" className="text-black font-bold hover:underline">9874569712</a></span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Login / Register Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-xs">
            {/* Tab switchers */}
            <div className="flex border-b border-neutral-200 mb-6">
              <button
                type="button"
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-3 text-sm font-bold text-center border-b-2 transition-colors ${
                  activeTab === 'login'
                    ? 'border-black text-black'
                    : 'border-transparent text-neutral-400 hover:text-neutral-700'
                }`}
              >
                Sign In to Account
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('register')}
                className={`flex-1 py-3 text-sm font-bold text-center border-b-2 transition-colors ${
                  activeTab === 'register'
                    ? 'border-emerald-600 text-emerald-700'
                    : 'border-transparent text-neutral-400 hover:text-neutral-700'
                }`}
              >
                Register New Firm / Contractor
              </button>
            </div>

            {/* Quick Demo Fill Buttons */}
            <div className="mb-6 p-3.5 bg-yellow-50/70 border border-yellow-200 rounded-2xl">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-600" />
                  <span>Instant Demo Access</span>
                </span>
                <span className="text-[10px] text-neutral-500 font-medium">One-click testing</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleQuickFillContractor}
                  className="text-xs bg-white hover:bg-neutral-100 border border-yellow-300 text-neutral-900 font-semibold px-3 py-1.5 rounded-lg transition-colors shadow-2xs"
                >
                  ⚡ Quick Fill: Contractor (+91 9007168561)
                </button>
                <button
                  type="button"
                  onClick={handleQuickFillBuilder}
                  className="text-xs bg-white hover:bg-neutral-100 border border-yellow-300 text-neutral-900 font-semibold px-3 py-1.5 rounded-lg transition-colors shadow-2xs"
                >
                  🏢 Quick Fill: GSTIN Enterprise
                </button>
              </div>
            </div>

            {activeTab === 'login' ? (
              <div>
                {/* Method selector: OTP vs Password */}
                <div className="flex items-center gap-3 mb-6 bg-neutral-100 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setLoginMethod('otp')}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                      loginMethod === 'otp'
                        ? 'bg-white text-black shadow-xs'
                        : 'text-neutral-600 hover:text-black'
                    }`}
                  >
                    Mobile Number & OTP (Fastest)
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoginMethod('password')}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                      loginMethod === 'password'
                        ? 'bg-white text-black shadow-xs'
                        : 'text-neutral-600 hover:text-black'
                    }`}
                  >
                    GSTIN / Email & Password
                  </button>
                </div>

                {loginMethod === 'otp' ? (
                  <form onSubmit={otpSent ? handleLoginSubmit : handleSendOtp} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-800 mb-1">
                        Registered Indian Mobile Number <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-2.5 flex items-center gap-1 text-xs font-bold text-neutral-600 border-r border-neutral-300 pr-2">
                          <span>🇮🇳 +91</span>
                        </div>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          placeholder="e.g. 9007168561 or 9874569712"
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                          disabled={otpSent}
                          className="w-full pl-20 pr-3 py-2.5 text-sm border border-neutral-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white font-mono"
                        />
                      </div>
                      <p className="text-[11px] text-neutral-500 mt-1">
                        Kindly enter your 10-digit mobile registered with your contractor account.
                      </p>
                    </div>

                    {otpSent && (
                      <div className="animate-fadeIn space-y-4 pt-2 border-t border-neutral-100">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-xs font-bold text-neutral-800">
                              Enter 4-Digit OTP <span className="text-rose-500">*</span>
                            </label>
                            <button
                              type="button"
                              onClick={() => {
                                setOtpSent(false);
                                setOtp('');
                              }}
                              className="text-[11px] text-emerald-700 hover:underline font-semibold"
                            >
                              Change Number
                            </button>
                          </div>
                          <div className="relative">
                            <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                            <input
                              type="text"
                              required
                              maxLength={6}
                              placeholder="Enter OTP (e.g. 7890)"
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                              className="w-full pl-9 pr-3 py-2.5 text-sm border border-neutral-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white font-mono tracking-widest text-lg font-bold"
                            />
                          </div>
                          <p className="text-[11px] text-emerald-700 mt-1 font-medium flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Demo OTP is ready: <strong>7890</strong></span>
                          </p>
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-black hover:bg-emerald-600 text-white font-bold text-sm py-3 px-6 rounded-xl transition-all shadow-md active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
                    >
                      {isLoading ? (
                        <span>Processing request...</span>
                      ) : otpSent ? (
                        <>
                          <UserCheck className="w-4 h-4 text-yellow-400" />
                          <span>Verify OTP & Access Portal</span>
                        </>
                      ) : (
                        <>
                          <span>Send Login OTP</span>
                          <ArrowRight className="w-4 h-4 text-yellow-400" />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-800 mb-1">
                        GSTIN or Business Email <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Building className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. 27AABCG1234F1Z5 or purchase@firm.com"
                          value={emailOrGstin}
                          onChange={(e) => setEmailOrGstin(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 text-sm border border-neutral-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white uppercase font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-neutral-800">
                          Password <span className="text-rose-500">*</span>
                        </label>
                        <a href="tel:+919007168561" className="text-[11px] text-neutral-500 hover:text-black">
                          Forgot password? Call Helpline
                        </a>
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-9 pr-10 py-2.5 text-sm border border-neutral-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-neutral-400 hover:text-black"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-black hover:bg-emerald-600 text-white font-bold text-sm py-3 px-6 rounded-xl transition-all shadow-md active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
                    >
                      <UserCheck className="w-4 h-4 text-yellow-400" />
                      <span>{isLoading ? 'Authenticating...' : 'Sign In with GSTIN / Email'}</span>
                    </button>
                  </form>
                )}
              </div>
            ) : (
              /* Registration Form */
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
                      className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
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
                      value={regContactPerson}
                      onChange={(e) => setRegContactPerson(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">
                      WhatsApp Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      value={regMobile}
                      onChange={(e) => setRegMobile(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">
                      Business Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="orders@firm.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">
                      GSTIN Number (Optional / Recommended)
                    </label>
                    <input
                      type="text"
                      placeholder="15-digit GSTIN"
                      value={regGstin}
                      onChange={(e) => setRegGstin(e.target.value.toUpperCase())}
                      className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white font-mono uppercase"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">
                      City & State <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pune, Maharashtra / Noida, UP"
                      value={regCity}
                      onChange={(e) => setRegCity(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
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
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
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
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3 px-6 rounded-xl transition-all shadow-md active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
                >
                  <FileCheck className="w-4 h-4 text-yellow-300" />
                  <span>{isLoading ? 'Registering Account...' : 'Register for B2B Contractor Pricing'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Portal Benefits & Indian English Assurance */}
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
                    <strong className="text-white block font-bold text-sm">Priority Site Offloading</strong>
                    <span>Direct yard dispatch with Hydra crane trucks for heavy HT/LT armored cable drums straight to your project basement.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-bold text-sm">Staggered Delivery Scheduling</strong>
                    <span>Lock wholesale rates for your entire BOQ today and request partial batch dispatches as your construction slabs progress.</span>
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
    </div>
  );
};
