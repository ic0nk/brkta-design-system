import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, beforeEach } from 'vitest';
import { ColorPickerComponent } from './color-picker.component';

describe('ColorPickerComponent', () => {
  let fixture: ComponentFixture<ColorPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ColorPickerComponent] }).compileComponents();
    fixture = TestBed.createComponent(ColorPickerComponent);
    fixture.componentRef.setInput('ariaLabel', 'Primary colour');
    fixture.componentRef.setInput('value', '#61161c');
    fixture.detectChanges();
  });

  it('renders an opaque colour swatch instead of a native colour input', () => {
    expect(fixture.nativeElement.querySelector('[data-brkta-color-picker-swatch]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('input[type="color"]')).toBeNull();
  });

  it('opens a keyboard-operable visual editor', () => {
    fixture.nativeElement.querySelector('[data-brkta-color-picker-trigger]').click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[data-brkta-color-picker-plane]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-brkta-color-picker-hue]')).toBeTruthy();
  });

  it('emits canonical hex values when a channel changes', () => {
    const emitted: string[] = [];
    fixture.componentInstance.valueChange.subscribe((value) => emitted.push(value));
    fixture.componentInstance.setChannel('red', { target: { value: '255' } } as unknown as Event);

    expect(emitted).toEqual(['#ff161c']);
  });
});
