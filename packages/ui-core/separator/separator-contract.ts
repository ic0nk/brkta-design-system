// Framework-neutral Separator contract

import type { SeparatorOrientation } from '../types/variant';

export const separatorOrientations: SeparatorOrientation[] = ['horizontal', 'vertical'];

export interface SeparatorContract {
  orientation: SeparatorOrientation;
  /** Accessible label for the separator (e.g., "Section divider") */
  ariaLabel?: string;
}
