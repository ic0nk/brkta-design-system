import { Component, Input } from '@angular/core';

@Component({
  selector: 'brkta-field-description',
  standalone: true,
  styles: [':host { display: contents; }'],
  template: `
    <p data-brkta-field-description="" [attr.id]="id || null">
      <ng-content></ng-content>
    </p>
  `,
})
export class FieldDescriptionComponent {
  @Input() id?: string;
}
