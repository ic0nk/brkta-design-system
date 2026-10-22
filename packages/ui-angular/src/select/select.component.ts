import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
  ViewChild,
  inject,
} from "@angular/core";
import type { SelectVariant, SelectSize } from "@brkta/ui-core/types/variant";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

let nextId = 0;

@Component({
  selector: "brkta-select",
  standalone: true,
  styles: [":host { display: contents; }"],
  template: `
    <div data-brkta-select="" [attr.data-open]="open ? '' : undefined">
      <button
        #trigger
        data-brkta-select-trigger=""
        [attr.data-variant]="variant"
        [attr.data-size]="size"
        [attr.data-disabled]="disabled || undefined"
        [attr.data-invalid]="invalid || undefined"
        [id]="triggerId"
        type="button"
        role="combobox"
        [attr.aria-expanded]="open"
        aria-haspopup="listbox"
        [attr.aria-controls]="listboxId"
        [attr.aria-activedescendant]="activeDescendant"
        [attr.aria-label]="ariaLabel || undefined"
        [attr.aria-labelledby]="ariaLabelledBy || undefined"
        [attr.aria-invalid]="invalid || undefined"
        [attr.aria-describedby]="ariaDescribedBy || undefined"
        [attr.aria-required]="required || undefined"
        [disabled]="disabled || undefined"
        (click)="toggleOpen()"
        (keydown)="onTriggerKeyDown($event)"
      >
        <span
          data-brkta-select-value=""
          [attr.data-placeholder]="!selectedOption ? '' : undefined"
          [attr.aria-label]="!selectedOption ? placeholder : undefined"
          >{{ selectedLabel }}</span
        >
        <span data-brkta-select-icon="" aria-hidden="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </button>

      @if (open || closing) {
        <div
          data-brkta-select-content=""
          [attr.data-closing]="closing ? '' : undefined"
          [attr.data-scrollable]="options.length > 6 ? '' : undefined"
          [id]="listboxId"
          role="listbox"
          [attr.aria-label]="placeholder"
          tabindex="-1"
          (keydown)="onListboxKeyDown($event)"
        >
          @for (option of options; track option.value; let idx = $index) {
            <div
              data-brkta-select-option=""
              [attr.data-selected]="option.value === selectedValue || undefined"
              [attr.data-active]="idx === activeIndex || undefined"
              [attr.data-disabled]="option.disabled || undefined"
              [attr.data-index]="idx"
              [id]="prefix + '-option-' + idx"
              role="option"
              [attr.aria-selected]="option.value === selectedValue"
              [attr.aria-disabled]="option.disabled || undefined"
              (click)="selectOption(option)"
              (mouseenter)="setActiveIndex(idx, option)"
            >
              <span>{{ option.label }}</span>
            </div>
          }
        </div>
      }
    </div>
  `,
})
export class SelectComponent {
  @Input() id = "";
  @Input() options: readonly SelectOption[] = [];
  @Input() value?: string;
  @Input() placeholder = "Select…";
  @Input() variant: SelectVariant = "default";
  @Input() size: SelectSize = "md";
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() required = false;
  @Input() name = "";
  @Input() ariaLabel = "";
  @Input() ariaLabelledBy = "";
  @Input() ariaDescribedBy = "";
  @Output() valueChange = new EventEmitter<string>();

  @ViewChild("trigger") triggerRef!: ElementRef<HTMLButtonElement>;

  open = false;
  closing = false;
  activeIndex = -1;

  private _id = ++nextId;
  readonly prefix = `brkta-select-${this._id}`;

  get triggerId(): string {
    return this.id || `${this.prefix}-trigger`;
  }
  get listboxId(): string {
    return `${this.prefix}-listbox`;
  }
  get activeDescendant(): string | undefined {
    return this.activeIndex >= 0
      ? `${this.prefix}-option-${this.activeIndex}`
      : undefined;
  }

  get selectedValue(): string | undefined {
    return this.value;
  }

  get selectedOption(): SelectOption | undefined {
    return this.options.find((o) => o.value === this.selectedValue);
  }

  get selectedLabel(): string {
    return this.selectedOption?.label ?? this.placeholder;
  }

  private elRef = inject(ElementRef);

  // ---- Open / close ----

  toggleOpen(): void {
    if (this.disabled || this.closing) return;
    if (this.open) {
      this.closeWithAnimation();
      return;
    }
    this.open = true;
    const idx = this.options.findIndex(
      (o) => o.value === this.selectedValue && !o.disabled,
    );
    this.activeIndex = idx >= 0 ? idx : -1;
    requestAnimationFrame(() => this.triggerRef?.nativeElement?.focus());
  }

  closeWithAnimation(): void {
    this.closing = true;
    setTimeout(() => {
      this.open = false;
      this.closing = false;
      this.activeIndex = -1;
    }, 160);
  }

  close(): void {
    this.open = false;
    this.activeIndex = -1;
  }

  // ---- Selection ----

  selectOption(option: SelectOption): void {
    if (option.disabled) return;
    this.value = option.value;
    this.valueChange.emit(option.value);
    this.closeWithAnimation();
    requestAnimationFrame(() => this.triggerRef?.nativeElement?.focus());
  }

  setActiveIndex(idx: number, option: SelectOption): void {
    if (option.disabled) return;
    this.activeIndex = idx;
  }

  // ---- Keyboard (trigger) ----

  onTriggerKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case "ArrowDown":
      case "ArrowUp":
        event.preventDefault();
        if (!this.open) {
          const idx = this.options.findIndex(
            (o) => o.value === this.selectedValue && !o.disabled,
          );
          this.activeIndex = idx >= 0 ? idx : -1;
          this.open = true;
        }
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        this.toggleOpen();
        break;
    }
  }

  // ---- Keyboard (listbox) ----

  onListboxKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        this.moveActive(1);
        break;
      case "ArrowUp":
        event.preventDefault();
        this.moveActive(-1);
        break;
      case "Home":
        event.preventDefault();
        this.activeIndex = 0;
        while (
          this.activeIndex < this.options.length &&
          this.options[this.activeIndex].disabled
        )
          this.activeIndex++;
        if (this.activeIndex >= this.options.length) this.activeIndex = -1;
        break;
      case "End":
        event.preventDefault();
        this.activeIndex = this.options.length - 1;
        while (this.activeIndex >= 0 && this.options[this.activeIndex].disabled)
          this.activeIndex--;
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (this.activeIndex >= 0 && !this.options[this.activeIndex].disabled) {
          this.selectOption(this.options[this.activeIndex]);
        }
        break;
      case "Escape":
        event.preventDefault();
        this.closeWithAnimation();
        requestAnimationFrame(() => this.triggerRef?.nativeElement?.focus());
        break;
    }
  }

  private moveActive(delta: number): void {
    let next = this.activeIndex + delta;
    while (
      next >= 0 &&
      next < this.options.length &&
      this.options[next].disabled
    )
      next += delta;
    if (next >= 0 && next < this.options.length) {
      this.activeIndex = next;
    }
  }

  // ---- Click outside ----

  @HostListener("document:mousedown", ["$event"])
  onDocumentClick(event: MouseEvent): void {
    if (this.open && !this.closing) {
      const target = event.target as Node;
      if (!this.elRef.nativeElement.contains(target)) {
        this.closeWithAnimation();
      }
    }
  }

  // ---- Escape ----

  @HostListener("document:keydown", ["$event"])
  onEscape(event: KeyboardEvent): void {
    if (event.key === "Escape" && this.open && !this.closing) {
      event.preventDefault();
      this.closeWithAnimation();
      requestAnimationFrame(() => this.triggerRef?.nativeElement?.focus());
    }
  }
}
