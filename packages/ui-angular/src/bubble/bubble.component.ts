import { Component, Input } from '@angular/core';
@Component({ selector: 'brkta-bubble', standalone: true,
  template: `<div data-brkta-bubble="" [attr.data-variant]="variant"><div><ng-content></ng-content></div>@if(timestamp||status){<div data-brkta-bubble-time="">{{timestamp}} {{status?' · '+status:''}}</div>}</div>`,
}) export class BubbleComponent { @Input() variant:'incoming'|'outgoing'|'system'='incoming'; @Input() timestamp?: string; @Input() status?: 'sent' | 'delivered' | 'read' | 'error'; }
