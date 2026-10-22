import { type TextareaHTMLAttributes } from 'react';
import type { TextareaVariant, TextareaSize } from '@brkta/ui-core/types/variant';

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  /** Visual variant of the textarea */
  variant?: TextareaVariant;
  /** Size preset */
  size?: TextareaSize;
  /** Marks the textarea as invalid — sets data-invalid and aria-invalid */
  invalid?: boolean;
}

/**
 * BRKTA Textarea — renders a `<textarea>` element with framework-neutral
 * data attributes (`data-brkta-textarea`, `data-variant`, `data-size`,
 * `data-invalid`, `data-disabled`) that are targeted by the CSS
 * in `@brkta/ui-core/textarea/textarea.css`.
 */
export function Textarea({
  variant = 'default',
  size = 'md',
  invalid = false,
  disabled = false,
  className = '',
  ...props
}: TextareaProps) {
  return (
    <textarea
      data-brkta-textarea=""
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
}
