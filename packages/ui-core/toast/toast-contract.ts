// Framework-neutral Toast contract
import type { ToastVariant } from '../types/variant';

/** Default visible time for transient notifications, in milliseconds. */
export const DEFAULT_TOAST_DURATION = 4000;

export interface ToastContract {
  open?: boolean;
  /** Localized accessible label for the toast close control. */
  dismissLabel?: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  dismissible?: boolean;
  onDismiss?: () => void;
}
