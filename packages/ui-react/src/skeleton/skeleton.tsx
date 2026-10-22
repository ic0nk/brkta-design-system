import { type HTMLAttributes } from 'react';
import type { SkeletonVariant } from '@brkta/ui-core/types/variant';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  /** CSS width value (e.g. "75%", "200px"). Applied via inline style. */
  width?: string;
}

export function Skeleton({
  variant = 'text',
  width,
  className = '',
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      data-brkta-skeleton=""
      data-variant={variant}
      className={className}
      style={{ ...(width ? { width } : {}), ...style }}
      aria-hidden="true"
      {...props}
    />
  );
}
