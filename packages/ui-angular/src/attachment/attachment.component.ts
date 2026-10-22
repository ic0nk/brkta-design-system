import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({ selector: 'brkta-attachment', standalone: true,
  template: `<div data-brkta-attachment="" [attr.data-status]="status"><div data-brkta-attachment-icon="">{{type?.[0]?.toUpperCase()||'F'}}</div><div data-brkta-attachment-info=""><div data-brkta-attachment-name="">{{filename}}</div><div data-brkta-attachment-meta="">{{size||type||''}} {{status!=='default'?' · '+status:''}}</div></div><div data-brkta-attachment-actions="">@if(onDownload.observed){<button data-brkta-button="" data-variant="ghost" data-size="sm" (click)="onDownload.emit()">↓</button>}@if(onRemove.observed){<button data-brkta-button="" data-variant="ghost" data-size="sm" (click)="onRemove.emit()">×</button>}</div></div>`,
}) export class AttachmentComponent {
  @Input() filename=''; @Input() size?: string; @Input() type?: string; @Input() status:'default'|'uploading'|'success'|'error'='default';
  @Output() onRemove = new EventEmitter<void>(); @Output() onDownload = new EventEmitter<void>();
}
