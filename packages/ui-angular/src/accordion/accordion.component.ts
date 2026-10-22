import { Component, Input, Output, EventEmitter, ViewChildren, QueryList, ElementRef } from '@angular/core';
import type { AccordionItemContract } from '@brkta/ui-core/accordion/accordion-contract';

@Component({
  selector: 'brkta-accordion',
  standalone: true,
  template: `
    <div data-brkta-accordion="">
      @for (item of items; track item.value; let i = $index) {
        <div data-brkta-accordion-item="">
          <button
            #triggerBtn
            data-brkta-accordion-trigger=""
            [attr.data-disabled]="item.disabled ? '' : undefined"
            [id]="'accordion-trigger-' + item.value"
            [attr.aria-expanded]="isOpen(item.value)"
            [attr.aria-controls]="'accordion-panel-' + item.value"
            [attr.aria-disabled]="item.disabled || undefined"
            [disabled]="item.disabled"
            (click)="toggle(item.value)"
            (keydown)="onKeyDown($event, i)"
            type="button"
          >
            <span>{{ item.label }}</span>
            <span data-brkta-accordion-chevron="" aria-hidden="true"></span>
          </button>
          <div
            data-brkta-accordion-panel=""
            [attr.data-open]="isOpen(item.value) ? '' : undefined"
            [id]="'accordion-panel-' + item.value"
            role="region"
            [attr.aria-labelledby]="'accordion-trigger-' + item.value"
          >
            <div>
              <div data-brkta-accordion-content="">
                {{ item.content }}
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
})
export class AccordionComponent {
  @Input() items: AccordionItemContract[] = [];
  @Input() value: string | string[] | undefined = undefined;
  @Input() defaultValue: string | string[] | undefined = undefined;
  @Input() multiple = false;
  @Output() valueChange = new EventEmitter<string | string[]>();

  @ViewChildren('triggerBtn') triggerButtons!: QueryList<ElementRef<HTMLButtonElement>>;

  private internalValue: string | string[] = '';

  get currentValue(): string | string[] {
    return this.value !== undefined ? this.value : this.internalValue;
  }

  isOpen(itemValue: string): boolean {
    if (this.multiple) {
      return Array.isArray(this.currentValue) && this.currentValue.includes(itemValue);
    }
    return this.currentValue === itemValue;
  }

  toggle(itemValue: string): void {
    const item = this.items.find((i) => i.value === itemValue);
    if (item?.disabled) return;

    let newValue: string | string[];
    if (this.multiple) {
      const arr = Array.isArray(this.currentValue) ? [...this.currentValue] : [];
      if (arr.includes(itemValue)) {
        newValue = arr.filter((v) => v !== itemValue);
      } else {
        newValue = [...arr, itemValue];
      }
    } else {
      newValue = this.currentValue === itemValue ? '' : itemValue;
    }
    if (this.value === undefined) {
      this.internalValue = newValue;
    }
    this.valueChange.emit(newValue);
  }

  onKeyDown(e: KeyboardEvent, index: number): void {
    const enabledItems = this.items.filter((item) => !item.disabled);
    const currentEnabledIndex = enabledItems.findIndex(
      (_, i) => this.items.indexOf(enabledItems[i]) === index
    );
    let nextIndex = -1;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        nextIndex = (currentEnabledIndex + 1) % enabledItems.length;
        break;
      case 'ArrowUp':
        e.preventDefault();
        nextIndex = (currentEnabledIndex - 1 + enabledItems.length) % enabledItems.length;
        break;
      case 'Home':
        e.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        nextIndex = enabledItems.length - 1;
        break;
      default:
        return;
    }

    const targetItem = enabledItems[nextIndex];
    if (targetItem) {
      const buttons = this.triggerButtons.toArray();
      const targetIdx = this.items.indexOf(targetItem);
      if (targetIdx >= 0 && targetIdx < buttons.length) {
        buttons[targetIdx].nativeElement.focus();
      }
    }
  }

  ngOnInit(): void {
    if (this.value === undefined && this.defaultValue !== undefined) {
      this.internalValue = this.defaultValue;
    }
  }
}
