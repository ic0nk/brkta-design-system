// Framework-neutral Radio Group contract
// Group of styled radio buttons with native <input type="radio">

export interface RadioGroupContract {
  /** Currently selected value */
  value?: string;
  name?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  /** Orientation of the radio group */
  orientation?: 'horizontal' | 'vertical';
  children?: unknown;
}

export interface RadioContract {
  value: string;
  /** Label text displayed beside the radio */
  label?: string;
  disabled?: boolean;
  checked?: boolean;
}
