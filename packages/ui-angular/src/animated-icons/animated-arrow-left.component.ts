import { Component, Input } from '@angular/core';

/**
 * Animated arrow-left icon — BRKTA-owned wrapper around the Lucide arrow-left
 * SVG path. Applies shared hover/focus motion classes from icon-motion.css.
 */
@Component({
  selector: 'brkta-animated-arrow-left',
  standalone: true,
  template: `
    <svg
      class="brkta-icon-motion brkta-icon-motion-arrow-left"
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
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </svg>
  `,
})
export class AnimatedArrowLeftComponent {
  @Input() size = 20;
}
