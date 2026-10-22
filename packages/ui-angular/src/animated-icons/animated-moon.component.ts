import { Component, Input } from '@angular/core';

/** Animated moon icon — BRKTA-owned wrapper around the shared Lucide SVG source. */
@Component({
  selector: 'brkta-animated-moon',
  standalone: true,
  template: `
    <svg class="brkta-icon-motion brkta-icon-motion-theme brkta-icon-motion-moon" [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M20.985 12.486a9 9 0 1 1-9.471-9.471 7 7 0 0 0 9.471 9.471Z" />
    </svg>
  `,
})
export class AnimatedMoonComponent {
  @Input() size = 20;
}
