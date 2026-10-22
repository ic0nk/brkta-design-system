import type { ReactNode } from 'react';

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  variant?: 'default' | 'compact';
}

export function EmptyState({ title, description, icon, action, variant = 'default' }: EmptyStateProps) {
  return (
    <div data-brkta-empty="" data-variant={variant}>
      {icon && <div data-brkta-empty-icon="">{icon}</div>}
      <div data-brkta-empty-title="">{title}</div>
      {description && <div data-brkta-empty-description="">{description}</div>}
      {action && <div data-brkta-empty-action="">{action}</div>}
    </div>
  );
}
