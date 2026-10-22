import { Component, Input } from '@angular/core';

/** Animated eye-off icon — BRKTA-owned wrapper around the Lucide eye-off SVG path. */
@Component({
  selector: 'brkta-animated-eye-off',
  standalone: true,
  template: `
    <svg
      class="brkta-icon-motion brkta-icon-motion-eye-off"
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
      <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-4.253 5.26" />
      <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
      <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.15 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.251-5.26" />
      <path d="m2 2 20 20" />
    </svg>
  `,
})
export class AnimatedEyeOffComponent {
  @Input() size = 20;
}
