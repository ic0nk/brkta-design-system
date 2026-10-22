import { Component, Input } from '@angular/core';
import type { AlertVariant } from '@brkta/ui-core/types/variant';

@Component({
  selector: 'brkta-alert',
  standalone: true,
  styles: [':host { display: contents; }'],
  template: `
    <div
      [attr.data-brkta-alert]="' '"
      [attr.data-variant]="variant"
      role="alert"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class AlertComponent {
  @Input() variant: AlertVariant = 'information';
}

@Component({
  selector: 'brkta-alert-title',
  standalone: true,
  template: `
    <h5 data-brkta-alert-title="">
      <ng-content></ng-content>
    </h5>
  `,
})
export class AlertTitleComponent {}

@Component({
  selector: 'brkta-alert-description',
  standalone: true,
  template: `
    <div data-brkta-alert-description="">
      <ng-content></ng-content>
    </div>
  `,
})
export class AlertDescriptionComponent {}
