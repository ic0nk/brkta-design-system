// Framework-neutral Table contract
import type { TableVariant } from '../types/variant';

export interface TableColumnContract {
  key: string;
  label: string;
}

export interface TableContract {
  columns: TableColumnContract[];
  rows: Record<string, unknown>[];
  variant?: TableVariant;
}
