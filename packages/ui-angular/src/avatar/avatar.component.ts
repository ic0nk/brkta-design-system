import { Component, Input, signal } from '@angular/core';
import type { AvatarSize } from '@brkta/ui-core/types/variant';

type AvatarStatus = 'online' | 'away' | 'busy' | 'offline';

@Component({
  selector: 'brkta-avatar',
  standalone: true,
  template: `
    <span
      [attr.data-brkta-avatar]="' '"
      [attr.data-size]="size"
    >
      @if (src && !imgError()) {
        <img [src]="src" [alt]="alt" (error)="imgError.set(true)" />
      } @else if (fallback) {
        <span data-brkta-avatar-fallback="" aria-hidden="true">{{ fallback.slice(0, 2) }}</span>
      }
      @if (status) {
        <span [attr.data-brkta-avatar-status]="' '" [attr.data-status]="status" [attr.aria-label]="status"></span>
      }
    </span>
  `,
})
export class AvatarComponent {
  @Input() size: AvatarSize = 'md';
  @Input() src = '';
  @Input() alt = '';
  @Input() fallback = '';
  @Input() status: AvatarStatus | '' = '';

  protected imgError = signal(false);
}
