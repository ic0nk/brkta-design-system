import { Component, Input } from '@angular/core';

/**
 * Animated log-out icon — BRKTA-owned wrapper around the Lucide log-out
 * SVG path. Applies shared hover/focus motion classes from icon-motion.css.
 */
@Component({
  selector: 'brkta-animated-log-out',
  standalone: true,
  template: `
    <svg
      class="brkta-icon-motion brkta-icon-motion-log-out"
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
      <path d="m10 17 5-5-5-5" />
      <path d="M15 12H3" />
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    </svg>
  `,
})
export class AnimatedLogOutComponent {
  @Input() size = 20;
}
