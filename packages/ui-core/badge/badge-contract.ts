// Framework-neutral Badge contract
// Both @brkta/ui-react and @brkta/ui-angular implement this contract

import type { BadgeVariant, BadgeSize } from '../types/variant';

export const badgeVariants: BadgeVariant[] = ['default', 'secondary', 'destructive', 'outline'];
export const badgeSizes: BadgeSize[] = ['sm', 'md', 'lg'];

export interface BadgeContract {
  variant: BadgeVariant;
  size: BadgeSize;
  /** Accessible label if the badge content is not descriptive enough */
  ariaLabel?: string;
}
