import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FieldHelpComponent } from './field-help.component';

describe('FieldHelpComponent', () => {
  let component: FieldHelpComponent;
  let fixture: ComponentFixture<FieldHelpComponent>;
  let pEl: HTMLParagraphElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldHelpComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FieldHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    pEl = fixture.nativeElement.querySelector('p');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('data attributes', () => {
    it('should set data-brkta-field-help', () => {
      expect(pEl.hasAttribute('data-brkta-field-help')).toBe(true);
    });

    it('should set id when provided', () => {
      fixture.componentRef.setInput('id', 'help-text');
      fixture.detectChanges();
      expect(pEl.getAttribute('id')).toBe('help-text');
    });

    it('should omit id when not provided', () => {
      expect(pEl.hasAttribute('id')).toBe(false);
    });
  });

  it('should render a <p> element', () => {
    expect(pEl.tagName.toLowerCase()).toBe('p');
  });
});

describe('FieldHelpComponent content projection', () => {
  @Component({
    standalone: true,
    imports: [FieldHelpComponent],
    template: `<brkta-field-help>Help text here</brkta-field-help>`,
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
    expect(pEl.textContent).toContain('Help text here');
  });
});
