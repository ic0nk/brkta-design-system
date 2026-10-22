import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'brkta-item',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>',
  host: {
    '[attr.data-brkta-item]': '""',
    '[attr.data-selected]': 'selected ? "" : null',
    '[attr.data-disabled]': 'disabled ? "" : null',
    '[attr.aria-selected]': 'selected',
    '[attr.aria-disabled]': 'disabled',
  },
  styles: [`:host { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3); border-radius: var(--radius-md); cursor: pointer; transition: background-color var(--duration-fast) var(--ease-out); } :host:hover { background-color: var(--muted); } :host[data-selected] { background-color: var(--muted); } :host[data-disabled] { opacity: 0.4; pointer-events: none; }`],
})
export class ItemComponent {
  @Input() selected = false;
  @Input() disabled = false;
}

@Component({
  selector: 'brkta-item-leading',
  standalone: true,
  template: '<ng-content></ng-content>',
  host: { '[attr.data-brkta-item-leading]': '""' },
  styles: [`:host { display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: var(--radius-md); background: var(--muted); color: var(--muted-foreground); flex-shrink: 0; font-size: 0.875rem; }`],
})
export class ItemLeadingComponent {}

@Component({
  selector: 'brkta-item-body',
  standalone: true,
  template: '<ng-content></ng-content>',
  host: { '[attr.data-brkta-item-body]': '""' },
  styles: [`:host { flex: 1; min-width: 0; }`],
})
export class ItemBodyComponent {}

@Component({
  selector: 'brkta-item-title',
  standalone: true,
  template: '<ng-content></ng-content>',
  host: { '[attr.data-brkta-item-title]': '""' },
  styles: [`:host { display: block; font-size: 0.875rem; font-weight: 500; color: var(--foreground); }`],
})
export class ItemTitleComponent {}

@Component({
  selector: 'brkta-item-description',
  standalone: true,
  template: '<ng-content></ng-content>',
  host: { '[attr.data-brkta-item-description]': '""' },
  styles: [`:host { display: block; font-size: 0.75rem; color: var(--muted-foreground); margin-top: 2px; }`],
})
export class ItemDescriptionComponent {}

@Component({
  selector: 'brkta-item-trailing',
  standalone: true,
  template: '<ng-content></ng-content>',
  host: { '[attr.data-brkta-item-trailing]': '""' },
  styles: [`:host { display: flex; align-items: center; gap: var(--space-2); color: var(--muted-foreground); font-size: 0.75rem; }`],
})
export class ItemTrailingComponent {}
