# Label

> A form field label with optional required indicator and disabled state.

---

## Implementation

| Layer | Location |
|-------|----------|
| Contract | `@brkta/ui-core/label/label-contract.ts` |
| CSS | `@brkta/ui-core/label/label.css` |
| React | `@brkta/ui-react/label` (`Label`) |
| Angular | `@brkta/ui-angular` (`LabelComponent`) |

---

## Usage

### React

```tsx
import { Label } from '@brkta/ui-react/label';

<Label htmlFor="email">Email</Label>
<Label htmlFor="email" required>Email</Label>
<Label htmlFor="email" disabled>Email</Label>
```

### Angular

```html
<brkta-label htmlFor="email">Email</brkta-label>
<brkta-label htmlFor="email" [required]="true">Email</brkta-label>
<brkta-label htmlFor="email" [disabled]="true">Email</brkta-label>
```

---

## Props / Inputs

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `htmlFor` | `string` | — | Associates the label with a form control by id |
| `required` | `boolean` | `false` | Shows a red asterisk after the label text |
| `disabled` | `boolean` | `false` | Dims the label to indicate the associated field is disabled |

## States

| State | Visual |
|-------|--------|
| Default | Standard label with currentColor text |
| Required | Appends a red `*` asterisk after the text |
| Disabled | 50% opacity, `cursor: not-allowed` |

## Affordances

| Attribute | Value | When |
|-----------|-------|------|
| `data-brkta-label` | (present) | Always |
| `data-required` | `"true"` | When `required` is true |
| `data-disabled` | `"true"` | When `disabled` is true |

## Related Components

- Input — the most common field the label connects to
- Field — layout wrapper that composes Label + Input + Help/Error text
