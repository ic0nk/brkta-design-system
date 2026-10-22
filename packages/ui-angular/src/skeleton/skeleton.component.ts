import { Component, Input } from '@angular/core';
import type { SkeletonVariant } from '@brkta/ui-core/types/variant';

@Component({
  selector: 'brkta-skeleton',
  standalone: true,
  styles: [':host { display: contents; }'],
  template: `
    <div
      [attr.data-brkta-skeleton]="' '"
      [attr.data-variant]="variant"
      [style.width]="width"
      [style.height]="height"
      aria-hidden="true"
    ></div>
  `,
})
export class SkeletonComponent {
  @Input() variant: SkeletonVariant = 'text';
  @Input() width?: string;
  @Input() height?: string;
}
