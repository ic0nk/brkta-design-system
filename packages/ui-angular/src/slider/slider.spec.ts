import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SliderComponent } from './slider.component';

describe('SliderComponent', () => {
  let fixture: ComponentFixture<SliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [SliderComponent] }).compileComponents();
    fixture = TestBed.createComponent(SliderComponent);
    fixture.detectChanges();
  });

  it('should render thumb with slider role', () => {
    const thumb = fixture.nativeElement.querySelector('[data-brkta-slider-thumb]');
    expect(thumb).toBeTruthy();
    expect(thumb.getAttribute('role')).toBe('slider');
  });

  it('should have ARIA attributes', () => {
    fixture.componentRef.setInput('min', 0);
    fixture.componentRef.setInput('max', 100);
    fixture.componentRef.setInput('defaultValue', 50);
    fixture.detectChanges();
    const thumb = fixture.nativeElement.querySelector('[data-brkta-slider-thumb]');
    expect(thumb.getAttribute('aria-valuemin')).toBe('0');
    expect(thumb.getAttribute('aria-valuemax')).toBe('100');
  });

  it('should render disabled state', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[data-disabled]')).toBeTruthy();
  });

  it('should handle keyboard navigation', () => {
    const emitted: number[] = [];
    fixture.componentInstance.valueChange.subscribe(v => emitted.push(v));
    const thumb = fixture.nativeElement.querySelector('[data-brkta-slider-thumb]');
    thumb.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    expect(emitted.length).toBeGreaterThan(0);
  });
});

describe('SliderComponent — range mode', () => {
  let fixture: ComponentFixture<SliderComponent>;

  beforeAll(() => {
    // jsdom does not implement PointerEvent capture; polyfill it so the
    // component's drag path (identical technique to single-thumb mode) can
    // be exercised in these range-mode tests without throwing.
    if (!HTMLElement.prototype.setPointerCapture) {
      HTMLElement.prototype.setPointerCapture = () => {};
    }
  });

  beforeEach(async () => {
    // Deliberately does NOT call detectChanges() here: ngOnInit (which seeds
    // the uncontrolled internal lower/upper state from defaultLowerValue /
    // defaultUpperValue) runs once, on the first change detection pass — so
    // each test must set its own default-value inputs before its first
    // detectChanges() call, not after.
    await TestBed.configureTestingModule({ imports: [SliderComponent] }).compileComponents();
    fixture = TestBed.createComponent(SliderComponent);
    fixture.componentRef.setInput('range', true);
    fixture.componentRef.setInput('min', 0);
    fixture.componentRef.setInput('max', 100);
  });

  it('should render two independently focusable thumbs with distinct accessible names', () => {
    fixture.componentRef.setInput('lowerAriaLabel', 'Minimum price');
    fixture.componentRef.setInput('upperAriaLabel', 'Maximum price');
    fixture.detectChanges();
    const lower = fixture.nativeElement.querySelector('[data-brkta-slider-thumb-lower]');
    const upper = fixture.nativeElement.querySelector('[data-brkta-slider-thumb-upper]');
    expect(lower).toBeTruthy();
    expect(upper).toBeTruthy();
    expect(lower.getAttribute('role')).toBe('slider');
    expect(upper.getAttribute('role')).toBe('slider');
    expect(lower.getAttribute('aria-label')).toBe('Minimum price');
    expect(upper.getAttribute('aria-label')).toBe('Maximum price');
    expect(lower.getAttribute('tabindex')).toBe('0');
    expect(upper.getAttribute('tabindex')).toBe('0');
  });

  it("should bound each thumb's aria-valuemin/aria-valuemax by the other thumb's current value", () => {
    fixture.componentRef.setInput('defaultLowerValue', 30);
    fixture.componentRef.setInput('defaultUpperValue', 70);
    fixture.detectChanges();
    const lower = fixture.nativeElement.querySelector('[data-brkta-slider-thumb-lower]');
    const upper = fixture.nativeElement.querySelector('[data-brkta-slider-thumb-upper]');
    expect(lower.getAttribute('aria-valuemin')).toBe('0');
    expect(lower.getAttribute('aria-valuemax')).toBe('70'); // bounded by upper, not global max
    expect(lower.getAttribute('aria-valuenow')).toBe('30');
    expect(upper.getAttribute('aria-valuemin')).toBe('30'); // bounded by lower, not global min
    expect(upper.getAttribute('aria-valuemax')).toBe('100');
    expect(upper.getAttribute('aria-valuenow')).toBe('70');
  });

  it('should move the focused thumb by step on arrow keys, independently per thumb', () => {
    fixture.componentRef.setInput('step', 5);
    fixture.componentRef.setInput('defaultLowerValue', 30);
    fixture.componentRef.setInput('defaultUpperValue', 70);
    fixture.detectChanges();
    const emitted: { lower: number; upper: number }[] = [];
    fixture.componentInstance.rangeChange.subscribe(v => emitted.push(v));

    const lower = fixture.nativeElement.querySelector('[data-brkta-slider-thumb-lower]');
    lower.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    expect(emitted.at(-1)).toEqual({ lower: 35, upper: 70 });

    const upper = fixture.nativeElement.querySelector('[data-brkta-slider-thumb-upper]');
    upper.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    expect(emitted.at(-1)).toEqual({ lower: 35, upper: 65 });
  });

  it("should jump the focused thumb to its permitted bound on Home/End (the other thumb's value, not the slider's global min/max)", () => {
    fixture.componentRef.setInput('defaultLowerValue', 30);
    fixture.componentRef.setInput('defaultUpperValue', 70);
    fixture.detectChanges();
    const emitted: { lower: number; upper: number }[] = [];
    fixture.componentInstance.rangeChange.subscribe(v => emitted.push(v));

    const lower = fixture.nativeElement.querySelector('[data-brkta-slider-thumb-lower]');
    lower.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    expect(emitted.at(-1)).toEqual({ lower: 70, upper: 70 }); // touches upper, does not cross

    const upper = fixture.nativeElement.querySelector('[data-brkta-slider-thumb-upper]');
    upper.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    expect(emitted.at(-1)).toEqual({ lower: 70, upper: 70 }); // touches lower, does not cross

    lower.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    expect(emitted.at(-1)).toEqual({ lower: 0, upper: 70 });
  });

  it('should never let the thumbs cross past each other via the keyboard', () => {
    fixture.componentRef.setInput('step', 10);
    fixture.componentRef.setInput('defaultLowerValue', 60);
    fixture.componentRef.setInput('defaultUpperValue', 70);
    fixture.detectChanges();
    const emitted: { lower: number; upper: number }[] = [];
    fixture.componentInstance.rangeChange.subscribe(v => emitted.push(v));

    const lower = fixture.nativeElement.querySelector('[data-brkta-slider-thumb-lower]');
    lower.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })); // would be 70, clamps to upper — touching
    lower.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })); // would be 80, still clamped to upper
    expect(emitted.at(-1)).toEqual({ lower: 70, upper: 70 });
  });

  it('should drag whichever thumb is nearer the pointer, for both a track click and a direct thumb grab', () => {
    fixture.componentRef.setInput('defaultLowerValue', 20);
    fixture.componentRef.setInput('defaultUpperValue', 80);
    fixture.detectChanges();
    const emitted: { lower: number; upper: number }[] = [];
    fixture.componentInstance.rangeChange.subscribe(v => emitted.push(v));

    const track = fixture.nativeElement.querySelector('[data-brkta-slider-track]') as HTMLElement;
    track.getBoundingClientRect = () =>
      ({ left: 0, right: 200, width: 200, top: 0, bottom: 0, height: 0, x: 0, y: 0, toJSON() {} }) as DOMRect;

    // clientX=30/200=15% is nearer the lower thumb (20%) than the upper (80%).
    track.dispatchEvent(new PointerEvent('pointerdown', { clientX: 30, pointerId: 1, bubbles: true }));
    expect(emitted.at(-1)).toEqual({ lower: 15, upper: 80 });

    // clientX=170/200=85% is nearer the upper thumb (80%) than the lower (20%).
    track.dispatchEvent(new PointerEvent('pointerdown', { clientX: 170, pointerId: 2, bubbles: true }));
    expect(emitted.at(-1)).toEqual({ lower: 15, upper: 85 });
  });

  it('should resolve overlapping 44px hit regions by nearest-value, not DOM z-order, when the thumbs are close together', () => {
    fixture.componentRef.setInput('defaultLowerValue', 48);
    fixture.componentRef.setInput('defaultUpperValue', 52);
    fixture.detectChanges();
    const emitted: { lower: number; upper: number }[] = [];
    fixture.componentInstance.rangeChange.subscribe(v => emitted.push(v));

    const track = fixture.nativeElement.querySelector('[data-brkta-slider-track]') as HTMLElement;
    track.getBoundingClientRect = () =>
      ({ left: 0, right: 200, width: 200, top: 0, bottom: 0, height: 0, x: 0, y: 0, toJSON() {} }) as DOMRect;

    // Pointerdown fired on the upper thumb's own element (as an overlapping
    // hit region would deliver it), but the click position (47%) is nearer
    // the lower thumb (48%) than the upper (52%) — nearest-by-value must win
    // over "whichever element the browser happened to hit-test".
    const upperThumb = fixture.nativeElement.querySelector('[data-brkta-slider-thumb-upper]') as HTMLElement;
    upperThumb.dispatchEvent(new PointerEvent('pointerdown', { clientX: 94, pointerId: 3, bubbles: true }));
    expect(emitted.at(-1)).toEqual({ lower: 47, upper: 52 });
  });

  it('should use the CSS logical inset-inline-start property (not physical left) so RTL positioning is browser-native', () => {
    fixture.detectChanges();
    const lower = fixture.nativeElement.querySelector('[data-brkta-slider-thumb-lower]') as HTMLElement;
    const upper = fixture.nativeElement.querySelector('[data-brkta-slider-thumb-upper]') as HTMLElement;
    const rangeFill = fixture.nativeElement.querySelector('[data-brkta-slider-range]') as HTMLElement;
    for (const el of [lower, upper, rangeFill]) {
      expect(el.style.insetInlineStart).not.toBe('');
      expect(el.style.left).toBe('');
    }
  });

  it('should flip the pointer-to-value mapping under dir="rtl" so the lower bound resolves toward the physical right', () => {
    fixture.componentRef.setInput('defaultLowerValue', 20);
    fixture.componentRef.setInput('defaultUpperValue', 80);
    fixture.detectChanges();

    const ltrTrack = fixture.nativeElement.querySelector('[data-brkta-slider-track]') as HTMLElement;
    ltrTrack.getBoundingClientRect = () =>
      ({ left: 0, right: 200, width: 200, top: 0, bottom: 0, height: 0, x: 0, y: 0, toJSON() {} }) as DOMRect;
    // Physical-left click (clientX=10, near the LTR start edge) is nearest the lower thumb in LTR.
    ltrTrack.dispatchEvent(new PointerEvent('pointerdown', { clientX: 10, pointerId: 4, bubbles: true }));
    const ltrLower = fixture.nativeElement.querySelector('[data-brkta-slider-thumb-lower]') as HTMLElement;
    expect(ltrLower.style.insetInlineStart).toBe('5%');

    const rtlFixture = TestBed.createComponent(SliderComponent);
    rtlFixture.nativeElement.setAttribute('dir', 'rtl');
    rtlFixture.componentRef.setInput('range', true);
    rtlFixture.componentRef.setInput('min', 0);
    rtlFixture.componentRef.setInput('max', 100);
    rtlFixture.componentRef.setInput('defaultLowerValue', 20);
    rtlFixture.componentRef.setInput('defaultUpperValue', 80);
    rtlFixture.detectChanges();

    const rtlTrack = rtlFixture.nativeElement.querySelector('[data-brkta-slider-track]') as HTMLElement;
    rtlTrack.getBoundingClientRect = () =>
      ({ left: 0, right: 200, width: 200, top: 0, bottom: 0, height: 0, x: 0, y: 0, toJSON() {} }) as DOMRect;
    // The SAME physical-left clientX now maps to a HIGH logical percentage
    // under RTL (physical left = inline-end there), landing nearest the
    // upper thumb instead — confirming the mapping is direction-aware.
    rtlTrack.dispatchEvent(new PointerEvent('pointerdown', { clientX: 10, pointerId: 5, bubbles: true }));
    const rtlUpper = rtlFixture.nativeElement.querySelector('[data-brkta-slider-thumb-upper]') as HTMLElement;
    expect(rtlUpper.style.insetInlineStart).toBe('95%');

    // And a physical-RIGHT click under RTL lands nearest the LOWER thumb,
    // with a LOW inset-inline-start% — which the browser's dir="rtl"
    // handling renders at the physical right edge, i.e. the lower bound
    // sits on the right in RTL, as required.
    rtlTrack.dispatchEvent(new PointerEvent('pointerdown', { clientX: 190, pointerId: 6, bubbles: true }));
    const rtlLower = rtlFixture.nativeElement.querySelector('[data-brkta-slider-thumb-lower]') as HTMLElement;
    expect(rtlLower.style.insetInlineStart).toBe('5%');
  });
});
