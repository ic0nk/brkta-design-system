# Pagination

## Purpose

Navigate through paginated content with page number buttons, previous/next, and ellipsis for large ranges.

## Anatomy

| Part | Data attribute |
|---|---|
| Nav wrapper | `data-brkta-pagination` |
| Page button | `data-brkta-pagination-item` |
| Active page | `data-active="true"` |
| Disabled button | `data-disabled="true"`, `disabled` |
| Ellipsis | `data-disabled="true"` (non-interactive) |

## React usage

```tsx
import { Pagination } from '@brkta/ui-react/pagination';
<Pagination current={3} total={10} onPageChange={(p) => console.log(p)} />
```

## Angular usage

```html
<brkta-pagination [current]="3" [total]="10" (pageChange)="onPage($event)"></brkta-pagination>
```

## Accessibility

- `aria-label="Pagination"` on `<nav>`
- `aria-label="Previous"` / `aria-label="Next"` on directional buttons
- Active page uses `data-active="true"`
- Boundaries disable previous/next buttons

## Design rules

- Active page: `var(--primary)` background with `var(--primary-foreground)` text
- Hover: `var(--muted)` background
- Disabled: 40% opacity, no pointer events
- Border: `1px solid var(--border)`
- Radius: `var(--radius-md)`
- Min size: 2.25rem × 2.25rem

## Ellipsis logic

- ≤ 7 pages: show all
- > 7 pages: show first, last, and pages around current with ellipsis

## Files

| Layer | Path |
|---|---|
| Contract | `packages/ui-core/pagination/pagination-contract.ts` |
| CSS | `packages/ui-core/pagination/pagination.css` |
| React | `packages/ui-react/src/pagination/pagination.tsx` |
| Angular | `packages/ui-angular/src/pagination/pagination.component.ts` |
