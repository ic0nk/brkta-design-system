import { Component, Input } from '@angular/core';

@Component({
  selector: 'brkta-field-help',
  standalone: true,
  styles: [':host { display: contents; }'],
  template: `
    <p data-brkta-field-help="" [attr.id]="id || null">
      <ng-content></ng-content>
    </p>
  `,
})
export class FieldHelpComponent {
  @Input() id?: string;
}
