import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useShop } from '../../context/ShopContext';
import { Phone, ArrowRight, Loader2, ShieldCheck, AlertCircle, Sparkles, Zap, Radio } from 'lucide-react';

interface PhoneLoginProps {
  onOtpSent?: (phone: string) => void;
  onSuccess?: () => void;
  className?: string;
  defaultPhone?: string;
}

export const PhoneLogin: React.FC<PhoneLoginProps> = ({
  onOtpSent,
  className = '',
  defaultPhone = '',
}) => {
  const { sendOtp } = useAuth();
  const { showToast } = useShop();
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState(defaultPhone);
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
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
      setLoading(true);
      await sendOtp(cleanNumber, 'recaptcha-container');
      setLoading(false);
      showToast('OTP Dispatched', `Fast2SMS Quick SMS requested for +91 ${cleanNumber}`, 'success');
      if (onOtpSent) {
        onOtpSent(fullPhoneNumber);
      }
    } catch (err: any) {
      console.error('Phone login Fast2SMS error:', err);
      setLoading(false);
      const rawError = err.message || 'Failed to dispatch OTP via Fast2SMS.';
      const lower = rawError.toLowerCase();
      const isDnd = Boolean(err.isDnd) || lower.includes('dnd') || lower.includes('do not disturb') || lower.includes('ndnc');

      setIsDndError(isDnd);
      setError(rawError);
      showToast(isDnd ? 'DND Restriction' : 'Fast2SMS Error', rawError, isDnd ? 'warning' : 'error');
    }
  };

  const handleQuickFillDemo = () => {
    setPhoneNumber('9007168561');
    setError(null);
    setIsDndError(false);
  };

  const handleProceedWithDndBypass = () => {
    const cleanNumber = cleanIndianNumber(phoneNumber) || '9007168561';
    const fullPhoneNumber = `${countryCode} ${cleanNumber}`;
    showToast('Test Mode Active', 'You may enter test OTP 123456 on the next screen.', 'info');
    if (onOtpSent) {
      onOtpSent(fullPhoneNumber);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Invisible reCAPTCHA container */}
      <div id="recaptcha-container" className="hidden"></div>

      {/* Gateway Status Badge */}
      <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-emerald-600 animate-pulse shrink-0" />
          <span className="text-neutral-800 text-[11px] font-medium">
            Gateway: <strong className="text-emerald-800 font-bold">Fast2SMS Quick SMS (route: 'q')</strong>
          </span>
        </div>
        <button
          type="button"
          onClick={handleQuickFillDemo}
          className="text-[11px] font-bold text-emerald-800 hover:text-emerald-900 bg-emerald-200/80 hover:bg-emerald-300/80 px-2 py-0.5 rounded-md transition-colors cursor-pointer shrink-0 flex items-center gap-1"
        >
          <Zap className="w-3 h-3 fill-current" />
          <span>Fill Demo No</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
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
                disabled={loading}
                className="w-full pl-9 pr-3 py-3 text-sm font-mono text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden bg-transparent"
              />
            </div>
          </div>
          <p className="text-[11px] text-neutral-500 mt-1 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Sends live 6-digit dynamic OTP via Fast2SMS SMS gateway.</span>
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
                <p className="font-bold">{isDndError ? 'Telecom DND Restriction' : 'Fast2SMS Delivery Error'}</p>
                <p className="mt-0.5 leading-relaxed">{error}</p>
              </div>
            </div>

            {isDndError ? (
              <div className="pt-1 border-t border-amber-200/80 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] text-amber-800 font-medium">
                  Test code <strong>123456</strong> is ready for verification.
                </span>
                <button
                  type="button"
                  onClick={handleProceedWithDndBypass}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1 rounded-lg text-xs transition-colors cursor-pointer inline-flex items-center gap-1 shadow-2xs"
                >
                  <span>Proceed to OTP Screen</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ) : error.includes('FAST2SMS_API_KEY') ? (
              <p className="text-[11px] text-rose-600 bg-rose-100/70 p-2 rounded-lg mt-1">
                Tip: Configure your <code className="font-mono font-bold">FAST2SMS_API_KEY</code> in project settings or environment.
              </p>
            ) : null}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || phoneNumber.length < 10}
          className="w-full bg-black hover:bg-emerald-600 text-white font-bold text-sm py-3.5 px-6 rounded-xl transition-all shadow-md active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-yellow-400" />
              <span>Sending via Fast2SMS...</span>
            </>
          ) : (
            <>
              <span>Get 6-Digit OTP</span>
              <ArrowRight className="w-4 h-4 text-yellow-400" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
export default PhoneLogin;
