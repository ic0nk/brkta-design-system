# Select (Custom)

## Overview

The **Select** component is the **standard** select control for BRKTA ONE product UI.
It provides a custom-designed dropdown with a BRKTA ONE-branded listbox that replaces
unstyled browser-native `<select>` option menus. The trigger is visually consistent
with other form controls (Input, Textarea) while providing full control over the
dropdown appearance.

NativeSelect is a restricted exception — see [NATIVE-SELECT.md](NATIVE-SELECT.md).

## When to use

- As the **default** select control in all BRKTA ONE product UI
- When the opened dropdown must match BRKTA ONE visual design
- When you need disabled options, keyboard navigation, or controlled/uncontrolled value
- When you want consistent cross-browser dropdown styling

## When NOT to use

- For autocomplete/type-ahead behavior (use `Combobox`, planned)
- For multi-select (use future multi-select component)
- Do NOT use NativeSelect as a general fallback — it is restricted

## API

### SelectProps (React) / SelectComponent inputs (Angular)

| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `SelectOption[]` | required | Array of options |
| `value` | `string` | - | Controlled value |
| `defaultValue` | `string` | - | Uncontrolled default (React only) |
| `placeholder` | `string` | `"Select…"` | Placeholder text |
| `variant` | `'default' \| 'filled' \| 'ghost'` | `'default'` | Visual variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size preset |
| `disabled` | `boolean` | `false` | Disables the select |
| `invalid` | `boolean` | `false` | Invalid state with destructive styling |
| `ariaLabel` | `string` | - | Explicit accessible name applied to the internal trigger when no visible label ID is available |
| `ariaLabelledBy` | `string` | - | ID reference for the visible accessible label |
| `onValueChange` | `(value: string) => void` | - | Change callback |

### SelectOption

```typescript
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
```

## Data attributes

| Attribute | Element |
|---|---|
| `data-brkta-select` | Wrapper `div` |
| `data-brkta-select-trigger` | Trigger `button` |
| `data-brkta-select-value` | Value text `span` |
| `data-brkta-select-icon` | Chevron icon `span` |
| `data-brkta-select-content` | Dropdown `div` |
| `data-brkta-select-option` | Option `div` |

## Accessibility

- Uses WAI-ARIA Combobox pattern: `role="combobox"` + `aria-haspopup="listbox"`
- Dropdown is `role="listbox"` with `role="option"` children
- Keyboard: ArrowUp/Down, Home/End, Enter/Space to select, Escape to close
- `aria-expanded` reflects open state
- `aria-label` can provide an explicit localized accessible name on the internal trigger
- `aria-labelledby` can connect the trigger to a visible external label
- `aria-selected` on selected options
- `aria-disabled` on disabled options
- `aria-activedescendant` for keyboard navigation
- `aria-invalid` when in invalid state

## Files

| Framework | Path |
|---|---|
| Contract | `packages/ui-core/select/select-contract.ts` |
| CSS | `packages/ui-core/select/select.css` |
| React | `packages/ui-react/src/select/select.tsx` |
| React tests | `packages/ui-react/src/select/select.spec.tsx` |
| React stories | `packages/ui-react/src/select/select.stories.tsx` |
| Angular | `packages/ui-angular/src/select/select.component.ts` |
| Angular tests | `packages/ui-angular/src/select/select.spec.ts` |
| Angular stories | `packages/ui-angular/src/select/select.stories.ts` |
