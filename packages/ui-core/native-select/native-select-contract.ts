// Framework-neutral Native Select contract
// Styled native <select> element wrapper

import type { NativeSelectVariant, NativeSelectSize } from '../types/variant';

export const nativeSelectVariants: NativeSelectVariant[] = ['default', 'filled'];
export const nativeSelectSizes: NativeSelectSize[] = ['sm', 'md', 'lg'];

export interface NativeSelectContract {
  variant: NativeSelectVariant;
  size: NativeSelectSize;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  value?: string;
  name?: string;
  placeholder?: string;
  ariaDescribedBy?: string;
  children?: unknown;
}

export interface NativeSelectOptionContract {
  value: string;
  label: string;
  disabled?: boolean;
}
