# Popover

## Overview

Small anchored content panel attached to a trigger element. Uses `--popover` surface, border, shadow, and little-curve radius. Opens on trigger click, closes on Escape or click outside.

Content uses logical inline positioning and viewport-safe token sizing. `align="start"`
opens from the inline start edge of the anchor; applications anchoring from a rail at
the logical start edge should use it to open inward. `side` supports `top`, `bottom`,
`left`, and `right`, with `bottom` as the backwards-compatible default. The emitted
open state is the boolean attribute `[data-brkta-popover][data-open]`.

## Data attributes

| Attribute                    | Element       |
| ---------------------------- | ------------- |
| `data-brkta-popover`         | Wrapper       |
| `data-brkta-popover-trigger` | Trigger       |
| `data-brkta-popover-content` | Content panel |
| `data-side`                  | Content side  |

## API

### React

```tsx
import { Popover } from "@brkta/ui-react/popover";

<Popover trigger="More info">
  <p>Helpful content here.</p>
</Popover>;
```

### Angular

```html
<brkta-popover>
  <span trigger>More info</span>
  <p>Helpful content here.</p>
</brkta-popover>
```

## Accessibility

- Trigger: `role="button"`, `aria-expanded`
- Content: `role="dialog"`, `aria-modal="false"`
- Escape closes, click outside closes
- z-index: `var(--z-popover)` (600)

## Files

| Framework | Path                                                   |
| --------- | ------------------------------------------------------ |
| Contract  | `packages/ui-core/popover/popover-contract.ts`         |
| CSS       | `packages/ui-core/popover/popover.css`                 |
| React     | `packages/ui-react/src/popover/popover.tsx`            |
| Angular   | `packages/ui-angular/src/popover/popover.component.ts` |
