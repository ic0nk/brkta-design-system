import { Component, Input } from '@angular/core';

@Component({
  selector: 'brkta-animated-bell',
  standalone: true,
  template: `
    <svg
      class="brkta-icon-motion brkta-icon-motion-bell"
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
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  `,
})
export class AnimatedBellComponent {
  @Input() size = 20;
}
