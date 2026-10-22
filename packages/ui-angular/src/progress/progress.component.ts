import { Component, Input } from '@angular/core';

@Component({
  selector: 'brkta-progress',
  standalone: true,
  styles: [':host { display: contents; }'],
  template: `
    <div
      [attr.data-brkta-progress]="' '"
      [attr.data-size]="size"
      role="progressbar"
      [attr.aria-valuenow]="value"
      aria-valuemin="0"
      [attr.aria-valuemax]="max"
      [attr.aria-label]="ariaLabel || percentLabel"
    >
      <div
        data-brkta-progress-indicator=""
        [style.width.%]="clampedPercent"
      ></div>
    </div>
  `,
})
export class ProgressComponent {
  @Input() value = 0;
  @Input() max = 100;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() ariaLabel = '';

  get clampedPercent(): number {
    return Math.min(Math.max(0, (this.value / this.max) * 100), 100);
  }

  get percentLabel(): string {
    return `${Math.round(this.clampedPercent)}%`;
  }
}
