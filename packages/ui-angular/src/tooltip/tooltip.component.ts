import { Component, Input, ElementRef, inject } from '@angular/core';

@Component({
  selector: 'brkta-tooltip',
  standalone: true,
  styles: [':host { display: contents; }'],
  template: `
    <div data-brkta-tooltip="" [attr.data-open]="open ? '' : undefined"
      (mouseenter)="show()" (mouseleave)="hide()" (focusin)="show()" (focusout)="hide()"
    >
      <span data-brkta-tooltip-trigger="" [attr.aria-describedby]="tooltipId" tabindex="0">
        <ng-content></ng-content>
      </span>
      @if (open || closing) {
        <div data-brkta-tooltip-content="" [attr.data-closing]="closing ? '' : undefined"
          [id]="tooltipId" role="tooltip">{{ content }}</div>
      }
    </div>
  `,
})
export class TooltipComponent {
  @Input() content = '';
  @Input() delay = 500;
  @Input() open = false;
  closing = false;
  private timer: ReturnType<typeof setTimeout> | null = null;
  private closeTimer: ReturnType<typeof setTimeout> | null = null;
  tooltipId = `tt-${Math.random().toString(36).slice(2)}`;

  show(): void {
    if (this.closeTimer) clearTimeout(this.closeTimer);
    this.timer = setTimeout(() => { this.open = true; this.closing = false; }, this.delay);
  }
  hide(): void {
    if (this.timer) clearTimeout(this.timer);
    this.closing = true;
    this.closeTimer = setTimeout(() => { this.open = false; this.closing = false; }, 160);
  }
}
