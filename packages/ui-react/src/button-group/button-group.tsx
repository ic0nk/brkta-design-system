'use client';

import type { ReactNode } from 'react';
import type { ButtonGroupContract } from '@brkta/ui-core/button-group/button-group-contract';

export interface ButtonGroupProps extends ButtonGroupContract {
  children: ReactNode;
}

export function ButtonGroup({
  children,
  orientation = 'horizontal',
  disabled = false,
}: ButtonGroupProps) {
  return (
    <div
      data-brkta-button-group=""
      data-orientation={orientation}
      data-disabled={disabled ? '' : undefined}
      aria-disabled={disabled || undefined}
      role="group"
    >
      {children}
    </div>
  );
}
