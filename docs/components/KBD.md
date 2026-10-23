# Kbd

> A compact inline element that displays a keyboard shortcut or key combination.

---

## When to use

- Show keyboard shortcuts in menus and tooltips.
- Document key bindings in help text.
- Display key combinations in settings UI.

Kbd is a presentational element. It does not handle keyboard event binding — it only displays the shortcut visually.

---

## Implementation

| Layer | Location |
|-------|----------|
| Contract | `@brkta/ui-core/kbd/kbd-contract.ts` |
| CSS | `@brkta/ui-core/kbd/kbd.css` |
| React | `@brkta/ui-react/kbd` (`Kbd`) |
| Angular | `@brkta/ui-angular` (`KbdComponent`) |

---

## React

```tsx
import { Kbd } from '@brkta/ui-react/kbd';

<Kbd keys="⌘K" />
<Kbd keys="Ctrl+S" />
<Kbd keys="⌘⇧F" />
```

## Angular

```html
<brkta-kbd keys="⌘K"></brkta-kbd>
<brkta-kbd keys="Ctrl+S"></brkta-kbd>
<brkta-kbd keys="⌘⇧F"></brkta-kbd>
```

---

## Props / Inputs

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `keys` | string | — | The keyboard shortcut to display |

## Styling

- Uses `--font-family-mono` for the key text.
- Uses `--radius-sm` (6px) for compact corners.
- Compact height (20px) and inline display for use within text or menus.

## Accessibility

- Kbd renders as a native `<kbd>` element.
- Keyboard shortcuts should also be documented elsewhere (in text, tooltip, or aria-label) for screen reader users who may not navigate by tab.

## Related

- **Tooltip** — For showing keyboard shortcuts on hover.
