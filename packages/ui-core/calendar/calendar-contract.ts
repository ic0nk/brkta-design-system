export interface CalendarContract {
  /** Currently displayed month */
  month?: Date;
  /** Currently displayed month default (uncontrolled) */
  defaultMonth?: Date;
  /** Selected date */
  selected?: Date;
  /** Default selected date (uncontrolled) */
  defaultSelected?: Date;
  /** Callback when a date is selected */
  onSelect?: (date: Date) => void;
  /** Callback when displayed month changes */
  onMonthChange?: (month: Date) => void;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Whether the calendar is disabled */
  disabled?: boolean;
}
