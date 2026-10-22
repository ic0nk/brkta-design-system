import { type HTMLAttributes, type ReactNode } from 'react';
import type { AlertVariant } from '@brkta/ui-core/types/variant';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
}

export function Alert({
  variant = 'information',
  className = '',
  children,
  ...props
}: AlertProps) {
  return (
    <div data-brkta-alert="" data-variant={variant} role="alert" className={className} {...props}>
      {children}
    </div>
  );
}

export function AlertTitle({ className = '', children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5 data-brkta-alert-title="" className={className} {...props}>
      {children}
    </h5>
  );
}

export function AlertDescription({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div data-brkta-alert-description="" className={className} {...props}>
      {children}
    </div>
  );
}
