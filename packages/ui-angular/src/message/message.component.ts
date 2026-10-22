import { Component, Input } from '@angular/core';
@Component({ selector: 'brkta-message', standalone: true,
  template: `<div data-brkta-message="" [attr.data-variant]="variant">@if(variant!=='system'){<div data-brkta-message-avatar="">{{avatar||name?.[0]||'?'}}</div>}<div data-brkta-message-content="">@if(name){<div data-brkta-message-name="">{{name}}</div>}<div><ng-content></ng-content></div>@if(timestamp){<div data-brkta-message-time="">{{timestamp}} {{status?' · '+status:''}}</div>}</div></div>`,
}) export class MessageComponent { @Input() variant:'incoming'|'outgoing'|'system'='incoming'; @Input() avatar?: string; @Input() name?: string; @Input() timestamp?: string; @Input() status?: 'sent' | 'delivered' | 'read' | 'error'; }
