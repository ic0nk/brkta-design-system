// Framework-neutral Field Error Text contract
// Validation error text displayed below a form field

export interface FieldErrorContract {
  /** Unique ID for aria-describedby connection */
  id?: string;
  children?: unknown;
}
