'use client';

import { useRef, useEffect, type InputHTMLAttributes } from 'react';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  /** Whether the checkbox is checked */
  checked?: boolean;
  /** Whether the checkbox is in indeterminate state */
  indeterminate?: boolean;
  /** Marks the checkbox as invalid */
  invalid?: boolean;
  /** Label text displayed beside the checkbox */
  label?: string;
  /** Change handler receiving the native change event */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /** Convenience callback fired when checked state changes */
  onCheckedChange?: (checked: boolean) => void;
}

/**
 * BRKTA Checkbox — renders a styled checkbox using a native
 * `<input type="checkbox">` for accessibility, with framework-neutral
 * data attributes (`data-brkta-checkbox`, `data-disabled`, `data-invalid`)
 * that are targeted by the CSS in `@brkta/ui-core/checkbox/checkbox.css`.
 */
export function Checkbox({
  checked = false,
  indeterminate = false,
  disabled = false,
  invalid = false,
  required = false,
  label,
  value,
  name,
  onChange,
  onCheckedChange,
  className = '',
  ...props
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    onCheckedChange?.(e.target.checked);
  };

  return (
    <label
      data-brkta-checkbox=""
      data-disabled={disabled || undefined}
      data-invalid={invalid || undefined}
      className={className}
    >
      <input
        ref={inputRef}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        required={required}
        value={value}
        name={name}
        aria-invalid={invalid || undefined}
        onChange={handleChange}
        {...props}
      />
      <span className="brkta-checkbox-indicator" aria-hidden="true" />
      {label && <span className="brkta-checkbox-label">{label}</span>}
    </label>
  );
}
