// Framework-neutral Input contract
// Both @brkta/ui-react and @brkta/ui-angular implement this contract

import type { InputVariant, InputSize } from '../types/variant';

export const inputVariants: InputVariant[] = ['default', 'filled', 'ghost'];
export const inputSizes: InputSize[] = ['sm', 'md', 'lg'];

export interface InputContract {
  variant: InputVariant;
  size: InputSize;
  placeholder?: string;
  disabled?: boolean;
  /** Marks the input as invalid — aria-invalid="true" */
  invalid?: boolean;
  /** Whether the input is readonly */
  readonly?: boolean;
  /** Whether the input is required */
  required?: boolean;
  /** input type (text, email, password, etc.) */
  type?: string;
  /** Whether a file input may select more than one file */
  multiple?: boolean;
  /** value */
  value?: string;
  /** id attribute for label association */
  id?: string;
  /** name attribute */
  name?: string;
  /** Autocomplete attribute */
  autocomplete?: string;
  /** aria-describedby for connecting help/error text */
  ariaDescribedBy?: string;
  /** Optional content rendered at the logical end of the field */
  suffix?: unknown;
}
