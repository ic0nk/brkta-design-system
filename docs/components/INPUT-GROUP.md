# Input Group

> A composite container that attaches addons (icons, text, buttons) before or after an Input. Follows existing Input and Button token rules without recreating their styling.

---

## When to use

- Search inputs with a leading icon or trailing clear button.
- Currency or unit inputs with prefix/suffix text.
- Input fields with an inline action button (e.g., "Send", "Copy").
- Forms where the input and its contextual addons should appear as one visual unit.

Do not use Input Group if the addons are visually separate from the input — place them outside instead.

---

## Implementation

| Layer | Location |
|-------|----------|
| Contract | `@brkta/ui-core/input-group/input-group-contract.ts` |
| CSS | `@brkta/ui-core/input-group/input-group.css` |
| React | `@brkta/ui-react/input-group` (`InputGroup`, `InputGroupAddon`) |
| Angular | `@brkta/ui-angular` (`InputGroupComponent`, `InputGroupAddonComponent`) |

---

## React

```tsx
import { InputGroup, InputGroupAddon } from '@brkta/ui-react/input-group';
import { Input } from '@brkta/ui-react/input';

<InputGroup>
  <InputGroupAddon>@</InputGroupAddon>
  <Input placeholder="Username" />
</InputGroup>
```

### Props — InputGroup

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `disabled` | `boolean` | `false` | Disables the entire group |
| `invalid` | `boolean` | `false` | Marks the group as invalid |
| `className` | `string` | — | Additional CSS class |
| `children` | `ReactNode` | — | Input + addon children |

### Props — InputGroupAddon

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional CSS class |
| `children` | `ReactNode` | — | Icon, text, or button content |

## Angular

```html
<brkta-input-group>
  <brkta-input-group-addon>@</brkta-input-group-addon>
  <brkta-input placeholder="Username"></brkta-input>
</brkta-input-group>
```

### Inputs — InputGroup

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `disabled` | `boolean` | `false` | Disables the group |
| `invalid` | `boolean` | `false` | Invalid visual state |

### Inputs — InputGroupAddon

No inputs. Content is projected via `<ng-content>`.

---

## States

| State | CSS | Notes |
|-------|-----|-------|
| Default | `[data-brkta-input-group]` | Flex row, border, radius |
| Focused (child) | `:focus-within` | Ring border on group |
| Disabled | `[data-disabled]` | Reduced opacity, no pointer events |
| Invalid | `[data-invalid]` | Destructive border color |

---

## Accessibility

- The group is purely visual — ARIA attributes live on the inner input element.
- Ensure the input retains its own `aria-label` or associated `<label>`.
- Disabled state uses CSS opacity — the inner input's native `disabled` attribute handles keyboard/focus exclusion.
