// Framework-neutral Tooltip contract
// Small text-only hover/focus label

import type { OverlaySide } from '../types/variant';

export interface TooltipContract {
  content: string;
  side?: OverlaySide;
  delay?: number;
  trigger: unknown;
}
