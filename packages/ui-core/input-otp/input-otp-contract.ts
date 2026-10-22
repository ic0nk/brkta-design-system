export interface InputOTPContract {
  /** Number of OTP input slots */
  length?: number;
  /** Controlled value */
  value?: string;
  /** Uncontrolled default value */
  defaultValue?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input is invalid */
  invalid?: boolean;
  /** Callback when value changes */
  onValueChange?: (value: string) => void;
  /** Callback when all slots are filled */
  onComplete?: (value: string) => void;
}
