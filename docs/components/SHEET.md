# Sheet

## Overview

Slide-in panel from any screen edge (left, right, top, bottom). Uses overlay backdrop.

- **z-index**: Same as Dialog
- **ARIA**: `role="dialog"`, `aria-modal="true"`
- **Animation**: slide-in/out per side direction (200ms)
- **Side support**: `left | right | top | bottom` (default: `right`)
- **Sizes**: `sm | md | lg | xl`; sheets use the full inline size on small screens.
- **Layout**: body content scrolls independently while the projected footer remains pinned.

## Usage

### React
```tsx
import { Sheet } from '@brkta/ui-react/sheet';
<Sheet trigger="Open" side="right" size="lg" title="Details" footer={<button>Save</button>}>
  <p>Panel content</p>
</Sheet>
```

### Angular
```html
<brkta-sheet side="right" size="lg" title="Details">
  <span trigger>Open</span>
  <p>Panel content</p>
  <div footer><button>Save</button></div>
</brkta-sheet>
```

## Files

| Layer | Path |
|---|---|
| Contract | `packages/ui-core/sheet/sheet-contract.ts` |
| CSS | `packages/ui-core/sheet/sheet.css` |
| React | `packages/ui-react/src/sheet/sheet.tsx` |
| Angular | `packages/ui-angular/src/sheet/sheet.component.ts` |
