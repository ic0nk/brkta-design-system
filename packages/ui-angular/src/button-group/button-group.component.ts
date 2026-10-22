import { Component, Input } from '@angular/core';

@Component({
  selector: 'brkta-button-group',
  standalone: true,
  template: `
    <div
      data-brkta-button-group=""
      [attr.data-orientation]="orientation"
      [attr.data-disabled]="disabled ? '' : undefined"
      [attr.aria-disabled]="disabled ? true : undefined"
      role="group"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class ButtonGroupComponent {
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() disabled = false;
}
