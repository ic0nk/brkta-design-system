import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarComponent } from './calendar.component';

describe('CalendarComponent', () => {
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CalendarComponent] }).compileComponents();
    fixture = TestBed.createComponent(CalendarComponent);
    fixture.componentRef.setInput('defaultMonth', new Date(2026, 6, 1));
    fixture.detectChanges();
  });

  it('should render month title', () => {
    expect(fixture.nativeElement.textContent).toContain('July 2026');
  });

  it('should render weekday headers', () => {
    expect(fixture.nativeElement.querySelectorAll('[data-brkta-calendar-weekday]').length).toBe(7);
  });

  it('should render day buttons', () => {
    expect(fixture.nativeElement.querySelectorAll('[data-brkta-calendar-day]').length).toBeGreaterThan(25);
  });

  it('should mark selected date', () => {
    fixture.componentRef.setInput('selected', new Date(2026, 6, 15));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[data-selected]')).toBeTruthy();
  });

  it('should render disabled state', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[data-brkta-calendar-day][data-disabled]')).toBeTruthy();
  });

  it('should have aria-label on day buttons', () => {
    const day = fixture.nativeElement.querySelector('[data-brkta-calendar-day]') as HTMLElement;
    expect(day.getAttribute('aria-label')).toContain('July');
  });

  it('should have role grid', () => {
    expect(fixture.nativeElement.querySelector('[role="grid"]')).toBeTruthy();
  });
});
