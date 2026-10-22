import { Component, Input } from '@angular/core';

@Component({
  selector: 'brkta-toggle-group',
  standalone: true,
  template: '<ng-content></ng-content>',
  host: {
    '[attr.data-brkta-toggle-group]': '""',
    'role': 'group',
    '[attr.aria-multiselectable]': 'type === "multiple" ? true : null',
  },
  styles: [`:host { display: inline-flex; gap: 1px; background: var(--muted); border-radius: var(--radius-md); padding: 2px; }`],
})
export class ToggleGroupComponent {
  @Input() type: 'single' | 'multiple' = 'single';
}
