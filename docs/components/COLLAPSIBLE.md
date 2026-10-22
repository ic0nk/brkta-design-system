# Collapsible

> Wave 4B — Advanced Navigation + Layout Utilities

## Overview

A single-item expand/collapse component. Unlike Accordion which manages multiple items, Collapsible manages a single trigger/content pair.

## Data Attributes

| Attribute | Element | Purpose |
|-----------|---------|---------|
| `data-brkta-collapsible` | Root | Container |
| `data-compact` | Root | Present when `compact` is true; switches the root to the compact flex layout |
| `data-brkta-collapsible-trigger` | Button | Toggle button |
| `data-brkta-collapsible-chevron` | Span | Animated chevron |
| `data-brkta-collapsible-panel` | Div | Expandable panel |
| `data-brkta-collapsible-content` | Div | Content area |

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Trigger label |
| `content` | `unknown` | — | Content when expanded |
| `open` | `boolean` | — | Controlled open state |
| `defaultOpen` | `boolean` | `false` | Uncontrolled default state |
| `disabled` | `boolean` | `false` | Disables toggle |
| `compact` | `boolean` | `false` | Renders a content-sized trigger (small chevron + short label) instead of the default full-width bar |

## Accessibility

- `aria-expanded` reflects open state
- `aria-controls` links trigger to panel
- Panel uses `role="region"` and `aria-labelledby`
- In compact mode the panel drops its border and rounded corners: compact is an inline disclosure inside an existing surface (a filter card, for example), which already supplies the container edge. The default mode keeps its card-like border.
- All ARIA, keyboard, and disabled behavior is identical in compact mode — `compact` only changes layout/sizing.
- The compact trigger's visual padding is smaller than the default trigger, but the effective touch/click target remains at least 44×44px via an invisible centered overlay (`::before`), the same technique used by the slider thumb (`packages/ui-core/slider/slider.css`).

## Compact mode

Set `compact` (React prop / Angular input) to `true` to render the trigger inline-sized to its content — a small chevron plus a short label — instead of the default full-width bar. This is intended for cases like an "advanced filters" trigger that should sit inline with other controls rather than dominate a card.

- The `label` string is unchanged in meaning; compact mode is purely a visual/layout change to the same trigger + label + chevron structure. Composing a count into the label (e.g. `"Advanced filters (2 active)"`) is a valid consumer pattern and does not require any additional prop.
- When `compact` is true, the root (`[data-brkta-collapsible]`) becomes a wrapping flex container: the trigger is sized to its content (`flex: 0 0 auto`) and the panel is forced onto its own full-width row (`flex: 1 1 100%`), so the **expanded panel still spans the full width of the container** even though the trigger is small.
- Non-compact (default) behavior is completely unchanged — `compact` defaults to `false`/undefined.

## Animation

Same pattern as Accordion: `grid-template-rows` transition with chevron rotation. Duration: 200ms. Respects `prefers-reduced-motion`.
