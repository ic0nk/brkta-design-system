# Toggle

> A pressed/unpressed button primitive. Renders as a `<button>` with `aria-pressed` for accurate assistive-technology announcements. Supports icon-only usage with accessible labels.

---

## When to use

- Toolbar buttons that toggle formatting (bold, italic, underline).
- Filter chips that stay pressed when active.
- Single boolean preferences (mute, pin, bookmark).
- Any control where the user toggles a binary state.

Do not use Toggle for multi-state selectors — use Toggle Group or Select instead.
Do not use Toggle for navigation — use a Link or regular Button.

---

## Implementation

| Layer | Location |
|-------|----------|
| Contract | `@brkta/ui-core/toggle/toggle-contract.ts` |
| CSS | `@brkta/ui-core/toggle/toggle.css` |
| React | `@brkta/ui-react/toggle` (`Toggle`) |
| Angular | `@brkta/ui-angular` (`ToggleComponent`, selector `[brkta-toggle]`) |

---

## React

```tsx
import { Toggle } from '@brkta/ui-react/toggle';

<Toggle pressed>Bold</Toggle>
<Toggle aria-label="Italic">I</Toggle>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `pressed` | `boolean` | `false` | Whether the toggle is pressed. Controls `aria-pressed` |
| `disabled` | `boolean` | `false` | Disabled state |
| `aria-label` | `string` | — | Required for icon-only toggles |
| `className` | `string` | — | Additional CSS class |

## Angular

```html
<brkta-toggle pressed>Bold</brkta-toggle>
<brkta-toggle ariaLabel="Italic">I</brkta-toggle>
```

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `pressed` | `boolean` | `false` | Pressed state |
| `disabled` | `boolean` | `false` | Disabled state |
| `ariaLabel` | `string` | — | Accessible label |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `pressedChange` | `EventEmitter<boolean>` | Emits when pressed state toggles |

---

## States

| State | CSS | Notes |
|-------|-----|-------|
| Default | `[data-brkta-toggle]` | Card background, border, muted-foreground text |
| Hover | `:hover` | Muted background, foreground text |
| Pressed | `[data-pressed]` | Primary background, primary-foreground text |
| Disabled | `[data-disabled]` | 40% opacity, no pointer events |
| Focus-visible | `:focus-visible` | Ring outline |

---

## Accessibility

- Always renders `aria-pressed` (`"true"` or `"false"`).
- Icon-only toggles **must** provide `aria-label` (React) or `ariaLabel` (Angular).
- Uses native `<button>` element — keyboard accessible by default.
