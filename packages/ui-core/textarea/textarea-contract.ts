// Framework-neutral Textarea contract
// Both @brkta/ui-react and @brkta/ui-angular implement this contract

import type { TextareaVariant, TextareaSize } from '../types/variant';

export const textareaVariants: TextareaVariant[] = ['default', 'filled', 'ghost'];
export const textareaSizes: TextareaSize[] = ['sm', 'md', 'lg'];

export interface TextareaContract {
  variant: TextareaVariant;
  size: TextareaSize;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  readonly?: boolean;
  required?: boolean;
  value?: string;
  name?: string;
  rows?: number;
  ariaDescribedBy?: string;
}
