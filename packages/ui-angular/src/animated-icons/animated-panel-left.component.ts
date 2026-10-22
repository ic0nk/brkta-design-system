import { Component, Input } from '@angular/core';

/**
 * Animated panel-left icon — renders the open affordance while collapsed
 * and the close affordance while expanded.
 */
@Component({
  selector: 'brkta-animated-panel-left',
  standalone: true,
  template: `
    <svg
      class="brkta-icon-motion brkta-icon-motion-panel-left"
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
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M9 3v18" />
      @if (collapsed) {
        <path d="m14 9 3 3-3 3" />
      } @else {
        <path d="m16 15-3-3 3-3" />
      }
    </svg>
  `,
})
export class AnimatedPanelLeftComponent {
  @Input() size = 20;
  @Input() collapsed = false;
}
