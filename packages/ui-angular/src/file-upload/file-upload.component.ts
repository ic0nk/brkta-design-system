import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output } from '@angular/core';
import { AnimatedUploadComponent } from '../animated-icons/animated-upload.component';
import { ButtonComponent } from '../button/button.component';
import type { FileUploadContract, UploadItemStatus, UploadQueueItem, UploadStatusLabels } from '@brkta/ui-core/file-upload/file-upload-contract';
import { matchesAccept, type FileRejection } from '@brkta/ui-core/file-upload/file-accept';

@Component({
  selector: 'brkta-file-upload',
  standalone: true,
  imports: [AnimatedUploadComponent, ButtonComponent],
  template: `
    <div data-brkta-file-upload="" [attr.data-size]="size" [attr.data-dragging]="dragging ? '' : undefined" [attr.data-disabled]="disabled ? '' : undefined">
      <div data-brkta-file-upload-dropzone="" role="group" [attr.tabindex]="disabled ? -1 : 0" [attr.aria-label]="label" [attr.aria-disabled]="disabled" (keydown)="handleKeyDown($event)" (dragenter)="handleDragOver($event)" (dragover)="handleDragOver($event)" (dragleave)="handleDragLeave($event)" (drop)="handleDrop($event)">
        <input #fileInput data-brkta-file-upload-input="" type="file" [attr.accept]="accept || null" [multiple]="multiple" [disabled]="disabled" tabindex="-1" aria-hidden="true" (change)="handleInputChange(fileInput)" />
        <div data-brkta-file-upload-icon=""><brkta-animated-upload [size]="32"></brkta-animated-upload></div>
        <div data-brkta-file-upload-title="">{{ label }}</div>
        <div data-brkta-file-upload-hint="">{{ hint }}</div>
        <brkta-button type="button" variant="primary" size="sm" [disabled]="disabled" (click)="openFilePicker(fileInput)">{{ browseLabel }}</brkta-button>
      </div>
    </div>
  `,
})
export class FileUploadComponent implements FileUploadContract {
  @Input() accept?: string;
  @Input() multiple = true;
  @Input() maxFiles?: number;
  @Input() disabled = false;
  @Input() label = 'Upload your files';
  @Input() hint = 'Drag and drop files here, or browse from your device.';
  @Input() browseLabel = 'Browse files';
  @Input() size: 'default' | 'compact' = 'default';
  @Output() filesSelected = new EventEmitter<File[]>();
  /**
   * Files a drop offered that this card turned away: a type outside `accept`, or more files than
   * `multiple`/`maxFiles` allow. The file dialog filters by `accept` itself, so this only fires for drops.
   */
  @Output() filesRejected = new EventEmitter<FileRejection[]>();
  dragging = false;

  openFilePicker(input: HTMLInputElement): void {
    if (!this.disabled) input.click();
  }

  handleInputChange(input: HTMLInputElement): void {
    if (input.files) this.emitFiles(input.files);
    input.value = '';
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    const input = (event.currentTarget as HTMLElement).querySelector('input');
    if (input) this.openFilePicker(input);
  }

  handleDragOver(event: DragEvent): void {
    event.preventDefault();
    if (!this.disabled) this.dragging = true;
  }

  handleDragLeave(event: DragEvent): void {
    if (event.currentTarget === event.target) this.dragging = false;
  }

  handleDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragging = false;
    if (this.disabled || !event.dataTransfer?.files.length) return;

    // A drop skips the dialog's own `accept` filter, so the card applies it here.
    const rejected: FileRejection[] = [];
    const accepted = Array.from(event.dataTransfer.files).filter((file) => {
      const ok = matchesAccept(file, this.accept);
      if (!ok) rejected.push({ name: file.name, reason: 'type' });
      return ok;
    });
    const kept = this.limit(accepted);
    for (const file of accepted.slice(kept.length)) rejected.push({ name: file.name, reason: 'count' });
    if (kept.length) this.filesSelected.emit(kept);
    if (rejected.length) this.filesRejected.emit(rejected);
  }

  private emitFiles(fileList: FileList): void {
    const files = this.limit(Array.from(fileList));
    if (files.length) this.filesSelected.emit(files);
  }

  private limit(files: File[]): File[] {
    if (!this.multiple) files = files.slice(0, 1);
    if (this.maxFiles && this.maxFiles > 0) files = files.slice(0, this.maxFiles);
    return files;
  }
}

@Component({
  selector: 'brkta-upload-queue',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    @if (items.length) {
      <div data-brkta-upload-queue="" aria-live="polite">
        <!--
          Hover and focus hold the panel open. It closes itself once everything has finished, and
          closing under somebody's cursor while they are reading which file failed would be worse
          than leaving it up. Focus counts too, or the panel would vanish from under a keyboard.
        -->
        <div
          class="glass-elevated"
          data-brkta-upload-queue-panel=""
          (mouseenter)="hold(true)"
          (mouseleave)="hold(false)"
          (focusin)="hold(true)"
          (focusout)="hold(false)"
        >
          <div data-brkta-upload-queue-header="">
            <div data-brkta-upload-queue-title="">{{ title }}</div>
            <brkta-button
              type="button"
              variant="ghost"
              size="sm"
              [ariaLabel]="closeLabel"
              (click)="close.emit()"
            >×</brkta-button>
          </div>
          @for (item of items; track item.id) {
            <div data-brkta-upload-item="" [attr.data-status]="item.status || 'queued'">
              <div data-brkta-upload-item-header="">
                <div data-brkta-upload-item-name="" [attr.title]="item.filename">{{ item.filename }}</div>
              <div data-brkta-upload-item-status="">{{ statusLabel(item.status || 'queued') }}</div>
              </div>
            @if (transferLabel(item); as transfer) { <div data-brkta-upload-item-meta="">{{ transfer }}</div> }
              @if (item.status !== 'error') {
                <div data-brkta-upload-progress="" role="progressbar" aria-valuemin="0" aria-valuemax="100" [attr.aria-valuenow]="progressFor(item)">
                  <div data-brkta-upload-progress-bar="" [style.width.%]="progressFor(item)"></div>
                </div>
              }
              @if (item.error) { <div data-brkta-upload-item-error="">{{ item.error }}</div> }
              @if (item.status === 'error' || onRemove.observed) {
                <div data-brkta-upload-item-actions="">
                  @if (item.status === 'error') { <brkta-button type="button" variant="ghost" size="sm" (click)="onRetry.emit(item.id)">{{ retryLabel }}</brkta-button> }
                  @if (onRemove.observed) { <brkta-button type="button" variant="ghost" size="sm" (click)="onRemove.emit(item.id)">{{ removeLabel }}</brkta-button> }
                </div>
              }
            </div>
          }
        </div>
      </div>
    }
  `,
})
export class UploadQueueComponent implements OnChanges, OnDestroy {
  @Input() items: UploadQueueItem[] = [];
  @Input() title = 'Uploads';
  @Input() removeLabel = 'Remove';
  @Input() retryLabel = 'Retry';
  @Input() closeLabel = 'Close uploads';
  @Input() statusLabels: UploadStatusLabels = {};

  /** How long after the last file finishes the panel closes itself. 0 keeps it open. */
  @Input() autoCloseMs = 4000;

  @Output() onRemove = new EventEmitter<string>();
  @Output() onRetry = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>();

  private timer: ReturnType<typeof setTimeout> | null = null;
  private held = false;

  ngOnChanges(): void {
    this.reconsider();
  }

  ngOnDestroy(): void {
    this.stop();
  }

  /** Called on hover and focus. Holding cancels a pending close and releasing restarts it. */
  hold(holding: boolean): void {
    this.held = holding;
    this.reconsider();
  }

  progressFor(item: UploadQueueItem): number {
    if (item.status === 'success') return 100;

    // Processing means the bytes are all sent and the server is still storing them. The bar stays
    // full because that part is genuinely done; the status beside it is what says the wait goes on.
    if (item.status === 'processing') return 100;
    return Math.min(100, Math.max(0, item.progress ?? 0));
  }

  statusLabel(status: UploadItemStatus): string {
    return this.statusLabels[status] ?? {
      queued: 'Queued',
      uploading: 'Uploading',
      processing: 'Saving',
      success: 'Complete',
      error: 'Failed',
    }[status];
  }

  /**
   * "3.2 MB of 8.8 MB" while sending, and the plain size otherwise.
   *
   * A percentage on its own cannot tell somebody watching a large upload whether anything is
   * moving. The counts can.
   */
  transferLabel(item: UploadQueueItem): string {
    if (item.status === 'uploading' && item.total) {
      return `${formatBytes(item.loaded ?? 0)} / ${formatBytes(item.total)}`;
    }

    return item.size ?? (item.total ? formatBytes(item.total) : '');
  }

  private get finished(): boolean {
    return this.items.length > 0
      && this.items.every((item) => item.status === 'success' || item.status === 'error');
  }

  private reconsider(): void {
    this.stop();
    if (!this.finished || this.held || this.autoCloseMs <= 0) return;
    this.timer = setTimeout(() => this.close.emit(), this.autoCloseMs);
  }

  private stop(): void {
    if (this.timer === null) return;
    clearTimeout(this.timer);
    this.timer = null;
  }
}

/** Bytes as somebody would read them. Binary units, because that is what file sizes are quoted in. */
function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const units = ['KB', 'MB', 'GB'];
  let value = bytes / 1024;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit++;
  }

  return `${value < 10 ? value.toFixed(1) : Math.round(value)} ${units[unit]}`;
}
