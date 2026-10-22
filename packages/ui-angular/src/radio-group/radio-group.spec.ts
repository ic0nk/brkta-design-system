import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { RadioGroupComponent, RadioComponent } from './radio-group.component';

describe('RadioGroupComponent', () => {
  let component: RadioGroupComponent;
  let fixture: ComponentFixture<RadioGroupComponent>;
  let divEl: HTMLDivElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RadioGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    divEl = fixture.nativeElement.querySelector('div');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('defaults', () => {
    it('should default orientation to "vertical"', () => {
      expect(component.orientation).toBe('vertical');
    });

    it('should default invalid to false', () => {
      expect(component.invalid).toBe(false);
    });
  });

  describe('data attributes', () => {
    it('should set data-brkta-radio-group', () => {
      expect(divEl.hasAttribute('data-brkta-radio-group')).toBe(true);
    });

    it('should reflect orientation', () => {
      fixture.componentRef.setInput('orientation', 'horizontal');
      fixture.detectChanges();
      expect(divEl.getAttribute('data-orientation')).toBe('horizontal');
    });

    it('should reflect data-invalid when true', () => {
      fixture.componentRef.setInput('invalid', true);
      fixture.detectChanges();
      expect(divEl.getAttribute('data-invalid')).toBe('true');
    });

    it('should omit data-invalid when false', () => {
      expect(divEl.hasAttribute('data-invalid')).toBe(false);
    });
  });

  it('should render a <div> element', () => {
    expect(divEl.tagName.toLowerCase()).toBe('div');
  });
});

describe('RadioComponent', () => {
  let component: RadioComponent;
  let fixture: ComponentFixture<RadioComponent>;
  let labelEl: HTMLLabelElement;
  let inputEl: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    labelEl = fixture.nativeElement.querySelector('label');
    inputEl = fixture.nativeElement.querySelector('input');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('data attributes', () => {
    it('should set data-brkta-radio', () => {
      expect(labelEl.hasAttribute('data-brkta-radio')).toBe(true);
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

  it('should set value attribute on input', () => {
    fixture.componentRef.setInput('value', 'option-1');
    fixture.detectChanges();
    expect(inputEl.getAttribute('value')).toBe('option-1');
  });

  it('should set checked when true', () => {
    fixture.componentRef.setInput('checked', true);
    fixture.detectChanges();
    expect(inputEl.checked).toBe(true);
  });

  it('should set name attribute', () => {
    fixture.componentRef.setInput('name', 'fruit');
    fixture.detectChanges();
    expect(inputEl.getAttribute('name')).toBe('fruit');
  });

  it('should render input[type="radio"]', () => {
    expect(inputEl.type).toBe('radio');
  });
});

describe('RadioGroup + Radio composition', () => {
  @Component({
    standalone: true,
    imports: [RadioGroupComponent, RadioComponent],
    template: `
      <brkta-radio-group orientation="horizontal">
        <brkta-radio value="yes" name="confirm">Yes</brkta-radio>
        <brkta-radio value="no" name="confirm">No</brkta-radio>
      </brkta-radio-group>
    `,
  })
  class TestHost {}

  let fixture: ComponentFixture<TestHost>;
  let radios: NodeListOf<HTMLInputElement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHost],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
    radios = fixture.nativeElement.querySelectorAll('input[type="radio"]');
  });

  it('should render radio inputs with same name', () => {
    expect(radios.length).toBe(2);
    expect(radios[0].getAttribute('name')).toBe('confirm');
    expect(radios[1].getAttribute('name')).toBe('confirm');
  });

  it('should project label text', () => {
    const labels = fixture.nativeElement.querySelectorAll('label');
    expect(labels[0].textContent).toContain('Yes');
    expect(labels[1].textContent).toContain('No');
  });
});
