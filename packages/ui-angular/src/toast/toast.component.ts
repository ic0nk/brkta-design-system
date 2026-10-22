import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DEFAULT_TOAST_DURATION } from '@brkta/ui-core/toast/toast-contract';

@Component({
  selector: 'brkta-toast',
  standalone: true,
  styles: [':host { display: contents; }'],
  template: `
    @if (visible || closing) {
      <div class="glass-elevated" data-brkta-toast="" [attr.data-variant]="variant" [attr.role]="variant === 'destructive' ? 'alert' : 'status'" [attr.aria-live]="variant === 'destructive' ? 'assertive' : 'polite'" [attr.data-closing]="closing ? '' : undefined" (mouseenter)="pauseAutoDismiss()" (mouseleave)="resumeAutoDismiss()">
        <div>
          @if (title) { <div data-brkta-toast-title="">{{ title }}</div> }
          @if (description) { <div data-brkta-toast-description="">{{ description }}</div> }
        </div>
        @if (dismissible) {
          <button data-brkta-toast-close="" [attr.aria-label]="dismissLabel" (click)="dismiss()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        }
      </div>
    }
  `,
})
export class ToastComponent implements OnDestroy {
  @Input() dismissLabel = 'Dismiss';
  @Input() title?: string;
  @Input() description?: string;
  @Input() variant: 'default' | 'success' | 'warning' | 'destructive' = 'default';
  @Input() duration?: number;
  @Input() dismissible = true;
  @Output() toastDismiss = new EventEmitter<void>();
  visible = true;
  closing = false;
  private autoDismissTimer?: ReturnType<typeof setTimeout>;
  private closingTimer?: ReturnType<typeof setTimeout>;
  private autoDismissStartedAt = 0;
  private remainingDuration = 0;
  private autoDismissPaused = false;
  private dismissStarted = false;

  ngOnInit(): void {
    this.remainingDuration = this.duration ?? DEFAULT_TOAST_DURATION;
    if (this.remainingDuration > 0) this.scheduleAutoDismiss();
  }

  ngOnDestroy(): void {
    this.clearAutoDismissTimer();
    if (this.closingTimer) clearTimeout(this.closingTimer);
  }

  pauseAutoDismiss(): void {
    if (this.autoDismissPaused || !this.autoDismissTimer || this.dismissStarted) return;

    this.clearAutoDismissTimer();
    this.remainingDuration = Math.max(0, this.remainingDuration - (Date.now() - this.autoDismissStartedAt));
    this.autoDismissPaused = true;
  }

  resumeAutoDismiss(): void {
    if (!this.autoDismissPaused || this.dismissStarted) return;

    this.autoDismissPaused = false;
    if (this.remainingDuration <= 0) {
      this.dismiss();
      return;
    }
    this.scheduleAutoDismiss();
  }

  dismiss(): void {
    if (this.dismissStarted) return;
    this.dismissStarted = true;
    this.clearAutoDismissTimer();
    this.closing = true;
    this.closingTimer = setTimeout(() => {
      this.visible = false;
      this.closing = false;
      this.toastDismiss.emit();
    }, 200);
  }

  private scheduleAutoDismiss(): void {
    this.clearAutoDismissTimer();
    this.autoDismissStartedAt = Date.now();
    this.autoDismissTimer = setTimeout(() => this.dismiss(), this.remainingDuration);
  }

  private clearAutoDismissTimer(): void {
    if (!this.autoDismissTimer) return;
    clearTimeout(this.autoDismissTimer);
    this.autoDismissTimer = undefined;
  }
}

@Component({
  selector: 'brkta-toast-viewport',
  standalone: true,
  template: `<div data-brkta-toast-viewport=""><ng-content></ng-content></div>`,
})
export class ToastViewportComponent {}
