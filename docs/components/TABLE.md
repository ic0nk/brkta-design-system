# Table

## Purpose

Display structured data in rows and columns. Supports default, dense, and bordered variants.

## Anatomy

| Part | Data attribute |
|---|---|
| Table | `data-brkta-table` |
| Header | `data-brkta-table-header` |
| Body | `data-brkta-table-body` |
| Row | `data-brkta-table-row` |
| Cell | `data-brkta-table-cell` |

## Variants

| Variant | Attribute | Description |
|---|---|---|
| Default | `data-variant="default"` | Standard spacing |
| Dense | `data-variant="dense"` | Tighter padding for compact tables |
| Bordered | `data-variant="bordered"` | Full outer border + radius |

## React usage

```tsx
import { Table } from '@brkta/ui-react/table';
<Table columns={[{ key: 'name', label: 'Name' }]} rows={[{ name: 'Alice' }]} variant="dense" />
```

## Angular usage

```html
<brkta-table [columns]="[{ key: 'name', label: 'Name' }]" [rows]="[{ name: 'Alice' }]" variant="dense"></brkta-table>
```

## Empty state

When `rows` is an empty array, a single row displays "No data" centered across all columns.

## Design rules

- Semantic `<table>` / `<thead>` / `<tbody>` / `<tr>` / `<th>` / `<td>`
- Header: `var(--muted)` background, `var(--muted-foreground)` text, semibold
- Body rows: `border-bottom: 1px solid var(--border)`
- Row hover: `var(--muted)` background
- Responsive: wrapper `overflow-x: auto`

## Files

| Layer | Path |
|---|---|
| Contract | `packages/ui-core/table/table-contract.ts` |
| CSS | `packages/ui-core/table/table.css` |
| React | `packages/ui-react/src/table/table.tsx` |
| Angular | `packages/ui-angular/src/table/table.component.ts` |
