# Color System

> A perceptually-uniform semantic color system built in OKLCH with a warm creamy neutral foundation. Use these shared tokens for component colors rather than one-off values.

---

## Table of Contents

- [Creamy Neutral Foundation](#creamy-neutral-foundation)
- [OKLCH Color Space](#oklch-color-space)
- [Semantic Token Table](#semantic-token-table)
- [Foreground Pairing](#foreground-pairing)
- [Status Colors](#status-colors)
- [Chart Colors](#chart-colors)
- [Brand Colors vs. UI Colors](#brand-colors-vs-ui-colors)
- [Contrast Expectations](#contrast-expectations)
- [Raw-Color Restrictions](#raw-color-restrictions)

---

## Creamy Neutral Foundation

The BRKTA Design System uses a **warm creamy neutral** foundation instead of a cold zero-chroma grayscale or a pure-white / pure-black scheme.

**Connecting cream**: `#F4F1EA` → `oklch(0.9585 0.0098 87.5)`

This single color connects both themes:

| Theme | Role of Cream |
|-------|---------------|
| Light | Page background — the cream serves as the main application canvas |
| Dark | Primary text and icon foreground — the same cream is the principal high-emphasis reading color |

**Key rules:**

- Cream is a NEUTRAL foundation, NOT the corporate primary color. The brand accent is lime (`--accent`).
- Pure white (`#FFFFFF`) is restricted to utility-only use (print, export, documented exceptions).
- Pure black (`#000000`) is restricted to utility-only use.
- All neutral tokens carry a subtle warm chroma (approximately 0.006–0.020 at hue 80°–95°). The palette is intentionally warm, not achromatic.
- "Cream across themes" is a core identity concept — the same cream value connects light and dark modes.

---

## OKLCH Color Space

All colors in the BRKTA Design System are defined in **OKLCH** (Oklab Lightness Chroma Hue), a perceptually-uniform color space that provides:

- **Consistent lightness perception** — a lightness value of 0.5 appears equally bright across all hues. This is not true of HSL or sRGB.
- **Wide gamut** — OKLCH natively supports Display P3 and beyond, enabling more vibrant accent colors (like the brand lime) that sRGB cannot represent accurately.
- **Predictable dark-mode transformations** — because lightness is linear and perceptually uniform, dark-mode values follow a simple mathematical relationship to light-mode values.
- **Smooth interpolation** — gradients and color-mix operations produce natural results without the grayish dead zones common in HSL.

### OKLCH syntax

```
oklch(lightness chroma hue)
```

| Component | Range | Description |
|-----------|-------|-------------|
| Lightness | 0–1 | Perceptual lightness (0 = black, 1 = white) |
| Chroma | 0–0.5+ | Colorfulness / saturation intensity |
| Hue | 0–360 | Hue angle (0 = red, 120 = green, 240 = blue) |

**Example**: `oklch(0.9585 0.0098 87.5)` — the connecting cream at ~96% lightness, low warm chroma, ~88° (yellow-green warm hue).

---

## Semantic Token Table

Each semantic color has a **background** token and a **foreground** token for text/content placed on it. The naming convention follows `--{role}` and `--{role}-foreground`.

### Connecting Cream

| Role | OKLCH | Hex (sRGB) |
|------|-------|-------------|
| Connecting cream | `oklch(0.9585 0.0098 87.5)` | `#F4F1EA` |

### Light Theme (`:root`)

| Token | OKLCH Value | Hex (sRGB) | Usage |
|-------|-------------|-------------|-------|
| `--background` | `oklch(0.9585 0.0098 87.5)` | `#F4F1EA` | Cream page canvas |
| `--foreground` | `oklch(0.2042 0.0079 95.4)` | `#181713` | Warm near-black primary text |
| `--surface` | `oklch(0.9705 0.0098 87.5)` | `#F8F5EE` | Cream-white surface for sidebars, grouped sections |
| `--surface-foreground` | `oklch(0.2042 0.0079 95.4)` | `#181713` | Text on surface |
| `--card` | `oklch(0.9920 0.0073 80.7)` | `#FFFCF7` | Warm off-white card background |
| `--card-foreground` | `oklch(0.2042 0.0079 95.4)` | `#181713` | Text on card |
| `--popover` | `oklch(0.9945 0.0057 84.6)` | `#FFFDF9` | Near-cream white for menus, dropdowns, dialogs |
| `--popover-foreground` | `oklch(0.2042 0.0079 95.4)` | `#181713` | Text on popover |
| `--primary` | `oklch(0.2042 0.0079 95.4)` | `#181713` | Warm near-black primary interactive |
| `--primary-foreground` | `oklch(0.9585 0.0098 87.5)` | `#F4F1EA` | Cream text on primary |
| `--secondary` | `oklch(0.9200 0.0145 84.6)` | `#E9E4DA` | Warm beige secondary control |
| `--secondary-foreground` | `oklch(0.3572 0.0109 84.6)` | `#3F3C36` | Dark warm text on secondary |
| `--muted` | `oklch(0.9352 0.0144 84.6)` | `#EEE9DF` | Warm muted background |
| `--muted-foreground` | `oklch(0.5044 0.0134 84.6)` | `#68645C` | Warm mid-gray text |
| `--accent` | `oklch(0.92 0.3 120)` | `#D7FF3F` | Brand lime |
| `--accent-foreground` | `oklch(0.2 0.01 120)` | (dark green-black) | Text on lime |
| `--destructive` | `oklch(0.577 0.245 27.33)` | (red) | Destructive actions |
| `--destructive-foreground` | `oklch(0.9585 0.0098 87.5)` | `#F4F1EA` | Cream text on destructive |
| `--success` | `oklch(0.72 0.2 150)` | (green) | Success state |
| `--success-foreground` | `oklch(0.9585 0.0098 87.5)` | `#F4F1EA` | Cream text on success |
| `--warning` | `oklch(0.85 0.2 85)` | (amber) | Warning state |
| `--warning-foreground` | `oklch(0.2 0.01 120)` | (dark green-black) | Text on warning |
| `--information` | `oklch(0.7 0.15 240)` | (blue) | Information state |
| `--information-foreground` | `oklch(0.9585 0.0098 87.5)` | `#F4F1EA` | Cream text on information |
| `--border` | `oklch(0.8758 0.0197 80.1)` | `#DDD5C8` | Warm beige borders and dividers |
| `--input` | `oklch(0.9768 0.0086 84.6)` | `#FAF7F1` | Warm cream input background |
| `--ring` | `oklch(0.2042 0.0079 95.4)` | `#181713` | Warm near-black focus ring |

### Dark Theme (`.dark`)

| Token | OKLCH Value | Hex (sRGB) | Usage |
|-------|-------------|-------------|-------|
| `--background` | `oklch(0.1776 0.0062 91.7)` | `#12110E` | Warm charcoal page canvas |
| `--foreground` | `oklch(0.9585 0.0098 87.5)` | `#F4F1EA` | Cream principal text and icons |
| `--surface` | `oklch(0.2083 0.0097 97.8)` | `#191813` | Warm dark surface |
| `--surface-foreground` | `oklch(0.9585 0.0098 87.5)` | `#F4F1EA` | Cream text on surface |
| `--card` | `oklch(0.2397 0.0097 88.8)` | `#211F1A` | Warm dark card |
| `--card-foreground` | `oklch(0.9585 0.0098 87.5)` | `#F4F1EA` | Cream text on card |
| `--popover` | `oklch(0.2694 0.0133 87.6)` | `#29261F` | Warmer dark popover |
| `--popover-foreground` | `oklch(0.9585 0.0098 87.5)` | `#F4F1EA` | Cream text on popover |
| `--primary` | `oklch(0.9585 0.0098 87.5)` | `#F4F1EA` | Cream primary interactive |
| `--primary-foreground` | `oklch(0.2042 0.0079 95.4)` | `#181713` | Warm near-black text on primary |
| `--secondary` | `oklch(0.3265 0.0148 84.6)` | `#38342C` | Warm dark secondary |
| `--secondary-foreground` | `oklch(0.8655 0.0164 82.8)` | `#D8D2C7` | Warm light text on secondary |
| `--muted` | `oklch(0.2979 0.0130 87.6)` | `#302D26` | Warm dark muted |
| `--muted-foreground` | `oklch(0.7182 0.0176 79.3)` | `#AAA398` | Warm mid-light muted text |
| `--accent` | `oklch(0.82 0.25 120)` | (darker lime) | Brand lime (dark mode) |
| `--accent-foreground` | `oklch(0.9585 0.0098 87.5)` | `#F4F1EA` | Cream text on dark lime |
| `--destructive` | `oklch(0.577 0.245 27.33)` | (red, same) | Destructive (unchanged) |
| `--destructive-foreground` | `oklch(0.9585 0.0098 87.5)` | `#F4F1EA` | Cream text on destructive |
| `--success` | `oklch(0.62 0.2 150)` | (darker green) | Success state |
| `--success-foreground` | `oklch(0.9585 0.0098 87.5)` | `#F4F1EA` | Cream text on success |
| `--warning` | `oklch(0.75 0.2 85)` | (darker amber) | Warning state |
| `--warning-foreground` | `oklch(0.2 0.01 120)` | (dark green-black) | Text on warning |
| `--information` | `oklch(0.6 0.15 240)` | (darker blue) | Information state |
| `--information-foreground` | `oklch(0.9585 0.0098 87.5)` | `#F4F1EA` | Cream text on information |
| `--border` | `oklch(0.3809 0.0178 84.6)` | `#474238` | Warm dark border |
| `--input` | `oklch(0.2269 0.0099 88.8)` | `#1E1C17` | Warm dark input |
| `--ring` | `oklch(0.9585 0.0098 87.5)` | `#F4F1EA` | Cream focus ring |

### Sidebar Tokens

| Token | Light (OKLCH) | Light (Hex) | Dark (OKLCH) | Dark (Hex) |
|-------|---------------|-------------|--------------|------------|
| `--sidebar` | `oklch(0.9705 0.0098 87.5)` | `#F8F5EE` | `oklch(0.2083 0.0097 97.8)` | `#191813` |
| `--sidebar-foreground` | `oklch(0.2042 0.0079 95.4)` | `#181713` | `oklch(0.9585 0.0098 87.5)` | `#F4F1EA` |
| `--sidebar-primary` | `oklch(0.2042 0.0079 95.4)` | `#181713` | `oklch(0.9585 0.0098 87.5)` | `#F4F1EA` |
| `--sidebar-primary-foreground` | `oklch(0.9585 0.0098 87.5)` | `#F4F1EA` | `oklch(0.2042 0.0079 95.4)` | `#181713` |
| `--sidebar-accent` | `oklch(0.92 0.3 120)` | `#D7FF3F` | `oklch(0.82 0.25 120)` | (darker lime) |
| `--sidebar-accent-foreground` | `oklch(0.2 0.01 120)` | (dark green-black) | `oklch(0.9585 0.0098 87.5)` | `#F4F1EA` |
| `--sidebar-border` | `oklch(0.8758 0.0197 80.1)` | `#DDD5C8` | `oklch(0.3809 0.0178 84.6)` | `#474238` |
| `--sidebar-ring` | `oklch(0.2042 0.0079 95.4)` | `#181713` | `oklch(0.9585 0.0098 87.5)` | `#F4F1EA` |

### Additional Tokens

| Token | Light (OKLCH) | Light (Hex) | Dark (OKLCH) | Dark (Hex) |
|-------|---------------|-------------|--------------|------------|
| `--utility-white` | `oklch(1 0 0)` | `#FFFFFF` | `oklch(1 0 0)` | `#FFFFFF` |
| `--utility-black` | `oklch(0 0 0)` | `#000000` | `oklch(0 0 0)` | `#000000` |
| `--subtle-foreground` | `oklch(0.5911 0.0161 84.6)` | `#827D73` | `oklch(0.6229 0.0182 79.3)` | `#8D867B` |
| `--selection` | `oklch(0.8758 0.0197 80.1 / 0.3)` | — | `oklch(0.3809 0.0178 84.6 / 0.3)` | — |
| `--overlay` | `oklch(0.1776 0.0062 91.7 / 0.4)` | — | `oklch(0.1776 0.0062 91.7 / 0.6)` | — |
| `--disabled` | `oklch(0.9352 0.0144 84.6)` | `#EEE9DF` | `oklch(0.2979 0.0130 87.6)` | `#302D26` |
| `--disabled-foreground` | `oklch(0.5911 0.0161 84.6)` | `#827D73` | `oklch(0.6229 0.0182 79.3)` | `#8D867B` |
| `--skeleton` | `oklch(0.9352 0.0144 84.6 / 0.5)` | — | `oklch(0.2979 0.0130 87.6 / 0.5)` | — |
| `--table-header` | `oklch(0.9705 0.0098 87.5)` | `#F8F5EE` | `oklch(0.2083 0.0097 97.8)` | `#191813` |

---

## Foreground Pairing

| Background Token | Compatible Foreground Token(s) |
|-----------------|-------------------------------|
| `--background` | `--foreground`, `--muted-foreground`, `--primary` |
| `--surface` | `--surface-foreground`, `--muted-foreground` |
| `--card` | `--card-foreground`, `--muted-foreground` |
| `--popover` | `--popover-foreground`, `--muted-foreground` |
| `--primary` | `--primary-foreground` |
| `--secondary` | `--secondary-foreground`, `--muted-foreground` |
| `--muted` | `--muted-foreground`, `--foreground` |
| `--accent` | `--accent-foreground` |
| `--destructive` | `--destructive-foreground` |
| `--success` | `--success-foreground` |
| `--warning` | `--warning-foreground` |
| `--information` | `--information-foreground` |
| `--sidebar` | `--sidebar-foreground`, `--muted-foreground` |
| `--sidebar-primary` | `--sidebar-primary-foreground` |
| `--sidebar-accent` | `--sidebar-accent-foreground` |

Do not place a foreground token on a background it was not designed for. For example, `--foreground` on `--primary` would produce invisible text. Use the paired `--primary-foreground` instead.

---

## Status Colors

Status colors communicate system and data state. Use them consistently.

### Success (`--success` / `--success-foreground`)

**When to use:**
- Completed operations (payment posted, invoice sent, report generated)
- Positive confirmation messages
- Approval status badges
- Metrics showing upward trends

**When NOT to use:**
- Informational messages (use `--information`)
- Loading states (use spinners or skeletons)

### Warning (`--warning` / `--warning-foreground`)

**When to use:**
- Approaching limits (storage 90% full, trial expiring soon)
- Non-blocking issues requiring attention
- Draft or pending status that is not yet approved
- Data that needs review before acceptance

**When NOT to use:**
- Errors (use `--destructive`)
- Confirmation messages (use `--success`)

### Destructive (`--destructive` / `--destructive-foreground`)

**When to use:**
- Errors and failures
- Irreversible actions (delete, cancel, void)
- Critical system problems
- Validation failures on form submission

**When NOT to use:**
- Warnings about non-critical issues (use `--warning`)
- Disabled states (use `--opacity-disabled`)

### Information (`--information` / `--information-foreground`)

**When to use:**
- Helpful guidance and tips
- Feature announcements
- Neutral status updates
- Processing or in-progress states

**When NOT to use:**
- Success confirmations (use `--success`)
- Error messages (use `--destructive`)

---

## Chart Colors

Five chart colors are provided for data visualization. They are designed to be perceptually distinct and accessible.

| Token | Light Value | Dark Value | Usage |
|-------|------------|------------|-------|
| `--chart-1` | `oklch(0.646 0.222 41.12)` | `oklch(0.769 0.188 70.08)` | Primary data series, most prominent |
| `--chart-2` | `oklch(0.6 0.12 175)` | `oklch(0.627 0.265 38.21)` | Secondary data series |
| `--chart-3` | `oklch(0.398 0.07 227)` | `oklch(0.6 0.12 175)` | Tertiary data series |
| `--chart-4` | `oklch(0.828 0.189 84.43)` | `oklch(0.398 0.07 227)` | Fourth data series |
| `--chart-5` | `oklch(0.769 0.188 70.08)` | `oklch(0.828 0.189 84.43)` | Fifth data series |

**Usage guidance:**
- Use chart-1 through chart-5 in order — chart-1 is always the first/primary data line.
- For categorical charts (pie, bar), assign colors in sequence starting from chart-1.
- For line charts, use chart-1 for the main metric and chart-2/chart-3 for comparison.
- These colors are for charting libraries only — do not use them for UI elements.
- Chart colors adapt to dark mode automatically via the `.dark` class.

---

## Brand Colors vs. UI Colors

**Brand colors** are reserved for BRKTA brand artwork and limited accent use.

**UI colors** are semantic tokens for application interfaces.

| Category | Colors | Where Used |
|----------|--------|------------|
| Brand | Lime accent (`#D7FF3F` / `oklch(0.92 0.3 120)`), warm near-black foreground (`#181713`), connecting cream (`#F4F1EA`) | Brand artwork and limited emphasis |
| UI | All `--background`, `--foreground`, `--surface`, `--primary`, `--secondary`, etc. | Application surfaces, data tables, forms, and navigation |

**Rules:**
- The lime accent (`--accent`) is used **sparingly** in the product UI — it is for brand emphasis, calls-to-action, and marketing elements, not for everyday surfaces.
- Everyday UI emphasis should use `--secondary` or `--muted` for neutral alternatives.
- Avoid using a brand color as a background for large application surfaces.
- The brand lime on dark backgrounds is the closest the product gets to a vibrant accent — but it must always remain readable (WCAG AA) against its foreground.

---

## Contrast Expectations

Treat WCAG AA contrast ratios as targets and validate the actual token pairs used by each component and theme:

| Text Type | Minimum Ratio | Standard |
|-----------|--------------|----------|
| Normal text (< 18px / < 14pt bold) | 4.5:1 | WCAG 2.2 AA |
| Large text (>= 18px / >= 14pt bold) | 3:1 | WCAG 2.2 AA |
| UI components and graphical objects | 3:1 | WCAG 2.2 AA |

**Key assurances:**
- Every `--{role}` + `--{role}-foreground` pair meets the 4.5:1 minimum.
- `--muted-foreground` on `--background` meets 4.5:1 (lightest accessible muted tone).
- `--border` meets 3:1 against `--background` for graphical-object contrast.
- Dark theme maintains equivalent or better contrast ratios than light theme.
- Chart colors meet 3:1 against `--background` for graphical contrast.

---

## Raw-Color Restrictions

**Hex, RGB, HSL, and raw OKLCH values are forbidden in application components.**

All color references in application code must use CSS custom properties (`var(--token)`). This rule is enforced for the following reasons:

- Theming fails if raw colors bypass the `:root` / `.dark` swap mechanism.
- `color-mix()` operations require the token variable, not a raw value.
- Search-and-replace for a color change becomes impossible if raw values are scattered.
- Tailwind class names like `bg-red-500` or `text-blue-600` are prohibited in design-system components. (App-level exceptions must be documented and approved.)

```css
/* ✅ Correct — uses semantic token */
background-color: var(--primary);
color: var(--primary-foreground);

/* ❌ Forbidden — raw hex */
background-color: #1a1a1a;
color: #ffffff;

/* ❌ Forbidden — raw OKLCH */
background-color: oklch(0.2042 0.0079 95.4);
color: oklch(0.9585 0.0098 87.5);

/* ❌ Forbidden — Tailwind arbitrary colors */
background-color: bg-[#1a1a1a];
```

**The only exceptions** are:
- The `theme.css` file itself, which defines the token values.
- Third-party library overrides that cannot use custom properties.
- Inline SVG `fill` and `stroke` attributes in brand assets (must be tokenized where possible).
