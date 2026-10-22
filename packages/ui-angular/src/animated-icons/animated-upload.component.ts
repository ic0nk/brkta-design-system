import { Component, Input } from '@angular/core';

@Component({
  selector: 'brkta-animated-upload',
  standalone: true,
  template: `
    <svg
      class="brkta-icon-motion brkta-icon-motion-upload"
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
      <path d="M12 3v12" />
      <path d="m7 8 5-5 5 5" />
      <path d="M5 21h14" />
    </svg>
  `,
})
export class AnimatedUploadComponent {
  @Input() size = 32;
}
