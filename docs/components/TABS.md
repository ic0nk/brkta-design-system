# Tabs

Triggers use the governed `--height-md` minimum touch target (44px) in both variants.
Both frameworks remeasure the moving indicator after resize, changed labels,
orientation, programmatic selection, or a `dir` attribute change on the tab list
or any ancestor (including the document and workspace shell). Direction changes
do not require a resize. Both resize and direction observers disconnect on teardown.
Horizontal arrows follow text direction; Home/End and orientation-appropriate
arrows move both selection and keyboard focus, skipping disabled tabs.

## Purpose

Switch between content panels within a single view. Supports two visual variants, two orientations, and a measurement-based moving indicator.

## Variants

| Variant | Description |
|---|---|
| `default` | Underline indicator below active tab. Hover previews underline position. |
| `segmented` | Connected pill rail. Active tab appears as a raised card segment. Hover previews segment position. |

## Orientations

| Orientation | Keyboard | Active indicator |
|---|---|---|
| `horizontal` (default) | ArrowLeft/Right, Home, End | Underline or segment at bottom |
| `vertical` | ArrowUp/Down, Home, End | Vertical line or segment at side |

## Moving indicator

A single indicator element (`<span data-brkta-tabs-indicator="">`) is absolutely positioned inside the tablist. Its position is set via CSS custom properties:

| Variable | Purpose |
|---|---|
| `--tabs-indicator-x` | Horizontal left offset (px) |
| `--tabs-indicator-width` | Horizontal width (px) |
| `--tabs-indicator-y` | Vertical top offset (px) |
| `--tabs-indicator-height` | Vertical height (px) |

**Behavior:**
- On hover/focus of a trigger, the indicator slides to that tab
- On mouse leave/blur, the indicator returns to the active tab
- On click or keyboard selection, the active tab changes and the indicator settles
- Disabled tabs are skipped — indicator stays on the last active/enabled tab
- CSS transitions use `var(--duration-fast)` (150ms) `var(--ease-out)`
- `prefers-reduced-motion: reduce` disables all indicator motion

## Anatomy

| Part | Data attribute | ARIA |
|---|---|---|
| Root | `data-brkta-tabs` | — |
| Tab list | `data-brkta-tabs-list` | `role="tablist"`, `aria-orientation` |
| Tab trigger | `data-brkta-tabs-trigger` | `role="tab"`, `aria-selected` |
| Indicator | `data-brkta-tabs-indicator` | `aria-hidden="true"` |
| Panel | `data-brkta-tabs-panel` | `role="tabpanel"` |

## React usage

```tsx
import { Tabs } from '@brkta/ui-react/tabs';

// Default horizontal
<Tabs items={[{ label: 'Account', value: 'a', content: 'Panel' }]} />

// Segmented vertical
<Tabs items={items} variant="segmented" orientation="vertical" />
```

## Angular usage

```html
<brkta-tabs [items]="items"></brkta-tabs>
<brkta-tabs [items]="items" variant="segmented" orientation="vertical"></brkta-tabs>
```

Angular panels may use either the existing string content or a `TemplateRef`. Template content is
rendered inside the component's `role="tabpanel"`, so rich Angular markup keeps the tab/panel
relationship intact:

```html
<ng-template #overviewPanel>
  <strong>Overview</strong>
</ng-template>
<brkta-tabs [items]="[
  { label: 'Overview', value: 'overview', content: overviewPanel },
  { label: 'Details', value: 'details', content: 'Text content' }
]"></brkta-tabs>
```

## Design rules

- Rail is `inline-flex` / `width: fit-content` — does not stretch full width
- Default active: `color: var(--foreground)`
- Segmented active: `background: var(--background)`, border, `box-shadow: var(--shadow-xs)`
- Segmented rail: `background: var(--surface)`, `border: var(--border)`, `border-radius: var(--radius-lg)`
- Hover: text shifts to `var(--foreground)`
- Disabled: 40% opacity
- No raw colors — all tokens

## Files

| Layer | Path |
|---|---|
| Contract | `packages/ui-core/tabs/tabs-contract.ts` |
| CSS | `packages/ui-core/tabs/tabs.css` |
| React | `packages/ui-react/src/tabs/tabs.tsx` |
| Angular | `packages/ui-angular/src/tabs/tabs.component.ts` |
