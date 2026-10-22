'use client'; import type { AttachmentContract } from '@brkta/ui-core/attachment/attachment-contract';
export function Attachment({ filename, size, type, status='default', onRemove, onDownload }: AttachmentContract) {
  return <div data-brkta-attachment="" data-status={status}>
    <div data-brkta-attachment-icon="">{type?.[0]?.toUpperCase()||'F'}</div>
    <div data-brkta-attachment-info=""><div data-brkta-attachment-name="">{filename}</div><div data-brkta-attachment-meta="">{size||type||''}{status!=='default'?` · ${status}`:''}</div></div>
    <div data-brkta-attachment-actions="">{onDownload&&<button data-brkta-button="" data-variant="ghost" data-size="sm" onClick={onDownload}>↓</button>}{onRemove&&<button data-brkta-button="" data-variant="ghost" data-size="sm" onClick={onRemove}>×</button>}</div>
  </div>;
}
