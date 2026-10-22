'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import type { CalendarContract } from '@brkta/ui-core/calendar/calendar-contract';

export interface CalendarProps extends CalendarContract {}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function getDaysInMonth(year: number, month: number) { return new Date(year, month + 1, 0).getDate(); }
function getFirstDayOfMonth(year: number, month: number) { return new Date(year, month, 1).getDay(); }
function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function isToday(d: Date) { return isSameDay(d, new Date()); }
function addDays(d: Date, n: number) { const r = new Date(d); r.setDate(r.getDate() + n); return r; }
function formatDate(d: Date) { return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }); }

export function Calendar({
  month: controlledMonth,
  defaultMonth,
  selected: controlledSelected,
  defaultSelected,
  onSelect,
  onMonthChange,
  minDate,
  maxDate,
  disabled = false,
}: CalendarProps) {
  const isMonthControlled = controlledMonth !== undefined;
  const isSelectedControlled = controlledSelected !== undefined;
  const [internalMonth, setInternalMonth] = useState(defaultMonth ?? new Date());
  const [internalSelected, setInternalSelected] = useState(null as Date | null);
  const [focusedDate, setFocusedDate] = useState<Date | null>(null);
  const dayRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const currentMonth = isMonthControlled ? controlledMonth! : internalMonth;
  const currentSelected = isSelectedControlled ? (controlledSelected ?? null) : internalSelected;

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const setMonth = useCallback((d: Date) => {
    if (!isMonthControlled) setInternalMonth(d);
    onMonthChange?.(d);
  }, [isMonthControlled, onMonthChange]);

  const selectDate = useCallback((d: Date) => {
    if (!isSelectedControlled) setInternalSelected(d);
    onSelect?.(d);
  }, [isSelectedControlled, onSelect]);

  const prevMonth = () => setMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setMonth(new Date(year, month + 1, 1));

  const isDisabled = (d: Date) => {
    if (disabled) return true;
    if (minDate && d < minDate) return true;
    if (maxDate && d > maxDate) return true;
    return false;
  };

  const focusDay = (d: Date) => {
    const key = d.toISOString();
    dayRefs.current.get(key)?.focus();
    setFocusedDate(d);
  };

  const handleKeyDown = useCallback((e: React.KeyboardEvent, day: Date) => {
    if (disabled) return;
    let handled = true;
    let target: Date | null = null;

    switch (e.key) {
      case 'ArrowRight': target = addDays(day, 1); break;
      case 'ArrowLeft': target = addDays(day, -1); break;
      case 'ArrowDown': target = addDays(day, 7); break;
      case 'ArrowUp': target = addDays(day, -7); break;
      case 'Home': target = addDays(day, -day.getDay()); break;
      case 'End': target = addDays(day, 6 - day.getDay()); break;
      case 'PageUp': prevMonth(); target = new Date(year, month, day.getDate()); handled = false; break;
      case 'PageDown': nextMonth(); target = new Date(year, month, day.getDate()); handled = false; break;
      default: handled = false;
    }

    if (handled && target) {
      e.preventDefault();
      // Navigate to new month if needed
      if (target.getMonth() !== month || target.getFullYear() !== year) {
        setMonth(new Date(target.getFullYear(), target.getMonth(), 1));
      }
      // Wait for render then focus
      setTimeout(() => focusDay(target), 0);
    }
  }, [disabled, month, year, prevMonth, nextMonth, setMonth]);

  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  // Set up initial focus to selected date then to today
  useEffect(() => {
    if (!focusedDate && cells.length > 0) {
      const firstReal = cells.find(d => d !== null) as Date;
      const next = currentSelected && !isDisabled(currentSelected) ? currentSelected : firstReal;
      setFocusedDate(next);
    }
  }, []);

  return (
    <div data-brkta-calendar="">
      <div data-brkta-calendar-header="">
        <button data-brkta-calendar-nav="" onClick={prevMonth} type="button" aria-label="Previous month" disabled={disabled}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <span data-brkta-calendar-title="">{monthName}</span>
        <button data-brkta-calendar-nav="" onClick={nextMonth} type="button" aria-label="Next month" disabled={disabled}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
      <div data-brkta-calendar-grid="" role="grid" aria-label={monthName}>
        {WEEKDAYS.map(w => <div key={w} data-brkta-calendar-weekday="" role="columnheader" aria-label={w === 'Su' ? 'Sunday' : w === 'Mo' ? 'Monday' : w === 'Tu' ? 'Tuesday' : w === 'We' ? 'Wednesday' : w === 'Th' ? 'Thursday' : w === 'Fr' ? 'Friday' : 'Saturday'}>{w}</div>)}
        {cells.map((d, i) => {
          if (!d) return <div key={`empty-${i}`} />;
          const sel = currentSelected ? isSameDay(d, currentSelected) : false;
          const today = isToday(d);
          const dis = isDisabled(d);
          const isFocused = focusedDate ? isSameDay(d, focusedDate) : false;
          const dayStr = d.toISOString();
          return (
            <button
              key={i}
              ref={(el) => { if (el) dayRefs.current.set(dayStr, el); }}
              data-brkta-calendar-day=""
              data-selected={sel ? '' : undefined}
              data-today={today ? '' : undefined}
              data-disabled={dis ? '' : undefined}
              type="button"
              disabled={dis}
              tabIndex={isFocused ? 0 : -1}
              aria-label={formatDate(d)}
              aria-selected={sel || undefined}
              onClick={() => { if (!dis) selectDate(d); }}
              onKeyDown={(e) => handleKeyDown(e, d)}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
