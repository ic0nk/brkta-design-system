import { Component, Input, output } from '@angular/core';
import type { ThemeToggleMode, ThemeToggleResolved } from '@brkta/ui-core/theme-toggle/theme-toggle-contract';
import { ButtonComponent } from '../button/button.component';
const MODE_ORDER: readonly ThemeToggleMode[] = ['system', 'light', 'dark'];

@Component({
  selector: 'brkta-theme-toggle',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <brkta-button
      variant="ghost"
      size="icon-md"
      [iconOnly]="true"
      [iconBefore]="iconName"
      [ariaLabel]="ariaLabel"
      [disabled]="disabled"
      data-brkta-theme-toggle
      (click)="cycleMode()"
    ></brkta-button>
  `,
})
export class ThemeToggleComponent {
  @Input() mode: ThemeToggleMode = 'system';
  @Input() resolved: ThemeToggleResolved = 'light';
  @Input() ariaLabel = 'Change theme';
  @Input() disabled = false;
  readonly modeChange = output<ThemeToggleMode>();

  get iconName(): string {
    if (this.mode === 'system') return 'monitor';
    return this.mode === 'dark' ? 'moon' : 'sun';
  }

  cycleMode(): void {
    const nextIndex = (MODE_ORDER.indexOf(this.mode) + 1) % MODE_ORDER.length;
    this.modeChange.emit(MODE_ORDER[nextIndex]);
  }
}
