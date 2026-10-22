import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Slider } from './slider';

describe('Slider', () => {
  it('renders with default value', () => {
    const { container } = render(<Slider defaultValue={50} />);
    const thumb = container.querySelector('[data-brkta-slider-thumb]');
    expect(thumb).toBeTruthy();
    expect(thumb?.getAttribute('role')).toBe('slider');
  });

  it('has correct ARIA attributes', () => {
    const { container } = render(<Slider min={0} max={100} defaultValue={50} />);
    const thumb = container.querySelector('[data-brkta-slider-thumb]');
    expect(thumb?.getAttribute('aria-valuemin')).toBe('0');
    expect(thumb?.getAttribute('aria-valuemax')).toBe('100');
    expect(thumb?.getAttribute('aria-valuenow')).toBe('50');
  });

  it('renders disabled state', () => {
    const { container } = render(<Slider disabled />);
    expect(container.querySelector('[data-disabled]')).toBeTruthy();
  });

  it('handles keyboard navigation', () => {
    const onValueChange = vi.fn();
    const { container } = render(<Slider defaultValue={50} onValueChange={onValueChange} />);
    const thumb = container.querySelector('[data-brkta-slider-thumb]')!;
    fireEvent.keyDown(thumb, { key: 'ArrowRight' });
    expect(onValueChange).toHaveBeenCalled();
  });
});

describe('Slider — range mode', () => {
  // jsdom does not implement PointerEvent capture; polyfill it so the
  // component's drag path (identical technique to single-thumb mode) can be
  // exercised in these range-mode tests without throwing.
  beforeAll(() => {
    if (!HTMLElement.prototype.setPointerCapture) {
      HTMLElement.prototype.setPointerCapture = () => {};
    }
  });

  it('renders two independently focusable thumbs with distinct accessible names', () => {
    const { container } = render(
      <Slider range defaultLowerValue={25} defaultUpperValue={75} lowerAriaLabel="Minimum price" upperAriaLabel="Maximum price" />,
    );
    const lower = container.querySelector('[data-brkta-slider-thumb-lower]');
    const upper = container.querySelector('[data-brkta-slider-thumb-upper]');
    expect(lower).toBeTruthy();
    expect(upper).toBeTruthy();
    expect(lower?.getAttribute('role')).toBe('slider');
    expect(upper?.getAttribute('role')).toBe('slider');
    expect(lower?.getAttribute('aria-label')).toBe('Minimum price');
    expect(upper?.getAttribute('aria-label')).toBe('Maximum price');
    expect(lower?.getAttribute('tabindex')).toBe('0');
    expect(upper?.getAttribute('tabindex')).toBe('0');
  });

  it("bounds each thumb's aria-valuemin/aria-valuemax by the other thumb's current value", () => {
    const { container } = render(<Slider range min={0} max={100} defaultLowerValue={30} defaultUpperValue={70} />);
    const lower = container.querySelector('[data-brkta-slider-thumb-lower]')!;
    const upper = container.querySelector('[data-brkta-slider-thumb-upper]')!;
    expect(lower.getAttribute('aria-valuemin')).toBe('0');
    expect(lower.getAttribute('aria-valuemax')).toBe('70'); // bounded by upper, not global max
    expect(lower.getAttribute('aria-valuenow')).toBe('30');
    expect(upper.getAttribute('aria-valuemin')).toBe('30'); // bounded by lower, not global min
    expect(upper.getAttribute('aria-valuemax')).toBe('100');
    expect(upper.getAttribute('aria-valuenow')).toBe('70');
  });

  it('moves the focused thumb by step on arrow keys, independently per thumb', () => {
    const onRangeChange = vi.fn();
    const { container } = render(
      <Slider range min={0} max={100} step={5} defaultLowerValue={30} defaultUpperValue={70} onRangeChange={onRangeChange} />,
    );
    const lower = container.querySelector('[data-brkta-slider-thumb-lower]')!;
    fireEvent.keyDown(lower, { key: 'ArrowRight' });
    expect(onRangeChange).toHaveBeenCalledWith({ lower: 35, upper: 70 });

    const upper = container.querySelector('[data-brkta-slider-thumb-upper]')!;
    fireEvent.keyDown(upper, { key: 'ArrowLeft' });
    expect(onRangeChange).toHaveBeenLastCalledWith({ lower: 35, upper: 65 });
  });

  it("Home/End jump the focused thumb to its permitted bound (the other thumb's value, not the slider's global min/max)", () => {
    const onRangeChange = vi.fn();
    const { container } = render(
      <Slider range min={0} max={100} defaultLowerValue={30} defaultUpperValue={70} onRangeChange={onRangeChange} />,
    );
    const lower = container.querySelector('[data-brkta-slider-thumb-lower]')!;
    fireEvent.keyDown(lower, { key: 'End' });
    expect(onRangeChange).toHaveBeenLastCalledWith({ lower: 70, upper: 70 }); // touches upper, does not cross

    const upper = container.querySelector('[data-brkta-slider-thumb-upper]')!;
    fireEvent.keyDown(upper, { key: 'Home' });
    expect(onRangeChange).toHaveBeenLastCalledWith({ lower: 70, upper: 70 }); // touches lower, does not cross

    fireEvent.keyDown(lower, { key: 'Home' });
    expect(onRangeChange).toHaveBeenLastCalledWith({ lower: 0, upper: 70 });
  });

  it('never lets the thumbs cross past each other via the keyboard', () => {
    const onRangeChange = vi.fn();
    const { container } = render(
      <Slider range min={0} max={100} step={10} defaultLowerValue={60} defaultUpperValue={70} onRangeChange={onRangeChange} />,
    );
    const lower = container.querySelector('[data-brkta-slider-thumb-lower]')!;
    fireEvent.keyDown(lower, { key: 'ArrowRight' }); // would be 70, clamps to upper (70) — touching
    fireEvent.keyDown(lower, { key: 'ArrowRight' }); // would be 80, still clamped to upper (70)
    expect(onRangeChange).toHaveBeenLastCalledWith({ lower: 70, upper: 70 });
  });

  it('drags whichever thumb is nearer the pointer, for both a track click and a direct thumb grab', () => {
    const onRangeChange = vi.fn();
    const { container } = render(
      <Slider range min={0} max={100} defaultLowerValue={20} defaultUpperValue={80} onRangeChange={onRangeChange} />,
    );
    const track = container.querySelector('[data-brkta-slider-track]') as HTMLElement;
    track.getBoundingClientRect = () =>
      ({ left: 0, right: 200, width: 200, top: 0, bottom: 0, height: 0, x: 0, y: 0, toJSON() {} }) as DOMRect;

    // clientX=30/200=15% is nearer the lower thumb (20%) than the upper (80%).
    fireEvent.pointerDown(track, { clientX: 30, pointerId: 1 });
    let call = onRangeChange.mock.calls.at(-1)![0];
    expect(call.lower).toBe(15);
    expect(call.upper).toBe(80);

    // clientX=170/200=85% is nearer the upper thumb (80%) than the lower (20%).
    fireEvent.pointerDown(track, { clientX: 170, pointerId: 2 });
    call = onRangeChange.mock.calls.at(-1)![0];
    expect(call.lower).toBe(15);
    expect(call.upper).toBe(85);
  });

  it('resolves overlapping 44px hit regions by nearest-value, not DOM z-order, when the thumbs are close together', () => {
    const onRangeChange = vi.fn();
    const { container } = render(
      <Slider range min={0} max={100} defaultLowerValue={48} defaultUpperValue={52} onRangeChange={onRangeChange} />,
    );
    const track = container.querySelector('[data-brkta-slider-track]') as HTMLElement;
    track.getBoundingClientRect = () =>
      ({ left: 0, right: 200, width: 200, top: 0, bottom: 0, height: 0, x: 0, y: 0, toJSON() {} }) as DOMRect;

    // Pointerdown fired on the upper thumb's own element (as an overlapping
    // hit region would deliver it), but the click position (47%) is nearer
    // the lower thumb (48%) than the upper (52%) — nearest-by-value must win
    // over "whichever element the browser happened to hit-test".
    const upperThumb = container.querySelector('[data-brkta-slider-thumb-upper]') as HTMLElement;
    fireEvent.pointerDown(upperThumb, { clientX: 94, pointerId: 3 });
    const call = onRangeChange.mock.calls.at(-1)![0];
    expect(call.lower).toBe(47);
    expect(call.upper).toBe(52);
  });

  it('uses the CSS logical inset-inline-start property (not physical left) so RTL positioning is browser-native', () => {
    const { container } = render(<Slider range defaultLowerValue={25} defaultUpperValue={75} />);
    const lower = container.querySelector('[data-brkta-slider-thumb-lower]') as HTMLElement;
    const upper = container.querySelector('[data-brkta-slider-thumb-upper]') as HTMLElement;
    const rangeFill = container.querySelector('[data-brkta-slider-range]') as HTMLElement;
    for (const el of [lower, upper, rangeFill]) {
      expect(el.style.insetInlineStart).not.toBe('');
      expect(el.style.left).toBe('');
    }
  });

  it('flips the pointer-to-value mapping under dir="rtl" so the lower bound resolves toward the physical right', () => {
    const ltr = render(<Slider range min={0} max={100} defaultLowerValue={20} defaultUpperValue={80} />);
    const ltrTrack = ltr.container.querySelector('[data-brkta-slider-track]') as HTMLElement;
    ltrTrack.getBoundingClientRect = () =>
      ({ left: 0, right: 200, width: 200, top: 0, bottom: 0, height: 0, x: 0, y: 0, toJSON() {} }) as DOMRect;
    // Physical-left click (clientX=10, near the LTR start edge) is nearest the lower thumb in LTR.
    fireEvent.pointerDown(ltrTrack, { clientX: 10, pointerId: 4 });
    const ltrLower = ltr.container.querySelector('[data-brkta-slider-thumb-lower]') as HTMLElement;
    expect(ltrLower.style.insetInlineStart).toBe('5%');

    const rtl = render(
      <div dir="rtl">
        <Slider range min={0} max={100} defaultLowerValue={20} defaultUpperValue={80} />
      </div>,
    );
    const rtlTrack = rtl.container.querySelector('[data-brkta-slider-track]') as HTMLElement;
    rtlTrack.getBoundingClientRect = () =>
      ({ left: 0, right: 200, width: 200, top: 0, bottom: 0, height: 0, x: 0, y: 0, toJSON() {} }) as DOMRect;
    // The SAME physical-left clientX now maps to a HIGH logical percentage
    // under RTL (physical left = inline-end there), landing nearest the
    // upper thumb instead — confirming the mapping is direction-aware.
    fireEvent.pointerDown(rtlTrack, { clientX: 10, pointerId: 5 });
    const rtlUpper = rtl.container.querySelector('[data-brkta-slider-thumb-upper]') as HTMLElement;
    expect(rtlUpper.style.insetInlineStart).toBe('95%');

    // And a physical-RIGHT click under RTL lands nearest the LOWER thumb,
    // with a LOW inset-inline-start% — which the browser's dir="rtl"
    // handling renders at the physical right edge, i.e. the lower bound
    // sits on the right in RTL, as required.
    fireEvent.pointerDown(rtlTrack, { clientX: 190, pointerId: 6 });
    const rtlLower = rtl.container.querySelector('[data-brkta-slider-thumb-lower]') as HTMLElement;
    expect(rtlLower.style.insetInlineStart).toBe('5%');
  });
});
