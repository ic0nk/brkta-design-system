import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { LabelComponent } from './label.component';

describe('LabelComponent', () => {
  let component: LabelComponent;
  let fixture: ComponentFixture<LabelComponent>;
  let labelEl: HTMLLabelElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    labelEl = fixture.nativeElement.querySelector('label');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('data attributes', () => {
    it('should set data-brkta-label', () => {
      expect(labelEl.hasAttribute('data-brkta-label')).toBe(true);
    });

    it('should reflect required when true', () => {
      fixture.componentRef.setInput('required', true);
      fixture.detectChanges();
      expect(labelEl.getAttribute('data-required')).toBe('true');
    });

    it('should omit data-required when false', () => {
      expect(labelEl.hasAttribute('data-required')).toBe(false);
    });

    it('should reflect disabled when true', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      expect(labelEl.getAttribute('data-disabled')).toBe('true');
    });

    it('should omit data-disabled when false', () => {
      expect(labelEl.hasAttribute('data-disabled')).toBe(false);
    });
  });

  describe('htmlFor', () => {
    it('should set for attribute when htmlFor is provided', () => {
      fixture.componentRef.setInput('htmlFor', 'email-input');
      fixture.detectChanges();
      expect(labelEl.getAttribute('for')).toBe('email-input');
    });

    it('should omit for attribute when htmlFor is not provided', () => {
      expect(labelEl.hasAttribute('for')).toBe(false);
    });
  });

  it('should render a <label> element', () => {
    expect(labelEl.tagName.toLowerCase()).toBe('label');
  });
});

describe('LabelComponent content projection', () => {
  @Component({
    standalone: true,
    imports: [LabelComponent],
    template: `<brkta-label>Email Address</brkta-label>`,
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
    expect(labelEl.textContent).toContain('Email Address');
  });
});
