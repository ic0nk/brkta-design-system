import { Component, Input } from '@angular/core';

@Component({
  selector: 'brkta-empty-state',
  standalone: true,
  template: `
    <div data-brkta-empty="" [attr.data-variant]="variant">
      <div data-brkta-empty-icon=""><ng-content select="[icon]"></ng-content></div>
      <div data-brkta-empty-title="">{{ title }}</div>
      @if (description) { <div data-brkta-empty-description="">{{ description }}</div> }
      <div data-brkta-empty-action=""><ng-content select="[action]"></ng-content></div>
    </div>
  `,
})
export class EmptyStateComponent {
  @Input() title = '';
  @Input() description?: string;
  @Input() variant: 'default' | 'compact' = 'default';
}
