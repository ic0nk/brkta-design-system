import { Component, Input } from '@angular/core';

/**
 * Animated locate icon — BRKTA-owned wrapper around the Lucide locate
 * SVG path. Applies shared hover/focus motion classes from icon-motion.css.
 */
@Component({
  selector: 'brkta-animated-locate',
  standalone: true,
  template: `
    <svg
      class="brkta-icon-motion brkta-icon-motion-locate"
      [attr.width]="size"
      [attr.height]="size"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <line x1="2" x2="5" y1="12" y2="12" />
      <line x1="19" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="5" />
      <line x1="12" x2="12" y1="19" y2="22" />
      <circle cx="12" cy="12" r="7" />
    </svg>
  `,
})
export class AnimatedLocateComponent {
  @Input() size = 20;
}
