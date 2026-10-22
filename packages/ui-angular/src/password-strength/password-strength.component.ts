import { Component, Input } from '@angular/core';
import { ProgressComponent } from '../progress/progress.component';

@Component({
  selector: 'brkta-password-strength',
  standalone: true,
  imports: [ProgressComponent],
  template: `
    <div data-brkta-password-strength="">
      <brkta-progress [value]="score" [max]="max" size="sm" [ariaLabel]="ariaLabel || label + ': ' + description"></brkta-progress>
      <span data-brkta-password-strength-status="" role="status" aria-live="polite">{{ label }}: {{ description }}</span>
    </div>
  `,
})
export class PasswordStrengthComponent {
  @Input() score = 0;
  @Input() max = 4;
  @Input() label = '';
  @Input() description = '';
  @Input() ariaLabel = '';
}
