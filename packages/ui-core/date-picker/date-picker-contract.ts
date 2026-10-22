export interface DatePickerContract {
  /** Selected date */
  value?: Date;
  /** Default selected date (uncontrolled) */
  defaultValue?: Date;
  /** Callback when date changes */
  onValueChange?: (date: Date | undefined) => void;
  /** Placeholder text for the trigger input */
  placeholder?: string;
  /** Whether the date picker is disabled */
  disabled?: boolean;
  /** Whether the date picker is invalid */
  invalid?: boolean;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
}
