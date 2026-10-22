import { Component, Input } from '@angular/core';

@Component({
  selector: 'brkta-animated-copy',
  standalone: true,
  template: `
    <svg
      class="brkta-icon-motion brkta-icon-motion-copy"
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
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  `,
})
export class AnimatedCopyComponent {
  @Input() size = 20;
}
