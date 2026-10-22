# Toggle Group

> Composes Toggle components into a single-select or multi-select segmented control. Renders as a group with `role="group"` and correct `aria-multiselectable` behavior.

---

## When to use

- View switchers (Daily / Weekly / Monthly).
- Formatting toolbar groups (Bold, Italic, Underline).
- Any set of mutually-exclusive or multi-select Toggle buttons that should appear as a connected control.

Do not use Toggle Group for navigation tabs — use the Tabs component instead.
Do not place non-Toggle children inside Toggle Group.

---

## Implementation

| Layer | Location |
|-------|----------|
| Contract | `@brkta/ui-core/toggle-group/toggle-group-contract.ts` |
| CSS | `@brkta/ui-core/toggle-group/toggle-group.css` |
| React | `@brkta/ui-react/toggle-group` (`ToggleGroup`) |
| Angular | `@brkta/ui-angular` (`ToggleGroupComponent`, selector `[brkta-toggle-group]`) |

---

## React

```tsx
import { ToggleGroup } from '@brkta/ui-react/toggle-group';
import { Toggle } from '@brkta/ui-react/toggle';

<ToggleGroup type="single">
  <Toggle pressed>Daily</Toggle>
  <Toggle>Weekly</Toggle>
  <Toggle>Monthly</Toggle>
</ToggleGroup>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'single' \| 'multiple'` | `'single'` | Selection mode |
| `className` | `string` | — | Additional CSS class |

## Angular

```html
<brkta-toggle-group type="multiple">
  <brkta-toggle pressed>Bold</brkta-toggle>
  <brkta-toggle pressed>Italic</brkta-toggle>
  <brkta-toggle>Underline</brkta-toggle>
</brkta-toggle-group>
```

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `type` | `'single' \| 'multiple'` | `'single'` | Selection mode |

---

## States

| State | CSS | Notes |
|-------|-----|-------|
| Default | `[data-brkta-toggle-group]` | Inline-flex with muted background, small gap |
| Child toggle (unpressed) | — | Transparent background, inherits group styling |
| Child toggle (pressed) | `[data-pressed]` within group | Card background, shadow |

---

## Accessibility

- Renders with `role="group"`.
- Single-select: `aria-multiselectable` not set.
- Multi-select: `aria-multiselectable="true"`.
- Each child Toggle manages its own `aria-pressed`.
- Keyboard navigation is inherited from the native `<button>` toggles.
