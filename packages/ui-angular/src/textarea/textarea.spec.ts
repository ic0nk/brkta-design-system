import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { TextareaComponent } from './textarea.component';

describe('TextareaComponent', () => {
  let component: TextareaComponent;
  let fixture: ComponentFixture<TextareaComponent>;
  let textareaEl: HTMLTextAreaElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextareaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    textareaEl = fixture.nativeElement.querySelector('textarea');
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

    it('should default rows to 3', () => {
      expect(component.rows).toBe(3);
    });
  });

  describe('data attributes', () => {
    it('should set data-brkta-textarea', () => {
      expect(textareaEl.hasAttribute('data-brkta-textarea')).toBe(true);
    });

    it('should reflect default variant', () => {
      expect(textareaEl.getAttribute('data-variant')).toBe('default');
    });

    it('should reflect custom variant', () => {
      fixture.componentRef.setInput('variant', 'filled');
      fixture.detectChanges();
      expect(textareaEl.getAttribute('data-variant')).toBe('filled');
    });

    it('should reflect custom size', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();
      expect(textareaEl.getAttribute('data-size')).toBe('lg');
    });
  });

  describe('disabled', () => {
    it('should not have data-disabled by default', () => {
      expect(textareaEl.hasAttribute('data-disabled')).toBe(false);
    });

    it('should set data-disabled and disabled when true', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      expect(textareaEl.getAttribute('data-disabled')).toBe('true');
      expect(textareaEl.disabled).toBe(true);
    });
  });

  describe('invalid', () => {
    it('should not have data-invalid or aria-invalid by default', () => {
      expect(textareaEl.hasAttribute('data-invalid')).toBe(false);
      expect(textareaEl.hasAttribute('aria-invalid')).toBe(false);
    });

    it('should set data-invalid and aria-invalid when true', () => {
      fixture.componentRef.setInput('invalid', true);
      fixture.detectChanges();
      expect(textareaEl.getAttribute('data-invalid')).toBe('true');
      expect(textareaEl.getAttribute('aria-invalid')).toBe('true');
    });
  });

  it('should set placeholder', () => {
    fixture.componentRef.setInput('placeholder', 'Enter description...');
    fixture.detectChanges();
    expect(textareaEl.placeholder).toBe('Enter description...');
  });

  it('should set rows attribute', () => {
    fixture.componentRef.setInput('rows', 5);
    fixture.detectChanges();
    expect(textareaEl.getAttribute('rows')).toBe('5');
  });

  it('should render as a <textarea> element', () => {
    expect(textareaEl.tagName.toLowerCase()).toBe('textarea');
  });
});

describe('TextareaComponent content projection', () => {
  @Component({
    standalone: true,
    imports: [TextareaComponent],
    template: `<brkta-textarea placeholder="Message"></brkta-textarea>`,
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

  it('should render textarea with placeholder', () => {
    const el = fixture.nativeElement.querySelector('textarea');
    expect(el).toBeTruthy();
    expect(el.placeholder).toBe('Message');
  });
});
