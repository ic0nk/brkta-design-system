import { NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, Directive, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import type { InputVariant, InputSize } from '@brkta/ui-core/types/variant';

@Directive({
  selector: '[brktaInputSuffix]',
  standalone: true,
})
export class InputSuffixDirective {}

@Component({
  selector: 'brkta-input',
  standalone: true,
  imports: [NgTemplateOutlet],
  styles: [':host { display: contents; }'],
  template: `
    @if (suffix) {
      <span
        data-brkta-input-container=""
        [attr.data-variant]="variant"
        [attr.data-size]="size"
        [attr.data-invalid]="invalid || undefined"
        [attr.data-disabled]="disabled || undefined"
      >
        <ng-container *ngTemplateOutlet="inputTemplate" />
        <span data-brkta-input-suffix=""><ng-content select="[brktaInputSuffix]"></ng-content></span>
      </span>
    } @else {
      <ng-container *ngTemplateOutlet="inputTemplate" />
    }

    <ng-template #inputTemplate>
      <input
        data-brkta-input=""
        [attr.data-variant]="variant"
        [attr.data-size]="size"
        [attr.data-invalid]="invalid || undefined"
        [attr.data-disabled]="disabled || undefined"
        [attr.aria-invalid]="invalid || undefined"
        [disabled]="disabled || undefined"
        [readonly]="readonly || undefined"
        [value]="value"
        [placeholder]="placeholder"
        [attr.id]="id || undefined"
        [attr.name]="name"
        [attr.type]="type"
        [attr.accept]="accept || undefined"
        [attr.multiple]="multiple ? '' : null"
        [attr.autocomplete]="autocomplete || undefined"
        [attr.aria-label]="ariaLabel || undefined"
        [attr.inputmode]="inputMode || undefined"
        [attr.aria-describedby]="ariaDescribedBy || undefined"
        (input)="handleInput($event)"
      />
    </ng-template>
  `,
})
export class InputComponent {
  @ContentChild(InputSuffixDirective) suffix?: InputSuffixDirective;
  @HostBinding('attr.id') readonly hostId: null = null;

  @Input() variant: InputVariant = 'default';
  @Input() size: InputSize = 'md';
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() readonly = false;
  @Input() required = false;
  @Input() type = 'text';
  @Input() accept = '';
  @Input() multiple = false;
  @Input() value = '';
  @Input() id = '';
  @Input() name = '';
  @Input() autocomplete = '';
  @Input() ariaDescribedBy = '';

  /**
   * An accessible name for an input that has no visible label beside it.
   *
   * The sibling select has carried this since it was written; the input had only
   * aria-describedby, which describes a field rather than naming one. A grid of fields — a row of
   * cells under one set of headings — has nowhere to put a visible label per cell, and without a
   * name each one is announced as "edit text" and nothing else.
   */
  @Input() ariaLabel = '';

  /** Which keyboard a phone offers. A price field that opens a full QWERTY is a small daily tax. */
  @Input() inputMode = '';
  @Output() valueChange = new EventEmitter<string>();
  @Output() onInput = new EventEmitter<Event>();

  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.valueChange.emit(target.value);
    this.onInput.emit(event);
  }
}
