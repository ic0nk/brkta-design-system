# Empty State

## Purpose

Displayed when a list, table, or view has no data. Provides contextual guidance to the user.

## Anatomy

| Part | Data attribute |
|---|---|
| Root | `data-brkta-empty` |
| Icon | `data-brkta-empty-icon` |
| Title | `data-brkta-empty-title` |
| Description | `data-brkta-empty-description` |
| Action | `data-brkta-empty-action` |

## Variants

| Variant | Attribute | Description |
|---|---|---|
| Default | `data-variant="default"` | Full padding, large title |
| Compact | `data-variant="compact"` | Reduced padding, smaller title |

## React usage

```tsx
import { EmptyState } from '@brkta/ui-react/empty-state';
<EmptyState title="No items found" description="Get started by creating your first item." action={<button>Create</button>} />
```

## Angular usage

```html
<brkta-empty-state title="No items found" description="Get started.">
  <button action>Create</button>
</brkta-empty-state>
```

## Design rules

- Centered layout, `text-align: center`
- Title: `var(--font-size-lg)`, semibold
- Description: `var(--font-size-sm)`, `var(--muted-foreground)`, max-width 24rem
- Icon color: `var(--muted-foreground)`
- Margin between sections: natural flex gap
- No empty-state-specific ARIA requirements — content is visible standard text

## Files

| Layer | Path |
|---|---|
| Contract | `packages/ui-core/empty-state/empty-state-contract.ts` |
| CSS | `packages/ui-core/empty-state/empty-state.css` |
| React | `packages/ui-react/src/empty-state/empty-state.tsx` |
| Angular | `packages/ui-angular/src/empty-state/empty-state.component.ts` |
