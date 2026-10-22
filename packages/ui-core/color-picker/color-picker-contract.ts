/** Framework-neutral contract for the governed BRKTA colour picker. */
export interface ColorPickerContract {
  /**
   * A CSS colour. Any format the browser understands is accepted for display —
   * an `oklch()` value stored through the API still shows its real swatch — but
   * the picker itself emits canonical `#RRGGBB`, or `#RRGGBBAA` when the colour
   * it started from was translucent.
   */
  value?: string;
  /** Initial colour for an uncontrolled picker. */
  defaultValue?: string;
  /** Called whenever the selected colour changes. */
  onValueChange?: (value: string) => void;
  /** Accessible name for the trigger and picker dialog. */
  ariaLabel: string;
  /** Prevents interaction. */
  disabled?: boolean;
  /** Marks the field invalid without changing its selected value. */
  invalid?: boolean;
}

export interface RgbaColor {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

export interface HsvColor {
  hue: number;
  saturation: number;
  value: number;
}

const HEX = /^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i;

function byte(value: number): number {
  return Math.min(255, Math.max(0, Math.round(value)));
}

/** Parses the hex formats accepted by the BRKTA branding API. */
export function parseHexColor(value?: string | null): RgbaColor | null {
  const match = value?.trim().match(HEX);
  if (!match) return null;
  const compact = match[1];
  const expanded = compact.length <= 4
    ? Array.from(compact, (part) => `${part}${part}`).join('')
    : compact;

  return {
    red: Number.parseInt(expanded.slice(0, 2), 16),
    green: Number.parseInt(expanded.slice(2, 4), 16),
    blue: Number.parseInt(expanded.slice(4, 6), 16),
    alpha: expanded.length === 8 ? Number.parseInt(expanded.slice(6, 8), 16) : 255,
  };
}

/** Canonical hex. Alpha is only spelled out when the colour is translucent. */
export function rgbaToHex(color: RgbaColor): string {
  const part = (value: number) => byte(value).toString(16).padStart(2, '0');
  const rgb = `#${part(color.red)}${part(color.green)}${part(color.blue)}`;
  return color.alpha >= 255 ? rgb : `${rgb}${part(color.alpha)}`;
}

/**
 * Parses any CSS colour the host understands, not just hex. Values reach the
 * picker from stored branding and from the platform palette, which is written
 * entirely in `oklch()`; without this every untouched swatch fell back to one
 * hard-coded colour and misreported what the workspace actually uses.
 *
 * Assigning `fillStyle` normalises hex and named colours, but browsers hand
 * `oklch()`, `lab()` and `color-mix()` straight back, so anything that does not
 * normalise is painted onto a single pixel and read back instead.
 *
 * Returns null wherever there is no DOM (SSR, unit tests) and the value is not
 * already hex.
 */
export function parseCssColor(value?: string | null): RgbaColor | null {
  const direct = parseHexColor(value);
  if (direct) return direct;

  const candidate = value?.trim();
  if (!candidate || typeof document === 'undefined') return null;

  // A colour no palette would plausibly use, so it doubles as a rejection sentinel.
  const sentinel = '#010203';
  try {
    const context = document.createElement('canvas').getContext('2d');
    if (!context) return null;

    context.fillStyle = sentinel;
    context.fillStyle = candidate;
    const normalized = String(context.fillStyle);
    if (normalized === sentinel && candidate.toLowerCase() !== sentinel) return null;

    const hex = parseHexColor(normalized);
    if (hex) return hex;

    const match = normalized.match(/rgba?\(([^)]+)\)/i);
    if (match) {
      const parts = match[1].split(',').map((part) => Number.parseFloat(part.trim()));
      if (parts.length >= 3 && parts.slice(0, 3).every(Number.isFinite)) {
        return {
          red: byte(parts[0]),
          green: byte(parts[1]),
          blue: byte(parts[2]),
          alpha: parts.length > 3 && Number.isFinite(parts[3]) ? byte(parts[3] * 255) : 255,
        };
      }
    }

    context.clearRect(0, 0, 1, 1);
    context.fillRect(0, 0, 1, 1);
    const pixel = context.getImageData(0, 0, 1, 1).data;
    return { red: pixel[0], green: pixel[1], blue: pixel[2], alpha: pixel[3] };
  } catch {
    return null;
  }
}

export function rgbToHsv({ red, green, blue }: RgbaColor): HsvColor {
  const r = red / 255;
  const g = green / 255;
  const b = blue / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  let hue = 0;

  if (delta !== 0) {
    if (max === r) hue = 60 * (((g - b) / delta) % 6);
    else if (max === g) hue = 60 * ((b - r) / delta + 2);
    else hue = 60 * ((r - g) / delta + 4);
  }

  return {
    hue: (hue + 360) % 360,
    saturation: max === 0 ? 0 : (delta / max) * 100,
    value: max * 100,
  };
}

export function hsvToRgba(hsv: HsvColor, alpha = 255): RgbaColor {
  const hue = ((hsv.hue % 360) + 360) % 360;
  const saturation = Math.min(100, Math.max(0, hsv.saturation)) / 100;
  const value = Math.min(100, Math.max(0, hsv.value)) / 100;
  const chroma = value * saturation;
  const secondary = chroma * (1 - Math.abs(((hue / 60) % 2) - 1));
  const match = value - chroma;
  const [r, g, b] = hue < 60
    ? [chroma, secondary, 0]
    : hue < 120
      ? [secondary, chroma, 0]
      : hue < 180
        ? [0, chroma, secondary]
        : hue < 240
          ? [0, secondary, chroma]
          : hue < 300
            ? [secondary, 0, chroma]
            : [chroma, 0, secondary];

  return { red: byte((r + match) * 255), green: byte((g + match) * 255), blue: byte((b + match) * 255), alpha: byte(alpha) };
}
