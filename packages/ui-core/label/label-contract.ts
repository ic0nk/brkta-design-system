// Framework-neutral Label contract
// Both @brkta/ui-react and @brkta/ui-angular implement this contract

export interface LabelContract {
  /** Associates the label with a form control by id */
  htmlFor?: string;
  /** Whether the associated field is required (shows asterisk) */
  required?: boolean;
  /** Whether the associated field is disabled */
  disabled?: boolean;
  /** Children (text or inline elements) */
  children?: unknown;
}
