# Brik

> The BRKTA companion: the two brackets of the logo as a body, with a pixel face between them.

---

## When to use

- Add personality to marketing pages in empty, low-priority space (a card corner, the end of a route, next to a heading).
- Give feedback moments a face: thinking while a form sends, celebrating after it is sent, a worried shake on 404 / error pages.

Do not use Brik as a button, an icon in body text, or anywhere it would cover content or controls. It is decorative unless you pass a `label`.

---

## Implementation

| Layer | Location |
|-------|----------|
| Contract + geometry | `@brkta/ui-core/brik/brik-contract.ts` |
| CSS | `@brkta/ui-core/brik/brik.css` |
| React | `@brkta/ui-react/brik` (`Brik`) |
| Angular | `@brkta/ui-angular` (`BrikComponent`) |

The drawing (a 16 x 16 grid of 4-unit cells) lives in the contract as data, so every framework renders the same character. All colour and motion is CSS.

---

## States

| State | Use | Motion |
|-------|-----|--------|
| `idle` | Default | Breathes, blinks, glances left and right |
| `look` | Watching the pointer | Eyes travel around |
| `wave` | Hello / hover | Pixel arm waves, smile, small hop |
| `peek` | A new section enters | Rises from the bottom edge |
| `sleep` | Long idle | Lids down, slow breath, floating z |
| `think` | Work in progress (form sending) | Looks up, tilts, cheeks blink |
| `party` | Success (form sent) | Jumps with lime confetti |
| `oops` | 404 / error | Worried shake |

`prefers-reduced-motion: reduce` freezes every state.

---

## React

```tsx
import { Brik } from '@brkta/ui-react/brik';

<Brik />                          {/* decorative, idle */}
<Brik state="wave" />
<Brik state="party" label="Message sent" />  {/* role="img" with a name */}
```

Brik fills the width of its container; size it with a wrapper.

## Angular

```html
<brkta-brik state="think"></brkta-brik>
```

---

## Theming

Re-point the custom properties on any ancestor:

| Property | Default | Used for |
|----------|---------|----------|
| `--brik-ink` | `var(--foreground)` | Brackets, eyes, mouth |
| `--brik-accent` | `var(--accent)` | Cheeks, fist, confetti |
| `--brik-highlight` | `var(--background)` | Eye glint |
| `--brik-cheek-opacity` | `1` | Cheek strength |

On a lime surface use `--brik-ink: currentColor; --brik-accent: currentColor; --brik-highlight: var(--accent); --brik-cheek-opacity: .35`.

---

## Accessibility

- Without `label` the SVG is `aria-hidden` and not focusable.
- With `label` it is `role="img"` with that accessible name.
