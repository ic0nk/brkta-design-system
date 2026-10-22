import { Component, Input } from '@angular/core';

@Component({
  selector: 'brkta-animated-phone',
  standalone: true,
  template: `
    <svg
      class="brkta-icon-motion brkta-icon-motion-phone"
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
      <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.444A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.821 1.611l-.444.355a1 1 0 0 0-.303 1.213 14 14 0 0 0 7.4 7.4z" />
    </svg>
  `,
})
export class AnimatedPhoneComponent {
  @Input() size = 20;
}
