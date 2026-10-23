# File Upload

> A glass drag-and-drop file picker paired with a fixed bottom-right upload progress queue. The component selects files and reports them to the host; the host owns the actual upload request and updates the queue items.

## Implementation

| Layer | Location |
|-------|----------|
| Contract | `@brkta/ui-core/file-upload/file-upload-contract` |
| CSS | `@brkta/ui-core/file-upload/file-upload.css` |
| React | `@brkta/ui-react/file-upload` (`FileUpload`, `UploadQueue`) |
| Angular | `@brkta/ui-angular` (`FileUploadComponent`, `UploadQueueComponent`) |

## Usage

### React

```tsx
import { FileUpload, UploadQueue } from '@brkta/ui-react/file-upload';

<FileUpload accept="image/*" multiple onFilesSelected={startUploads} />
<UploadQueue items={uploads} onRetry={retryUpload} onRemove={removeUpload} />
```

### Angular

```html
<brkta-file-upload accept="image/*" multiple (filesSelected)="startUploads($event)"></brkta-file-upload>
<brkta-upload-queue [items]="uploads" (onRetry)="retryUpload($event)" (onRemove)="removeUpload($event)"></brkta-upload-queue>
```

## Behavior

- Browse, keyboard activation, drag-over, and drop are supported.
- `multiple` and `maxFiles` constrain the emitted `File[]`. On a drop, the card also enforces `accept` (a drop skips the file dialog's own filter) with the shared `matchesAccept` helper from `@brkta/ui-core/file-upload/file-accept`, and reports what it refused through `filesRejected` (Angular) as `{ name, reason: 'type' | 'count' }[]`. The dialog path is unchanged. Server validation remains the application's responsibility.
- `UploadQueue` supports queued, uploading, complete, and failed items with progress bars, retry, and remove actions.
- The queue is fixed to the bottom-right with the same toast z-index and glass elevation, and collapses to the viewport width on small screens.
- No file contents or upload credentials are logged or stored by the design-system component.

## Drop zone recipe

An attribute-only recipe in `file-upload.css` for an existing section (a gallery, a document list,
a library) that should also accept dropped files, without replacing its layout with the upload
card. It reuses the card's drag-state tokens (`--information`, the tinted `--surface`) so the two
read as one system.

| Attribute | Element | Meaning |
|-----------|---------|---------|
| `data-brkta-drop-zone` | host | Positions the overlay and rounds the highlight. |
| `data-drag-over` | host | Files are over the zone: dashed `--information` outline, overlay shown. |
| `data-disabled` | host | The zone refuses drops; no highlight or overlay. |
| `data-brkta-drop-zone-overlay` | child of host, `aria-hidden="true"` | Tinted cover; never takes pointer events. |
| `data-brkta-drop-zone-label` | child of overlay | The "Drop files to upload" label. |
| `data-brkta-drop-zone-status` | child of host, `aria-live="polite"` | Visually hidden live region for "3 files uploading" / "2 files added". |

```html
<section data-brkta-drop-zone [attr.data-drag-over]="over ? '' : null">
  <div data-brkta-drop-zone-overlay aria-hidden="true">
    <span data-brkta-drop-zone-label>Drop files to upload</span>
  </div>
  <p data-brkta-drop-zone-status aria-live="polite">{{ status }}</p>
  …section content…
</section>
```

- A consuming app can set the host attributes, read file drops, and enforce `accept`, `maxFileSize`, and `maxFiles`. Keep the overlay and status slots in the host template; do not duplicate drop-zone styles.
- The drop-zone recipe is attribute-only CSS. A consumer that supports dropping files supplies the behavior and markup; this recipe does not itself upload files.
- The overlay is decorative (`aria-hidden`). The section's existing buttons stay the keyboard and
  screen-reader path to upload; the status region announces progress.
- Reduced-motion mode removes the outline transition.

## Accessibility

- The drop zone is keyboard focusable and exposes its label and disabled state.
- The browse control is a native button; the file input remains programmatically associated and hidden from the accessibility tree.
- Progress items expose `role="progressbar"` with bounded `aria-valuenow` values.
- Reduced-motion mode disables drop-zone and progress transitions.
