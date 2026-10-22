// Framework-neutral Field Help Text contract
// Helper text displayed below a form field

export interface FieldHelpContract {
  /** Unique ID for aria-describedby connection */
  id?: string;
  children?: unknown;
}
