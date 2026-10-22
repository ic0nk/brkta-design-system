import { Component, Input, Output, EventEmitter, ViewChildren, QueryList, ElementRef, OnChanges, SimpleChanges } from '@angular/core';

let otpCounter = 0;

@Component({
  selector: 'brkta-input-otp',
  standalone: true,
  template: `
    <div data-brkta-input-otp="" [attr.data-disabled]="disabled ? '' : undefined">
      @for (i of slotIndices; track i; let idx = $index) {
        <input
          [id]="slotIds[idx]"
          data-brkta-input-otp-slot=""
          [attr.data-invalid]="invalid ? '' : undefined"
          type="text"
          inputmode="numeric"
          autocomplete="one-time-code"
          maxlength="1"
          [disabled]="disabled"
          [value]="chars[idx] ?? ''"
          (input)="onInput(idx, $event)"
          (keydown)="onKeyDown(idx, $event)"
          (paste)="onPaste($event)"
          (focus)="onSlotFocus(idx)"
          (select)="onSlotSelect($event)"
          [attr.aria-label]="'Digit ' + (idx + 1)"
        />
      }
    </div>
  `,
})
export class InputOTPComponent implements OnChanges {
  @Input() length = 6;
  @Input() value: string | undefined;
  @Input() defaultValue = '';
  @Input() disabled = false;
  @Input() invalid = false;
  @Output() valueChange = new EventEmitter<string>();
  @Output() complete = new EventEmitter<string>();

  @ViewChildren('slotInputs') slotInputs!: QueryList<ElementRef<HTMLInputElement>>;

  private instanceId = otpCounter++;

  chars: string[] = [];
  slotIndices: number[] = [];
  slotIds: string[] = [];

  ngOnInit() { this.initSlots(); }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['length'] || changes['value']) this.initSlots();
  }

  private initSlots() {
    const len = Math.max(this.length, 1);
    this.slotIndices = Array.from({ length: len }, (_, i) => i);
    this.slotIds = this.slotIndices.map(i => `otp-${this.instanceId}-${i}`);
    const initValue = this.value !== undefined ? this.value : this.defaultValue;
    this.chars = Array.from({ length: len }, (_, i) => initValue?.[i] ?? '');
  }

  private firstEmpty(): number {
    return this.chars.findIndex(c => c === '' || c === undefined || c === null);
  }

  private emitValue() {
    const v = this.chars.map(c => c ?? '').join('');
    this.valueChange.emit(v);
    if (v.length === this.length && !v.includes('')) this.complete.emit(v);
  }

  private focusSlot(idx: number) {
    const el = document.getElementById(this.slotIds[idx]) as HTMLInputElement;
    if (el) {
      el.focus();
      setTimeout(() => el.select(), 1);
    }
  }

  onSlotFocus(idx: number) {
    // Select content for easy replacement
    const el = document.getElementById(this.slotIds[idx]) as HTMLInputElement;
    if (el) setTimeout(() => el.select(), 1);
  }

  onSlotSelect(_e: Event) {
    // Handled via timeout in focus
  }

  onInput(idx: number, e: Event) {
    const input = e.target as HTMLInputElement;
    const raw = input.value.replace(/\D/g, '');
    if (!raw) return;

    const digit = raw.slice(-1);
    const targetIdx = this.firstEmpty();
    if (targetIdx >= 0) {
      this.chars[targetIdx] = digit;
      this.emitValue();
      if (targetIdx < this.length - 1) this.focusSlot(targetIdx + 1);
    }
  }

  onKeyDown(idx: number, e: KeyboardEvent) {
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (this.chars[idx] && this.chars[idx] !== '') {
        this.chars[idx] = '';
        this.emitValue();
      } else if (idx > 0) {
        this.chars[idx - 1] = '';
        this.emitValue();
        this.focusSlot(idx - 1);
      }
    } else if (e.key === 'ArrowLeft' && idx > 0) {
      e.preventDefault();
      this.focusSlot(idx - 1);
    } else if (e.key === 'ArrowRight' && idx < this.length - 1) {
      e.preventDefault();
      this.focusSlot(idx + 1);
    }
  }

  onPaste(e: ClipboardEvent) {
    e.preventDefault();
    const raw = e.clipboardData?.getData('text')?.replace(/\D/g, '').slice(0, this.length) ?? '';
    if (raw) {
      this.chars = Array.from({ length: this.length }, (_, i) => raw[i] ?? '');
      this.emitValue();
      if (raw.length < this.length) this.focusSlot(raw.length);
    }
  }
}
