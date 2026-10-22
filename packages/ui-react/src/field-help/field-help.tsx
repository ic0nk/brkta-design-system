import { type HTMLAttributes } from 'react';

export interface FieldHelpTextProps extends HTMLAttributes<HTMLParagraphElement> {
  /** Unique ID for aria-describedby connection */
  id?: string;
}

/**
 * BRKTA FieldHelpText — renders a `<p>` element with framework-neutral
 * data attributes (`data-brkta-field-help`) that are targeted by the CSS
 * in `@brkta/ui-core/field-help/field-help.css`.
 *
 * This component is used to display helper text below a form field.
 */
export function FieldHelpText({
  id,
  className = '',
  children,
  ...props
}: FieldHelpTextProps) {
  return (
    <p
      data-brkta-field-help=""
      id={id}
      className={className}
      {...props}
    >
      {children}
    </p>
  );
}
