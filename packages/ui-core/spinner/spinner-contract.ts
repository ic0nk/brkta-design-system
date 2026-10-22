// Framework-neutral Spinner contract

import type { SpinnerSize } from '../types/variant';

export const spinnerSizes: SpinnerSize[] = ['sm', 'md', 'lg'];

export interface SpinnerContract {
  size: SpinnerSize;
  /** Accessible label for the spinner */
  ariaLabel?: string;
}
