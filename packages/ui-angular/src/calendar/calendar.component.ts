import { Component, Input, Output, EventEmitter } from '@angular/core';
import { createBrowserPreferenceStore, formatDateTime } from '@brkta/platform-core';

const weekdayReferenceDates = [
  new Date(2023, 0, 1),
  new Date(2023, 0, 2),
  new Date(2023, 0, 3),
  new Date(2023, 0, 4),
  new Date(2023, 0, 5),
  new Date(2023, 0, 6),
  new Date(2023, 0, 7),
];
const dateOnly = { dateStyle: undefined, timeStyle: undefined } as const;
function getPlatformPreferences() { return createBrowserPreferenceStore().get(); }

function getDaysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDayOfMonth(y: number, m: number) { return new Date(y, m, 1).getDay(); }
function isSameDay(a: Date, b: Date) { return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }
function isToday(d: Date) { return isSameDay(d, new Date()); }
function addDays(d: Date, n: number) { const r = new Date(d); r.setDate(r.getDate() + n); return r; }
function formatDate(d: Date) {
  const preferences = getPlatformPreferences();
  return formatDateTime(d, preferences.locale, undefined, {
    ...dateOnly,
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

@Component({
  selector: 'brkta-calendar',
  standalone: true,
  template: `
    <div data-brkta-calendar="">
      <div data-brkta-calendar-header="">
        <button data-brkta-calendar-nav="" (click)="prevMonth()" type="button" aria-label="Previous month" [disabled]="disabled">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <span data-brkta-calendar-title="">{{ monthName }}</span>
        <button data-brkta-calendar-nav="" (click)="nextMonth()" type="button" aria-label="Next month" [disabled]="disabled">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
      <div data-brkta-calendar-grid="" role="grid" [attr.aria-label]="monthName">
        @for (w of weekdays; track $index) {
          <div data-brkta-calendar-weekday="" role="columnheader" [attr.aria-label]="weekdayFull[$index]">{{ w }}</div>
        }
        @for (cell of cells; track $index; let ci = $index) {
          @if (!cell) { <div></div> }
          @else {
            <button
              data-brkta-calendar-day=""
              [attr.data-selected]="isSelected(cell) ? '' : undefined"
              [attr.data-today]="isToday(cell) ? '' : undefined"
              [attr.data-disabled]="isDisabled(cell) ? '' : undefined"
              type="button"
              [disabled]="isDisabled(cell)"
              [attr.tabindex]="isFocused(cell) ? 0 : -1"
              [attr.aria-label]="formatDate(cell)"
              (click)="selectDate(cell)"
              (keydown)="onKeyDown($event, cell)"
            >{{ cell.getDate() }}</button>
          }
        }
      </div>
    </div>
  `,
})
export class CalendarComponent {
  @Input() month: Date | undefined;
  @Input() defaultMonth?: Date;
  @Input() selected: Date | undefined;
  @Input() defaultSelected?: Date;
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() disabled = false;
  @Output() selectDateEvent = new EventEmitter<Date>();
  @Output() monthChange = new EventEmitter<Date>();

  get weekdays() {
    const preferences = getPlatformPreferences();
    return weekdayReferenceDates.map((date) =>
      formatDateTime(date, preferences.locale, undefined, {
        ...dateOnly,
        weekday: 'short',
      }),
    );
  }

  get weekdayFull() {
    const preferences = getPlatformPreferences();
    return weekdayReferenceDates.map((date) =>
      formatDateTime(date, preferences.locale, undefined, {
        ...dateOnly,
        weekday: 'long',
      }),
    );
  }

  private internalMonth: Date;
  private internalSelected: Date | null = null;
  private internalFocused: Date | null = null;

  constructor() { this.internalMonth = new Date(); }

  get currentMonth(): Date { return this.month ?? this.internalMonth; }
  get currentSelected(): Date | null { return this.selected !== undefined ? (this.selected ?? null) : this.internalSelected; }

  get year() { return this.currentMonth.getFullYear(); }
  get monthNum() { return this.currentMonth.getMonth(); }
  get monthName() {
    const preferences = getPlatformPreferences();
    return formatDateTime(this.currentMonth, preferences.locale, undefined, {
      ...dateOnly,
      month: 'long',
      year: 'numeric',
    });
  }

  get cells(): (Date | null)[] {
    const days = getDaysInMonth(this.year, this.monthNum);
    const first = getFirstDayOfMonth(this.year, this.monthNum);
    const arr: (Date | null)[] = [];
    for (let i = 0; i < first; i++) arr.push(null);
    for (let d = 1; d <= days; d++) arr.push(new Date(this.year, this.monthNum, d));
    return arr;
  }

  setMonth(d: Date) { if (this.month === undefined) this.internalMonth = d; this.monthChange.emit(d); }
  prevMonth() { this.setMonth(new Date(this.year, this.monthNum - 1, 1)); }
  nextMonth() { this.setMonth(new Date(this.year, this.monthNum + 1, 1)); }

  isSelected(d: Date) { return this.currentSelected ? isSameDay(d, this.currentSelected) : false; }
  isToday(d: Date) { return isToday(d); }
  isDisabled(d: Date) {
    if (this.disabled) return true;
    if (this.minDate && d < this.minDate) return true;
    if (this.maxDate && d > this.maxDate) return true;
    return false;
  }
  isFocused(d: Date) {
    return this.internalFocused ? isSameDay(d, this.internalFocused) : this.isSelected(d) || isToday(d);
  }
  formatDate(d: Date) { return formatDate(d); }

  selectDate(d: Date) {
    if (this.isDisabled(d)) return;
    if (this.selected === undefined) this.internalSelected = d;
    this.internalFocused = d;
    this.selectDateEvent.emit(d);
  }

  onKeyDown(e: KeyboardEvent, day: Date) {
    if (this.disabled) return;
    let handled = true;
    let target: Date | null = null;

    switch (e.key) {
      case 'ArrowRight': target = addDays(day, 1); break;
      case 'ArrowLeft': target = addDays(day, -1); break;
      case 'ArrowDown': target = addDays(day, 7); break;
      case 'ArrowUp': target = addDays(day, -7); break;
      case 'Home': target = addDays(day, -day.getDay()); break;
      case 'End': target = addDays(day, 6 - day.getDay()); break;
      case 'PageUp': e.preventDefault(); this.prevMonth(); target = new Date(this.year, this.monthNum, day.getDate()); handled = false; break;
      case 'PageDown': e.preventDefault(); this.nextMonth(); target = new Date(this.year, this.monthNum, day.getDate()); handled = false; break;
      default: handled = false;
    }

    if (handled && target) {
      e.preventDefault();
      if (target.getMonth() !== this.monthNum || target.getFullYear() !== this.year) {
        this.setMonth(new Date(target.getFullYear(), target.getMonth(), 1));
      }
      this.internalFocused = target;
    }
  }

  ngOnInit() {
    if (this.month === undefined && this.defaultMonth) this.internalMonth = this.defaultMonth;
    if (this.selected === undefined && this.defaultSelected) this.internalSelected = this.defaultSelected ?? null;
    this.internalFocused = this.internalFocused ?? this.currentSelected ?? new Date();
  }
}
