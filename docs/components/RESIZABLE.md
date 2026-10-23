# Resizable

## Overview

A split panel foundation with a draggable handle. Supports horizontal and vertical splits, keyboard resizing, and minimum size constraints.

## Data Attributes

| Attribute | Element | Purpose |
|-----------|---------|---------|
| `data-brkta-resizable` | Root | Split container |
| `data-brkta-resizable-panel` | Div | Individual panel |
| `data-brkta-resizable-handle` | Div | Drag handle |
| `data-direction="vertical"` | Root | Vertical split mode |

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Split direction |
| `defaultSize` | `number` | `50` | Initial first-panel size (% or px) |
| `minSize` | `number` | `100` | Minimum first-panel size (px) |
| `maxSize` | `number` | `Infinity` | Maximum first-panel size (px) |
| `onResize` | `(sizes: number[]) => void` | — | Callback when panel sizes change |

## Design Notes

- Handle: 4px wide (horizontal) or 4px tall (vertical)
- Handle shows a 32×6px or 6×32px grab indicator bar
- Hover/drag: handle and bar use `var(--primary)` / `var(--primary-foreground)`
- Drag uses **pointer events** (`pointerdown`/`pointermove`/`pointerup`) with `setPointerCapture` for reliable tracking across mouse, touch, and pen input
- `touch-action: none` on handle prevents browser scroll/zoom interference during drag
- Keyboard support: Arrow keys adjust by 10px/step
- `role="separator"` with `aria-label="Resize panels"`, `aria-orientation`, `aria-valuenow` (10–90)
- Each panel is independently scrollable (`overflow: auto`)
- No layout jumps: first panel uses `flex-basis`, second panel uses `flex: 1`

### React
```tsx
import { Resizable } from '@brkta/ui-react/resizable';

<Resizable first={<LeftPanel />} second={<RightPanel />} defaultSize={40} />
```

### Angular
```html
<brkta-resizable [defaultSize]="40">
  <div first>Left Panel</div>
  <div second>Right Panel</div>
</brkta-resizable>
```
