# Typography

> A clear, functional type system built for business applications. Typography in BRKTA ONE prioritizes readability, scanability, and information hierarchy over decorative expression.

---

## Table of Contents

- [Font Families](#font-families)
- [Heading Hierarchy](#heading-hierarchy)
- [Body Text](#body-text)
- [Labels](#labels)
- [Captions](#captions)
- [Tables](#tables)
- [Numeric and Financial Data](#numeric-and-financial-data)
- [Line Heights](#line-heights)
- [Font Weights](#font-weights)
- [Truncation Rules](#truncation-rules)
- [Wrapping Rules](#wrapping-rules)
- [Fluid Typography](#fluid-typography)

---

## Font Families

### Geist Sans / Geist Variable (Primary UI)

`--font-sans: var(--font-family-sans);`
`--font-family-sans: 'Geist Variable', 'Geist', 'Noto Sans Arabic Variable', system-ui, -apple-system, 'Segoe UI', sans-serif;`

**Geist Sans** (via `@fontsource-variable/geist`) is the primary typeface for all UI text — headings, body, labels, buttons, navigation, and table content. It is a modern, geometric sans-serif optimized for screen readability with clear character distinction and excellent legibility at both small and large sizes.

- Used everywhere in the dashboard and website.
- Loaded as a variable font (weight range 100–900) for performance via fontsource.
- Self-hosted — no external CDN or Google Fonts requests.
- Arabic fallback uses Noto Sans Arabic Variable (see below).

### Geist Mono / Geist Mono Variable (Code & Data)

`--font-mono: var(--font-family-mono);`
`--font-family-mono: 'Geist Mono Variable', 'Geist Mono', ui-monospace, 'SFMono-Regular', 'Cascadia Code', Consolas, monospace;`

**Geist Mono** (via `@fontsource-variable/geist-mono`) is used for code, identifiers, and monospaced data. It matches Geist Sans in design language while providing monospaced clarity for developer and financial contexts.

- Used in code blocks, technical identifiers, and monospaced data displays.
- Appropriate for financial values displayed in monospaced tables.
- Supports `font-variant-numeric: tabular-nums` for aligned numeric columns.

### Noto Sans Arabic / Noto Sans Arabic Variable (Arabic UI)

`--font-arabic: var(--font-family-arabic);`
`--font-family-arabic: 'Noto Sans Arabic Variable', 'Noto Sans Arabic', sans-serif;`

**Noto Sans Arabic** (via `@fontsource-variable/noto-sans-arabic`) is the Arabic UI companion font for the BRKTA ONE typography system.

- **Preferred:** Noto Sans Arabic UI (exact UI variant).
- **Current:** Noto Sans Arabic Variable — the exact "UI" variant is not available as a clean self-hosted npm package at this time.
- Self-hosted — no external CDN.
- Use `var(--font-arabic)` for Arabic text blocks.
- Apply `direction: rtl` on elements containing Arabic text.
- Will be updated to the exact UI variant once available.

### Geist Pixel (Restricted Display / Accent — Planned)

`--font-pixel: var(--font-family-pixel);`
`--font-family-pixel: 'Geist Pixel Square', 'Geist Pixel', var(--font-family-sans);`

**Geist Pixel** is a rare display/accent font intended for small brand markers, technical labels, and special visual inventory indicators only.

- **Status:** Planned / self-hosting not yet implemented.
- Falls back to `var(--font-sans)` until the font files are added.
- **Restricted:** Must NOT be used for body text, buttons, tables, forms, cards, dashboard UI, or normal navigation.
- Every use requires documented approval.
- Will be self-hosted in `packages/design-tokens/fonts/` once implemented.

---

## Heading Hierarchy

Headings establish the visual and semantic structure of a page. Never skip heading levels.

| Level | CSS Token | Size (clamp) | Weight | Usage |
|-------|-----------|-------------|--------|-------|
| `h1` | `--font-size-4xl` | `clamp(1.875rem, 1.3125rem + 2.8125vw, 2.25rem)` | Bold (700) | Page title — one per page |
| `h2` | `--font-size-3xl` | `clamp(1.5rem, 1.125rem + 1.875vw, 1.875rem)` | Semibold (600) | Section heading |
| `h3` | `--font-size-2xl` | `clamp(1.25rem, 1rem + 1.25vw, 1.5rem)` | Semibold (600) | Card or group heading |
| `h4` | `--font-size-xl` | `clamp(1.125rem, 1rem + 0.75vw, 1.25rem)` | Semibold (600) | Subsection heading |
| `h5` | `--font-size-lg` | `clamp(1rem, 0.9375rem + 0.5vw, 1.125rem)` | Medium (500) | Minor group heading |
| `h6` | `--font-size-base` | `clamp(0.875rem, 0.8125rem + 0.375vw, 1rem)` | Medium (500) | Smallest heading |

```css
/* Example: page title */
h1 {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  text-wrap: balance;
}
```

### Heading rules

- Use one `h1` per page — it should match the page title or primary entity name.
- Do not skip levels (e.g., do not go from `h2` to `h4` without an `h3`).
- Headings use `text-wrap: balance` to avoid single-word orphaned lines.
- Use `h2` for major sections, `h3` for cards within sections, `h4` for groups within cards.

---

## Body Text

### Default UI Text

| Property | Value |
|----------|-------|
| Font size | `--font-size-base` = `clamp(0.875rem, 0.8125rem + 0.375vw, 1rem)` |
| Base reference | `0.875rem` (14px) at default viewport |
| Font weight | Normal (400) |
| Line height | `--line-height-normal` (1.5) |
| Font family | `--font-sans` |

The **14px base** is intentional — business dashboards display dense information. The larger 16px base is reserved for long-form reading contexts.

### Long-form Reading Text

| Property | Value |
|----------|-------|
| Font size | `1rem` (16px) |
| Font weight | Normal (400) |
| Line height | `--line-height-relaxed` (1.75) |
| Max width | 65ch |

Long-form text (blog posts, documentation, articles) uses a larger size and relaxed line height for comfortable reading. Constrain to 65 characters per line maximum.

---

## Labels

| Property | Value |
|----------|-------|
| Font size | `0.75rem` (12px) |
| Font weight | Medium (500) |
| Line height | Normal (1.5) |
| Text transform | None — do not uppercase |

Labels appear above or beside form fields, in table headers, and as secondary descriptors. They are compact (12px) with medium weight for legibility at small sizes. Do not use uppercase for labels — it reduces readability.

```css
.label {
  font-size: 0.75rem;
  font-weight: var(--font-weight-medium);
  color: var(--foreground);
}
```

---

## Captions

| Property | Value |
|----------|-------|
| Font size | `0.75rem` (12px) |
| Font weight | Normal (400) |
| Color | `--muted-foreground` |
| Line height | Normal (1.5) |

Captions provide supplementary information — helper text below fields, timestamps, secondary metadata. They use muted coloring to visually recede from primary content.

```css
.caption {
  font-size: 0.75rem;
  color: var(--muted-foreground);
}
```

---

## Tables

| Property | Value |
|----------|-------|
| Font size | `0.8125rem` (13px) |
| Font weight | Normal (400) |
| Header weight | Medium (500) |
| Line height | Normal (1.5) |

Table content uses 13px — a compromise between density and readability. This is smaller than body text to fit more columns, but large enough to scan without strain.

```css
.table-cell {
  font-size: 0.8125rem;
  line-height: var(--line-height-normal);
}
```

---

## Numeric and Financial Data

### Tabular Numbers

Use the `font-variant-numeric: tabular-nums` CSS property for all numeric columns in tables. Tabular numbers have fixed-width digits, so columns of numbers align vertically regardless of digit width.

```css
.numeric-data {
  font-variant-numeric: tabular-nums;
  text-align: right;
}
```

### Financial Values

Financial data should use:

- `font-variant-numeric: tabular-nums` for column alignment.
- `text-align: right` for proper financial column alignment.
- Currency symbols displayed consistently (symbol before amount: `$1,234.56`).
- Monospace font (`--font-mono`) may be used for financial tables where precision is critical.

```css
.financial-value {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  text-align: right;
}
```

### Formatting conventions

| Type | Format | Example |
|------|--------|---------|
| Currency | Symbol + decimal with 2 places | `$1,234.56` |
| Percentage | Number + `%` symbol | `12.5%` |
| Large numbers | Commas for thousands | `1,234,567` |
| Decimal alignment | Right-align, tabular-nums | `   1.50` |
| Negative values | Leading minus sign | `-450.00` |

---

## Line Heights

| Token | Value | Usage |
|-------|-------|-------|
| `--line-height-tight` | 1.25 | Headings, labels, compact text |
| `--line-height-normal` | 1.5 | Body text, UI text, tables, default |
| `--line-height-relaxed` | 1.75 | Long-form reading, articles, documentation |

```css
.heading {
  line-height: var(--line-height-tight);
}

.body-text {
  line-height: var(--line-height-normal);
}

.article {
  line-height: var(--line-height-relaxed);
}
```

---

## Font Weights

| Token | Numeric Value | Usage |
|-------|--------------|-------|
| `--font-weight-normal` | 400 | Body text, captions, table content |
| `--font-weight-medium` | 500 | Labels, buttons, table headers, active nav items |
| `--font-weight-semibold` | 600 | h3, h4 headings, emphasized text |
| `--font-weight-bold` | 700 | h1, h2 headings, financial totals |

```css
.text-normal { font-weight: var(--font-weight-normal); }
.text-medium { font-weight: var(--font-weight-medium); }
.text-semibold { font-weight: var(--font-weight-semibold); }
.text-bold { font-weight: var(--font-weight-bold); }
```

Do not use font weights below 400 (light/thin) in UI text — they reduce readability, especially on non-Retina displays.

---

## Truncation Rules

### Single-line truncation

Use CSS for single-line text overflow:

```css
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

**When to use:** Table cells, sidebar navigation items, badge labels, card titles in constrained containers.

### Multi-line truncation (max 2 lines)

Use the `-webkit-line-clamp` approach for UI elements that may wrap but should not exceed 2 lines:

```css
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

**When to use:** Card descriptions, notification previews, list item summaries.

**When NOT to truncate:** Long-form reading, documentation, error messages. If the full message is critical, show all of it.

---

## Wrapping Rules

### Headings

```css
h1, h2, h3, h4, h5, h6 {
  text-wrap: balance;
}
```

The `text-wrap: balance` property ensures headings avoid orphaned single words on the last line. This is set globally in `base.css`.

### Body text

```css
p, li, figcaption {
  text-wrap: pretty;
}
```

The `text-wrap: pretty` property optimizes paragraph breaks to avoid widows (single words on the last line) without the performance cost of `balance` for long text.

### Preformatted text

```css
code, pre {
  text-wrap: nowrap;  /* allow horizontal scroll instead of wrapping */
  overflow-x: auto;
}
```

Code blocks and inline code should scroll horizontally rather than wrap, preserving readability of indentation and line structure.
