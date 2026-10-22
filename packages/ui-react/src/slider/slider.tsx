'use client';

import { useState, useCallback, useRef } from 'react';
import type { SliderContract } from '@brkta/ui-core/slider/slider-contract';

export interface SliderProps extends SliderContract {}

type ActiveThumb = 'lower' | 'upper';

/**
 * Resolves text direction for an element. Prefers the CSS-cascade resolved
 * `direction` (correct in real browsers, including when `dir` is set on an
 * ancestor like `<html>`), falling back to walking up for the nearest
 * explicit `dir` attribute. The fallback exists because jsdom's computed
 * style does not implement the browser's `dir` attribute -> `direction`
 * property UA mapping, so it always reports an empty string in tests.
 */
function resolveDirection(el: HTMLElement): 'ltr' | 'rtl' {
  const computed = getComputedStyle(el).direction;
  if (computed === 'rtl' || computed === 'ltr') return computed;
  const dirAncestor = el.closest('[dir]');
  return dirAncestor?.getAttribute('dir') === 'rtl' ? 'rtl' : 'ltr';
}

/**
 * Maps a pointer's clientX to a logical (inline-start-anchored) percentage
 * along the track, 0% = inline-start, 100% = inline-end — so it maps to the
 * visual right side under `dir="rtl"` without any direction-specific math
 * at the call site.
 */
function getLogicalPercentage(clientX: number, track: HTMLDivElement): number {
  const rect = track.getBoundingClientRect();
  const physicalPct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
  const isRtl = resolveDirection(track) === 'rtl';
  return isRtl ? 100 - physicalPct : physicalPct;
}

export function Slider({
  value: controlledValue,
  defaultValue = 50,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  onValueChange,
  ariaLabel,
  ariaLabelledby,
  range = false,
  lowerValue: controlledLowerValue,
  upperValue: controlledUpperValue,
  defaultLowerValue = 25,
  defaultUpperValue = 75,
  onRangeChange,
  lowerAriaLabel,
  upperAriaLabel,
  lowerAriaLabelledby,
  upperAriaLabelledby,
}: SliderProps) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = isControlled ? controlledValue : internalValue;

  const isLowerControlled = controlledLowerValue !== undefined;
  const isUpperControlled = controlledUpperValue !== undefined;
  const [internalLower, setInternalLower] = useState(defaultLowerValue);
  const [internalUpper, setInternalUpper] = useState(defaultUpperValue);
  const currentLower = isLowerControlled ? controlledLowerValue : internalLower;
  const currentUpper = isUpperControlled ? controlledUpperValue : internalUpper;

  const trackRef = useRef<HTMLDivElement>(null);
  const rangeRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const lowerThumbRef = useRef<HTMLDivElement>(null);
  const upperThumbRef = useRef<HTMLDivElement>(null);

  const percentage = ((currentValue - min) / (max - min)) * 100;
  const lowerPercentage = ((currentLower - min) / (max - min)) * 100;
  const upperPercentage = ((currentUpper - min) / (max - min)) * 100;

  const clampAndStep = useCallback(
    (raw: number, lo = min, hi = max) => Math.round(Math.max(lo, Math.min(hi, raw)) / step) * step,
    [min, max, step],
  );

  const commitValue = useCallback((v: number) => {
    const stepped = clampAndStep(v);
    if (!isControlled) setInternalValue(stepped);
    onValueChange?.(stepped);
  }, [clampAndStep, isControlled, onValueChange]);

  const commitRange = useCallback((lower: number, upper: number) => {
    if (!isLowerControlled) setInternalLower(lower);
    if (!isUpperControlled) setInternalUpper(upper);
    onRangeChange?.({ lower, upper });
  }, [isLowerControlled, isUpperControlled, onRangeChange]);

  // ---- Single-thumb mode (unchanged behavior) ----

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (disabled) return;
    const track = trackRef.current;
    const rangeEl = rangeRef.current;
    const thumb = thumbRef.current;
    if (!track || !thumb) return;
    e.preventDefault();
    track.setPointerCapture(e.pointerId);

    // Direct DOM manipulation for zero-lag drag
    const updateDOM = (clientX: number) => {
      const pct = getLogicalPercentage(clientX, track);
      thumb.style.insetInlineStart = pct + '%';
      thumb.style.top = '50%';
      thumb.style.position = 'absolute';
      thumb.style.transform = 'translate(-50%, -50%)';
      if (rangeEl) {
        rangeEl.style.insetInlineStart = '0%';
        rangeEl.style.inlineSize = pct + '%';
      }
      return clampAndStep(min + (pct / 100) * (max - min));
    };

    const stepped = updateDOM(e.clientX);
    // Commit initial value
    commitValue(stepped);

    const onMove = (ev: PointerEvent) => {
      ev.preventDefault();
      const st = updateDOM(ev.clientX);
      // Emit valueChange during drag for controlled mode
      onValueChange?.(st);
    };

    const onUp = (ev: PointerEvent) => {
      track.removeEventListener('pointermove', onMove);
      track.removeEventListener('pointerup', onUp);
      track.removeEventListener('pointercancel', onUp);
      const st = updateDOM(ev.clientX);
      commitValue(st);
    };

    track.addEventListener('pointermove', onMove, { passive: false });
    track.addEventListener('pointerup', onUp);
    track.addEventListener('pointercancel', onUp);
  }, [disabled, min, max, clampAndStep, commitValue, onValueChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (disabled) return;
    let target: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') target = currentValue + step;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') target = currentValue - step;
    else if (e.key === 'Home') target = min;
    else if (e.key === 'End') target = max;
    if (target !== null) { e.preventDefault(); commitValue(target); }
  }, [disabled, currentValue, step, min, max, commitValue]);

  // ---- Range mode ----
  // Dragging, clicking the track, and keyboard interaction all move whichever
  // thumb is nearer. Nearest-thumb selection is computed from the pointer's
  // logical position, not from which DOM node the browser happened to target
  // — so it resolves correctly even when the two thumbs' 44px hit regions
  // overlap near the middle of the track. Thumbs may become exactly equal
  // (touching) but never cross; see SLIDER.md for the documented rationale.

  const handleRangePointerDown = useCallback((e: React.PointerEvent) => {
    if (disabled) return;
    const track = trackRef.current;
    const rangeEl = rangeRef.current;
    const lowerThumb = lowerThumbRef.current;
    const upperThumb = upperThumbRef.current;
    if (!track || !lowerThumb || !upperThumb) return;
    e.preventDefault();
    track.setPointerCapture(e.pointerId);

    // The other (non-active) thumb never moves during this gesture, so its
    // bound can be captured once up front.
    const otherLower = currentLower;
    const otherUpper = currentUpper;

    const initialPct = getLogicalPercentage(e.clientX, track);
    const initialValue = min + (initialPct / 100) * (max - min);
    const active: ActiveThumb =
      Math.abs(initialValue - otherLower) <= Math.abs(initialValue - otherUpper) ? 'lower' : 'upper';
    (active === 'lower' ? lowerThumb : upperThumb).focus();

    const updateRangeDOM = (clientX: number) => {
      const pct = getLogicalPercentage(clientX, track);
      const rawValue = min + (pct / 100) * (max - min);
      let lower = otherLower;
      let upper = otherUpper;
      if (active === 'lower') {
        lower = clampAndStep(rawValue, min, otherUpper);
      } else {
        upper = clampAndStep(rawValue, otherLower, max);
      }
      const lowerPct = ((lower - min) / (max - min)) * 100;
      const upperPct = ((upper - min) / (max - min)) * 100;
      lowerThumb.style.insetInlineStart = lowerPct + '%';
      lowerThumb.style.top = '50%';
      lowerThumb.style.position = 'absolute';
      lowerThumb.style.transform = 'translate(-50%, -50%)';
      upperThumb.style.insetInlineStart = upperPct + '%';
      upperThumb.style.top = '50%';
      upperThumb.style.position = 'absolute';
      upperThumb.style.transform = 'translate(-50%, -50%)';
      if (rangeEl) {
        rangeEl.style.insetInlineStart = lowerPct + '%';
        rangeEl.style.inlineSize = (upperPct - lowerPct) + '%';
      }
      return { lower, upper };
    };

    const initial = updateRangeDOM(e.clientX);
    commitRange(initial.lower, initial.upper);

    const onMove = (ev: PointerEvent) => {
      ev.preventDefault();
      const { lower, upper } = updateRangeDOM(ev.clientX);
      onRangeChange?.({ lower, upper });
    };

    const onUp = (ev: PointerEvent) => {
      track.removeEventListener('pointermove', onMove);
      track.removeEventListener('pointerup', onUp);
      track.removeEventListener('pointercancel', onUp);
      const { lower, upper } = updateRangeDOM(ev.clientX);
      commitRange(lower, upper);
    };

    track.addEventListener('pointermove', onMove, { passive: false });
    track.addEventListener('pointerup', onUp);
    track.addEventListener('pointercancel', onUp);
  }, [disabled, min, max, currentLower, currentUpper, clampAndStep, commitRange, onRangeChange]);

  const handleLowerKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (disabled) return;
    let target: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') target = currentLower + step;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') target = currentLower - step;
    else if (e.key === 'Home') target = min;
    else if (e.key === 'End') target = currentUpper;
    if (target !== null) {
      e.preventDefault();
      commitRange(clampAndStep(target, min, currentUpper), currentUpper);
    }
  }, [disabled, currentLower, currentUpper, step, min, clampAndStep, commitRange]);

  const handleUpperKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (disabled) return;
    let target: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') target = currentUpper + step;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') target = currentUpper - step;
    else if (e.key === 'Home') target = currentLower;
    else if (e.key === 'End') target = max;
    if (target !== null) {
      e.preventDefault();
      commitRange(currentLower, clampAndStep(target, currentLower, max));
    }
  }, [disabled, currentLower, currentUpper, step, max, clampAndStep, commitRange]);

  return (
    <div
      data-brkta-slider=""
      data-disabled={disabled ? '' : undefined}
      onPointerDown={range ? handleRangePointerDown : handlePointerDown}
    >
      <div ref={trackRef} data-brkta-slider-track="">
        <div
          ref={rangeRef}
          data-brkta-slider-range=""
          style={
            range
              ? { insetInlineStart: `${lowerPercentage}%`, inlineSize: `${upperPercentage - lowerPercentage}%` }
              : { insetInlineStart: '0%', inlineSize: `${percentage}%` }
          }
        />
      </div>
      {range ? (
        <>
          <div
            ref={lowerThumbRef}
            data-brkta-slider-thumb=""
            data-brkta-slider-thumb-lower=""
            role="slider"
            aria-label={lowerAriaLabel}
            aria-labelledby={lowerAriaLabelledby}
            aria-valuemin={min}
            aria-valuemax={currentUpper}
            aria-valuenow={currentLower}
            aria-disabled={disabled || undefined}
            tabIndex={disabled ? -1 : 0}
            onKeyDown={handleLowerKeyDown}
            style={{
              position: 'absolute',
              insetInlineStart: `${lowerPercentage}%`,
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
          <div
            ref={upperThumbRef}
            data-brkta-slider-thumb=""
            data-brkta-slider-thumb-upper=""
            role="slider"
            aria-label={upperAriaLabel}
            aria-labelledby={upperAriaLabelledby}
            aria-valuemin={currentLower}
            aria-valuemax={max}
            aria-valuenow={currentUpper}
            aria-disabled={disabled || undefined}
            tabIndex={disabled ? -1 : 0}
            onKeyDown={handleUpperKeyDown}
            style={{
              position: 'absolute',
              insetInlineStart: `${upperPercentage}%`,
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </>
      ) : (
        <div
          ref={thumbRef}
          data-brkta-slider-thumb=""
          role="slider"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={currentValue}
          aria-disabled={disabled || undefined}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={handleKeyDown}
          style={{
            position: 'absolute',
            insetInlineStart: `${percentage}%`,
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}
    </div>
  );
}
