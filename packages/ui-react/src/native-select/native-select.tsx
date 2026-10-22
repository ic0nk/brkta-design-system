import { type SelectHTMLAttributes } from 'react';
import type { NativeSelectVariant, NativeSelectSize } from '@brkta/ui-core/types/variant';

export interface NativeSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Visual variant of the native select */
  variant?: NativeSelectVariant;
  /** Size preset */
  size?: NativeSelectSize;
  /** Marks the select as invalid — sets data-invalid and aria-invalid */
  invalid?: boolean;
}

/**
 * BRKTA NativeSelect — renders a `<select>` element with framework-neutral
 * data attributes (`data-brkta-native-select`, `data-variant`, `data-size`,
 * `data-invalid`, `data-disabled`) that are targeted by the CSS
 * in `@brkta/ui-core/native-select/native-select.css`.
 */
export function NativeSelect({
  variant = 'default',
  size = 'md',
  invalid = false,
  disabled = false,
  className = '',
  children,
  ...props
}: NativeSelectProps) {
  return (
    <select
      data-brkta-native-select=""
      data-variant={variant}
      data-size={size}
      data-invalid={invalid || undefined}
      data-disabled={disabled || undefined}
      aria-invalid={invalid || undefined}
      disabled={disabled}
      className={className}
      {...props}
    >
      {children}
    </select>
  );
}
