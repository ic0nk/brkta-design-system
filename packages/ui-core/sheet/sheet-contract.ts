// Framework-neutral Sheet (Drawer) contract
import type { SheetSide, SheetSize } from '../types/variant';

export interface SheetContract {
  open?: boolean;
  defaultOpen?: boolean;
  side?: SheetSide;
  size?: SheetSize;
  title?: string;
  description?: string;
  trigger: unknown;
  content: unknown;
  footer?: unknown;
}
