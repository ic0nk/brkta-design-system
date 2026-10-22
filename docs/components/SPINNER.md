# Spinner

> A standalone loading indicator for global or section-level loading states. For button loading, use the existing three-dot button loader, not this Spinner.

---

## When to use

- Full-page loading state.
- Section-level content loading (tables, cards, panels).
- Standalone loading indicators outside buttons.

Do not use Spinner inside buttons. Buttons have their own three-dot loading animation defined in `button.css`.

---

## Implementation

| Layer | Location |
|-------|----------|
| Contract | `@brkta/ui-core/spinner/spinner-contract.ts` |
| CSS | `@brkta/ui-core/spinner/spinner.css` |
| React | `@brkta/ui-react/spinner` (`Spinner`) |
| Angular | `@brkta/ui-angular` (`SpinnerComponent`) |

---

## React

```tsx
import { Spinner } from '@brkta/ui-react/spinner';

// Size variants
<Spinner size="sm" />
<Spinner size="md" /> {/* default */}
<Spinner size="lg" />
```

## Angular

```html
<brkta-spinner size="sm"></brkta-spinner>
<brkta-spinner size="md"></brkta-spinner>
<brkta-spinner size="lg"></brkta-spinner>
```

---

## Sizes

| Size | Diameter | Border Width | Use Case |
|------|----------|-------------|----------|
| `sm` | 16px | 2px | Inline loading, small containers |
| `md` | 24px | 2.5px | Default, section loading |
| `lg` | 32px | 3px | Full-page loading |

## Accessibility

- Spinner has `role="status"` and `aria-label="Loading"`.
- Inner screen-reader label uses `.brkta-spinner-sr-label` (a framework-independent visually-hidden class) instead of the Tailwind `.sr-only` utility. This ensures the label is hidden in both React and Angular without relying on a specific Tailwind setup.
- For critical loading states, use a live region to announce completion.

## Reduced motion

Spinner respects `prefers-reduced-motion: reduce`. When reduced motion is active, the rotation animation is disabled and the spinner is shown as a full circle.

## Related

- **Button loading** — Use the button's built-in `loading` prop, not this Spinner.
- **Skeleton** — For content-shaped loading placeholders.
