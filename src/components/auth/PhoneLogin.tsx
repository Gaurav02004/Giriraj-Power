import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Phone, ArrowRight, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';

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
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState(defaultPhone);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanNumber = phoneNumber.replace(/\D/g, '');
    if (cleanNumber.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    const fullPhoneNumber = `${countryCode}${cleanNumber}`;

    try {
      setLoading(true);
      await sendOtp(fullPhoneNumber, 'recaptcha-container');
      setLoading(false);
      if (onOtpSent) {
        onOtpSent(fullPhoneNumber);
      }
    } catch (err: any) {
      console.error('Phone login error:', err);
      setLoading(false);
      if (err.code === 'auth/invalid-phone-number') {
        setError('Invalid phone number format. Please enter a valid 10-digit Indian mobile number.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many attempts. Please wait a few minutes before trying again.');
      } else if (err.code === 'auth/quota-exceeded') {
        setError('SMS quota reached for today. Please sign in using Email / Password or Gmail.');
      } else if (err.code === 'auth/operation-not-allowed') {
        setError('SMS Region Policy Required: Phone auth region (+91 India) is not yet enabled in Firebase Console (Authentication > Sign-in method > Phone > SMS region policy) or use a testing phone number.');
      } else {
        setError(err.message || 'Failed to send OTP. Please check your connection.');
      }
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Invisible reCAPTCHA container */}
      <div id="recaptcha-container" className="hidden"></div>

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
            <span>We will send a 6-digit OTP via SMS for instant verification.</span>
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
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
              <span>Sending SMS OTP...</span>
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
