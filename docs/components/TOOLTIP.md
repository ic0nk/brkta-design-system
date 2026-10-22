# Tooltip

## Overview

Quiet compact text label that appears on hover/focus. Uses inverted foreground/background colors for contrast. Applies to interactive controls only — do not use on disabled elements.

## Data attributes

| Attribute | Element |
|---|---|
| `data-brkta-tooltip` | Wrapper |
| `data-brkta-tooltip-trigger` | Trigger element |
| `data-brkta-tooltip-content` | Tooltip label |

## API

### React

```tsx
import { Tooltip } from '@brkta/ui-react/tooltip';

<Tooltip content="Save your changes">
  <button>Save</button>
</Tooltip>
```

### Angular

```html
<brkta-tooltip content="Save your changes">
  <button>Save</button>
</brkta-tooltip>
```

## Accessibility

- Trigger: `aria-describedby` pointing to tooltip
- Content: `role="tooltip"`
- Show on mouseenter/focus (with configurable `delay`, default 500ms)
- Hide on mouseleave/blur/Escape
- z-index: `var(--z-tooltip)` (700)
- Reduced motion: all animations disabled

## Icons

Tooltip triggers should use text labels or proper Lucide SVG icons. Do not use emoji as trigger content. Icon-only triggers require an accessible name via `aria-label` on the trigger element.

## Files

| Framework | Path |
|---|---|
| Contract | `packages/ui-core/tooltip/tooltip-contract.ts` |
| CSS | `packages/ui-core/tooltip/tooltip.css` |
| React | `packages/ui-react/src/tooltip/tooltip.tsx` |
| Angular | `packages/ui-angular/src/tooltip/tooltip.component.ts` |
