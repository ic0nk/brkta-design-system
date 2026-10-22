# Attachment

> Displays a file attachment with name, metadata, and optional download/remove actions, with uploading, success, and error status states.

---

## Implementation

| Layer | Location |
|-------|----------|
| Contract | `@brkta/ui-core/attachment/attachment-contract.ts` |
| CSS | `@brkta/ui-core/attachment/attachment.css` |
| React | `@brkta/ui-react/attachment` (`Attachment`) |
| Angular | `@brkta/ui-angular` (`AttachmentComponent`) |

---

## Usage

### React

```tsx
import { Attachment } from '@brkta/ui-react/attachment';

<Attachment filename="report-q3.pdf" size="2.4 MB" type="pdf" />
<Attachment filename="invoice-0042.pdf" size="340 KB" type="pdf" status="success" />
<Attachment
  filename="shared-document.docx"
  size="1.2 MB"
  type="docx"
  onDownload={() => console.log('download')}
  onRemove={() => console.log('remove')}
/>
```

### Angular

```html
<brkta-attachment filename="report-q3.pdf" size="2.4 MB" type="pdf"></brkta-attachment>
<brkta-attachment filename="invoice-0042.pdf" size="340 KB" type="pdf" status="success"></brkta-attachment>
<brkta-attachment
  filename="shared-document.docx"
  size="1.2 MB"
  type="docx"
  (onDownload)="download()"
  (onRemove)="remove()"
></brkta-attachment>
```

---

## Props / Inputs

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `filename` | `string` | — (required; Angular default `''`) | File name shown in the attachment header |
| `size` | `string` | — | Formatted file size shown in the meta line (e.g. `2.4 MB`) |
| `type` | `string` | — | File type/extension; its first letter is rendered in the icon tile (falls back to `F`) |
| `status` | `'default' \| 'uploading' \| 'success' \| 'error'` | `'default'` | Visual status state; when not `default`, appended to the meta line (`· uploading`, `· success`, `· error`) |
| `onRemove` | `() => void` | — | Called when the remove (`×`) action is clicked |
| `onDownload` | `() => void` | — | Called when the download (`↓`) action is clicked |

## States

| State | Visual |
|-------|--------|
| Default | Icon tile uses `--muted` background with `--muted-foreground`; no status suffix |
| Uploading | Icon tile uses `--info` background / `--info-foreground` |
| Success | Icon tile uses `--success` background / `--success-foreground` |
| Error | Border becomes `--destructive`; icon tile uses `--destructive` background / `--destructive-foreground` |

## Accessibility

- Action buttons are native `<button>` elements (`data-brkta-button`, ghost variant), so they are focusable and keyboard operable.
- Download/remove buttons render only when their handler is provided (React) or observed (Angular).
- The icon tile, name, and meta are plain text/div content; no ARIA roles are applied.

## Related Components

- Bubble / Message — chat conversation content
- Button — ghost/small variant used for attachment actions
