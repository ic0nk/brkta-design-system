import { Component, Input } from '@angular/core';
import type { SeparatorOrientation } from '@brkta/ui-core/types/variant';

@Component({
  selector: 'brkta-separator',
  standalone: true,
  styles: [':host { display: contents; }'],
  template: `
    <div
      [attr.data-brkta-separator]="' '"
      [attr.data-orientation]="orientation"
      role="separator"
      [attr.aria-orientation]="orientation"
    ></div>
  `,
})
export class SeparatorComponent {
  @Input() orientation: SeparatorOrientation = 'horizontal';
}
