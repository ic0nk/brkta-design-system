import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FieldErrorComponent } from './field-error.component';

describe('FieldErrorComponent', () => {
  let component: FieldErrorComponent;
  let fixture: ComponentFixture<FieldErrorComponent>;
  let pEl: HTMLParagraphElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldErrorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FieldErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    pEl = fixture.nativeElement.querySelector('p');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('data attributes', () => {
    it('should set data-brkta-field-error', () => {
      expect(pEl.hasAttribute('data-brkta-field-error')).toBe(true);
    });

    it('should set id when provided', () => {
      fixture.componentRef.setInput('id', 'error-msg');
      fixture.detectChanges();
      expect(pEl.getAttribute('id')).toBe('error-msg');
    });

    it('should omit id when not provided', () => {
      expect(pEl.hasAttribute('id')).toBe(false);
    });
  });

  it('should have role="alert"', () => {
    expect(pEl.getAttribute('role')).toBe('alert');
  });

  it('should render a <p> element', () => {
    expect(pEl.tagName.toLowerCase()).toBe('p');
  });
});

describe('FieldErrorComponent content projection', () => {
  @Component({
    standalone: true,
    imports: [FieldErrorComponent],
    template: `<brkta-field-error>This field is required</brkta-field-error>`,
  })
  class TestHost {}

  let fixture: ComponentFixture<TestHost>;
  let pEl: HTMLParagraphElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHost],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
    pEl = fixture.nativeElement.querySelector('p');
  });

  it('should project content', () => {
    expect(pEl.textContent).toContain('This field is required');
  });
});
