// Framework-neutral Card contract

import type { CardVariant } from '../types/variant';

export const cardVariants: CardVariant[] = ['default', 'outlined', 'ghost'];

export interface CardContract {
  variant: CardVariant;
}
