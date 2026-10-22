import { Component, Input } from '@angular/core';

@Component({
  selector: 'brkta-animated-plus',
  standalone: true,
  template: `
    <svg
      class="brkta-icon-motion brkta-icon-motion-plus"
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
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  `,
})
export class AnimatedPlusComponent {
  @Input() size = 20;
}
