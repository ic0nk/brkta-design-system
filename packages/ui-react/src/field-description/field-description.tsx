import { type HTMLAttributes } from 'react';

export interface FieldDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  /** Unique ID for aria-describedby connection */
  id?: string;
}

/**
 * BRKTA FieldDescription — renders a `<p>` element with framework-neutral
 * data attributes (`data-brkta-field-description`) that are targeted
 * by the CSS in `@brkta/ui-core/field-description/field-description.css`.
 *
 * This component is used to display longer description text
 * above or below a form field.
 */
export function FieldDescription({
  id,
  className = '',
  children,
  ...props
}: FieldDescriptionProps) {
  return (
    <p
      data-brkta-field-description=""
      id={id}
      className={className}
      {...props}
    >
      {children}
    </p>
  );
}
