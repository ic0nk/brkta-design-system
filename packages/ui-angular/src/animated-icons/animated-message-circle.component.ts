import { Component, Input } from '@angular/core';

@Component({
  selector: 'brkta-animated-message-circle',
  standalone: true,
  template: `
    <svg
      class="brkta-icon-motion brkta-icon-motion-message-circle"
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
      <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
    </svg>
  `,
})
export class AnimatedMessageCircleComponent {
  @Input() size = 20;
}
