# Textarea

> A multi-line text input field with variants, sizes, and states. Shares the same visual system as Input.

---

## Implementation

| Layer | Location |
|-------|----------|
| Contract | `@brkta/ui-core/textarea/textarea-contract.ts` |
| CSS | `@brkta/ui-core/textarea/textarea.css` |
| React | `@brkta/ui-react/textarea` (`Textarea`) |
| Angular | `@brkta/ui-angular` (`TextareaComponent`) |

---

## Usage

### React

```tsx
import { Textarea } from '@brkta/ui-react/textarea';

<Textarea placeholder="Write a description..." />
<Textarea variant="filled" size="sm" />
<Textarea invalid />
<Textarea disabled value="Read only" />
```

### Angular

```html
<brkta-textarea placeholder="Write a description..."></brkta-textarea>
<brkta-textarea variant="filled" size="sm"></brkta-textarea>
<brkta-textarea [invalid]="true"></brkta-textarea>
<brkta-textarea [disabled]="true" value="Read only"></brkta-textarea>
```

---

## Variants, Sizes, States

Textarea shares the exact same variant, size, and state system as Input.

| Variant | Background | Border |
|---------|------------|--------|
| `default` | `--background` | `--input` (visible) |
| `filled` | `--muted` | None at rest |
| `ghost` | Transparent | None at rest |

| Size | Min-Height | Font Size |
|------|------------|-----------|
| `sm` | 32px | xs (12px) |
| `md` | 44px | sm (13px) |
| `lg` | 56px | base (14px) |

| State | Visual |
|-------|--------|
| Hover | Border or background darkens |
| Focus-visible | 2px ring using `--ring` token |
| Disabled | 50% opacity, non-interactive |
| Invalid | `--destructive` border color |

## Accessibility

- Invalid state sets `aria-invalid="true"`.
- Use `ariaDescribedBy` to connect help/error text.
- Supports `rows` prop to control visible height (default 3).
- Resize is set to `vertical` by default.

## Related Components

- Input — single-line text input, shares variant/size system
- Label — form field label
- Field — layout wrapper composing Label + Textarea + Help/Error
