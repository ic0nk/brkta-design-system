# Switch

The label provides the default 44-by-44 minimum touch target through `--height-md`;
the visual track retains its compact size in both frameworks.

> A toggle switch control with native `<input type="checkbox" role="switch">` for accessibility. Supports checked, unchecked, and disabled states.

---

## Implementation

| Layer | Location |
|-------|----------|
| Contract | `@brkta/ui-core/switch/switch-contract.ts` |
| CSS | `@brkta/ui-core/switch/switch.css` |
| React | `@brkta/ui-react/switch` (`Switch`) |
| Angular | `@brkta/ui-angular` (`SwitchComponent`) |

---

## Usage

### React

```tsx
import { Switch } from '@brkta/ui-react/switch';

<Switch />
<Switch checked />
<Switch disabled />
<Switch ariaLabel="Enable notifications" />
```

### Angular

```html
<brkta-switch></brkta-switch>
<brkta-switch [checked]="true"></brkta-switch>
<brkta-switch [disabled]="true"></brkta-switch>
<brkta-switch ariaLabel="Enable notifications"></brkta-switch>
```

---

## Props / Inputs

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Whether the switch is on |
| `disabled` | `boolean` | `false` | Disables interaction |
| `required` | `boolean` | `false` | Whether the switch is required |
| `ariaLabel` | `string` | — | Accessible label (use when no visible label) |
| `ariaDescribedBy` | `string` | — | Connects to help/error text |

## States

| State | Visual |
|-------|--------|
| Unchecked | Gray track (`--input`), thumb on the left |
| Checked | `--primary` track, thumb slides to the right |
| Hover | Track darkens slightly |
| Focus-visible | 2px ring using `--ring` token |
| Disabled | 50% opacity, non-interactive |

## Accessibility

- Uses a visually hidden native `<input type="checkbox" role="switch">`.
- Screen readers announce the switch and its state.
- Keyboard: Space toggles the switch.
- The visible track and thumb are decorative (`aria-hidden="true"`).

## Related Components

- Checkbox — alternative for binary choices
- Label — for visible labels
