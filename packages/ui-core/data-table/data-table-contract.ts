import type { ButtonVariant } from '../types/variant';

export interface DataTableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
}

export interface DataTableRowAction {
  /** Stable action identifier returned with the row event. */
  id: string;
  /** Localized visible action label. */
  label: string;
  /** Governed button visual variant. */
  variant?: ButtonVariant;
  /** Whether this action is rendered for the row. */
  visible?: (row: DataTableRow) => boolean;
  /** Whether this action is disabled for the row. */
  disabled?: (row: DataTableRow) => boolean;
  /** Whether this action is loading for the row. */
  loading?: (row: DataTableRow) => boolean;
}

export interface DataTableRowActionEvent {
  actionId: string;
  row: DataTableRow;
}
export interface DataTableRow {
  [key: string]: unknown;
  id?: string | number;
}
/** Framework adapters render this context inside the existing governed table cell. */
export interface DataTableCellContext {
  row: DataTableRow;
  column: DataTableColumn;
  value: unknown;
}
export interface DataTableContract<TCellTemplate = unknown> {
  /** Optional column-keyed templates; unspecified columns retain text rendering. */
  cellTemplates?: Record<string, TCellTemplate>;
  columns: DataTableColumn[];
  rows: DataTableRow[];
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  /** Whether rows are selectable */
  selectable?: boolean;
  /** Selected row ids */
  selectedIds?: (string | number)[];
  /** @deprecated Use rowActions with rowActionsLabel. */
  rowActionLabel?: string;
  /** Typed governed actions rendered in a trailing table column. */
  rowActions?: DataTableRowAction[];
  /** Localized heading for the trailing actions column. */
  rowActionsLabel?: string;
  /** Dense mode */
  dense?: boolean;
  /** Empty state message */
  emptyText?: string;
  /** Loading state */
  loading?: boolean;
  /** Callback when sort changes */
  onSortChange?: (column: string, direction: 'asc' | 'desc') => void;
  /** Callback when selection changes */
  onSelectionChange?: (ids: (string | number)[]) => void;
  /** Callback when row action clicked */
  /** @deprecated Use onRowActionEvent. */
  onRowAction?: (row: DataTableRow) => void;
  /** Callback containing the stable action ID and matching row. */
  onRowActionEvent?: (event: DataTableRowActionEvent) => void;
}
