# Elevation and Shadows

> A systematic approach to visual depth. The BRKTA Design System combines shadows and z-index to create a layered interface where physical hierarchy supports information hierarchy.

---

## Table of Contents

- [Shadow Scale](#shadow-scale)
- [Z-Index Scale](#z-index-scale)
- [Elevation by Component](#elevation-by-component)
- [Hover Elevation Changes](#hover-elevation-changes)
- [Dark Theme Shadows](#dark-theme-shadows)

---

## Shadow Scale

Six shadow levels provide a consistent elevation vocabulary. All shadows use the **warm near-black** (`oklch(0.2042 0.0079 95.4)` / `#181713`) with varying alpha, producing soft warm undertones instead of cold gray shadows.

| Level | CSS Token | Shadow Value | Use Case |
|-------|-----------|-------------|----------|
| xs | `--shadow-xs` | `0 1px 2px oklch(0.2042 0.0079 95.4 / 0.04)` | Subtle separation, data table rows |
| sm | `--shadow-sm` | `0 1px 3px oklch(0.2042 0.0079 95.4 / 0.06), 0 1px 2px oklch(0.2042 0.0079 95.4 / 0.04)` | Cards, small panels |
| md | `--shadow-md` | `0 4px 6px oklch(0.2042 0.0079 95.4 / 0.05), 0 2px 4px oklch(0.2042 0.0079 95.4 / 0.04)` | Raised cards, dropdowns |
| lg | `--shadow-lg` | `0 10px 15px oklch(0.2042 0.0079 95.4 / 0.06), 0 4px 6px oklch(0.2042 0.0079 95.4 / 0.04)` | Navigation, sidebars |
| xl | `--shadow-xl` | `0 20px 25px oklch(0.2042 0.0079 95.4 / 0.08), 0 8px 10px oklch(0.2042 0.0079 95.4 / 0.04)` | Dialogs, modals |
| 2xl | `--shadow-2xl` | `0 25px 50px oklch(0.2042 0.0079 95.4 / 0.12)` | Highest — focus modals, full-screen overlays |

All shadows use the warm near-black foreground color (`oklch(0.2042 0.0079 95.4)`) as their undertone rather than pure black (`oklch(0 0 0)`). This ensures shadows feel warm and cohesive with the creamy neutral foundation.

```css
/* Usage */
.card {
  box-shadow: var(--shadow-sm);
}

.modal {
  box-shadow: var(--shadow-xl);
}
```

---

## Z-Index Scale

Seven z-index layers define the stacking order. These are additive — a component at `--z-dropdown` sits above page content but below `--z-modal`.

| Level | Z-Index | CSS Token | Components |
|-------|---------|-----------|------------|
| Base content | Auto (0) | — | Page content, cards, tables |
| Dropdown | 100 | `--z-dropdown` | Dropdown menus, select options, date picker popups |
| Sticky | 200 | `--z-sticky` | Sticky headers, table column headers |
| Fixed | 300 | `--z-fixed` | Fixed navigation, sidebar (fixed mode) |
| Modal backdrop | 400 | `--z-modal-backdrop` | Modal/dialog overlay backgrounds |
| Modal | 500 | `--z-modal` | Dialogs, modals, sheets |
| Popover | 600 | `--z-popover` | Popovers, tooltips, context menus |
| Tooltip | 700 | `--z-tooltip` | Tooltips (always on top of popovers) |
| Toast | 800 | `--z-toast` | Toast notifications, alerts |

```css
/* Usage */
.dropdown {
  z-index: var(--z-dropdown);
}

.modal-backdrop {
  z-index: var(--z-modal-backdrop);
}

.modal {
  z-index: var(--z-modal);
}
```

### Numeric Elevation (for z-index stacking within components)

For finer-grained control within a single component category, use the elevation scale:

| Token | Value | Use Case |
|-------|-------|----------|
| `--elevation-1` | 1 | Default raised |
| `--elevation-2` | 10 | Slightly higher within group |
| `--elevation-3` | 100 | Prominent within group |
| `--elevation-4` | 1000 | Top of group |
| `--elevation-5` | 10000 | Always on top |

---

## Elevation by Component

### Sidebar Elevation

| State | Shadow | Z-Index |
|-------|--------|---------|
| Default | `--shadow-none` | Auto |
| Fixed/overlaid | `--shadow-lg` | `--z-fixed` (300) |
| Mobile overlay | `--shadow-xl` | `--z-fixed` (300) |

The sidebar sits below modals and popovers. On mobile, the sidebar becomes an overlay with a higher shadow and backdrop.

### Modal and Dialog Elevation (Highest)

| Element | Shadow | Z-Index |
|---------|--------|---------|
| Backdrop | None | `--z-modal-backdrop` (400) |
| Modal container | `--shadow-xl` | `--z-modal` (500) |
| Nested popover in modal | `--shadow-md` | `--z-popover` (600) |

Modals have the highest elevation of any persistent UI element. They are layered above the sidebar and all page content.

### Dropdown and Popover Elevation

| Element | Shadow | Z-Index |
|---------|--------|---------|
| Dropdown menu | `--shadow-md` | `--z-dropdown` (100) |
| Popover | `--shadow-lg` | `--z-popover` (600) |
| Tooltip | `--shadow-sm` | `--z-tooltip` (700) |

Dropdowns use `--shadow-md` — enough separation from the trigger button without competing with modals. Popovers use `--shadow-lg` because they are larger and float further from the trigger.

### Card Elevation

| State | Shadow |
|-------|--------|
| Default (flat) | `--shadow-none` — relies on `--card` background differentiation |
| Subtle | `--shadow-xs` — used in card grids for visual separation |
| Raised | `--shadow-sm` — default interactive card state |
| Elevated | `--shadow-md` — hover state for clickable cards |

Cards default to flat (`--card` background with `--border` outline). They do not need shadows to be visible — the background color provides separation.

---

## Hover Elevation Changes

Interactive surfaces may raise their elevation on hover to signal clickability.

| Component | Default | Hover |
|-----------|---------|-------|
| Clickable card | `--shadow-none` or `--shadow-xs` | `--shadow-md` |
| Sidebar item | `--shadow-none` | Background color change (not shadow) |
| Button | `--shadow-none` | `--shadow-none` (buttons use color, not shadow) |
| Dropdown trigger | `--shadow-none` | `--shadow-none` |

### Principles

- **Do not over-animate elevation**. Hover shadows should be subtle — a 1-level jump (xs → sm, sm → md) is sufficient.
- **Buttons do not use shadow elevation** for hover state. Buttons use color shifts (`color-mix`) to indicate hover. Shadow on buttons is reserved for sticky actions or floating action buttons.
- **Keyboard focus** uses `--ring` outline, not shadow.
- **Disabled elements** have no hover elevation change.

```css
/* Hover elevation for clickable cards */
.clickable-card {
  box-shadow: var(--shadow-none);
  transition: box-shadow var(--duration-fast) var(--ease-out);
}

.clickable-card:hover {
  box-shadow: var(--shadow-sm);
}

/* Never apply hover shadow to disabled elements */
.clickable-card:disabled,
.clickable-card[data-disabled="true"] {
  box-shadow: var(--shadow-none);
}
```

---

## Dark Theme Shadows

Dark theme shadows use higher alpha values to remain visible against a warm charcoal background. All dark shadows use the same warm near-black undertone (`oklch(0.2042 0.0079 95.4)`).

| Level | Light (alpha) | Dark (alpha) |
|-------|--------------|--------------|
| xs | `0.04` | `0.5` |
| sm | `0.06` + `0.04` | `0.5` + `0.4` |
| md | `0.05` + `0.04` | `0.5` + `0.4` |
| lg | `0.06` + `0.04` | `0.5` + `0.4` |
| xl | `0.08` + `0.04` | `0.6` + `0.4` |
| 2xl | `0.12` | `0.7` |

Each shadow level uses between 1 and 2 shadow layers at different opacities. For example, `sm` light is `0 1px 3px oklch(0.2042 0.0079 95.4 / 0.06), 0 1px 2px oklch(0.2042 0.0079 95.4 / 0.04)`. Dark theme shadows use higher opacities to remain visible against dark backgrounds.

The dark-theme values are automatically applied via the `.dark` class selector in `theme.css`. You do not need to specify dark-theme shadows manually.
