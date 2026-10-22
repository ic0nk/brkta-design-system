import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { NativeSelectComponent } from './native-select.component';

describe('NativeSelectComponent', () => {
  let component: NativeSelectComponent;
  let fixture: ComponentFixture<NativeSelectComponent>;
  let selectEl: HTMLSelectElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NativeSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NativeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    selectEl = fixture.nativeElement.querySelector('select');
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
  });

  describe('data attributes', () => {
    it('should set data-brkta-native-select', () => {
      expect(selectEl.hasAttribute('data-brkta-native-select')).toBe(true);
    });

    it('should reflect default variant', () => {
      expect(selectEl.getAttribute('data-variant')).toBe('default');
    });

    it('should reflect custom variant', () => {
      fixture.componentRef.setInput('variant', 'filled');
      fixture.detectChanges();
      expect(selectEl.getAttribute('data-variant')).toBe('filled');
    });

    it('should reflect custom size', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();
      expect(selectEl.getAttribute('data-size')).toBe('lg');
    });
  });

  describe('disabled', () => {
    it('should not have data-disabled by default', () => {
      expect(selectEl.hasAttribute('data-disabled')).toBe(false);
    });

    it('should set data-disabled and disabled when true', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      expect(selectEl.getAttribute('data-disabled')).toBe('true');
      expect(selectEl.disabled).toBe(true);
    });
  });

  describe('invalid', () => {
    it('should not have data-invalid by default', () => {
      expect(selectEl.hasAttribute('data-invalid')).toBe(false);
    });

    it('should set data-invalid when true', () => {
      fixture.componentRef.setInput('invalid', true);
      fixture.detectChanges();
      expect(selectEl.getAttribute('data-invalid')).toBe('true');
    });
  });

  it('should set name attribute', () => {
    fixture.componentRef.setInput('name', 'country');
    fixture.detectChanges();
    expect(selectEl.getAttribute('name')).toBe('country');
  });

  it('should render a <select> element', () => {
    expect(selectEl.tagName.toLowerCase()).toBe('select');
  });
});

describe('NativeSelectComponent content projection', () => {
  @Component({
    standalone: true,
    imports: [NativeSelectComponent],
    template: `
      <brkta-native-select>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </brkta-native-select>
    `,
  })
  class TestHost {}

  let fixture: ComponentFixture<TestHost>;
  let selectEl: HTMLSelectElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHost],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
    selectEl = fixture.nativeElement.querySelector('select');
  });

  it('should project option elements', () => {
    expect(selectEl.options.length).toBe(2);
    expect(selectEl.options[0].text).toBe('Option 1');
    expect(selectEl.options[1].text).toBe('Option 2');
  });
});
