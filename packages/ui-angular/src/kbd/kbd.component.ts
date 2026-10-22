import { Component, Input } from '@angular/core';

@Component({
  selector: 'brkta-kbd',
  standalone: true,
  template: `
    <kbd [attr.data-brkta-kbd]="' '">{{ keys }}</kbd>
  `,
})
export class KbdComponent {
  @Input() keys = '';
}
