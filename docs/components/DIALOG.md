# Dialog

Both frameworks focus the first enabled control after content renders, trap Tab
and Shift+Tab inside the dialog, and restore the previous focus when closing or
tearing down. Angular trigger opens defer focus with `afterNextRender` so the
target exists before focus moves.

The shared close control uses logical positioning and the default 44-by-44 touch target.

## Overview

Modal overlay dialog with centered content panel, title, description, close button, and footer slot. Uses `position: fixed` overlay with backdrop.

- **z-index**: backdrop `--z-modal-backdrop` (400), content `--z-modal` (500)
- **ARIA**: `role="dialog"`, `aria-modal="true"`
- **Animation**: fade-in overlay + scale-in content (160ms)
- **Reduced motion**: all animations disabled

## Usage

Pass a translated `closeLabel` in both frameworks for the close button's accessible
name. The English compatibility default is `Close`.

### React
```tsx
import { Dialog } from '@brkta/ui-react/dialog';
<Dialog trigger="Open" title="Title" description="Description">
  <p>Content</p>
</Dialog>
```

### Angular
```html
<brkta-dialog title="Title" description="Description">
  <span trigger>Open</span>
  <p>Content</p>
</brkta-dialog>
```

## Files

| Layer | Path |
|---|---|
| Contract | `packages/ui-core/dialog/dialog-contract.ts` |
| CSS | `packages/ui-core/dialog/dialog.css` |
| React | `packages/ui-react/src/dialog/dialog.tsx` |
| Angular | `packages/ui-angular/src/dialog/dialog.component.ts` |
