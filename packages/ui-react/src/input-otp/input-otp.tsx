'use client';

import { useState, useRef, useCallback } from 'react';
import type { InputOTPContract } from '@brkta/ui-core/input-otp/input-otp-contract';

export interface InputOTPProps extends InputOTPContract {}

export function InputOTP({
  length = 6,
  value: controlledValue,
  defaultValue = '',
  disabled = false,
  invalid = false,
  onValueChange,
  onComplete,
}: InputOTPProps) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = isControlled ? controlledValue : internalValue;
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const chars = Array.from({ length }, (_, i) => currentValue[i] ?? '');

  // Find the first empty slot index
  const firstEmpty = chars.findIndex(c => c === '');
  const focusIndex = firstEmpty === -1 ? length - 1 : firstEmpty;

  const setValue = useCallback((v: string) => {
    if (!isControlled) setInternalValue(v);
    onValueChange?.(v);
    if (v.length === length) onComplete?.(v);
  }, [length, isControlled, onValueChange, onComplete]);

  const handleChange = useCallback((_index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    if (!raw) return;
    // Fill at the first empty slot, then advance
    const digit = raw.slice(-1);
    const targetIdx = firstEmpty >= 0 ? firstEmpty : 0;
    const next = currentValue.slice(0, targetIdx) + digit + currentValue.slice(targetIdx + 1);
    setValue(next);
    // Focus next slot after the one we just filled
    if (targetIdx < length - 1) {
      const nextIdx = targetIdx + 1;
      const ref = inputRefs.current[nextIdx];
      if (ref) {
        ref.focus();
        // Auto-select so next digit replaces it
        ref.select();
      }
    }
  }, [currentValue, firstEmpty, length, setValue]);

  const handleKeyDown = useCallback((idx: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (chars[idx]) {
        // Clear current slot
        const next = currentValue.slice(0, idx) + currentValue.slice(idx + 1);
        setValue(next);
      } else if (idx > 0) {
        // Move back and clear previous
        const prevIdx = idx - 1;
        const next = currentValue.slice(0, prevIdx) + currentValue.slice(prevIdx + 1);
        setValue(next);
        const ref = inputRefs.current[prevIdx];
        if (ref) { ref.focus(); ref.select(); }
      }
    } else if (e.key === 'ArrowLeft' && idx > 0) {
      e.preventDefault();
      inputRefs.current[idx - 1]?.focus();
    } else if (e.key === 'ArrowRight' && idx < length - 1) {
      e.preventDefault();
      inputRefs.current[idx + 1]?.focus();
    }
  }, [chars, currentValue, length, setValue]);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const raw = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (raw) {
      setValue(raw);
      // Focus next empty slot after paste
      const nextIdx = raw.length < length ? raw.length : length - 1;
      inputRefs.current[nextIdx]?.focus();
    }
  }, [length, setValue]);

  return (
    <div data-brkta-input-otp="" data-disabled={disabled ? '' : undefined}>
      {Array.from({ length }, (_, i) => (
        <input
          key={i}
          ref={(el) => { inputRefs.current[i] = el; }}
          data-brkta-input-otp-slot=""
          data-invalid={invalid ? '' : undefined}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          value={chars[i]}
          disabled={disabled}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          onFocus={(e) => { e.target.select(); }}
          aria-label={`Digit ${i + 1}`}
        />
      ))}
    </div>
  );
}
