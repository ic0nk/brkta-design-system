# Hover Card

> A hover/focus-triggered overlay card that reveals additional content. Built on the same overlay language as Popover and Tooltip, with configurable open/close delays.

---

## When to use

- Profile cards that appear when hovering a user name.
- Status previews that expand on hover.
- Rich tooltips with images, links, or structured data.

Do not use Hover Card for critical actions the user must see — use a Dialog or Popover (click-triggered) instead. Hover content may be missed by keyboard-only or touch users.

---

## Implementation

| Layer | Location |
|-------|----------|
| Contract | `@brkta/ui-core/hover-card/hover-card-contract.ts` |
| CSS | `@brkta/ui-core/hover-card/hover-card.css` |
| React | `@brkta/ui-react/hover-card` (`HoverCard`) |
| Angular | `@brkta/ui-angular` (`HoverCardComponent`, selector `brkta-hover-card`) |

---

## React

```tsx
import { HoverCard } from '@brkta/ui-react/hover-card';

<HoverCard trigger={<span>Jane Doe</span>}>
  <div>Profile details here</div>
</HoverCard>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `trigger` | `ReactNode` | required | Trigger element (shown inline) |
| `openDelay` | `number` | `200` | ms before card opens on hover/focus |
| `closeDelay` | `number` | `150` | ms before card closes after mouseleave/blur |
| `side` | `'top' \| 'bottom'` | `'bottom'` | Card position relative to trigger |

## Angular

```html
<brkta-hover-card>
  <span brkta-hover-card-trigger>Jane Doe</span>
  <div>Profile details here</div>
</brkta-hover-card>
```

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `openDelay` | `number` | `200` | Open delay in ms |
| `closeDelay` | `number` | `150` | Close delay in ms |
| `side` | `'top' \| 'bottom'` | `'bottom'` | Position relative to trigger |

---

## States

| State | CSS | Notes |
|-------|-----|-------|
| Closed | — | Content not rendered |
| Open | `[data-brkta-hover-card-content]` | Slide-in animation |
| Closing | `[data-closing]` | Fade-out animation, pointer-events disabled |

---

## Accessibility

- Trigger has `role="button"`, `tabindex="0"`, `aria-expanded`, and `aria-haspopup="dialog"`.
- Content has `role="dialog"`.
- Opens on both `mouseenter` and `focus`, closes on `mouseleave` and `blur`.
- `prefers-reduced-motion` disables open/close animations.
