export interface PasswordStrengthContract {
  score: number;
  max?: number;
  label: string;
  description: string;
  ariaLabel?: string;
}
