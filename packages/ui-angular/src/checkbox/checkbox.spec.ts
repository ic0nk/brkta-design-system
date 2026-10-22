import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;
  let labelEl: HTMLLabelElement;
  let inputEl: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    labelEl = fixture.nativeElement.querySelector('label');
    inputEl = fixture.nativeElement.querySelector('input');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('data attributes', () => {
    it('should set data-brkta-checkbox', () => {
      expect(labelEl.hasAttribute('data-brkta-checkbox')).toBe(true);
    });

    it('should reflect data-disabled when true', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      expect(labelEl.getAttribute('data-disabled')).toBe('true');
    });

    it('should omit data-disabled when false', () => {
      expect(labelEl.hasAttribute('data-disabled')).toBe(false);
    });

    it('should reflect data-invalid when true', () => {
      fixture.componentRef.setInput('invalid', true);
      fixture.detectChanges();
      expect(labelEl.getAttribute('data-invalid')).toBe('true');
    });

    it('should omit data-invalid when false', () => {
      expect(labelEl.hasAttribute('data-invalid')).toBe(false);
    });
  });

  describe('checked state', () => {
    it('should default to unchecked', () => {
      expect(component.checked).toBe(false);
      expect(inputEl.checked).toBe(false);
    });

    it('should reflect checked when true', () => {
      fixture.componentRef.setInput('checked', true);
      fixture.detectChanges();
      expect(inputEl.checked).toBe(true);
    });
  });

  describe('disabled', () => {
    it('should not be disabled by default', () => {
      expect(inputEl.disabled).toBe(false);
    });

    it('should disable input when true', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      expect(inputEl.disabled).toBe(true);
    });
  });

  it('should set name attribute', () => {
    fixture.componentRef.setInput('name', 'agree');
    fixture.detectChanges();
    expect(inputEl.getAttribute('name')).toBe('agree');
  });

  it('should render a label wrapping an input', () => {
    expect(labelEl.tagName.toLowerCase()).toBe('label');
    expect(inputEl.type).toBe('checkbox');
  });
});

describe('CheckboxComponent content projection', () => {
  @Component({
    standalone: true,
    imports: [CheckboxComponent],
    template: `<brkta-checkbox>Accept terms</brkta-checkbox>`,
  })
  class TestHost {}

  let fixture: ComponentFixture<TestHost>;
  let labelEl: HTMLLabelElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHost],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
    labelEl = fixture.nativeElement.querySelector('label');
  });

  it('should project content', () => {
    expect(labelEl.textContent).toContain('Accept terms');
  });
});
