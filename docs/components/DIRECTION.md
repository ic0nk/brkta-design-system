# Direction

> A visual utility container for demonstrating and testing left-to-right (LTR) and right-to-left (RTL) direction handling. Applies `direction: rtl` and `text-align: right` when in RTL mode. Uses logical CSS properties where reusable.

> ⚠️ **Localization/i18n remains a separate concern.** Direction is a presentational utility for design-system demos and visual regression testing. It does not provide translation, bidirectional text shaping, locale-aware formatting, or language switching.

---

## When to use

- Visual inventory demos showing how components handle RTL.
- Testing that layouts and spacing use logical CSS properties.
- Side-by-side LTR/RTL comparison for design review.

Do not use Direction as an i18n engine. It is a pure CSS direction switcher.

---

## Implementation

| Layer | Location |
|-------|----------|
| Contract | `@brkta/ui-core/direction/direction-contract.ts` |
| CSS | `@brkta/ui-core/direction/direction.css` |
| React | `@brkta/ui-react/direction` (`Direction`) |
| Angular | `@brkta/ui-angular` (`DirectionComponent`, selector `[brkta-direction]`) |

---

## React

```tsx
import { Direction } from '@brkta/ui-react/direction';

<Direction dir="rtl">
  <p>This text flows right-to-left.</p>
</Direction>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dir` | `'ltr' \| 'rtl'` | `'ltr'` | Writing direction |
| `className` | `string` | — | Additional CSS class |

## Angular

```html
<brkta-direction dir="rtl">
  <p>This text flows right-to-left.</p>
</brkta-direction>
```

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `dir` | `'ltr' \| 'rtl'` | `'ltr'` | Writing direction |

---

## States

| State | CSS | Notes |
|-------|-----|-------|
| LTR | `[data-brkta-direction][data-dir="ltr"]` | Default browser behavior |
| RTL | `[data-brkta-direction][data-dir="rtl"]` | `direction: rtl; text-align: right` |

---

## Visual style

- Bordered container with `border-radius: var(--radius-md)`.
- Padding `var(--space-4)`, min-height 60px.
- Uses semantic tokens only — no raw colors.

---

## Accessibility

- The `dir` attribute is presentational for visual testing only.
- For production RTL support, set `dir="rtl"` on the `<html>` element and ensure components use logical CSS properties (`margin-inline-start`, `padding-inline-end`, etc.).
- Screen readers respect the HTML `dir` attribute and adjust reading order automatically.
