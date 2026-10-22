import { Component, Input } from '@angular/core';

@Component({
  selector: 'brkta-animated-calculator',
  standalone: true,
  template: `
    <svg class="brkta-icon-motion brkta-icon-motion-calculator" [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <line x1="8" x2="16" y1="6" y2="6" />
      <path d="M8 10h.01" /><path d="M12 10h.01" /><path d="M16 10h.01" />
      <path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" />
      <path d="M8 18h.01" /><path d="M12 18h.01" /><path d="M16 18h.01" />
    </svg>
  `,
})
export class AnimatedCalculatorComponent {
  @Input() size = 20;
}
