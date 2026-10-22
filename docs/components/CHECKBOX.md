# Checkbox

> A styled checkbox with native `<input type="checkbox">` for accessibility. Supports checked, unchecked, indeterminate, disabled, and invalid states.

---

## Implementation

| Layer | Location |
|-------|----------|
| Contract | `@brkta/ui-core/checkbox/checkbox-contract.ts` |
| CSS | `@brkta/ui-core/checkbox/checkbox.css` |
| React | `@brkta/ui-react/checkbox` (`Checkbox`) |
| Angular | `@brkta/ui-angular` (`CheckboxComponent`) |

---

## Usage

### React

```tsx
import { Checkbox } from '@brkta/ui-react/checkbox';

<Checkbox label="Accept terms" />
<Checkbox checked label="Agreed" />
<Checkbox indeterminate label="Select all" />
<Checkbox disabled label="Disabled" />
<Checkbox invalid label="Error" />
```

### Angular

```html
<brkta-checkbox>Accept terms</brkta-checkbox>
<brkta-checkbox [checked]="true">Agreed</brkta-checkbox>
<brkta-checkbox [disabled]="true">Disabled</brkta-checkbox>
<brkta-checkbox [invalid]="true">Error</brkta-checkbox>
```

---

## States

| State | Visual |
|-------|--------|
| Unchecked | Empty square with `--input` border |
| Checked | Filled with `--primary` background, white checkmark |
| Indeterminate | Filled with `--primary` background, short dash |
| Hover | Border darkens |
| Focus-visible | 2px ring using `--ring` token |
| Disabled | 50% opacity, non-interactive |
| Invalid | `--destructive` border color |

## Accessibility

- Uses a visually hidden native `<input type="checkbox">` — retains full keyboard and screen reader support.
- The visible checkbox is a decorative `<span>` with `aria-hidden="true"`.
- Keyboard: Space toggles the checkbox.
- The `<label>` wrapping both the hidden input and the visual indicator ensures click targets are accessible.

## Related Components

- Label — for standalone labels outside the checkbox
- Switch — toggle switch, similar checked/unchecked semantics
- Field — layout wrapper
