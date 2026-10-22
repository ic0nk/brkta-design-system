import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'brkta-switch',
  standalone: true,
  styles: [':host { display: contents; }'],
  template: `
    <label
      data-brkta-switch=""
      [attr.data-disabled]="disabled || undefined"
    >
      <input
        type="checkbox"
        role="switch"
        [checked]="checked"
        [disabled]="disabled || undefined"
        [attr.aria-label]="ariaLabel"
        [attr.aria-describedby]="ariaDescribedBy || undefined"
        (change)="onToggle()"
      />
      <span class="brkta-switch-track" aria-hidden="true">
        <span class="brkta-switch-thumb"></span>
      </span>
      <ng-content></ng-content>
    </label>
  `,
})
export class SwitchComponent {
  @Input() checked = false;
  @Input() disabled = false;
  @Input() required = false;
  @Input() ariaLabel = '';
  @Input() ariaDescribedBy = '';
  @Output() checkedChange = new EventEmitter<boolean>();

  onToggle(): void {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}
