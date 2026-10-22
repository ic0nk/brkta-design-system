# Alert Dialog

## Overview

Destructive confirmation dialog. Uses Dialog overlay + content structure with `role="alertdialog"`.

- **z-index**: Same as Dialog (`--z-modal-backdrop` + `--z-modal`)
- **ARIA**: `role="alertdialog"`, `aria-modal="true"`
- **Destructive**: Sets `data-destructive` for red border styling

## Usage

### React
```tsx
import { AlertDialog } from '@brkta/ui-react/alert-dialog';
<AlertDialog trigger="Delete" title="Confirm" description="This cannot be undone."
  confirmLabel="Delete" cancelLabel="Cancel" destructive
  onConfirm={() => console.log('deleted')} />
```

### Angular
```html
<brkta-alert-dialog title="Confirm" description="This cannot be undone."
  confirmLabel="Delete" cancelLabel="Cancel" [destructive]="true">
  <span trigger>Delete</span>
</brkta-alert-dialog>
```

For asynchronous destructive work, use a controlled `open` state with
`closeOnConfirm=false`. Set `loading=true` during the request; the governed
confirm button prevents duplicate submissions, and the dialog stays open so
structured dependency or server errors remain visible. Focus is trapped while
open and restored when the dialog closes.

## Files

| Layer | Path |
|---|---|
| Contract | `packages/ui-core/alert-dialog/alert-dialog-contract.ts` |
| CSS | `packages/ui-core/alert-dialog/alert-dialog.css` |
| React | `packages/ui-react/src/alert-dialog/alert-dialog.tsx` |
| Angular | `packages/ui-angular/src/alert-dialog/alert-dialog.component.ts` |

Pass a translated `loadingLabel` for the pending confirmation announcement in both frameworks.
