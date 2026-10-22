import { Component, Input } from '@angular/core';

/** Animated eye icon — BRKTA-owned wrapper around the Lucide eye SVG path. */
@Component({
  selector: 'brkta-animated-eye',
  standalone: true,
  template: `
    <svg
      class="brkta-icon-motion brkta-icon-motion-eye"
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
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  `,
})
export class AnimatedEyeComponent {
  @Input() size = 20;
}
