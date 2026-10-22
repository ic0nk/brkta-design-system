import { type HTMLAttributes } from 'react';
import type { SeparatorOrientation } from '@brkta/ui-core/types/variant';

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: SeparatorOrientation;
}

export function Separator({
  orientation = 'horizontal',
  className = '',
  ...props
}: SeparatorProps) {
  return (
    <div
      data-brkta-separator=""
      data-orientation={orientation}
      role="separator"
      aria-orientation={orientation}
      className={className}
      {...props}
    />
  );
}
