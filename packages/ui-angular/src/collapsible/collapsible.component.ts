import { Component, Input, Output, EventEmitter } from '@angular/core';

let collapsibleCounter = 0;

@Component({
  selector: 'brkta-collapsible',
  standalone: true,
  template: `
    <div data-brkta-collapsible="" [attr.data-compact]="compact ? '' : undefined">
      <button
        data-brkta-collapsible-trigger=""
        [attr.data-disabled]="disabled ? '' : undefined"
        [id]="triggerId"
        [attr.aria-expanded]="currentOpen"
        [attr.aria-controls]="panelId"
        [attr.aria-disabled]="disabled || undefined"
        [disabled]="disabled"
        (click)="toggle()"
        type="button"
      >
        <span>{{ label }}</span>
        <span data-brkta-collapsible-chevron="" aria-hidden="true"></span>
      </button>
      <div
        data-brkta-collapsible-panel=""
        [attr.data-open]="currentOpen ? '' : undefined"
        [id]="panelId"
        role="region"
        [attr.aria-labelledby]="triggerId"
      >
        <div>
          <div data-brkta-collapsible-content="">
            <ng-content></ng-content>
            @if (!hasContent()) {
              {{ content }}
            }
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CollapsibleComponent {
  @Input() label = '';
  @Input() content?: string;
  @Input() open: boolean | undefined = undefined;
  @Input() defaultOpen = false;
  @Input() disabled = false;
  @Input() compact = false;
  @Output() openChange = new EventEmitter<boolean>();

  private instanceId = `collapsible-${++collapsibleCounter}`;
  private internalOpen = false;

  get triggerId(): string { return `collapsible-trigger-${this.instanceId}`; }
  get panelId(): string { return `collapsible-panel-${this.instanceId}`; }

  get currentOpen(): boolean {
    return this.open !== undefined ? this.open : this.internalOpen;
  }

  hasContent(): boolean {
    return false;
  }

  toggle(): void {
    if (this.disabled) return;
    const next = !this.currentOpen;
    if (this.open === undefined) {
      this.internalOpen = next;
    }
    this.openChange.emit(next);
  }

  ngOnInit(): void {
    if (this.open === undefined) {
      this.internalOpen = this.defaultOpen;
    }
  }
}
