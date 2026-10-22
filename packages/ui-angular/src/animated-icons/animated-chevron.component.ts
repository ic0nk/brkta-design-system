import { Component, Input } from '@angular/core';

@Component({
  selector: 'brkta-animated-chevron',
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
      @if (direction === 'left') {
        <path d="m15 18-6-6 6-6" />
      } @else if (direction === 'right') {
        <path d="m9 18 6-6-6-6" />
      } @else if (direction === 'up') {
        <path d="m18 15-6-6-6 6" />
      } @else {
        <path d="m6 9 6 6 6-6" />
      }
    </svg>
  `,
})
export class AnimatedChevronComponent {
  @Input() size = 20;
  @Input() direction: 'left' | 'right' | 'up' | 'down' = 'right';
}
