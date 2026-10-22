// Framework-neutral Dialog contract
export interface DialogContract {
  open?: boolean;
  defaultOpen?: boolean;
  /** Localized accessible label for the dialog close control. */
  closeLabel?: string;
  title?: string;
  description?: string;
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
  trigger: unknown;
  content: unknown;
  footer?: unknown;
}
