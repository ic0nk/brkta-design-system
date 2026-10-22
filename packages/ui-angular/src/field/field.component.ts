import { Component, Input } from '@angular/core';

@Component({
  selector: 'brkta-field',
  standalone: true,
  styles: [':host { display: contents; }'],
  template: `
    <div
      data-brkta-field=""
      [attr.data-invalid]="invalid || undefined"
      [attr.data-disabled]="disabled || undefined"
      [attr.data-required]="required || undefined"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class FieldComponent {
  @Input() invalid = false;
  @Input() disabled = false;
  @Input() required = false;
}
