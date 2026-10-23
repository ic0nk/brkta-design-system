# Data Table

## Cell templates

Optional column-keyed `cellTemplates` render inside the existing
governed `<td>`. Unspecified columns retain plain text. Angular takes `TemplateRef` values
with `$implicit`/`row`, `column` and `value`; React takes render functions receiving
`{ row, column, value }`. Compose existing Badge/icon components in these slots; never HTML
strings. Sorting continues to use the original row data, and selection/action behavior is unchanged.

A data-centric table with sortable columns, row selection, row actions, status cells, and empty/loading states.

The shared recipe applies `var(--muted)` to `thead` so the header remains visibly distinct from body rows in both themes. The `data-brkta-data-table-header` hook is present in both wrappers for structural tests and inventory tooling; applications must not override the header surface locally.

## Data Attributes
| Attribute | Element | Purpose |
|-----------|---------|---------|
| `data-brkta-data-table` | `<table>` | Table container |
| `data-sortable` | `<th>` | Sortable column header |
| `aria-sort` | `<th>` | Sort direction (`ascending`/`descending`) |
| `data-dense` | `<table>` | Dense mode |
| `data-selected` | `<tr>` | Selected row |
| `data-brkta-data-table-actions-heading` | trailing `<th>` | Governed localized actions heading |
| `data-brkta-data-table-actions` | trailing `<td>` | Governed row-action cell |
| `data-brkta-data-table-action-list` | action cell wrapper | Multiple action layout |
| `data-brkta-data-table-empty` | `<td>` | Empty state |
| `data-brkta-data-table-loading` | `<td>` | Loading state |

## API
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `DataTableColumn[]` | `[]` | Column definitions |
| `rows` | `DataTableRow[]` | `[]` | Data rows |
| `sortColumn` | `string` | — | Controlled sort column |
| `sortDirection` | `'asc'\|'desc'` | — | Controlled sort direction |
| `selectable` | `boolean` | `false` | Show selection checkboxes |
| `rowActions` | `DataTableRowAction[]` | `[]` | Typed governed actions rendered in the trailing column |
| `rowActionsLabel` | `string` | — | Localized accessible heading for the trailing actions column |
| `onRowActionEvent` | `(event: DataTableRowActionEvent) => void` | — | Receives the stable action ID and matching row |
| `rowActionLabel` | `string` | — | Deprecated single-action compatibility API |
| `dense` | `boolean` | `false` | Compact density |
| `loading` | `boolean` | `false` | Show loading state |

## Accessibility
- Semantic `<table>` markup
- `aria-sort` on sortable column headers
- Selection checkboxes with proper labels
- The trailing actions heading is a localized table header
- Row action buttons use the governed Button component and are keyboard accessible

### Governed row actions

`DataTableRowAction` supports a stable `id`, localized `label`, governed Button `variant`,
and row predicates for `visible`, `disabled`, and `loading`. Multiple actions may be rendered
in one row. The `onRowActionEvent` callback returns `{ actionId, row }`, keeping the action
and its row together for safe feature-level handling.
