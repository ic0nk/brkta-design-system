import { Component, Input } from '@angular/core';

/**
 * Animated arrow-right icon — BRKTA-owned wrapper around the Lucide arrow-right
 * SVG path. Applies shared hover/focus motion classes from icon-motion.css.
 */
@Component({
  selector: 'brkta-animated-arrow-right',
  standalone: true,
  template: `
    <svg
      class="brkta-icon-motion brkta-icon-motion-arrow"
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
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
    </svg>
  `,
})
export class AnimatedArrowRightComponent {
  @Input() size = 20;
}
