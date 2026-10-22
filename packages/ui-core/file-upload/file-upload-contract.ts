import type { FileRejection } from './file-accept';

/**
 * Where one file has got to.
 *
 * `processing` is the step nobody sees but everybody waits through: the bytes have left the browser
 * and the server is still storing them. Without it the bar sits at 100% while the upload is plainly
 * not finished, which reads as a hang. It matters most when object storage is somewhere else - the
 * browser's leg is over in a moment and the wait is entirely in a leg the browser cannot measure.
 */
export type UploadItemStatus = 'queued' | 'uploading' | 'processing' | 'success' | 'error';

export type UploadStatusLabels = Partial<Record<UploadItemStatus, string>>;

export interface UploadQueueItem {
  id: string;
  filename: string;

  /** The whole file, already formatted for reading — "8.8 MB". */
  size?: string;
  progress?: number;
  status?: UploadItemStatus;
  error?: string;

  /**
   * Bytes sent and bytes total, so the panel can say "3.2 MB of 8.8 MB".
   *
   * A percentage alone tells somebody watching a slow upload almost nothing: it cannot say whether
   * the number has moved, or how much of a large file is left. These are the raw counts and the
   * panel formats them.
   */
  loaded?: number;
  total?: number;
}

export interface FileUploadContract {
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  disabled?: boolean;
  label?: string;
  hint?: string;
  browseLabel?: string;
  size?: 'default' | 'compact';
  onFilesSelected?: (files: File[]) => void;

  /** Files a drop offered that `accept`, `multiple` or `maxFiles` turned away. */
  onFilesRejected?: (rejections: FileRejection[]) => void;
}

export interface UploadQueueContract {
  items: UploadQueueItem[];
  title?: string;
  removeLabel?: string;
  retryLabel?: string;
  closeLabel?: string;
  statusLabels?: UploadStatusLabels;

  /** How long after the last file finishes the panel closes itself. 0 keeps it open. */
  autoCloseMs?: number;
  onRemove?: (id: string) => void;
  onRetry?: (id: string) => void;
  onClose?: () => void;
}
