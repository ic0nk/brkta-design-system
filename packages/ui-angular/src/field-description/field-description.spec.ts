import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FieldDescriptionComponent } from './field-description.component';

describe('FieldDescriptionComponent', () => {
  let component: FieldDescriptionComponent;
  let fixture: ComponentFixture<FieldDescriptionComponent>;
  let pEl: HTMLParagraphElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldDescriptionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FieldDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    pEl = fixture.nativeElement.querySelector('p');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('data attributes', () => {
    it('should set data-brkta-field-description', () => {
      expect(pEl.hasAttribute('data-brkta-field-description')).toBe(true);
    });

    it('should set id when provided', () => {
      fixture.componentRef.setInput('id', 'desc-text');
      fixture.detectChanges();
      expect(pEl.getAttribute('id')).toBe('desc-text');
    });

    it('should omit id when not provided', () => {
      expect(pEl.hasAttribute('id')).toBe(false);
    });
  });

  it('should render a <p> element', () => {
    expect(pEl.tagName.toLowerCase()).toBe('p');
  });
});

describe('FieldDescriptionComponent content projection', () => {
  @Component({
    standalone: true,
    imports: [FieldDescriptionComponent],
    template: `<brkta-field-description>Enter your full name</brkta-field-description>`,
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
    expect(pEl.textContent).toContain('Enter your full name');
  });
});
