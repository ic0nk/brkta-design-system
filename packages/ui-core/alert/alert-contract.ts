// Framework-neutral Alert contract

import type { AlertVariant } from '../types/variant';

export const alertVariants: AlertVariant[] = ['information', 'success', 'warning', 'destructive'];

export interface AlertContract {
  variant: AlertVariant;
  /** Optional title displayed above the content */
  title?: string;
  /** Whether the alert has a dismiss button (handled by the wrapper) */
  dismissible?: boolean;
}
