# Separator

> A thin visual divider that separates content sections. Can be horizontal (full width) or vertical (full height).

---

## When to use

- Visually separate distinct sections in a layout.
- Divide toolbar items or action groups.
- Create visual breathing room between content blocks.

Do not use Separator as the only way to distinguish sections. Use spacing, headings, and layout in addition to separators.

---

## Implementation

| Layer | Location |
|-------|----------|
| Contract | `@brkta/ui-core/separator/separator-contract.ts` |
| CSS | `@brkta/ui-core/separator/separator.css` |
| React | `@brkta/ui-react/separator` (`Separator`) |
| Angular | `@brkta/ui-angular` (`SeparatorComponent`) |

---

## React

```tsx
import { Separator } from '@brkta/ui-react/separator';

// Horizontal (default)
<Separator />

// Vertical
<div style={{ display: 'flex', height: '100px' }}>
  <span>Left</span>
  <Separator orientation="vertical" />
  <span>Right</span>
</div>

// With accessible label
<Separator aria-label="Section divider" />
```

## Angular

```html
<!-- Horizontal (default) -->
<brkta-separator></brkta-separator>

<!-- Vertical -->
<div style="display: flex; height: 100px;">
  <span>Left</span>
  <brkta-separator orientation="vertical"></brkta-separator>
  <span>Right</span>
</div>
```

---

## Orientation

| Orientation | Direction | Usage |
|-------------|-----------|-------|
| `horizontal` | Full width | Divides sections vertically |
| `vertical` | Full height | Divides inline elements, toolbar groups |

## Accessibility

- Separator has `role="separator"` with `aria-orientation`.
- Separators are decorative by default. Use `aria-label` when the separator conveys meaning (rare).

## Related

- **Card** — For content containers with internal separation.
