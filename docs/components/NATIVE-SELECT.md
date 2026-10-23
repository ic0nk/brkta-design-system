# Native Select

> ⚠️ **Restricted.** NativeSelect is not the standard select control for the BRKTA Design System.
> Use [Select](SELECT.md) (Custom Select) for all normal product UI.
> NativeSelect is only permitted where browser-native menus are explicitly required
> (e.g., platform-specific behavior, accessibility exceptions).
> Browser-native `<select>` dropdown menus are rendered by the operating system
> and cannot be styled with CSS to match the shared token-driven visual style.

A styled native `<select>` element with a custom chevron indicator. Uses the browser's native select behavior for accessibility.

---

## Implementation

| Layer | Location |
|-------|----------|
| Contract | `@brkta/ui-core/native-select/native-select-contract.ts` |
| CSS | `@brkta/ui-core/native-select/native-select.css` |
| React | `@brkta/ui-react/native-select` (`NativeSelect`) |
| Angular | `@brkta/ui-angular` (`NativeSelectComponent`) |

---

## Usage

### React

```tsx
import { NativeSelect } from '@brkta/ui-react/native-select';

<NativeSelect>
  <option value="">Select an option</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
  <option value="3">Option 3</option>
</NativeSelect>

<NativeSelect variant="filled" size="sm">
  <option value="">Select...</option>
  <option value="a">A</option>
  <option value="b">B</option>
</NativeSelect>

<NativeSelect invalid>
  <option value="">Select...</option>
  <option value="1">One</option>
</NativeSelect>
```

### Angular

```html
<brkta-native-select>
  <option value="">Select an option</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</brkta-native-select>

<brkta-native-select variant="filled" size="sm">
  <option value="">Select...</option>
  <option value="a">A</option>
</brkta-native-select>
```

---

## Variants

| Variant | Background | Border |
|---------|------------|--------|
| `default` | `--background` | `--input` (visible) |
| `filled` | `--muted` | None at rest |

## Sizes

| Size | Height | Font Size |
|------|--------|-----------|
| `sm` | 32px | xs (12px) |
| `md` | 44px | sm (13px) |
| `lg` | 56px | base (14px) |

## States

| State | Visual |
|-------|--------|
| Default | As defined by variant |
| Hover | Border darkens or background darkens |
| Focus-visible | 2px ring using `--ring` token |
| Disabled | 50% opacity, non-interactive |
| Invalid | `--destructive` border color |

## Accessibility

- Uses the native `<select>` element — no custom ARIA required.
- Invalid state sets `aria-invalid="true"`.
- The custom chevron is implemented via CSS `background-image` (inline SVG) — no external assets.

## Related Components

- Input — shares the same variant/size/state system
- Field — layout wrapper
- Select (custom) — Use when you need a token-styled, keyboard-operable dropdown; see [SELECT.md](SELECT.md).
