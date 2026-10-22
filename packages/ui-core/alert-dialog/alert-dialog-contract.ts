// Framework-neutral Alert Dialog contract
export interface AlertDialogContract {
  open?: boolean;
  defaultOpen?: boolean;
  title: string;
  description: string;
  cancelLabel?: string;
  confirmLabel?: string;
  destructive?: boolean;
  loading?: boolean;
  loadingLabel?: string;
  disabled?: boolean;
  /** Keep a controlled dialog open until the async action reports success. */
  closeOnConfirm?: boolean;
  trigger: unknown;
  onConfirm?: () => void;
  onCancel?: () => void;
}
