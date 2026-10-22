import { type HTMLAttributes, type ReactNode } from 'react';
import type { CardVariant } from '@brkta/ui-core/types/variant';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

export function Card({ variant = 'default', className = '', children, ...props }: CardProps) {
  return (
    <div data-brkta-card="" data-variant={variant} className={className} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div data-brkta-card-header="" className={className} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className = '', children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 data-brkta-card-title="" className={className} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ className = '', children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p data-brkta-card-description="" className={className} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div data-brkta-card-content="" className={className} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div data-brkta-card-footer="" className={className} {...props}>
      {children}
    </div>
  );
}
