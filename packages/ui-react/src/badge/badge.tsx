import { type HTMLAttributes } from 'react';
import type { BadgeVariant, BadgeSize } from '@brkta/ui-core/types/variant';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

export function Badge({
  variant = 'default',
  size = 'md',
  className = '',
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      data-brkta-badge=""
      data-variant={variant}
      data-size={size}
      className={className}
      {...props}
    >
      {children}
    </span>
  );
}
