import { type LabelHTMLAttributes } from 'react';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /** Whether the associated field is required (shows asterisk) */
  required?: boolean;
  /** Whether the associated field is disabled */
  disabled?: boolean;
}

/**
 * BRKTA Label — renders a `<label>` element with framework-neutral
 * data attributes (`data-brkta-label`, `data-required`, `data-disabled`)
 * that are targeted by the CSS in `@brkta/ui-core/label/label.css`.
 */
export function Label({
  required,
  disabled,
  className = '',
  children,
  ...props
}: LabelProps) {
  return (
    <label
      data-brkta-label=""
      data-required={required || undefined}
      data-disabled={disabled || undefined}
      className={className}
      {...props}
    >
      {children}
    </label>
  );
}
