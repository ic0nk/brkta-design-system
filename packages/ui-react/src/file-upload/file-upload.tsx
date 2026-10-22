"use client";

import { useRef, useState, type ChangeEvent, type DragEvent, type KeyboardEvent } from "react";
import { AnimatedUpload } from "../animated-icons/animated-upload";
import { Button } from "../button/button";
import type { FileUploadContract, UploadQueueContract, UploadQueueItem, UploadItemStatus } from "@brkta/ui-core/file-upload/file-upload-contract";

export type FileUploadProps = FileUploadContract;
export type UploadQueueProps = UploadQueueContract;

export function FileUpload({
  accept,
  multiple = true,
  maxFiles,
  disabled = false,
  label = "Upload your files",
  hint = "Drag and drop files here, or browse from your device.",
  browseLabel = "Browse files",
  size = "default",
  onFilesSelected,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (fileList: FileList | File[]) => {
    let files = Array.from(fileList);
    if (!multiple) files = files.slice(0, 1);
    if (maxFiles && maxFiles > 0) files = files.slice(0, maxFiles);
    if (files.length > 0) onFilesSelected?.(files);
  };

  const openFilePicker = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) handleFiles(event.target.files);
    event.target.value = "";
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openFilePicker();
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!disabled) setDragging(true);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    if (!disabled && event.dataTransfer.files.length > 0) handleFiles(event.dataTransfer.files);
  };

  return (
    <div data-brkta-file-upload="" data-size={size} data-dragging={dragging ? "" : undefined} data-disabled={disabled ? "" : undefined}>
      <div
        data-brkta-file-upload-dropzone=""
        role="group"
        tabIndex={disabled ? -1 : 0}
        aria-label={label}
        aria-disabled={disabled}
        onKeyDown={handleKeyDown}
        onDragEnter={handleDragOver}
        onDragOver={handleDragOver}
        onDragLeave={(event) => { if (event.currentTarget === event.target) setDragging(false); }}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          data-brkta-file-upload-input=""
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          tabIndex={-1}
          aria-hidden="true"
          onChange={handleInputChange}
        />
        <div data-brkta-file-upload-icon=""><AnimatedUpload size={32} /></div>
        <div data-brkta-file-upload-title="">{label}</div>
        <div data-brkta-file-upload-hint="">{hint}</div>
        <Button
          type="button"
          variant="primary"
          size="sm"
          disabled={disabled}
          onClick={(event) => { event.stopPropagation(); openFilePicker(); }}
        >
          {browseLabel}
        </Button>
      </div>
    </div>
  );
}

const defaultStatusLabels: Record<UploadItemStatus, string> = {
  queued: "Queued",
  uploading: "Uploading",
  processing: "Saving",
  success: "Complete",
  error: "Failed",
};

function progressFor(item: UploadQueueItem): number {
  if (item.status === "success" || item.status === "processing") return 100;
  return Math.min(100, Math.max(0, item.progress ?? 0));
}

export function UploadQueue({
  items,
  title = "Uploads",
  removeLabel = "Remove",
  retryLabel = "Retry",
  statusLabels = {},
  onRemove,
  onRetry,
}: UploadQueueProps) {
  if (items.length === 0) return null;

  return (
    <div data-brkta-upload-queue="" aria-live="polite">
      <div className="glass-elevated" data-brkta-upload-queue-panel="">
        <div data-brkta-upload-queue-title="">{title}</div>
        {items.map((item) => {
          const status = item.status ?? "queued";
          return (
            <div key={item.id} data-brkta-upload-item="" data-status={status}>
              <div data-brkta-upload-item-header="">
                <div data-brkta-upload-item-name="" title={item.filename}>{item.filename}</div>
                <div data-brkta-upload-item-status="">{statusLabels[status] ?? defaultStatusLabels[status]}</div>
              </div>
              {item.size && <div data-brkta-upload-item-meta="">{item.size}</div>}
              {(status === "queued" || status === "uploading" || status === "processing" || status === "success") && (
                <div data-brkta-upload-progress="" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progressFor(item)}>
                  <div data-brkta-upload-progress-bar="" style={{ width: `${progressFor(item)}%` }} />
                </div>
              )}
              {item.error && <div data-brkta-upload-item-error="">{item.error}</div>}
              {(onRemove || (status === "error" && onRetry)) && (
                <div data-brkta-upload-item-actions="">
                  {status === "error" && <Button type="button" variant="ghost" size="sm" onClick={() => onRetry?.(item.id)}>{retryLabel}</Button>}
                  {onRemove && <Button type="button" variant="ghost" size="sm" onClick={() => onRemove(item.id)}>{removeLabel}</Button>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
