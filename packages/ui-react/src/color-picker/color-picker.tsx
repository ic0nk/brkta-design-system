'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';
import {
  hsvToRgba,
  parseCssColor,
  parseHexColor,
  rgbToHsv,
  rgbaToHex,
  type HsvColor,
  type RgbaColor,
  type ColorPickerContract,
} from '@brkta/ui-core/color-picker/color-picker-contract';

const FALLBACK: RgbaColor = { red: 24, green: 23, blue: 19, alpha: 255 };

export interface ColorPickerProps extends ColorPickerContract {
  id?: string;
  hexLabel?: string;
  hueLabel?: string;
  planeLabel?: string;
  redLabel?: string;
  greenLabel?: string;
  blueLabel?: string;
}

/** A visual, opaque hex colour editor for customer-owned branding values. */
export function ColorPicker({
  value: controlledValue,
  defaultValue = '#181713',
  onValueChange,
  ariaLabel,
  disabled = false,
  invalid = false,
  id = 'brkta-color-picker',
  hexLabel = 'Hex',
  hueLabel = 'Hue',
  planeLabel = 'Saturation and brightness',
  redLabel = 'Red',
  greenLabel = 'Green',
  blueLabel = 'Blue',
}: ColorPickerProps) {
  const controlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [hexDraft, setHexDraft] = useState(controlledValue ?? defaultValue);
  const root = useRef<HTMLDivElement>(null);
  const currentValue = controlled ? controlledValue : internalValue;
  const color = useMemo(() => parseCssColor(currentValue) ?? FALLBACK, [currentValue]);
  const hex = useMemo(() => rgbaToHex(color), [color]);
  const hsv = useMemo(() => rgbToHsv(color), [color]);
  const hueColor = useMemo(
    () => rgbaToHex(hsvToRgba({ hue: hsv.hue, saturation: 100, value: 100 })),
    [hsv.hue],
  );

  useEffect(() => setHexDraft(currentValue), [currentValue]);
  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent) => {
      if (root.current && !root.current.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', escape);
    };
  }, [open]);

  const emitColor = useCallback((next: RgbaColor) => {
    const normalized = rgbaToHex(next);
    if (!controlled) setInternalValue(normalized);
    setHexDraft(normalized);
    onValueChange?.(normalized);
  }, [controlled, onValueChange]);

  const setFromPlane = useCallback((event: PointerEvent<HTMLButtonElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    if (!box.width || !box.height) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    emitColor(hsvToRgba({
      hue: hsv.hue,
      saturation: ((event.clientX - box.left) / box.width) * 100,
      value: (1 - (event.clientY - box.top) / box.height) * 100,
    }, color.alpha));
  }, [color.alpha, emitColor, hsv.hue]);

  const onPlaneKeyDown = useCallback((event: KeyboardEvent<HTMLButtonElement>) => {
    const delta = event.shiftKey ? 10 : 2;
    const next: HsvColor = { ...hsv };
    if (event.key === 'ArrowLeft') next.saturation -= delta;
    else if (event.key === 'ArrowRight') next.saturation += delta;
    else if (event.key === 'ArrowDown') next.value -= delta;
    else if (event.key === 'ArrowUp') next.value += delta;
    else if (event.key === 'Home') { next.saturation = 0; next.value = 100; }
    else if (event.key === 'End') { next.saturation = 100; next.value = 0; }
    else return;
    event.preventDefault();
    emitColor(hsvToRgba(next, color.alpha));
  }, [color.alpha, emitColor, hsv]);

  const setChannel = (channel: 'red' | 'green' | 'blue', value: string) => {
    const next = Number(value);
    if (Number.isFinite(next)) emitColor({ ...color, [channel]: next });
  };

  return (
    <div
      ref={root}
      data-brkta-color-picker=""
      data-disabled={disabled ? '' : undefined}
      style={{ '--brkta-color-picker-value': hex, '--brkta-color-picker-hue': hueColor } as React.CSSProperties}
    >
      <button
        data-brkta-color-picker-trigger=""
        type="button"
        data-open={open ? '' : undefined}
        data-invalid={invalid ? '' : undefined}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={`${ariaLabel}: ${hex}`}
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
      >
        <span data-brkta-color-picker-swatch="" aria-hidden="true" />
        <span data-brkta-color-picker-value="">{hex}</span>
      </button>

      {open && (
        <div data-brkta-color-picker-popover="" role="dialog" aria-label={ariaLabel}>
          <button
            data-brkta-color-picker-plane=""
            type="button"
            aria-label={planeLabel}
            onPointerDown={setFromPlane}
            onPointerMove={(event) => { if ((event.buttons & 1) === 1) setFromPlane(event); }}
            onKeyDown={onPlaneKeyDown}
          >
            <span
              data-brkta-color-picker-marker=""
              style={{ insetInlineStart: `${hsv.saturation}%`, insetBlockEnd: `${hsv.value}%` }}
            />
          </button>

          <div data-brkta-color-picker-slider="">
            <label htmlFor={`${id}-hue`}>{hueLabel}</label>
            <input
              data-brkta-color-picker-hue=""
              id={`${id}-hue`}
              type="range"
              min="0"
              max="359"
              value={hsv.hue}
              aria-label={hueLabel}
              onChange={(event) =>
                emitColor(hsvToRgba({ ...hsv, hue: Number(event.target.value) }, color.alpha))
              }
            />
          </div>

          <div data-brkta-color-picker-controls="">
            <label data-brkta-color-picker-control="">
              <span>{hexLabel}</span>
              <input
                id={`${id}-hex`}
                type="text"
                inputMode="text"
                autoCapitalize="off"
                spellCheck={false}
                value={hexDraft}
                aria-label={hexLabel}
                onChange={(event) => {
                  setHexDraft(event.target.value);
                  const next = parseHexColor(event.target.value);
                  if (next) emitColor(next);
                }}
              />
            </label>
            <span data-brkta-color-picker-swatch="" aria-hidden="true" />
          </div>

          <div data-brkta-color-picker-rgb="">
            {([
              ['red', redLabel], ['green', greenLabel], ['blue', blueLabel],
            ] as const).map(([channel, label]) => (
              <label data-brkta-color-picker-control="" key={channel}>
                <span>{label}</span>
                <input
                  type="number"
                  min="0"
                  max="255"
                  inputMode="numeric"
                  value={color[channel]}
                  aria-label={label}
                  onChange={(event) => setChannel(channel, event.target.value)}
                />
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
