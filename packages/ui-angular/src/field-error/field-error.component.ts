import { Component, Input } from '@angular/core';

@Component({
  selector: 'brkta-field-error',
  standalone: true,
  styles: [':host { display: contents; }'],
  template: `
    <p data-brkta-field-error="" [attr.id]="id || null" role="alert">
      <ng-content></ng-content>
    </p>
  `,
})
export class FieldErrorComponent {
  @Input() id?: string;
}
