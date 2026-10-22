import { Component, Input } from '@angular/core';

@Component({
  selector: 'brkta-animated-book-open',
  standalone: true,
  template: `<svg class="brkta-icon-motion brkta-icon-motion-book-open" [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 7v14"/><path d="M3 18a4 4 0 0 1 4-4h5V3H7a4 4 0 0 0-4 4Z"/><path d="M21 18a4 4 0 0 0-4-4h-5V3h5a4 4 0 0 1 4 4Z"/></svg>`,
})
export class AnimatedBookOpenComponent {
  @Input() size = 20;
}
