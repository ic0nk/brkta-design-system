import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FieldComponent } from './field.component';

describe('FieldComponent', () => {
  let component: FieldComponent;
  let fixture: ComponentFixture<FieldComponent>;
  let divEl: HTMLDivElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    divEl = fixture.nativeElement.querySelector('div');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('data attributes', () => {
    it('should set data-brkta-field', () => {
      expect(divEl.hasAttribute('data-brkta-field')).toBe(true);
    });

    it('should reflect data-invalid when true', () => {
      fixture.componentRef.setInput('invalid', true);
      fixture.detectChanges();
      expect(divEl.getAttribute('data-invalid')).toBe('true');
    });

    it('should omit data-invalid when false', () => {
      expect(divEl.hasAttribute('data-invalid')).toBe(false);
    });

    it('should reflect data-disabled when true', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      expect(divEl.getAttribute('data-disabled')).toBe('true');
    });

    it('should omit data-disabled when false', () => {
      expect(divEl.hasAttribute('data-disabled')).toBe(false);
    });

    it('should reflect data-required when true', () => {
      fixture.componentRef.setInput('required', true);
      fixture.detectChanges();
      expect(divEl.getAttribute('data-required')).toBe('true');
    });

    it('should omit data-required when false', () => {
      expect(divEl.hasAttribute('data-required')).toBe(false);
    });
  });

  it('should render a <div> element', () => {
    expect(divEl.tagName.toLowerCase()).toBe('div');
  });
});

describe('FieldComponent content projection', () => {
  @Component({
    standalone: true,
    imports: [FieldComponent],
    template: `<brkta-field><span>Inner</span></brkta-field>`,
  })
  class TestHost {}

  let fixture: ComponentFixture<TestHost>;
  let divEl: HTMLDivElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHost],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
    divEl = fixture.nativeElement.querySelector('div');
  });

  it('should project content', () => {
    const span = divEl.querySelector('span');
    expect(span).toBeTruthy();
    expect(span.textContent).toContain('Inner');
  });
});
