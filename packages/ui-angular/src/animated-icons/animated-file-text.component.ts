import { Component, Input } from '@angular/core';

@Component({
  selector: 'brkta-animated-file-text',
  standalone: true,
  template: `<svg class="brkta-icon-motion brkta-icon-motion-file-text" [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h8"/><path d="M8 9h2"/></svg>`,
})
export class AnimatedFileTextComponent {
  @Input() size = 20;
}
