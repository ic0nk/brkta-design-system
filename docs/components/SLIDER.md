# Slider

> Wave 5 — Advanced Inputs + Pickers

## Overview

A slider for selecting a numeric value within a defined range. Uses native pointer events for drag and keyboard support. Supports two modes:

- **Single-thumb mode** (default) — selects one value.
- **Range mode** (`range={true}` / `[range]="true"`) — an opt-in two-thumb mode for selecting a lower/upper bound pair (e.g. a price range). Single-thumb behavior is completely unchanged when `range` is not set.

## Data Attributes

| Attribute | Element | Purpose |
|-----------|---------|---------|
| `data-brkta-slider` | Root | Slider container |
| `data-brkta-slider-track` | Track | Background track |
| `data-brkta-slider-range` | Range | Filled range indicator (between the two thumbs in range mode; from the track start in single-thumb mode) |
| `data-brkta-slider-thumb` | Thumb | Draggable thumb knob — present on every thumb (single, lower, and upper) so CSS states (hover/focus-visible/disabled/touch target) apply uniformly |
| `data-brkta-slider-thumb-lower` | Thumb | Present only on the lower-bound thumb in range mode |
| `data-brkta-slider-thumb-upper` | Thumb | Present only on the upper-bound thumb in range mode |

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | — | Controlled value (single-thumb mode) |
| `defaultValue` | `number` | `50` | Uncontrolled default (single-thumb mode) |
| `min` | `number` | `0` | Minimum — applies to both thumbs in range mode |
| `max` | `number` | `100` | Maximum — applies to both thumbs in range mode |
| `step` | `number` | `1` | Step increment — applies to both thumbs in range mode |
| `disabled` | `boolean` | `false` | Disables interaction — applies to both thumbs in range mode |
| `onValueChange` | `(value: number) => void` | — | Fires on value change (single-thumb mode) |
| `ariaLabel` | `string` | — | Accessible label (single-thumb mode) |
| `ariaLabelledby` | `string` | — | Referenced label ID (single-thumb mode) |
| `range` | `boolean` | `false` | Opts into two-thumb range mode |
| `lowerValue` | `number` | — | Controlled lower-bound value (range mode) |
| `upperValue` | `number` | — | Controlled upper-bound value (range mode) |
| `defaultLowerValue` | `number` | `25` | Uncontrolled default lower bound (range mode) |
| `defaultUpperValue` | `number` | `75` | Uncontrolled default upper bound (range mode) |
| `onRangeChange` | `(range: { lower: number; upper: number }) => void` | — | Fires with **both** bounds together whenever either one changes (range mode) |
| `lowerAriaLabel` | `string` | — | Accessible label for the lower-bound thumb (range mode) — required for a distinguishable screen-reader name |
| `lowerAriaLabelledby` | `string` | — | Referenced label ID for the lower-bound thumb (range mode) |
| `upperAriaLabel` | `string` | — | Accessible label for the upper-bound thumb (range mode) — required for a distinguishable screen-reader name |
| `upperAriaLabelledby` | `string` | — | Referenced label ID for the upper-bound thumb (range mode) |

Angular exposes the same API as `@Input()`/`@Output()` pairs with matching names (`rangeChange` emits `{ lower, upper }`, mirroring `onRangeChange`).

## Range mode behavior

- **Thumbs may become exactly equal (touching), but never cross.** Each thumb's movable bound is clamped to the *other thumb's current value*, not to the slider's global min/max: the lower thumb's effective maximum is the upper thumb's current value, and the upper thumb's effective minimum is the lower thumb's current value. This means `Home`/`End` and repeated arrow-key presses can bring the two thumbs together (equal values) but will never push one past the other. Equal-thumb (touching) was chosen over a mandatory minimum gap because it keeps the contract simple (no extra `minGap`/`minDistance` prop) and matches common range-slider conventions (e.g. selecting a range where the min and max happen to coincide is a valid, meaningful state — "exactly $50").
- **Nearest-thumb selection is value-based, not DOM-target-based.** Dragging, clicking anywhere on the track, and grabbing either thumb (including via its 44px hit region) all resolve to "move whichever thumb's current value is numerically closer to the pointer's position." This is computed from the pointer's logical position along the track, not from which DOM element the browser happened to dispatch the event to — so it stays correct even when the two thumbs' 44px hit regions overlap (e.g. when the thumbs are close together near the middle of the track).
- Each thumb is an independent `role="slider"` element with its own `tabIndex`, own accessible name (`lowerAriaLabel`/`upperAriaLabel`), and its own `aria-valuemin`/`aria-valuemax`/`aria-valuenow` — with the min/max dynamically bounded by the other thumb's current value (see above), which is what communicates the "can't cross" constraint to assistive technology.

## Touch target (44×44px)

The visual thumb stays 16×16px (unchanged). A `::before` pseudo-element on `[data-brkta-slider-thumb]` adds an invisible 44×44px hit region centered on the thumb. Because pseudo-element content is hit-tested as part of its originating element per the CSS spec, pointer/tap events landing anywhere in that 44×44px box are dispatched with the visual thumb itself as the event target — so the existing pointer handlers pick it up automatically, with no separate wrapper element and no visual change. This rule lives once in `slider.css` and applies identically to the single thumb and both range-mode thumbs.

## RTL

Thumb and range-fill positioning use the CSS logical properties `inset-inline-start` (instead of physical `left`) and `inline-size` (instead of physical `width`), computed the same way in both single and range mode: 0% = inline-start, 100% = inline-end. Under `dir="rtl"`, the browser resolves `inset-inline-start` to the physical **right** edge natively — no `:dir(rtl)` special-casing needed in this component. Combined with a direction-aware pointer-to-value mapping (the pointer's physical position is flipped to a logical position when an ancestor has `dir="rtl"`), this means:

- The lower-bound thumb (value near `min`, logical position near 0%) ends up on the visual **right** in RTL, as required.
- Dragging/clicking still tracks the pointer naturally in both directions.

This was verified with unit tests that render the slider inside a `<div dir="rtl">` wrapper, stub `getBoundingClientRect()` on the track to a known geometry, dispatch `pointerdown` at specific `clientX` positions, and assert that the *same* physical `clientX` resolves to different values/thumbs under `dir="rtl"` vs. no `dir` attribute — and that the resulting `insetInlineStart` values are the low/high percentages expected for "lower bound → physical right" under RTL. See the `flips the pointer-to-value mapping under dir="rtl"` tests in `slider.spec.tsx` / `slider.spec.ts`. (jsdom does not implement the browser's native `dir` attribute → computed `direction` CSS mapping, so direction resolution falls back to walking up for the nearest ancestor's explicit `dir` attribute when the computed style is unresolved — this fallback is exercised by the same tests and is transparent in real browsers, where the computed style already resolves correctly.)

## Accessibility

- `role="slider"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow` (per thumb)
- Keyboard: Arrow keys adjust the focused thumb by `step`; Home/End jump the focused thumb to its permitted bound (global min/max in single-thumb mode; the other thumb's current value or the global min/max, whichever is nearer, in range mode)
- Pointer drag with `touch-action: none`
- 44×44px effective touch target per thumb (see above)
- Disabled state: `aria-disabled`, `tabIndex={-1}`, applies to both thumbs in range mode
- `prefers-reduced-motion: reduce` disables the thumb's hover/focus transition (shared CSS rule, applies to every thumb)
