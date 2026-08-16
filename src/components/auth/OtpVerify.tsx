import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Lock, CheckCircle2, ArrowLeft, Loader2, AlertCircle, RefreshCw } from 'lucide-react';

interface OtpVerifyProps {
  phoneNumber: string;
  onSuccess?: () => void;
  onChangeNumber?: () => void;
  className?: string;
}

export const OtpVerify: React.FC<OtpVerifyProps> = ({
  phoneNumber,
  onSuccess,
  onChangeNumber,
  className = '',
}) => {
  const { verifyOtp, sendOtp } = useAuth();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState(45);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only keep numeric character
    const val = value.replace(/\D/g, '').slice(-1);
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
    if (error) setError(null);

    // If entered, jump to next input
    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto submit if all 6 digits entered
    if (val && index === 5 && newOtp.every((digit) => digit !== '')) {
      handleVerify(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      const splitOtp = pasted.split('');
      setOtp(splitOtp);
      handleVerify(pasted);
    }
  };

  const handleVerify = async (otpCode: string) => {
    if (otpCode.length !== 6) {
      setError('Please enter the full 6-digit OTP.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await verifyOtp(otpCode);
      setLoading(false);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      console.error('OTP verification error:', err);
      setLoading(false);
      if (err.code === 'auth/invalid-verification-code') {
        setError('Invalid OTP code. Please re-check the 6 digits sent to your phone.');
      } else if (err.code === 'auth/code-expired') {
        setError('The OTP code has expired. Please tap Resend OTP below.');
      } else {
        setError(err.message || 'Verification failed. Please try again.');
      }
    }
  };

  const handleResendOtp = async () => {
    if (timer > 0 || resending) return;
    try {
      setResending(true);
      setError(null);
      await sendOtp(phoneNumber, 'recaptcha-container');
      setResending(false);
      setTimer(45);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } catch (err: any) {
      setResending(false);
      setError('Failed to resend OTP. Please wait before retrying.');
    }
  };

  return (
    <div className={`space-y-5 ${className}`}>
      <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
        <div>
          <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>Enter 6-Digit OTP</span>
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Code sent to <span className="font-mono font-bold text-neutral-900">{phoneNumber}</span>
          </p>
        </div>

        {onChangeNumber && (
          <button
            type="button"
            onClick={onChangeNumber}
            className="text-xs text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Change</span>
          </button>
        )}
      </div>

      {/* 6 OTP Input Boxes */}
      <div>
        <div className="flex justify-between gap-2 sm:gap-3">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputRefs.current[idx] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              onPaste={handlePaste}
              disabled={loading}
              className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl font-mono font-black border-2 border-neutral-300 rounded-xl focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500 bg-white text-neutral-900 transition-all shadow-xs"
            />
          ))}
        </div>

        <div className="flex items-center justify-between mt-3 text-xs">
          <span className="text-neutral-500">
            {timer > 0 ? (
              <span>Resend OTP in <strong className="text-neutral-900 font-mono">{timer}s</strong></span>
            ) : (
              <span className="text-emerald-700 font-medium">Ready to resend</span>
            )}
          </span>

          <button
            type="button"
            onClick={handleResendOtp}
            disabled={timer > 0 || resending}
            className="text-emerald-700 hover:text-emerald-900 font-bold disabled:text-neutral-400 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className={`w-3 h-3 ${resending ? 'animate-spin' : ''}`} />
            <span>Resend OTP</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start gap-2 animate-fadeIn">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <button
        type="button"
        onClick={() => handleVerify(otp.join(''))}
        disabled={loading || otp.some((d) => d === '')}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3.5 px-6 rounded-xl transition-all shadow-md active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-yellow-300" />
            <span>Verifying OTP...</span>
          </>
        ) : (
          <>
            <CheckCircle2 className="w-4 h-4 text-yellow-300" />
            <span>Verify & Access Account</span>
          </>
        )}
      </button>
    </div>
  );
};
export default OtpVerify;
