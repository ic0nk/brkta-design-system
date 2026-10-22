import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
// @ts-expect-error The package test tsconfig does not include Node typings.
import { readFileSync } from 'node:fs';
import { SelectComponent, type SelectOption } from './select.component';

const selectStyles = readFileSync('../ui-core/select/select.css', 'utf8');

const sampleOptions: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry', disabled: true },
  { value: 'date', label: 'Date' },
];

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;
  let triggerEl: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    component.options = sampleOptions;
    fixture.detectChanges();
    triggerEl = fixture.nativeElement.querySelector(
      '[data-brkta-select-trigger]',
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('rendering', () => {
    it('should render data-brkta-select wrapper', () => {
      expect(
        fixture.nativeElement.querySelector('[data-brkta-select]'),
      ).toBeTruthy();
    });

    it('should render data-brkta-select-trigger', () => {
      expect(triggerEl.hasAttribute('data-brkta-select-trigger')).toBe(true);
    });

    it('should display placeholder when no value', () => {
      fixture.componentRef.setInput('placeholder', 'Pick one');
      fixture.detectChanges();
      expect(triggerEl.textContent).toContain('Pick one');
    });

    it('should display selected option label', () => {
      fixture.componentRef.setInput('value', 'banana');
      fixture.detectChanges();
      expect(triggerEl.textContent).toContain('Banana');
    });

    it('should set role="combobox"', () => {
      expect(triggerEl.getAttribute('role')).toBe('combobox');
    });

    it('should set aria-expanded="false" initially', () => {
      expect(triggerEl.getAttribute('aria-expanded')).toBe('false');
    });

    it('should connect the trigger to an external accessible label', () => {
      fixture.componentRef.setInput('ariaLabelledBy', 'workspace-label');
      fixture.detectChanges();
      expect(triggerEl.getAttribute('aria-labelledby')).toBe('workspace-label');
    });

    it('should expose an explicit accessible name on the internal trigger', () => {
      fixture.componentRef.setInput('ariaLabel', 'Member role');
      fixture.detectChanges();
      expect(triggerEl.getAttribute('aria-label')).toBe('Member role');
    });
  });

  describe('opening', () => {
    it('should open menu on trigger click', () => {
      triggerEl.click();
      fixture.detectChanges();
      expect(component.open).toBe(true);
      expect(
        fixture.nativeElement.querySelector('[data-brkta-select-content]'),
      ).toBeTruthy();
    });

    it('should set data-open on wrapper when open', () => {
      triggerEl.click();
      fixture.detectChanges();
      const wrapper = fixture.nativeElement.querySelector('[data-brkta-select]');
      expect(wrapper?.hasAttribute('data-open')).toBe(true);
    });

    it('should use the emitted boolean open attribute in the shared recipe', () => {
      triggerEl.click();
      fixture.detectChanges();
      expect(selectStyles).toContain('[data-brkta-select][data-open]');
      expect(selectStyles).not.toContain('[data-open="true"]');
      expect(selectStyles).toContain('z-index: var(--z-dropdown);');
    });

    it('should set aria-expanded="true" when open', () => {
      triggerEl.click();
      fixture.detectChanges();
      expect(triggerEl.getAttribute('aria-expanded')).toBe('true');
    });

    it('should render options in listbox when open', () => {
      triggerEl.click();
      fixture.detectChanges();
      const options = fixture.nativeElement.querySelectorAll(
        '[data-brkta-select-option]',
      );
      expect(options.length).toBe(4);
    });
  });

  describe('selection', () => {
    it('should update value on option click', () => {
      triggerEl.click();
      fixture.detectChanges();
      const options = fixture.nativeElement.querySelectorAll(
        '[data-brkta-select-option]',
      );
      (options[1] as HTMLElement).click();
      fixture.detectChanges();
      expect(component.value).toBe('banana');
    });

    it('should emit valueChange on selection', () => {
      let emitted = '';
      component.valueChange.subscribe((v) => (emitted = v));
      triggerEl.click();
      fixture.detectChanges();
      const options = fixture.nativeElement.querySelectorAll(
        '[data-brkta-select-option]',
      );
      (options[3] as HTMLElement).click();
      expect(emitted).toBe('date');
    });

    it('should not select disabled option', () => {
      fixture.componentRef.setInput('value', 'apple');
      fixture.detectChanges();
      triggerEl.click();
      fixture.detectChanges();
      const options = fixture.nativeElement.querySelectorAll(
        '[data-brkta-select-option]',
      );
      (options[2] as HTMLElement).click(); // cherry is disabled
      fixture.detectChanges();
      expect(component.value).toBe('apple'); // unchanged
    });
  });

  describe('disabled', () => {
    it('should not open when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      triggerEl.click();
      fixture.detectChanges();
      expect(component.open).toBe(false);
    });

    it('should set data-disabled on trigger', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      expect(triggerEl.getAttribute('data-disabled')).toBe('true');
    });
  });

  describe('invalid', () => {
    it('should set data-invalid and aria-invalid', () => {
      fixture.componentRef.setInput('invalid', true);
      fixture.detectChanges();
      expect(triggerEl.getAttribute('data-invalid')).toBe('true');
      expect(triggerEl.getAttribute('aria-invalid')).toBe('true');
    });
  });

  describe('data attributes on options', () => {
    it('should set data-brkta-select-option on each option', () => {
      triggerEl.click();
      fixture.detectChanges();
      const options = fixture.nativeElement.querySelectorAll(
        '[data-brkta-select-option]',
      );
      options.forEach((opt: Element) => {
        expect(opt.hasAttribute('data-brkta-select-option')).toBe(true);
      });
    });

    it('should mark selected option', () => {
      fixture.componentRef.setInput('value', 'apple');
      triggerEl.click();
      fixture.detectChanges();
      const options = fixture.nativeElement.querySelectorAll(
        '[data-brkta-select-option]',
      );
      expect(options[0].getAttribute('data-selected')).toBe('true');
      expect(options[0].getAttribute('aria-selected')).toBe('true');
    });

    it('should render chevron icon', () => {
      const icon = fixture.nativeElement.querySelector(
        '[data-brkta-select-icon]',
      );
      expect(icon).toBeTruthy();
    });
  });
});
