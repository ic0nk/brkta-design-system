import { Component, Input } from '@angular/core';

/** Animated sun icon — BRKTA-owned wrapper around the shared Lucide SVG source. */
@Component({
  selector: 'brkta-animated-sun',
  standalone: true,
  template: `
    <svg class="brkta-icon-motion brkta-icon-motion-theme brkta-icon-motion-sun" [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  `,
})
export class AnimatedSunComponent {
  @Input() size = 20;
}
