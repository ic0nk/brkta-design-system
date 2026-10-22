import { type HTMLAttributes } from 'react';

export interface FieldErrorTextProps extends HTMLAttributes<HTMLParagraphElement> {
  /** Unique ID for aria-describedby connection */
  id?: string;
}

/**
 * BRKTA FieldErrorText — renders a `<p>` element with framework-neutral
 * data attributes (`data-brkta-field-error`) and `role="alert"`,
 * targeted by the CSS in `@brkta/ui-core/field-error/field-error.css`.
 *
 * This component is used to display validation error text below a form field.
 */
export function FieldErrorText({
  id,
  className = '',
  children,
  ...props
}: FieldErrorTextProps) {
  return (
    <p
      data-brkta-field-error=""
      id={id}
      role="alert"
      className={className}
      {...props}
    >
      {children}
    </p>
  );
}
