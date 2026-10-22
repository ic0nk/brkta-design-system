import { Component, Input } from '@angular/core';
import type { SpinnerSize } from '@brkta/ui-core/types/variant';

@Component({
  selector: 'brkta-spinner',
  standalone: true,
  template: `
    <span
      [attr.data-brkta-spinner]="' '"
      [attr.data-size]="size"
      role="status"
      aria-label="Loading"
    >
      <span class="brkta-spinner-sr-label">Loading</span>
    </span>
  `,
})
export class SpinnerComponent {
  @Input() size: SpinnerSize = 'md';
}
