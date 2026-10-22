import { type HTMLAttributes } from 'react';
import type { SpinnerSize } from '@brkta/ui-core/types/variant';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize;
}

export function Spinner({
  size = 'md',
  className = '',
  ...props
}: SpinnerProps) {
  return (
    <span
      data-brkta-spinner=""
      data-size={size}
      role="status"
      aria-label="Loading"
      className={className}
      {...props}
    >
      <span className="brkta-spinner-sr-label">Loading</span>
    </span>
  );
}
