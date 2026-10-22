// Framework-neutral Switch contract
// Toggle switch with native <input type="checkbox">

export interface SwitchContract {
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  value?: string;
  name?: string;
  /** aria-label for the switch when no visible label is present */
  ariaLabel?: string;
  ariaDescribedBy?: string;
}
