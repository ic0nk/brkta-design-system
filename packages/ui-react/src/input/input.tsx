import { type InputHTMLAttributes, type ReactNode } from 'react';
import type { InputVariant, InputSize } from '@brkta/ui-core/types/variant';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Visual variant of the input */
  variant?: InputVariant;
  /** Size preset */
  size?: InputSize;
  /** Marks the input as invalid — sets data-invalid and aria-invalid */
  invalid?: boolean;
  /** Optional content rendered at the logical end of the field */
  suffix?: ReactNode;
}

/**
 * BRKTA Input — renders an `<input>` element with framework-neutral
 * data attributes (`data-brkta-input`, `data-variant`, `data-size`,
 * `data-invalid`, `data-disabled`) that are targeted by the CSS
 * in `@brkta/ui-core/input/input.css`.
 */
export function Input({
  variant = 'default',
  size = 'md',
  invalid = false,
  disabled = false,
  suffix,
  className = '',
  ...props
}: InputProps) {
  const input = (
    <input
      data-brkta-input=""
      data-variant={variant}
      data-size={size}
      data-invalid={invalid || undefined}
      data-disabled={disabled || undefined}
      aria-invalid={invalid || undefined}
      disabled={disabled}
      className={className}
      {...props}
    />
  );

  return suffix ? (
    <span
      data-brkta-input-container=""
      data-variant={variant}
      data-size={size}
      data-invalid={invalid || undefined}
      data-disabled={disabled || undefined}
    >
      {input}
      <span data-brkta-input-suffix="">{suffix}</span>
    </span>
  ) : input;
}
