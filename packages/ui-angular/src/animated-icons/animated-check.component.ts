import { Component, Input } from '@angular/core';

@Component({
  selector: 'brkta-animated-check',
  standalone: true,
  template: `
    <svg
      class="brkta-icon-motion brkta-icon-motion-check"
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
      <path d="M20 6L9 17l-5-5" />
    </svg>
  `,
})
export class AnimatedCheckComponent {
  @Input() size = 20;
}
