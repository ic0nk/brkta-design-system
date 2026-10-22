import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, HostListener } from '@angular/core';
import { createBrowserPreferenceStore, formatDateTime } from '@brkta/platform-core';
import { CalendarComponent } from '../calendar/calendar.component';

const dateOnly = { dateStyle: undefined, timeStyle: undefined } as const;

@Component({
  selector: 'brkta-date-picker',
  standalone: true,
  imports: [CalendarComponent],
  template: `
    <div #container data-brkta-date-picker="" [attr.data-disabled]="disabled ? '' : undefined">
      <button
        data-brkta-date-picker-trigger=""
        [attr.data-open]="open ? '' : undefined"
        [attr.data-invalid]="invalid ? '' : undefined"
        type="button"
        [disabled]="disabled"
        (click)="toggle()"
        aria-haspopup="dialog"
        [attr.aria-expanded]="open"
      >
        <span data-brkta-date-picker-trigger-value="" [attr.data-placeholder]="!currentValue ? '' : undefined">
          {{ currentValue ? formatted : placeholder }}
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>
        </svg>
      </button>
      @if (open) {
        <div data-brkta-date-picker-popover="">
          <brkta-calendar
            [selected]="currentValue ?? undefined"
            [minDate]="minDate"
            [maxDate]="maxDate"
            (selectDateEvent)="selectDate($event)"
          ></brkta-calendar>
        </div>
      }
    </div>
  `,
})
export class DatePickerComponent {
  @Input() value: Date | undefined;
  @Input() defaultValue?: Date;
  @Input() placeholder = 'Select date...';
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Output() valueChange = new EventEmitter<Date | undefined>();

  @ViewChild('container') containerRef!: ElementRef;

  private internalValue: Date | null = null;
  open = false;

  get currentValue(): Date | null { return this.value !== undefined ? (this.value ?? null) : this.internalValue; }
  get formatted(): string {
    return this.currentValue
      ? formatDateTime(this.currentValue, createBrowserPreferenceStore().get().locale, undefined, {
          ...dateOnly,
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      : '';
  }

  toggle() { if (!this.disabled) this.open = !this.open; }
  selectDate(d: Date) {
    if (this.value === undefined) this.internalValue = d;
    this.valueChange.emit(d);
    this.open = false;
  }

  @HostListener('document:mousedown', ['$event'])
  onClickOutside(e: MouseEvent) {
    if (this.open && this.containerRef && !this.containerRef.nativeElement.contains(e.target)) {
      this.open = false;
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscape(e: Event): void {
    this.open = false;
  }

  ngOnInit() { if (this.value === undefined && this.defaultValue) this.internalValue = this.defaultValue ?? null; }
}
