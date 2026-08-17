import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useShop } from '../../context/ShopContext';
import { Phone, ArrowRight, Loader2, ShieldCheck, AlertCircle, Sparkles, Zap, Radio, MessageSquare, CheckCircle2 } from 'lucide-react';

interface PhoneLoginProps {
  onOtpSent?: (phone: string, autoFillOtp?: string) => void;
  onSuccess?: () => void;
  className?: string;
  defaultPhone?: string;
}

export const PhoneLogin: React.FC<PhoneLoginProps> = ({
  onOtpSent,
  onSuccess,
  className = '',
  defaultPhone = '',
}) => {
  const { sendOtp, verifyOtp } = useAuth();
  const { showToast } = useShop();
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState(defaultPhone || '9007168561');
  const [loadingMode, setLoadingMode] = useState<'whatsapp' | 'sms' | 'demo' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDndError, setIsDndError] = useState(false);
  const [gatewayInfo, setGatewayInfo] = useState<{ configured: boolean; info?: string } | null>(null);

  useEffect(() => {
    fetch('/api/otp/status')
      .then((res) => res.json())
      .then((data) => setGatewayInfo(data))
      .catch(() => null);
  }, []);

  // Strict Indian mobile cleaner (strips spaces, dashes, +91, leading 0)
  const cleanIndianNumber = (raw: string) => {
    let clean = raw.trim().replace(/[^\d+]/g, '');
    if (clean.startsWith('+91')) clean = clean.slice(3);
    else if (clean.startsWith('91') && clean.length === 12) clean = clean.slice(2);
    clean = clean.replace(/^0+/, '');
    clean = clean.replace(/\D/g, '');
    if (clean.length > 10) clean = clean.slice(-10);
    return clean;
  };

  // WhatsApp Verification Flow
  const handleWhatsAppVerification = async () => {
    setError(null);
    setIsDndError(false);

    const cleanNumber = cleanIndianNumber(phoneNumber) || '9007168561';
    if (cleanNumber.length !== 10) {
      setError('Please enter a valid 10-digit Indian mobile number for WhatsApp verification.');
      showToast('Invalid Phone', 'Please enter a 10-digit mobile number.', 'warning');
      return;
    }

    const fullPhoneNumber = `${countryCode} ${cleanNumber}`;

    try {
      setLoadingMode('whatsapp');
      const result = await sendOtp(cleanNumber, 'whatsapp', 'whatsapp');
      setLoadingMode(null);

      const generatedOtp = result.otp || Math.floor(100000 + Math.random() * 900000).toString();
      const whatsappText = `Hello Giriraj Power, my login verification code is ${generatedOtp}`;
      const whatsappUrl =
        result.whatsappUrl ||
        `https://wa.me/919007168561?text=${encodeURIComponent(whatsappText)}`;

      // Open WhatsApp chat in a new tab
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      showToast(
        'WhatsApp Verification Opened',
        `Verification code ${generatedOtp} generated. Proceeding to verify code.`,
        'success'
      );

      if (onOtpSent) {
        onOtpSent(fullPhoneNumber, generatedOtp);
      }
    } catch (err: any) {
      console.error('WhatsApp verification error:', err);
      setLoadingMode(null);
      const rawError = err.message || 'Failed to initiate WhatsApp verification.';
      setError(rawError);
      showToast('WhatsApp Error', rawError, 'error');
    }
  };

  // 1-Click Instant Demo Auto-Fill & Login
  const handleDemoAutoFill = async () => {
    setError(null);
    setIsDndError(false);
    const demoPhone = '9007168561';
    setPhoneNumber(demoPhone);

    try {
      setLoadingMode('demo');
      // Bypass with instant zero-cost verification
      await verifyOtp('123456');
      setLoadingMode(null);
      showToast('Demo Access Granted', 'Instant 1-Click Demo Login successful.', 'success');
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      console.error('Demo login error:', err);
      setLoadingMode(null);
      // If direct verify failed, take user to OTP screen pre-filled
      if (onOtpSent) {
        onOtpSent(`+91 ${demoPhone}`, '123456');
      }
    }
  };

  // Live Fast2SMS SMS Dispatch
  const handleSmsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsDndError(false);

    const cleanNumber = cleanIndianNumber(phoneNumber);
    if (cleanNumber.length !== 10) {
      setError('Please enter a valid 10-digit Indian mobile number.');
      showToast('Invalid Phone', 'Please enter a 10-digit mobile number.', 'warning');
      return;
    }

    const fullPhoneNumber = `${countryCode} ${cleanNumber}`;

    try {
      setLoadingMode('sms');
      await sendOtp(cleanNumber, 'recaptcha-container', 'sms');
      setLoadingMode(null);
      showToast('OTP Dispatched', `Fast2SMS Quick SMS requested for +91 ${cleanNumber}`, 'success');
      if (onOtpSent) {
        onOtpSent(fullPhoneNumber);
      }
    } catch (err: any) {
      console.error('Phone login Fast2SMS error:', err);
      setLoadingMode(null);
      const rawError = err.message || 'Failed to dispatch OTP via Fast2SMS.';
      const lower = rawError.toLowerCase();
      const isDnd = Boolean(err.isDnd) || lower.includes('dnd') || lower.includes('do not disturb') || lower.includes('ndnc');

      setIsDndError(isDnd);
      setError(rawError);
      showToast(isDnd ? 'DND Restriction' : 'Fast2SMS Error', rawError, isDnd ? 'warning' : 'error');
    }
  };

  const handleProceedWithDndBypass = () => {
    const cleanNumber = cleanIndianNumber(phoneNumber) || '9007168561';
    const fullPhoneNumber = `${countryCode} ${cleanNumber}`;
    showToast('Test Mode Active', 'You may enter test OTP 123456 on the next screen.', 'info');
    if (onOtpSent) {
      onOtpSent(fullPhoneNumber, '123456');
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Invisible reCAPTCHA container */}
      <div id="recaptcha-container" className="hidden"></div>

      {/* 1-Click Instant Demo Auto-Fill Banner */}
      <div className="p-3.5 bg-gradient-to-r from-amber-500/10 via-yellow-400/15 to-emerald-500/10 border-2 border-yellow-400/80 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-yellow-400 text-black flex items-center justify-center font-black shrink-0 shadow-2xs">
            <Zap className="w-4 h-4 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-neutral-900">1-Click Demo Auto-Fill</span>
              <span className="bg-emerald-600 text-white font-bold text-[9px] px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                Zero Cost
              </span>
            </div>
            <p className="text-[11px] text-neutral-600">
              Instant login for testing (+91 9007168561 / code 123456) without SMS charges.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDemoAutoFill}
          disabled={loadingMode !== null}
          className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-black font-black text-xs px-4 py-2.5 rounded-xl transition-all shadow-xs hover:shadow-sm active:scale-98 cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
        >
          {loadingMode === 'demo' ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Logging in...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Demo Auto-Fill & Login</span>
            </>
          )}
        </button>
      </div>

      <form onSubmit={handleSmsSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-neutral-800 mb-1.5">
            Registered Mobile Number <span className="text-rose-500">*</span>
          </label>
          <div className="relative flex rounded-xl border border-neutral-300 bg-white focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500 overflow-hidden">
            <div className="flex items-center gap-1 bg-neutral-50 px-3 border-r border-neutral-200 text-xs font-bold text-neutral-700 select-none">
              <span className="text-base">🇮🇳</span>
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="bg-transparent font-mono font-bold focus:outline-hidden cursor-pointer"
              >
                <option value="+91">+91 (IN)</option>
                <option value="+1">+1 (US)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+971">+971 (UAE)</option>
              </select>
            </div>

            <div className="relative flex-1 flex items-center">
              <Phone className="w-4 h-4 text-neutral-400 absolute left-3 pointer-events-none" />
              <input
                type="tel"
                required
                maxLength={10}
                placeholder="e.g. 9007168561"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value.replace(/\D/g, ''));
                  if (error) setError(null);
                }}
                disabled={loadingMode !== null}
                className="w-full pl-9 pr-3 py-3 text-sm font-mono text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden bg-transparent"
              />
            </div>
          </div>
          <p className="text-[11px] text-neutral-500 mt-1 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Verify instantly via direct WhatsApp message or Fast2SMS gateway.</span>
          </p>
        </div>

        {error && (
          <div
            className={`p-3.5 border rounded-xl text-xs space-y-2 animate-fadeIn ${
              isDndError ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}
          >
            <div className="flex items-start gap-2">
              <AlertCircle className={`w-4 h-4 shrink-0 mt-0.5 ${isDndError ? 'text-amber-600' : 'text-rose-600'}`} />
              <div className="flex-1">
                <p className="font-bold">{isDndError ? 'Telecom DND Restriction' : 'Authentication Error'}</p>
                <p className="mt-0.5 leading-relaxed">{error}</p>
              </div>
            </div>

            {isDndError ? (
              <div className="pt-1 border-t border-amber-200/80 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] text-amber-800 font-medium">
                  Use <strong>WhatsApp Verification</strong> or Test Code <strong>123456</strong>.
                </span>
                <button
                  type="button"
                  onClick={handleProceedWithDndBypass}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1 rounded-lg text-xs transition-colors cursor-pointer inline-flex items-center gap-1 shadow-2xs"
                >
                  <span>Proceed with Test OTP</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ) : error.includes('FAST2SMS_API_KEY') ? (
              <p className="text-[11px] text-rose-600 bg-rose-100/70 p-2 rounded-lg mt-1">
                Tip: Configure your <code className="font-mono font-bold">FAST2SMS_API_KEY</code> in project settings or use WhatsApp / Demo mode.
              </p>
            ) : null}
          </div>
        )}

        {/* Primary Action 1: Smart WhatsApp Verification */}
        <button
          type="button"
          onClick={handleWhatsAppVerification}
          disabled={loadingMode !== null || phoneNumber.length < 10}
          className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-sm py-3.5 px-6 rounded-xl transition-all shadow-md active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
        >
          {loadingMode === 'whatsapp' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Opening WhatsApp Verification...</span>
            </>
          ) : (
            <>
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Verify with WhatsApp (Direct & Fast)</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        {/* Secondary Action 2: Fast2SMS Quick SMS */}
        <div className="pt-2 border-t border-neutral-100">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1">
              <Radio className="w-3 h-3 text-emerald-600" />
              <span>Secondary Live SMS Gateway</span>
            </span>
            <span className="text-[10px] text-neutral-400">route: 'q'</span>
          </div>

          <button
            type="submit"
            disabled={loadingMode !== null || phoneNumber.length < 10}
            className="w-full bg-neutral-900 hover:bg-black text-white font-bold text-xs py-3 px-4 rounded-xl transition-all active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
          >
            {loadingMode === 'sms' ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-yellow-400" />
                <span>Dispatching Fast2SMS Quick SMS...</span>
              </>
            ) : (
              <>
                <Phone className="w-3.5 h-3.5 text-yellow-400" />
                <span>Send SMS via Fast2SMS</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
export default PhoneLogin;
