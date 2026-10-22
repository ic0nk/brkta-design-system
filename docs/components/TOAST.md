# Toast

## Overview

Fixed-position notification with 4 variants. Supports stacking via `ToastViewport`.

- **z-index**: `--z-toast` (800) — above modals
- **Variants**: `default | success | warning | destructive`
- **Stacking**: `ToastViewport` component wraps toasts in a flex column
- **Dismiss**: close button + optional auto-dismiss via `duration` prop
- **Animation**: slide-in from right (200ms)

## Usage

Pass a translated `dismissLabel` in both frameworks for the dismiss button's
accessible name. The English compatibility default is `Dismiss`.

### React
```tsx
import { Toast, ToastViewport } from '@brkta/ui-react/toast';
<ToastViewport>
  <Toast title="Saved" description="Changes saved." variant="success" />
</ToastViewport>
```

### Angular
```html
<brkta-toast-viewport>
  <brkta-toast title="Saved" description="Changes saved." variant="success"></brkta-toast>
</brkta-toast-viewport>
```

## Files

| Layer | Path |
|---|---|
| Contract | `packages/ui-core/toast/toast-contract.ts` |
| CSS | `packages/ui-core/toast/toast.css` |
| React | `packages/ui-react/src/toast/toast.tsx` |
| Angular | `packages/ui-angular/src/toast/toast.component.ts` |
