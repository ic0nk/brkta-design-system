# Breadcrumb

## Purpose

Hierarchical page path navigator showing the user's location in the application.

## Anatomy

| Part | Data attribute |
|---|---|
| Nav wrapper | `data-brkta-breadcrumb` |
| Item | `data-brkta-breadcrumb-item` |
| Current page | `data-current="true"`, `aria-current="page"` |
| Separator | `data-brkta-breadcrumb-separator` (default `/`) |

## React usage

```tsx
import { Breadcrumb } from '@brkta/ui-react/breadcrumb';
<Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Products', current: true }]} />
```

## Angular usage

```html
<brkta-breadcrumb [items]="[{ label: 'Home', href: '/' }, { label: 'Products', current: true }]"></brkta-breadcrumb>
```

## Accessibility

- `aria-label="Breadcrumb"` on `<nav>`
- `aria-current="page"` on current item
- Separator is `aria-hidden="true"`

## Design rules

- Uses `var(--muted-foreground)` for links, `var(--foreground)` for current
- Links underline on hover
- Compact inline flex layout with `0.25rem` gap
- No icon requirement for separator — uses text `/` by default

## Files

| Layer | Path |
|---|---|
| Contract | `packages/ui-core/breadcrumb/breadcrumb-contract.ts` |
| CSS | `packages/ui-core/breadcrumb/breadcrumb.css` |
| React | `packages/ui-react/src/breadcrumb/breadcrumb.tsx` |
| Angular | `packages/ui-angular/src/breadcrumb/breadcrumb.component.ts` |
