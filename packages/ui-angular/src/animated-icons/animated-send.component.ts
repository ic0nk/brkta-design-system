import { Component, Input } from '@angular/core';

@Component({
  selector: 'brkta-animated-send',
  standalone: true,
  template: `
    <svg
      class="brkta-icon-motion brkta-icon-motion-send"
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
      <path d="M22 2l-7 20-4-9-9-4z" />
      <path d="M22 2l-11 11" />
    </svg>
  `,
})
export class AnimatedSendComponent {
  @Input() size = 20;
}
