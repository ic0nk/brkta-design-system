import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  HostListener,
} from "@angular/core";

interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: "brkta-combobox",
  standalone: true,
  template: `
    <div
      #container
      data-brkta-combobox=""
      [attr.data-disabled]="disabled ? '' : undefined"
    >
      <div
        data-brkta-combobox-trigger=""
        [attr.data-open]="_open ? '' : undefined"
        [attr.data-invalid]="invalid ? '' : undefined"
        (click)="toggleOpen()"
      >
        <input
          #inputEl
          data-brkta-combobox-input=""
          type="text"
          role="combobox"
          [id]="resolvedInputId"
          [attr.aria-label]="ariaLabel || null"
          [attr.aria-expanded]="_open"
          aria-haspopup="listbox"
          [attr.aria-controls]="listId"
          aria-autocomplete="list"
          [attr.aria-activedescendant]="
            filtered.length > 0 ? resolvedInputId + '-option-' + activeIndex : undefined
          "
          [disabled]="disabled"
          [placeholder]="placeholder"
          [value]="open ? searchText : selectedLabel"
          (input)="onSearch($event)"
          (keydown)="onKeyDown($event)"
          (focus)="onFocus()"
        />
      </div>
      @if (_open) {
        <div data-brkta-combobox-list="" [id]="listId" role="listbox">
          @if (filtered.length === 0) {
            <div data-brkta-combobox-empty="">{{ emptyText }}</div>
          } @else {
            @for (opt of filtered; track opt.value; let i = $index) {
              <div
                [id]="resolvedInputId + '-option-' + i"
                data-brkta-combobox-option=""
                [attr.data-active]="i === activeIndex ? '' : undefined"
                [attr.data-disabled]="opt.disabled ? '' : undefined"
                role="option"
                [attr.aria-selected]="opt.value === currentValue"
                (click)="!opt.disabled && selectValue(opt.value)"
              >
                {{ opt.label }}
              </div>
            }
          }
        </div>
      }
    </div>
  `,
})
export class ComboboxComponent {
  private static nextGeneratedId = 0;
  private readonly generatedId = `brkta-combobox-${ComboboxComponent.nextGeneratedId++}`;

  @Input() inputId: string | undefined;
  @Input() ariaLabel: string | undefined;
  @Input() options: ComboboxOption[] = [];
  @Input() value: string | undefined;
  @Input() defaultValue = "";
  @Input() placeholder = "Search...";
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() open: boolean | undefined;
  @Input() defaultOpen = false;
  @Input() emptyText = "No results found.";
  @Output() valueChange = new EventEmitter<string>();
  @Output() openChange = new EventEmitter<boolean>();

  @ViewChild("container") containerRef!: ElementRef;
  @ViewChild("inputEl") inputEl!: ElementRef<HTMLInputElement>;

  private internalValue = "";
  private internalOpen = false;
  searchText = "";
  activeIndex = 0;

  get resolvedInputId(): string {
    return this.inputId || this.generatedId;
  }
  get listId(): string {
    return `${this.resolvedInputId}-list`;
  }
  get currentValue(): string {
    return this.value !== undefined ? this.value! : this.internalValue;
  }
  get _open(): boolean {
    return this.open !== undefined ? this.open : this.internalOpen;
  }
  get selectedLabel(): string {
    return this.options.find((o) => o.value === this.currentValue)?.label ?? "";
  }
  get filtered(): ComboboxOption[] {
    return this.options.filter((o) =>
      o.label.toLowerCase().includes(this.searchText.toLowerCase()),
    );
  }

  setOpen(o: boolean) {
    if (this.open === undefined) this.internalOpen = o;
    this.openChange.emit(o);
    if (!o) this.searchText = "";
  }

  toggleOpen() {
    if (this.disabled) return;
    this.setOpen(!this._open);
    if (!this._open) return;
    // Focus input after opening
    setTimeout(() => this.inputEl?.nativeElement.focus(), 0);
  }

  selectValue(v: string) {
    if (this.value === undefined) this.internalValue = v;
    this.valueChange.emit(v);
    this.setOpen(false);
    this.searchText = "";
  }

  onSearch(e: Event) {
    this.searchText = (e.target as HTMLInputElement).value;
    this.setOpen(true);
    this.activeIndex = 0;
  }

  onFocus() {
    if (!this.disabled) this.setOpen(true);
  }

  onKeyDown(e: KeyboardEvent) {
    if (!this._open && (e.key === "ArrowDown" || e.key === "Enter")) {
      e.preventDefault();
      this.setOpen(true);
      return;
    }
    if (!this._open) return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        this.activeIndex = Math.min(
          this.activeIndex + 1,
          this.filtered.length - 1,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        this.activeIndex = Math.max(this.activeIndex - 1, 0);
        break;
      case "Enter":
        e.preventDefault();
        if (this.filtered[this.activeIndex])
          this.selectValue(this.filtered[this.activeIndex].value);
        break;
      case "Escape":
        e.preventDefault();
        this.setOpen(false);
        break;
    }
  }

  @HostListener("document:mousedown", ["$event"])
  onClickOutside(e: MouseEvent) {
    if (
      this._open &&
      this.containerRef &&
      !this.containerRef.nativeElement.contains(e.target)
    )
      this.setOpen(false);
  }

  ngOnInit() {
    if (this.value === undefined) this.internalValue = this.defaultValue;
    if (this.open === undefined) this.internalOpen = this.defaultOpen;
  }
}
