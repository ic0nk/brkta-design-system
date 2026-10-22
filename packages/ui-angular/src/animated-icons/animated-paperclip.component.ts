import { Component, Input } from '@angular/core';

@Component({
  selector: 'brkta-animated-paperclip',
  standalone: true,
  template: `
    <svg class="brkta-icon-motion brkta-icon-motion-paperclip" [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  `,
})
export class AnimatedPaperclipComponent {
  @Input() size = 20;
}
