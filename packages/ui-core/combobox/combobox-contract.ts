export interface ComboboxOption {
  /** Unique value */
  value: string;
  /** Display label */
  label: string;
  /** Whether the option is disabled */
  disabled?: boolean;
}

export interface ComboboxContract {
  /** HTML id for the searchable input. Use this with a visible label's htmlFor. */
  inputId?: string;
  /** Accessible name when a visible label is not available. */
  ariaLabel?: string;
  /** Available options */
  options: ComboboxOption[];
  /** Controlled value */
  value?: string;
  /** Uncontrolled default value */
  defaultValue?: string;
  /** Callback when value changes */
  onValueChange?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Whether the combobox is disabled */
  disabled?: boolean;
  /** Whether the combobox is invalid */
  invalid?: boolean;
  /** Whether the list is open (controlled) */
  open?: boolean;
  /** Uncontrolled default open state */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Text to show when no results match */
  emptyText?: string;
}
