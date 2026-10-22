import { Component, Input } from '@angular/core';
import type { BadgeVariant, BadgeSize } from '@brkta/ui-core/types/variant';

@Component({
  selector: 'brkta-badge',
  standalone: true,
  template: `
    <span
      [attr.data-brkta-badge]="' '"
      [attr.data-variant]="variant"
      [attr.data-size]="size"
    >
      <ng-content></ng-content>
    </span>
  `,
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'default';
  @Input() size: BadgeSize = 'md';
}
