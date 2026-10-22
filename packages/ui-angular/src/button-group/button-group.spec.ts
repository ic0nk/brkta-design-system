import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonGroupComponent } from './button-group.component';

describe('ButtonGroupComponent', () => {
  let fixture: ComponentFixture<ButtonGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonGroupComponent);
    fixture.detectChanges();
  });

  it('should have data-brkta-button-group', () => {
    expect(fixture.nativeElement.querySelector('[data-brkta-button-group]')).toBeTruthy();
  });

  it('should have role group', () => {
    expect(fixture.nativeElement.querySelector('[role="group"]')).toBeTruthy();
  });

  it('should support vertical orientation', () => {
    fixture.componentRef.setInput('orientation', 'vertical');
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('[data-brkta-button-group]');
    expect(el.getAttribute('data-orientation')).toBe('vertical');
  });

  it('should support disabled state', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[data-disabled]')).toBeTruthy();
  });

  it('should default to horizontal orientation', () => {
    const el = fixture.nativeElement.querySelector('[data-brkta-button-group]');
    expect(el.getAttribute('data-orientation')).toBe('horizontal');
  });
});
