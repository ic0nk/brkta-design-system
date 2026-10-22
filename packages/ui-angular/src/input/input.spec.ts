import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { InputComponent, InputSuffixDirective } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let inputEl: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    inputEl = fixture.nativeElement.querySelector('input');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('defaults', () => {
    it('should default variant to "default"', () => {
      expect(component.variant).toBe('default');
    });

    it('should default size to "md"', () => {
      expect(component.size).toBe('md');
    });

    it('should default type to "text"', () => {
      expect(component.type).toBe('text');
    });
  });

  describe('data attributes', () => {
    it('should set data-brkta-input', () => {
      expect(inputEl.hasAttribute('data-brkta-input')).toBe(true);
    });

    it('should reflect default variant', () => {
      expect(inputEl.getAttribute('data-variant')).toBe('default');
    });

    it('should reflect custom variant', () => {
      fixture.componentRef.setInput('variant', 'filled');
      fixture.detectChanges();
      expect(inputEl.getAttribute('data-variant')).toBe('filled');
    });

    it('should reflect custom size', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();
      expect(inputEl.getAttribute('data-size')).toBe('lg');
    });
  });

  describe('disabled', () => {
    it('should not have data-disabled by default', () => {
      expect(inputEl.hasAttribute('data-disabled')).toBe(false);
    });

    it('should set data-disabled and disabled when true', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      expect(inputEl.getAttribute('data-disabled')).toBe('true');
      expect(inputEl.disabled).toBe(true);
    });
  });

  describe('invalid', () => {
    it('should not have data-invalid or aria-invalid by default', () => {
      expect(inputEl.hasAttribute('data-invalid')).toBe(false);
      expect(inputEl.hasAttribute('aria-invalid')).toBe(false);
    });

    it('should set data-invalid and aria-invalid when true', () => {
      fixture.componentRef.setInput('invalid', true);
      fixture.detectChanges();
      expect(inputEl.getAttribute('data-invalid')).toBe('true');
      expect(inputEl.getAttribute('aria-invalid')).toBe('true');
    });
  });

  it('should set placeholder', () => {
    fixture.componentRef.setInput('placeholder', 'Enter text...');
    fixture.detectChanges();
    expect(inputEl.placeholder).toBe('Enter text...');
  });

  it('should set name', () => {
    fixture.componentRef.setInput('name', 'username');
    fixture.detectChanges();
    expect(inputEl.getAttribute('name')).toBe('username');
  });

  it('should set accepted file types', () => {
    fixture.componentRef.setInput('type', 'file');
    fixture.componentRef.setInput('accept', 'image/png,image/jpeg');
    fixture.detectChanges();
    expect(inputEl.getAttribute('accept')).toBe('image/png,image/jpeg');
  });

  it('does not set multiple by default', () => {
    expect(inputEl.hasAttribute('multiple')).toBe(false);
  });

  it('sets multiple when enabled', () => {
    fixture.componentRef.setInput('type', 'file');
    fixture.componentRef.setInput('multiple', true);
    fixture.detectChanges();
    expect(inputEl.hasAttribute('multiple')).toBe(true);
  });

  it('should set id', () => {
    fixture.componentRef.setInput('id', 'username-input');
    fixture.detectChanges();
    expect(inputEl.id).toBe('username-input');
  });

  it('should render as an <input> element', () => {
    expect(inputEl.tagName.toLowerCase()).toBe('input');
  });

  it('does not add a suffix container without projected suffix content', () => {
    expect(fixture.nativeElement.querySelector('[data-brkta-input-container]')).toBeNull();
  });
});

describe('InputComponent content projection', () => {
  @Component({
    standalone: true,
    imports: [InputComponent, InputSuffixDirective],
    template: `
      <brkta-input placeholder="Name">
        <button brktaInputSuffix type="button">Show</button>
      </brkta-input>
    `,
  })
  class TestHost {}

  let fixture: ComponentFixture<TestHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHost],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
  });

  it('should render input with placeholder', () => {
    const el = fixture.nativeElement.querySelector('input');
    expect(el).toBeTruthy();
    expect(el.placeholder).toBe('Name');
  });

  it('projects a suffix inside the input container', () => {
    expect(fixture.nativeElement.querySelector('[data-brkta-input-container]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-brkta-input-suffix] button')).toBeTruthy();
  });

  it('names an input that has no visible label beside it', () => {
    // A grid of cells under one set of headings has nowhere to put a label per field. Without a
    // name each cell is announced as "edit text" and nothing else.
    const fixture = TestBed.createComponent(InputComponent);
    fixture.componentInstance.ariaLabel = 'Unit code';
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(input.getAttribute('aria-label')).toBe('Unit code');
  });

  it('leaves aria-label off entirely when there is a visible label', () => {
    // An empty aria-label would override the visible one with nothing.
    const fixture = TestBed.createComponent(InputComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('input').hasAttribute('aria-label')).toBe(false);
  });

  it('asks for the keyboard the field actually needs', () => {
    const fixture = TestBed.createComponent(InputComponent);
    fixture.componentInstance.inputMode = 'decimal';
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('input').getAttribute('inputmode')).toBe('decimal');
  });
});
