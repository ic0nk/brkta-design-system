// Framework-neutral Popover contract
// Small anchored content panel

import type { OverlaySide, OverlayAlign } from '../types/variant';

export interface PopoverContract {
  open?: boolean;
  defaultOpen?: boolean;
  side?: OverlaySide;
  align?: OverlayAlign;
  trigger: unknown;
  content: unknown;
}
