import { Component, Input } from '@angular/core';

@Component({
  selector: 'brkta-input-group',
  standalone: true,
  template: '<ng-content></ng-content>',
  host: {
    '[attr.data-brkta-input-group]': '""',
    '[attr.data-disabled]': 'disabled ? "" : null',
    '[attr.data-invalid]': 'invalid ? "" : null',
  },
  styles: [`:host { display: flex; align-items: center; border: 1px solid var(--border); border-radius: var(--radius-md); background: var(--card); overflow: hidden; transition: border-color var(--duration-fast) var(--ease-out); } :host:focus-within { border-color: var(--ring); box-shadow: 0 0 0 1px var(--ring); } :host[data-disabled] { opacity: 0.4; pointer-events: none; } :host[data-invalid] { border-color: var(--destructive); }`],
})
export class InputGroupComponent {
  @Input() disabled = false;
  @Input() invalid = false;
}

@Component({
  selector: 'brkta-input-group-addon',
  standalone: true,
  template: '<ng-content></ng-content>',
  host: { '[attr.data-brkta-input-group-addon]': '""' },
  styles: [`:host { display: flex; align-items: center; padding: 0 var(--space-3); color: var(--muted-foreground); font-size: 0.875rem; white-space: nowrap; }`],
})
export class InputGroupAddonComponent {}
