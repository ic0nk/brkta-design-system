import { Component, Input, Output, EventEmitter } from '@angular/core';
import type { TextareaVariant, TextareaSize } from '@brkta/ui-core/types/variant';

@Component({
  selector: 'brkta-textarea',
  standalone: true,
  styles: [':host { display: contents; }'],
  template: `
    <textarea
      data-brkta-textarea=""
      [attr.data-variant]="variant"
      [attr.data-size]="size"
      [attr.data-invalid]="invalid || undefined"
      [attr.data-disabled]="disabled || undefined"
      [attr.aria-invalid]="invalid || undefined"
      [disabled]="disabled || undefined"
      [readonly]="readonly || undefined"
      [value]="value"
      [placeholder]="placeholder"
      [attr.name]="name"
      [attr.rows]="rows"
      [attr.aria-describedby]="ariaDescribedBy || undefined"
      (input)="handleInput($event)"
    ></textarea>
  `,
})
export class TextareaComponent {
  @Input() variant: TextareaVariant = 'default';
  @Input() size: TextareaSize = 'md';
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() readonly = false;
  @Input() required = false;
  @Input() value = '';
  @Input() name = '';
  @Input() rows = 3;
  @Input() ariaDescribedBy = '';
  @Output() valueChange = new EventEmitter<string>();
  @Output() onInput = new EventEmitter<Event>();

  handleInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.valueChange.emit(target.value);
    this.onInput.emit(event);
  }
}
