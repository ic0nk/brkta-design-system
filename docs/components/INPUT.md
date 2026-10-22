# Input

> A text input field with variants, sizes, and states. Supports text, email, password, search, number, and other HTML input types.

---

## Implementation

| Layer | Location |
|-------|----------|
| Contract | `@brkta/ui-core/input/input-contract.ts` |
| CSS | `@brkta/ui-core/input/input.css` |
| React | `@brkta/ui-react/input` (`Input`) |
| Angular | `@brkta/ui-angular` (`InputComponent`) |

---

## Usage

### React

```tsx
import { Input } from '@brkta/ui-react/input';

<Input placeholder="Enter your email" />
<Input variant="filled" size="sm" />
<Input variant="ghost" invalid />
<Input disabled value="Read only" />
<Input type="file" multiple accept="image/png,image/jpeg" />
```

### Angular

```html
<brkta-input placeholder="Enter your email"></brkta-input>
<brkta-input variant="filled" size="sm"></brkta-input>
<brkta-input variant="ghost" [invalid]="true"></brkta-input>
<brkta-input [disabled]="true" value="Read only"></brkta-input>
<brkta-input type="file" accept="image/png,image/jpeg" placeholder="Choose an image"></brkta-input>
<brkta-input type="file" [multiple]="true" accept="image/png,image/jpeg" placeholder="Choose images"></brkta-input>
```

### Suffix / adornment

Project an existing design-system control through `brktaInputSuffix` when an action
belongs inside the field. The input keeps its native `id`, `name`, `type`, and
`autocomplete` attributes.

```html
<brkta-input type="password" autocomplete="current-password">
  <brkta-button
    brktaInputSuffix
    variant="ghost"
    size="icon-sm"
    [iconOnly]="true"
    ariaLabel="Show password"
    [iconBefore]="'eye'"
  ></brkta-button>
</brkta-input>
```

---

## Variants

| Variant | Background | Border | Use Case |
|---------|------------|--------|----------|
| `default` | `--background` | `--input` (visible) | Standard forms, most common |
| `filled` | `--muted` | None at rest | Toolbars, search, compact UIs |
| `ghost` | Transparent | None at rest | Inline editing, minimal contexts |

## Sizes

| Size | Height | Font Size | Use Case |
|------|--------|-----------|----------|
| `sm` | 32px | xs (12px) | Compact forms, toolbars |
| `md` | 44px | sm (13px) | **Default.** Standard form fields |
| `lg` | 56px | base (14px) | Hero sections, prominent inputs |

## States

| State | Visual |
|-------|--------|
| Default | As defined by variant |
| Hover | Border darkens (default) or background darkens (filled/ghost) |
| Focus-visible | 2px ring using `--ring` token |
| Disabled | 50% opacity, `cursor: not-allowed`, `pointer-events: none` |
| Invalid | `--destructive` border color; red ring on focus |

## Accessibility

- Invalid state sets `aria-invalid="true"` on the input element.
- Use `ariaDescribedBy` to connect help/error text via `aria-describedby`.
- Suffix controls must be real buttons with localized accessible names; they must
  not replace or hide the native input element.
- Disabled inputs are skipped in tab order.
- All standard input types are supported (text, email, password, file, etc.).
- File inputs may use the native `accept` attribute to guide selection and the additive
  `multiple` input/prop when a feature supports batch selection; the server remains
  authoritative for content validation.

## Related Components

- Label — form field label, use `htmlFor` to connect to input `id`
- Textarea — multi-line text input, shares the same variant/size system
- Native Select — styled native `<select>`, shares the same variant/size system
- Field — layout wrapper composing Label + Input + Help/Error
