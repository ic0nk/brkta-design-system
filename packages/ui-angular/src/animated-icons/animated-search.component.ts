import { Component, Input } from '@angular/core';

@Component({
  selector: 'brkta-animated-search',
  standalone: true,
  template: `
    <svg
      class="brkta-icon-motion brkta-icon-motion-search"
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
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  `,
})
export class AnimatedSearchComponent {
  @Input() size = 20;
}
