import { type HTMLAttributes } from 'react';

export interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether the field is in an invalid state */
  invalid?: boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Whether the field is required */
  required?: boolean;
  /** Unique ID for connecting label/description/error */
  id?: string;
}

/**
 * BRKTA Field — renders a `<div>` wrapper with framework-neutral
 * data attributes (`data-brkta-field`, `data-invalid`, `data-disabled`,
 * `data-required`) that are targeted by the CSS
 * in `@brkta/ui-core/field/field.css`.
 */
export function Field({
  invalid,
  disabled,
  required,
  id,
  className = '',
  children,
  ...props
}: FieldProps) {
  return (
    <div
      data-brkta-field=""
      data-invalid={invalid || undefined}
      data-disabled={disabled || undefined}
      data-required={required || undefined}
      id={id}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
}
