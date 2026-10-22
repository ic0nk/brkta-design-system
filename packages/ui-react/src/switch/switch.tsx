'use client';

import { type InputHTMLAttributes } from 'react';

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  /** Whether the switch is on */
  checked?: boolean;
  /** aria-label for the switch when no visible label is present */
  ariaLabel?: string;
  /** Change handler receiving the native change event */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /** Convenience callback fired when checked state changes */
  onCheckedChange?: (checked: boolean) => void;
}

/**
 * BRKTA Switch — renders a styled toggle switch using a native
 * `<input type="checkbox" role="switch">` for accessibility,
 * with framework-neutral data attributes (`data-brkta-switch`,
 * `data-disabled`) that are targeted by the CSS
 * in `@brkta/ui-core/switch/switch.css`.
 */
export function Switch({
  checked = false,
  disabled = false,
  required = false,
  value,
  name,
  ariaLabel,
  onChange,
  onCheckedChange,
  className = '',
  ...props
}: SwitchProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    onCheckedChange?.(e.target.checked);
  };

  return (
    <label
      data-brkta-switch=""
      data-disabled={disabled || undefined}
      className={className}
    >
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={disabled}
        required={required}
        value={value}
        name={name}
        aria-label={ariaLabel}
        onChange={handleChange}
        {...props}
      />
      <span className="brkta-switch-track" aria-hidden="true">
        <span className="brkta-switch-thumb" />
      </span>
    </label>
  );
}
