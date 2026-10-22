'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import type { DatePickerContract } from '@brkta/ui-core/date-picker/date-picker-contract';
import { Calendar } from '../calendar/calendar';

export interface DatePickerProps extends DatePickerContract {}

export function DatePicker({
  value: controlledValue,
  defaultValue,
  onValueChange,
  placeholder = 'Select date...',
  disabled = false,
  invalid = false,
  minDate,
  maxDate,
}: DatePickerProps) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? null as Date | null);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentValue = isControlled ? (controlledValue ?? null) : internalValue;

  const setValue = useCallback((d: Date | undefined) => {
    const v = d ?? null;
    if (!isControlled) setInternalValue(v);
    onValueChange?.(d!);
    setOpen(false);
  }, [isControlled, onValueChange]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const formatted = currentValue ? currentValue.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';

  return (
    <div ref={containerRef} data-brkta-date-picker="" data-disabled={disabled ? '' : undefined}>
      <button
        data-brkta-date-picker-trigger=""
        data-open={open ? '' : undefined}
        data-invalid={invalid ? '' : undefined}
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen(!open)}
        onKeyDown={(e) => { if (e.key === 'Escape' && open) setOpen(false); }}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span
          data-brkta-date-picker-trigger-value=""
          data-placeholder={!currentValue ? '' : undefined}
        >
          {currentValue ? formatted : placeholder}
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>
        </svg>
      </button>
      {open && (
        <div data-brkta-date-picker-popover="">
          <Calendar
            selected={currentValue ?? undefined}
            onSelect={(d) => setValue(d)}
            minDate={minDate}
            maxDate={maxDate}
          />
        </div>
      )}
    </div>
  );
}
