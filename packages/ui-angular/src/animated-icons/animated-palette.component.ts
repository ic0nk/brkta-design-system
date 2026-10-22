import { Component, Input } from '@angular/core';

@Component({
  selector: 'brkta-animated-palette',
  standalone: true,
  template: `
    <svg class="brkta-icon-motion brkta-icon-motion-palette" [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2a10 10 0 0 0 0 20h.5a2 2 0 0 0 1.936-2.5A2 2 0 0 1 16.37 17H18a4 4 0 0 0 4-4A10 10 0 0 0 12 2Z" />
    </svg>
  `,
})
export class AnimatedPaletteComponent {
  @Input() size = 20;
}
