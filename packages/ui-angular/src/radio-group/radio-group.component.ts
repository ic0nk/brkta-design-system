import { Component, Input } from '@angular/core';

@Component({
  selector: 'brkta-radio-group',
  standalone: true,
  styles: [':host { display: contents; }'],
  template: `
    <div
      data-brkta-radio-group=""
      [attr.data-orientation]="orientation"
      [attr.data-invalid]="invalid || undefined"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class RadioGroupComponent {
  @Input() orientation: 'horizontal' | 'vertical' = 'vertical';
  @Input() invalid = false;
}

@Component({
  selector: 'brkta-radio',
  standalone: true,
  styles: [':host { display: contents; }'],
  template: `
    <label data-brkta-radio="" [attr.data-disabled]="disabled || undefined">
      <input
        type="radio"
        [value]="value"
        [checked]="checked"
        [disabled]="disabled || undefined"
        [attr.name]="name"
      />
      <span class="brkta-radio-indicator" aria-hidden="true"></span>
      <ng-content></ng-content>
    </label>
  `,
})
export class RadioComponent {
  @Input() value = '';
  @Input() checked = false;
  @Input() disabled = false;
  @Input() name = '';
}
