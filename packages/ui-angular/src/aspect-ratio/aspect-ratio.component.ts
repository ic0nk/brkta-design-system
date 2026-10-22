import { Component, Input } from '@angular/core';

@Component({
  selector: 'brkta-aspect-ratio',
  standalone: true,
  template: '<ng-content select="brkta-aspect-ratio-inner"></ng-content>',
  host: {
    '[attr.data-brkta-aspect-ratio]': '""',
    '[style.--aspect-w]': 'ratio[0]',
    '[style.--aspect-h]': 'ratio[1]',
  },
  styles: [`
    :host { position: relative; display: block; width: 100%; overflow: hidden; }
    :host::before { content: ''; display: block; padding-bottom: calc(100% / (var(--aspect-w, 16) / var(--aspect-h, 9))); }
  `],
})
export class AspectRatioComponent {
  @Input() ratio: [number, number] = [16, 9];
}

@Component({
  selector: 'brkta-aspect-ratio-inner',
  standalone: true,
  host: { '[attr.data-brkta-aspect-ratio-inner]': '""' },
  styles: [`:host { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }`],
  template: '<ng-content></ng-content>',
})
export class AspectRatioInnerComponent {}
