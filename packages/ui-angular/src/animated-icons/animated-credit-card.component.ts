import { Component, Input } from '@angular/core';

@Component({
  selector: 'brkta-animated-credit-card',
  standalone: true,
  template: `<svg class="brkta-icon-motion brkta-icon-motion-credit-card" [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/><path d="M6 15h2"/><path d="M10 15h4"/></svg>`,
})
export class AnimatedCreditCardComponent {
  @Input() size = 20;
}
