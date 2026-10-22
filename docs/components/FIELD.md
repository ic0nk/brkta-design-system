# Field

> A layout wrapper that composes a label, form control, and optional help/error/description text into a consistent form field layout.

---

## Implementation

| Layer | Location |
|-------|----------|
| Contract | `@brkta/ui-core/field/field-contract.ts` |
| CSS | `@brkta/ui-core/field/field.css` |
| React | `@brkta/ui-react/field` (`Field`) |
| Angular | `@brkta/ui-angular` (`FieldComponent`) |

---

## Usage

### React

```tsx
import { Field } from '@brkta/ui-react/field';
import { Label } from '@brkta/ui-react/label';
import { Input } from '@brkta/ui-react/input';
import { FieldHelpText } from '@brkta/ui-react/field-help';

<Field>
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" />
  <FieldHelpText>We'll never share your email.</FieldHelpText>
</Field>

<Field invalid>
  <Label htmlFor="password">Password</Label>
  <Input id="password" type="password" invalid />
  <FieldErrorText>Password must be at least 8 characters.</FieldErrorText>
</Field>

<Field disabled>
  <Label htmlFor="readonly" disabled>Read Only</Label>
  <Input id="readonly" disabled value="Pre-filled" />
</Field>
```

### Angular

```html
<brkta-field>
  <brkta-label htmlFor="email">Email</brkta-label>
  <brkta-input id="email" type="email"></brkta-input>
  <brkta-field-help>We'll never share your email.</brkta-field-help>
</brkta-field>

<brkta-field [invalid]="true">
  <brkta-label htmlFor="password">Password</brkta-label>
  <brkta-input id="password" type="password" [invalid]="true"></brkta-input>
  <brkta-field-error>Password must be at least 8 characters.</brkta-field-error>
</brkta-field>

<brkta-field [disabled]="true">
  <brkta-label htmlFor="readonly" [disabled]="true">Read Only</brkta-label>
  <brkta-input id="readonly" [disabled]="true" value="Pre-filled"></brkta-input>
</brkta-field>
```

---

## Props / Inputs

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `invalid` | `boolean` | `false` | Marks the field as invalid |
| `disabled` | `boolean` | `false` | Marks the field as disabled |
| `required` | `boolean` | `false` | Marks the field as required |

## States

| State | Visual |
|-------|--------|
| Default | Normal layout flow |
| Invalid | Data attribute `data-invalid="true"` (individual controls handle their own styling) |
| Disabled | 50% opacity on the entire field |

## Affordances

| Attribute | Value | When |
|-----------|-------|------|
| `data-brkta-field` | (present) | Always |
| `data-invalid` | `"true"` | When `invalid` is true |
| `data-disabled` | `"true"` | When `disabled` is true |
| `data-required` | `"true"` | When `required` is true |

## Related Components

- Label — form field label
- Input / Textarea / Native Select — form controls
- Field Help Text / Field Error Text / Field Description — supporting text

---

## Field Help Text

Helper text displayed below a form field to guide input.

### Props / Inputs

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | — | Unique ID for `aria-describedby` connection to the form control |

`FieldHelpText` (React) extends `HTMLAttributes<HTMLParagraphElement>`; `FieldHelpComponent` (`brkta-field-help`, Angular) exposes `id` as its only input.

### States

| State | Visual |
|-------|--------|
| Default | `--font-size-xs` text in `--muted-foreground` with `--line-height-normal` and a `0.125rem` top margin |

### Accessibility

- Renders a `<p>` element; no ARIA role is applied.
- Pass the `id` to the associated control's `aria-describedby` so screen readers announce the helper text.
- The Angular host uses `display: contents`, so the inner `<p>` participates directly in the field layout.

### Data Attribute

- `data-brkta-field-help` — always present on the rendered `<p>`

---

## Field Error Text

Validation error text displayed below a form field when the input is invalid.

### Props / Inputs

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | — | Unique ID for `aria-describedby` connection to the form control |

`FieldErrorText` (React) extends `HTMLAttributes<HTMLParagraphElement>`; `FieldErrorComponent` (`brkta-field-error`, Angular) exposes `id` as its only input.

### States

| State | Visual |
|-------|--------|
| Default | `--font-size-xs` text in `--destructive` with `--line-height-normal` and a `0.125rem` top margin |

### Accessibility

- Renders a `<p role="alert">` element, so validation errors are announced by screen readers when rendered.
- Pass the `id` to the associated control's `aria-describedby` to connect the error text.
- The Angular host uses `display: contents`, so the inner `<p>` participates directly in the field layout.

### Data Attribute

- `data-brkta-field-error` — always present on the rendered `<p>`

---

## Field Description

Longer description text displayed above or below a form field.

### Props / Inputs

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | — | Unique ID for `aria-describedby` connection to the form control |

`FieldDescription` (React) extends `HTMLAttributes<HTMLParagraphElement>`; `FieldDescriptionComponent` (`brkta-field-description`, Angular) exposes `id` as its only input.

### States

| State | Visual |
|-------|--------|
| Default | `--font-size-xs` text in `--muted-foreground` with `--line-height-normal` |

### Accessibility

- Renders a `<p>` element; no ARIA role is applied.
- Pass the `id` to the associated control's `aria-describedby` to connect the description.
- The Angular host uses `display: contents`, so the inner `<p>` participates directly in the field layout.

### Data Attribute

- `data-brkta-field-description` — always present on the rendered `<p>`
