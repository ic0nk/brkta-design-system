# Radio Group

> A group of styled radio buttons with native `<input type="radio">` for accessibility. Supports vertical and horizontal orientations.

---

## Implementation

| Layer | Location |
|-------|----------|
| Contract | `@brkta/ui-core/radio-group/radio-group-contract.ts` |
| CSS | `@brkta/ui-core/radio-group/radio-group.css` |
| React | `@brkta/ui-react/radio-group` (`RadioGroup`, `Radio`) |
| Angular | `@brkta/ui-angular` (`RadioGroupComponent`, `RadioComponent`) |

---

## Usage

### React

```tsx
import { RadioGroup, Radio } from '@brkta/ui-react/radio-group';

<RadioGroup value="option1" onValueChange={setValue}>
  <Radio value="option1" label="Option 1" />
  <Radio value="option2" label="Option 2" />
  <Radio value="option3" label="Option 3" />
</RadioGroup>

<RadioGroup orientation="horizontal">
  <Radio value="yes" label="Yes" />
  <Radio value="no" label="No" />
</RadioGroup>
```

### Angular

```html
<brkta-radio-group orientation="vertical">
  <brkta-radio value="option1">Option 1</brkta-radio>
  <brkta-radio value="option2">Option 2</brkta-radio>
  <brkta-radio value="option3" [checked]="true">Option 3</brkta-radio>
</brkta-radio-group>

<brkta-radio-group orientation="horizontal">
  <brkta-radio value="yes">Yes</brkta-radio>
  <brkta-radio value="no">No</brkta-radio>
</brkta-radio-group>
```

---

## Props / Inputs

### RadioGroup

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'vertical'` | Layout direction |
| `value` | `string` | — | Currently selected value |
| `invalid` | `boolean` | `false` | Marks the group as invalid |

### Radio

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | The value when this option is selected |
| `label` | `string` | — | Visible label (React) / use content projection (Angular) |
| `disabled` | `boolean` | `false` | Disables this option |

## States

| State | Visual |
|-------|--------|
| Unselected | Empty circle with `--input` border |
| Selected | Filled center circle with `--primary` background |
| Hover | Border darkens |
| Focus-visible | 2px ring using `--ring` token |
| Disabled | 50% opacity, non-interactive |

## Accessibility

- Uses visually hidden native `<input type="radio">` elements — full keyboard and screen reader support.
- Arrow keys navigate between radio options when using native radio behavior.
- The visible radio circle is decorative (`aria-hidden="true"`).

## Related Components

- Checkbox — for multiple selection
- Switch — for binary toggle
