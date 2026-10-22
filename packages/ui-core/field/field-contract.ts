// Framework-neutral Field contract
// Layout wrapper for label + control + help/error/description text

export interface FieldContract {
  /** Whether the field is in an invalid state */
  invalid?: boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Whether the field is required */
  required?: boolean;
  /** Unique ID for connecting label/description/error */
  id?: string;
  children?: unknown;
}
