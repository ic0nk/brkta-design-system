export interface AttachmentContract { filename: string; size?: string; type?: string; status?: 'default'|'uploading'|'success'|'error'; onRemove?: () => void; onDownload?: () => void; }
