import { Component, Input } from '@angular/core';

@Component({
  selector: 'brkta-animated-mail',
  standalone: true,
  template: `
    <svg
      class="brkta-icon-motion brkta-icon-motion-mail"
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  `,
})
export class AnimatedMailComponent {
  @Input() size = 20;
}
