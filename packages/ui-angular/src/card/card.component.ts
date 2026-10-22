import { Component, Input } from '@angular/core';
import type { CardVariant } from '@brkta/ui-core/types/variant';

@Component({
  selector: 'brkta-card',
  standalone: true,
  styles: [':host { display: contents; }'],
  template: `
    <div
      [attr.data-brkta-card]="' '"
      [attr.data-variant]="variant"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class CardComponent {
  @Input() variant: CardVariant = 'default';
}

@Component({
  selector: 'brkta-card-header',
  standalone: true,
  template: `
    <div data-brkta-card-header="">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardHeaderComponent {}

@Component({
  selector: 'brkta-card-title',
  standalone: true,
  template: `
    <h3 data-brkta-card-title="">
      <ng-content></ng-content>
    </h3>
  `,
})
export class CardTitleComponent {}

@Component({
  selector: 'brkta-card-description',
  standalone: true,
  template: `
    <p data-brkta-card-description="">
      <ng-content></ng-content>
    </p>
  `,
})
export class CardDescriptionComponent {}

@Component({
  selector: 'brkta-card-content',
  standalone: true,
  template: `
    <div data-brkta-card-content="">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardContentComponent {}

@Component({
  selector: 'brkta-card-footer',
  standalone: true,
  template: `
    <div data-brkta-card-footer="">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardFooterComponent {}
