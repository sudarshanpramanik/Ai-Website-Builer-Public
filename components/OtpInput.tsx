import React, { useRef, useEffect } from 'react';

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (otp: string) => void;
  disabled?: boolean;
}

const OtpInput: React.FC<OtpInputProps> = ({ length = 6, value, onChange, disabled }) => {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputs.current[0]) {
      inputs.current[0].focus();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const val = e.target.value;
    if (isNaN(Number(val))) return;

    const newOtp = value.split('');
    // Allow only last entered character if length > 1 (overwrite)
    newOtp[idx] = val.substring(val.length - 1);
    const combined = newOtp.join('');
    onChange(combined);

    // Move to next input if value exists
    if (val && idx < length - 1 && inputs.current[idx + 1]) {
      inputs.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Backspace' && !value[idx] && idx > 0 && inputs.current[idx - 1]) {
      // Move back if current is empty and backspace pressed
      inputs.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, length);
    if (!/^\d+$/.test(pastedData)) return;

    onChange(pastedData);
    // Focus last filled index
    const focusIdx = Math.min(pastedData.length - 1, length - 1);
    inputs.current[focusIdx]?.focus();
  };

  return (
    <div className="flex gap-2 sm:gap-3 justify-center">
      {Array.from({ length }).map((_, idx) => (
        <input
          key={idx}
          ref={(el) => { inputs.current[idx] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[idx] || ''}
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          onPaste={handlePaste}
          disabled={disabled}
          className="w-10 h-12 sm:w-12 sm:h-14 bg-black border border-gray-700 rounded-md text-center text-xl font-bold text-white focus:border-royal-gold focus:ring-1 focus:ring-royal-gold outline-none transition-all shadow-inner disabled:opacity-50"
        />
      ))}
    </div>
  );
};

export default OtpInput;