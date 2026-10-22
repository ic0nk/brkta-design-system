// Framework-neutral Custom Select contract
// Replaces the unstyled browser-native <select> dropdown with a designed menu.

import type { SelectVariant, SelectSize } from '../types/variant';

export const selectVariants: SelectVariant[] = ['default', 'filled', 'ghost'];
export const selectSizes: SelectSize[] = ['sm', 'md', 'lg'];

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectContract {
  options: SelectOption[];
  variant: SelectVariant;
  size: SelectSize;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  name?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
}
