import { Component, Input } from '@angular/core';

@Component({
  selector: 'brkta-animated-trash',
  standalone: true,
  template: `
    <svg
      class="brkta-icon-motion brkta-icon-motion-trash"
      [attr.width]="size" [attr.height]="size"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M3 6h18"/>
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
    </svg>
  `,
})
export class AnimatedTrashComponent {
  @Input() size = 20;
}
