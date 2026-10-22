import { Component, Input } from '@angular/core';

@Component({
  selector: 'brkta-direction',
  standalone: true,
  template: '<ng-content></ng-content>',
  host: {
    '[attr.data-brkta-direction]': '""',
    '[attr.data-dir]': 'dir',
    '[style.direction]': 'dir === "rtl" ? "rtl" : null',
    '[style.text-align]': 'dir === "rtl" ? "end" : null',
  },
  styles: [`:host { display: block; border: 1px solid var(--border); border-radius: var(--radius-md); padding: var(--space-4); min-height: 60px; }`],
})
export class DirectionComponent {
  @Input() dir: 'ltr' | 'rtl' = 'ltr';
}
