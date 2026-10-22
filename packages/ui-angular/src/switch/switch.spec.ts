import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { SwitchComponent } from './switch.component';

describe('SwitchComponent', () => {
  let component: SwitchComponent;
  let fixture: ComponentFixture<SwitchComponent>;
  let labelEl: HTMLLabelElement;
  let inputEl: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    labelEl = fixture.nativeElement.querySelector('label');
    inputEl = fixture.nativeElement.querySelector('input');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('data attributes', () => {
    it('should set data-brkta-switch', () => {
      expect(labelEl.hasAttribute('data-brkta-switch')).toBe(true);
    });

    it('should reflect data-disabled when true', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      expect(labelEl.getAttribute('data-disabled')).toBe('true');
    });

    it('should omit data-disabled when false', () => {
      expect(labelEl.hasAttribute('data-disabled')).toBe(false);
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

  it('should have role="switch"', () => {
    expect(inputEl.getAttribute('role')).toBe('switch');
  });

  it('should set aria-label', () => {
    fixture.componentRef.setInput('ariaLabel', 'Enable notifications');
    fixture.detectChanges();
    expect(inputEl.getAttribute('aria-label')).toBe('Enable notifications');
  });

  it('should set aria-describedby', () => {
    fixture.componentRef.setInput('ariaDescribedBy', 'switch-desc');
    fixture.detectChanges();
    expect(inputEl.getAttribute('aria-describedby')).toBe('switch-desc');
  });

  it('should render a label wrapping an input', () => {
    expect(labelEl.tagName.toLowerCase()).toBe('label');
    expect(inputEl.type).toBe('checkbox');
  });
});

describe('SwitchComponent with label text', () => {
  @Component({
    standalone: true,
    imports: [SwitchComponent],
    template: `<brkta-switch ariaLabel="Toggle setting">Notifications</brkta-switch>`,
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
    expect(labelEl.textContent).toContain('Notifications');
  });
});
