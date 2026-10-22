import { Component, Input } from '@angular/core';

@Component({
  selector: 'brkta-label',
  standalone: true,
  styles: [':host { display: contents; }'],
  template: `
    <label
      [attr.data-brkta-label]="' '"
      [attr.data-required]="required || undefined"
      [attr.data-disabled]="disabled || undefined"
      [attr.for]="htmlFor"
    >
      <ng-content></ng-content>
    </label>
  `,
})
export class LabelComponent {
  @Input() htmlFor?: string;
  @Input() required?: boolean;
  @Input() disabled?: boolean;
}
