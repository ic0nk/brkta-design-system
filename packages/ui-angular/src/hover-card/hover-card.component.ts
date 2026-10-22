import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'brkta-hover-card',
  standalone: true,
  template: `
    <div data-brkta-hover-card-trigger tabindex="0" role="button"
      [attr.aria-expanded]="open()" aria-haspopup="dialog">
      <ng-content select="[brkta-hover-card-trigger]"></ng-content>
    </div>
    @if (open()) {
      <div data-brkta-hover-card-content [attr.data-side]="side"
        [attr.data-closing]="closing() ? '' : null" role="dialog">
        <ng-content></ng-content>
      </div>
    }
  `,
  host: {
    '[attr.data-brkta-hover-card]': '""',
    '(mouseenter)': 'doOpen()',
    '(mouseleave)': 'doClose()',
    '(focusin)': 'doOpen()',
    '(focusout)': 'doClose()',
  },
  styles: [`:host { display: inline-block; position: relative; }`],
})
export class HoverCardComponent {
  @Input() openDelay = 200;
  @Input() closeDelay = 150;
  @Input() side: 'top' | 'bottom' = 'bottom';

  open = signal(false);
  closing = signal(false);
  private openTimer: ReturnType<typeof setTimeout> | null = null;
  private closeTimer: ReturnType<typeof setTimeout> | null = null;

  private clearTimers() {
    if (this.openTimer) { clearTimeout(this.openTimer); this.openTimer = null; }
    if (this.closeTimer) { clearTimeout(this.closeTimer); this.closeTimer = null; }
  }

  doOpen() {
    this.clearTimers();
    this.closing.set(false);
    this.openTimer = setTimeout(() => this.open.set(true), this.openDelay);
  }
  doClose() {
    this.clearTimers();
    this.closing.set(true);
    this.closeTimer = setTimeout(() => { this.open.set(false); this.closing.set(false); }, this.closeDelay);
  }
}
