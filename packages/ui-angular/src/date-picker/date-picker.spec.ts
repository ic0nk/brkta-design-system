import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePickerComponent } from './date-picker.component';

describe('DatePickerComponent', () => {
  let fixture: ComponentFixture<DatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [DatePickerComponent] }).compileComponents();
    fixture = TestBed.createComponent(DatePickerComponent);
    fixture.detectChanges();
  });

  it('should render trigger', () => {
    expect(fixture.nativeElement.querySelector('[data-brkta-date-picker-trigger]')).toBeTruthy();
  });

  it('should show placeholder', () => {
    fixture.componentRef.setInput('placeholder', 'Pick a date');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Pick a date');
  });

  it('should open calendar on trigger click', () => {
    const trigger = fixture.nativeElement.querySelector('[data-brkta-date-picker-trigger]') as HTMLElement;
    trigger.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[data-brkta-calendar]')).toBeTruthy();
  });
});
