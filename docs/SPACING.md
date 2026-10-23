# Spacing

> A consistent spacing scale derived from a 0.25rem (4px) base unit. Every gap, margin, and padding in the design system draws from this single scale — no ad-hoc values.

---

## Table of Contents

- [Spacing Scale](#spacing-scale)
- [Layout Spacing](#layout-spacing)
- [Component Spacing](#component-spacing)
- [Form Spacing](#form-spacing)
- [Using Spacing Tokens](#using-spacing-tokens)

---

## Spacing Scale

All spacing values are defined as CSS custom properties in `theme.css` and follow a Tailwind-inspired progression. The scale is non-linear — smaller steps near the base, wider steps as values grow.

| Token | REM | PX | Typical Usage |
|-------|-----|----|---------------|
| `--space-0` | 0rem | 0px | Remove spacing |
| `--space-0.5` | 0.125rem | 2px | Minimal gap, tight inner padding |
| `--space-1` | 0.25rem | 4px | Small gap between compact elements |
| `--space-1.5` | 0.375rem | 6px | Tight icon-text gap |
| `--space-2` | 0.5rem | 8px | Standard compound gap, button padding |
| `--space-2.5` | 0.625rem | 10px | Slightly larger inner padding |
| `--space-3` | 0.75rem | 12px | Card padding, section inner space |
| `--space-3.5` | 0.875rem | 14px | Fine-tuned padding |
| `--space-4` | 1rem | 16px | Default padding, card padding |
| `--space-5` | 1.25rem | 20px | Section padding, dialog padding |
| `--space-6` | 1.5rem | 24px | Large card padding, panel gap |
| `--space-7` | 1.75rem | 28px | Wide spacing |
| `--space-8` | 2rem | 32px | Section separation, page section gap |
| `--space-9` | 2.25rem | 36px | Form section separation |
| `--space-10` | 2.5rem | 40px | Wide section spacing |
| `--space-11` | 2.75rem | 44px | Component height baseline |
| `--space-12` | 3rem | 48px | Modal padding |
| `--space-14` | 3.5rem | 56px | Large section break |
| `--space-16` | 4rem | 64px | Page section margin |
| `--space-20` | 5rem | 80px | Major layout gap |
| `--space-24` | 6rem | 96px | Page padding, wide gap |
| `--space-28` | 7rem | 112px | Extra wide |
| `--space-32` | 8rem | 128px | Content max-width offset |
| `--space-36` | 9rem | 144px | Dashboard panel margin |
| `--space-40` | 10rem | 160px | Large negative offset |
| `--space-44` | 11rem | 176px | Sidebar width reference |
| `--space-48` | 12rem | 192px | Wide modal width |
| `--space-52` | 13rem | 208px | Layout max-width |
| `--space-56` | 14rem | 224px | Content area width |
| `--space-60` | 15rem | 240px | Wide sidebar |
| `--space-64` | 16rem | 256px | Full sidebar |
| `--space-72` | 18rem | 288px | Dashboard sidebar default width |
| `--space-80` | 20rem | 320px | Wide panel |
| `--space-96` | 24rem | 384px | Max content width (constrained) |

---

## Layout Spacing

Use these conventions to build consistent page layouts in consuming applications.

| Context | Token | Value (rem) | Value (px) |
|---------|-------|-------------|------------|
| Page padding (desktop) | `--space-8` | 2rem | 32px |
| Page padding (tablet) | `--space-6` | 1.5rem | 24px |
| Page padding (mobile) | `--space-4` | 1rem | 16px |
| Card gap in grid | `--space-6` | 1.5rem | 24px |
| Section gap on page | `--space-10` | 2.5rem | 40px |
| Content max-width | `--space-96` | 24rem | 384px |

```css
.page {
  padding: var(--space-8);
  max-width: var(--space-96);
  margin-inline: auto;
}

@media (max-width: 768px) {
  .page {
    padding: var(--space-4);
  }
}

.section-gap {
  margin-top: var(--space-10);
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  gap: var(--space-6);
}
```

### Sidebar Layout

| Element | Property | Value |
|---------|----------|-------|
| Sidebar width (expanded) | `width` | 288px (18rem / --space-72) |
| Sidebar width (collapsed) | `width` | 64px (4rem / --space-16) |
| Sidebar inner padding | `padding` | `--space-4` |
| Sidebar group gap | `gap` | `--space-1` |
| Sidebar item padding | `padding` | `--space-2` `--space-3` |

---

## Component Spacing

### Buttons

| Size | Padding Inline | Padding Block | Gap (icon + text) |
|------|---------------|---------------|-------------------|
| `sm` | `--space-3` (12px) | 0 | `--space-1.5` (6px) |
| `md` | `--space-4` (16px) | 0 | `--space-2` (8px) |
| `lg` | `--space-6` (24px) | 0 | `--space-2` (8px) |
| `icon-sm` | 0 | 0 | — |
| `icon-md` | 0 | 0 | — |
| `icon-lg` | 0 | 0 | — |

### Cards

| Element | Token | Value |
|---------|-------|-------|
| Card padding | `--space-6` | 1.5rem (24px) |
| Card header gap | `--space-2` | 0.5rem (8px) |
| Card content gap | `--space-4` | 1rem (16px) |
| Card footer gap | `--space-4` | 1rem (16px) |
| Card border radius | `--radius-lg` | 0.625rem (10px) |

### Inputs and Form Controls

| Element | Token | Value |
|---------|-------|-------|
| Input padding inline | `--space-3` | 0.75rem (12px) |
| Input padding block | 0 | 0 (centered via line-height) |
| Input height (md) | `--height-md` | 2.75rem (44px) |
| Input gap (icon inside) | `--space-2` | 0.5rem (8px) |

### Dialogs / Modals

| Element | Token | Value |
|---------|-------|-------|
| Dialog inner padding | `--space-6` | 1.5rem (24px) |
| Dialog header gap | `--space-2` | 0.5rem (8px) |
| Dialog content gap | `--space-4` | 1rem (16px) |
| Dialog footer gap | `--space-4` | 1rem (16px) |
| Dialog width (default) | — | 28rem (448px) |
| Dialog width (wide) | — | 36rem (576px) |

---

## Form Spacing

### Between Fields

| Context | Gap | Token |
|---------|-----|-------|
| Fields in same group | 1rem (16px) | `--space-4` |
| Inline fields (side by side) | 0.75rem (12px) | `--space-3` |
| Label to field | 0.5rem (8px) | `--space-2` |
| Field to error message | 0.25rem (4px) | `--space-1` |
| Error message to next field | 0.75rem (12px) | `--space-3` |

### Between Sections

| Context | Gap | Token |
|---------|-----|-------|
| Form sections | 2rem (32px) | `--space-8` |
| Section heading to first field | 1rem (16px) | `--space-4` |

### Between Groups (Fieldset)

| Context | Gap | Token |
|---------|-----|-------|
| Fieldset groups | 1.5rem (24px) | `--space-6` |
| Fieldset legend to fields | 0.75rem (12px) | `--space-3` |

### Button Placement

| Context | Gap | Token |
|---------|-----|-------|
| Submit/cancel row from last field | 1.5rem (24px) | `--space-6` |
| Gap between submit and cancel | 0.75rem (12px) | `--space-3` |

```css
/* Form spacing example */
.form-field {
  margin-bottom: var(--space-4);
}

.form-field label {
  margin-bottom: var(--space-2);
  display: block;
}

.form-field .error-message {
  margin-top: var(--space-1);
  font-size: 0.75rem;
  color: var(--destructive);
}

.form-section {
  margin-bottom: var(--space-8);
}

.form-actions {
  margin-top: var(--space-6);
  display: flex;
  gap: var(--space-3);
  justify-content: flex-end;
}
```

---

## Using Spacing Tokens

### In CSS

```css
/* Direct variable usage */
.my-component {
  padding: var(--space-4);
  gap: var(--space-2);
  margin-bottom: var(--space-8);
}
```

### In Tailwind (via @theme mapping)

All spacing tokens are mapped to Tailwind spacing utilities via the `@theme inline` block in `theme.css`:

```html
<div class="p-4 gap-2 mb-8">
  <!-- Uses the same values as the CSS variables -->
</div>
```

Note: Tailwind's `p-4`, `gap-2`, etc., map to the same `--space-*` values. There is no separate Tailwind spacing scale — Tailwind reads the tokens directly.

### Prohibited Patterns

```css
/* ❌ Forbidden — ad-hoc spacing values */
.my-card {
  padding: 17px;
  margin-bottom: 23px;
}

/* ✅ Correct — uses spacing scale */
.my-card {
  padding: var(--space-4);
  margin-bottom: var(--space-6);
}
```

When you need a spacing value not in the scale, do not invent it. Use the next closest value from the scale. If you genuinely need a new value, propose it to the design system team for consideration.
