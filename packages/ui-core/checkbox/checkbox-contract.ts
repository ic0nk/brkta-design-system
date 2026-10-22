// Framework-neutral Checkbox contract
// Styled checkbox with native <input type="checkbox">

export interface CheckboxContract {
  checked?: boolean;
  /** Whether the checkbox is in indeterminate state */
  indeterminate?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  value?: string;
  name?: string;
  /** Label text displayed beside the checkbox */
  label?: string;
  /** aria-describedby for connecting help/error text */
  ariaDescribedBy?: string;
  children?: unknown;
}
