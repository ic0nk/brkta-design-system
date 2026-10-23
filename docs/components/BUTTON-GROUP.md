# Button Group

## Overview

Groups existing Button components into a connected visual cluster with attached edges. Supports horizontal and vertical orientation.

## Data Attributes

| Attribute | Element | Purpose |
|-----------|---------|---------|
| `data-brkta-button-group` | Root | Button group container |
| `data-orientation` | Root | `"horizontal"` or `"vertical"` |
| `data-disabled` | Root | Disables all buttons |

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction |
| `disabled` | `boolean` | `false` | Disables all children |

### React
```tsx
import { ButtonGroup } from '@brkta/ui-react/button-group';
import { Button } from '@brkta/ui-react/button';

<ButtonGroup>
  <Button variant="outline">Cancel</Button>
  <Button variant="primary">Save</Button>
</ButtonGroup>
```

### Angular
```html
<brkta-button-group>
  <button data-brkta-button="" data-variant="outline">Cancel</button>
  <button data-brkta-button="" data-variant="primary">Save</button>
</brkta-button-group>
```

## Design Notes
- Buttons attach via negative margin (`-1px`) to merge borders
- First/last buttons get the outer radius (`var(--radius-md)`)
- Middle buttons have no border-radius
- Hover/focus z-index ensures the active button border shows on top
- Uses `role="group"` for accessibility

## Motion

Button Groups use a single group-level moving border dash that wraps around the entire group container on hover or focus-within. This replaces individual button dashes:

- **Group dash**: `::after` pseudo-element on `[data-brkta-button-group]` using `offset-path: inset(1px round var(--radius-md))` — a 12×2px pill that travels the group's outer border
- **Individual dashes suppressed**: `[data-brkta-button-group] > [data-brkta-button]::after { display: none }` — child buttons inside groups do not render their own border dashes
- **Triggered by**: group `:hover` and `:focus-within` (focus any child → dash appears)
- **Duration**: 1.8s per revolution (`--duration-slow`-equivalent)
- **Disabled**: `[data-brkta-button-group][data-disabled]` prevents dash animation
- **Reduced motion**: `prefers-reduced-motion: reduce` disables the group dash
- **Icon motion inside child buttons still works** — only the `::after` dash pseudo is suppressed; `.brkta-icon-motion` classes on child button icons remain active
