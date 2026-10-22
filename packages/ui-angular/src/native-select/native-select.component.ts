import { Component, Input } from '@angular/core';
import type { NativeSelectVariant, NativeSelectSize } from '@brkta/ui-core/types/variant';

@Component({
  selector: 'brkta-native-select',
  standalone: true,
  styles: [':host { display: contents; }'],
  template: `
    <select
      data-brkta-native-select=""
      [attr.data-variant]="variant"
      [attr.data-size]="size"
      [attr.data-invalid]="invalid || undefined"
      [attr.data-disabled]="disabled || undefined"
      [disabled]="disabled || undefined"
      [attr.name]="name"
      [attr.aria-describedby]="ariaDescribedBy || undefined"
    >
      <ng-content></ng-content>
    </select>
  `,
})
export class NativeSelectComponent {
  @Input() variant: NativeSelectVariant = 'default';
  @Input() size: NativeSelectSize = 'md';
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() required = false;
  @Input() name = '';
  @Input() ariaDescribedBy = '';
}
