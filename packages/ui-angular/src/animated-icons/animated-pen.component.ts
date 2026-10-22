import { Component, Input } from '@angular/core';

@Component({
  selector: 'brkta-animated-pen',
  standalone: true,
  template: `
    <svg
      class="brkta-icon-motion brkta-icon-motion-pen"
      [attr.width]="size" [attr.height]="size"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
      <path d="m15 5 4 4"/>
    </svg>
  `,
})
export class AnimatedPenComponent {
  @Input() size = 20;
}
