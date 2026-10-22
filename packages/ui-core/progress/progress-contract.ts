// Framework-neutral Progress contract

export interface ProgressContract {
  /** Current value (0–100) */
  value: number;
  /** Maximum value (default 100) */
  max?: number;
  /** Accessible label for the progress bar */
  ariaLabel?: string;
}
