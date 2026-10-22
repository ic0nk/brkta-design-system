import { Component, Input } from '@angular/core';
@Component({ selector: 'brkta-marker', standalone: true,
  template: `<span data-brkta-marker="" [attr.data-size]="size"><span data-brkta-marker-dot="" [attr.data-variant]="variant"></span>@if(label){<span>{{label}}</span>}</span>`,
}) export class MarkerComponent { @Input() variant:'default'|'success'|'warning'|'destructive'|'info'='default'; @Input() label?: string; @Input() size:'sm'|'md'|'lg'='md'; }
