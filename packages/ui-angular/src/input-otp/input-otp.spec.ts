import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputOTPComponent } from './input-otp.component';

describe('InputOTPComponent', () => {
  let fixture: ComponentFixture<InputOTPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [InputOTPComponent] }).compileComponents();
    fixture = TestBed.createComponent(InputOTPComponent);
    fixture.componentRef.setInput('length', 4);
    fixture.detectChanges();
  });

  it('should render correct number of slots', () => {
    expect(fixture.nativeElement.querySelectorAll('[data-brkta-input-otp-slot]').length).toBe(4);
  });

  it('should handle input', () => {
    const slots = fixture.nativeElement.querySelectorAll('[data-brkta-input-otp-slot]');
    const slot = slots[0] as HTMLInputElement;
    slot.value = '5';
    slot.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
    expect(slot.value).toBe('5');
  });

  it('should render disabled state', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[data-disabled]')).toBeTruthy();
  });
});
