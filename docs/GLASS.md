# Glass Effects

> Frosted-glass visual effects using `backdrop-filter` blur and `color-mix()` for automatic theme adaptation. Glass in BRKTA ONE is used deliberately — it communicates depth and surface separation without overwhelming content.

All glass recipes use **semantic tokens** (`--surface`, `--border`, `--accent`, `--popover`) and therefore adapt automatically to both light and dark themes. No hardcoded colors are used.

---

## Table of Contents

- [Glass Classes](#glass-classes)
- [Approved Values](#approved-values)
- [Where Glass is Allowed](#where-glass-is-allowed)
- [Where Glass is Forbidden](#where-glass-is-forbidden)
- [Contrast Requirements](#contrast-requirements)
- [Background Requirements](#background-requirements)
- [Performance Considerations](#performance-considerations)
- [Reduced Transparency Fallback](#reduced-transparency-fallback)

---

## Glass Classes

Five glass classes are defined in `@brkta/design-tokens/glass.css`. Each is a utility class that applies `backdrop-filter`, `background-color` via `color-mix`, and an optional border.

### glass-card

For cards, metric tiles, and content panels on the dashboard.

```css
.glass-card {
  background-color: color-mix(in oklch, var(--surface) 60%, transparent);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid color-mix(in oklch, var(--border) 40%, transparent);
}
```

| Property | Value |
|----------|-------|
| **Background mix** | 60% surface, 40% transparent |
| **Blur** | 16px |
| **Border** | 40% border color, 60% transparent |
| **Use cases** | Dashboard cards, metric tiles, content panels |

In light mode, `--surface` resolves to the warm cream-white (`oklch(0.9705 0.0098 87.5)`). In dark mode, it resolves to the warm dark surface (`oklch(0.2083 0.0097 97.8)`). The glass effect adapts seamlessly.

### glass-elevated

For modals, dialogs, and floating overlays.

```css
.glass-elevated {
  background-color: color-mix(in oklch, var(--surface) 70%, transparent);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid color-mix(in oklch, var(--border) 50%, transparent);
}
```

| Property | Value |
|----------|-------|
| **Background mix** | 70% surface, 30% transparent |
| **Blur** | 24px |
| **Border** | 50% border color, 50% transparent |
| **Use cases** | Modals, dialogs, sheets, floating panels |

### glass-surface

For tables, scroll areas, and secondary panels.

```css
.glass-surface {
  background-color: color-mix(in oklch, var(--surface) 40%, transparent);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid color-mix(in oklch, var(--border) 20%, transparent);
}
```

| Property | Value |
|----------|-------|
| **Background mix** | 40% surface, 60% transparent |
| **Blur** | 8px |
| **Border** | 20% border color, 80% transparent |
| **Use cases** | Table headers, scroll areas, section dividers |

### glass-nav-pill

For navigation pills and tab indicators in the top navigation bar.

```css
.glass-nav-pill {
  background-color: color-mix(in oklch, var(--accent) 15%, transparent);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid color-mix(in oklch, var(--accent) 20%, transparent);
  color: var(--foreground);
}
```

| Property | Value |
|----------|-------|
| **Background mix** | 15% accent, 85% transparent |
| **Blur** | 12px |
| **Border** | 20% accent, 80% transparent |
| **Use cases** | Top navigation pills, active tab indicators |

In light mode, `--accent` is the brand lime (`oklch(0.92 0.3 120)`). In dark mode, it is the darker lime (`oklch(0.82 0.25 120)`). The lime tint is subtle at 15% opacity.

### glass-nav-menu

For dropdown menus and navigation flyouts.

```css
.glass-nav-menu {
  background-color: color-mix(in oklch, var(--popover) 75%, transparent);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border);
}
```

| Property | Value |
|----------|-------|
| **Background mix** | 75% popover, 25% transparent |
| **Blur** | 20px |
| **Border** | Full border color |
| **Use cases** | Dropdown menus, navigation flyouts |

### glass-nav-item, glass-nav-item-active

For navigation items in sidebars and menus. `glass-nav-item` is the default state; `glass-nav-item-active` is the selected state.

```css
.glass-nav-item {
  background-color: transparent;
  color: var(--muted-foreground);
  transition: background-color var(--duration-fast) var(--ease-out),
              color var(--duration-fast) var(--ease-out);
}

.glass-nav-item:hover,
.glass-nav-item:focus-visible {
  background-color: color-mix(in oklch, var(--accent) 12%, transparent);
  color: var(--foreground);
}

.glass-nav-item-active {
  background-color: color-mix(in oklch, var(--accent) 18%, transparent);
  color: var(--accent-foreground);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
```

| Property | `glass-nav-item` | `glass-nav-item-active` |
|----------|-----------------|------------------------|
| **Background** | Transparent | 18% accent |
| **Text color** | `--muted-foreground` | `--accent-foreground` |
| **Hover background** | 12% accent | — |
| **Blur** | None | 8px |

### glass-nav-subitem, glass-nav-subitem-active

For second-level (nested) navigation items. Same pattern as nav-item with subtler accent tint.

```css
.glass-nav-subitem {
  background-color: transparent;
  color: var(--muted-foreground);
  padding-left: 1rem;
}

.glass-nav-subitem-active {
  background-color: color-mix(in oklch, var(--accent) 14%, transparent);
  color: var(--accent-foreground);
  border-left: 2px solid var(--accent);
}
```

| Property | `glass-nav-subitem` | `glass-nav-subitem-active` |
|----------|--------------------|---------------------------|
| **Background** | Transparent | 14% accent |
| **Text color** | `--muted-foreground` | `--accent-foreground` |
| **Indicator** | None | 2px left accent border |

---

## Approved Values

### Approved Blur Levels

| Blur | Class Use |
|------|-----------|
| 8px | `glass-surface`, `glass-nav-item-active` — subtle separation |
| 12px | `glass-nav-pill` — navigation frosted effect |
| 16px | `glass-card` — standard card frosted effect |
| 20px | `glass-nav-menu` — menu depth |
| 24px | `glass-elevated` — maximum depth |

Do not use blur values outside this set. 4px is too subtle to matter; values above 24px cause noticeable performance degradation and make content harder to read.

### Approved Background Opacity Levels

| Opacity | Class Use |
|---------|-----------|
| 40% | `glass-surface` — minimal background for table surfaces |
| 60% | `glass-card` — standard card frosted effect |
| 70% | `glass-elevated` — stronger background for elevated panels |
| 75% | `glass-nav-menu` — readable menu background |
| 15% | `glass-nav-pill` — subtle accent tint |
| 12% | `glass-nav-item` hover — accent hover tint |
| 10% | `glass-nav-subitem` hover — subtle hover tint |
| 18% | `glass-nav-item-active` — selected nav item |
| 14% | `glass-nav-subitem-active` — selected subitem |

### Summary Table

| Class | Blur | Background Mix | Border Mix |
|-------|------|---------------|------------|
| `glass-card` | 16px | 60% surface | 40% border |
| `glass-elevated` | 24px | 70% surface | 50% border |
| `glass-surface` | 8px | 40% surface | 20% border |
| `glass-nav-pill` | 12px | 15% accent | 20% accent |
| `glass-nav-menu` | 20px | 75% popover | 100% border |
| `glass-nav-item` | — | transparent | — |
| `glass-nav-item-active` | 8px | 18% accent, backdrop blur | — |
| `glass-nav-subitem` | — | transparent | — |
| `glass-nav-subitem-active` | — | 14% accent, border-left accent | — |

---

## Where Glass is Allowed

Glass effects are permitted exclusively in these contexts:

- **Cards** — `glass-card` for dashboard metric panels and content cards.
- **Modals and dialogs** — `glass-elevated` for floating overlays.
- **Navigation** — `glass-nav-pill`, `glass-nav-menu`, `glass-nav-item`, `glass-nav-item-active`, `glass-nav-subitem`, and `glass-nav-subitem-active` for navigation surfaces.
- **Sidebars** — subtle glass on background panels when the sidebar overlays content.
- **Table headers** — `glass-surface` for sticky table headers that need to stay readable while scrolling.
- **Map and media overlay controls** — `glass-elevated` for labelled controls floating over map, image, or video surfaces. The label and icon must meet WCAG AA over the lightest and darkest representative backgrounds of the active surface; use an existing stronger recipe or token-based scrim/border when necessary.
- **Interactive control appearance** — for a design-system control, apply glass through that component's appearance API (for example, Button's `appearance="glass"`). Never add a glass utility class to a component host: the host is only a framework wrapper, while the component's actual surface, focus ring, sizing, and states belong to its governed inner element.

---

## Where Glass is Forbidden

Glass effects must never be used in these contexts:

- **Body backgrounds** — glass on the root page background creates a muddy, inconsistent look and breaks the semantic background-color system.
- **Text containers** — glass behind long-form text reduces readability. Text needs a solid or near-solid background to maintain WCAG contrast.
- **Form inputs** — inputs require clear, high-contrast boundaries. Glass blur interferes with the user's perception of the input's active state. The in-map search field is a worked example and remains opaque.
- **Small or edge-sensitive interactive targets** — do not use glass where the hit area is tiny, tightly packed, or depends on an edge boundary for precise targeting. A labelled button with a visible boundary, such as a map or media overlay control, is permitted when the overlay contrast requirements are met.
- **As a decorative effect** — glass must serve a functional purpose. Never apply glass solely for aesthetic reasons.

---

## Contrast Requirements

Text and interactive elements placed on glass surfaces must meet WCAG AA contrast minimums:

| Context | Minimum Ratio | Notes |
|---------|--------------|-------|
| Normal text on glass | 4.5:1 | Test against the blurred background, not the glass color alone |
| Large text on glass | 3:1 | Same testing requirement |
| Icons on glass | 3:1 | Consider adding a subtle shadow to icon-only elements |

**Testing guidance:** When verifying contrast on glass surfaces, test against the worst-case background that will show through the glass. A glass card over a dark surface in light mode must still pass.

Map and media overlay controls require visual verification over both a near-white/light and a dark representative background from the active surface. Token values alone are not sufficient evidence because the underlying imagery and blur affect the rendered result.

**Mitigation strategy:** If contrast fails on a glass surface, increase the background opacity (move up from 60% to 70%, or use `glass-elevated` instead of `glass-card`). Do not use text shadows as a contrast workaround — they hurt readability.

---

## Background Requirements

Glass requires a solid or near-solid background underneath to work effectively.

- Glass over a cream (`--background`) surface produces a subtle, clean frosted effect.
- Glass over a chaotic background (patterns, images, gradients) reduces readability and should be avoided.
- Glass over dark mode backgrounds uses higher-opacity dark surfaces for contrast.
- Glass effects on transparent-background containers (nested glass) are prohibited — the effect compounds and looks wrong.

**Always ensure there is a solid background layer beneath any glass element.**

---

## Performance Considerations

`backdrop-filter` is GPU-accelerated but still has performance costs:

- **Each blurred layer** creates a separate compositing context on the GPU.
- **Large glass areas** (full-screen overlays) are more expensive than small ones (cards, pills).
- **Scrolling performance** degrades when glass surfaces cover large portions of the viewport during scroll.
- **Nested glass** multiplies the performance cost — never nest glass elements.

### Guidelines

- Limit glass to small surfaces — cards, menus, small panels.
- Do not use glass on long scrollable lists — it causes jank during scroll.
- Prefer `glass-surface` for table headers over full-table glass.
- Test performance on lower-end devices when adding glass to a new surface.
- If you see frame drops during scroll, replace glass with a solid surface color.

---

## Reduced Transparency Fallback

When the user's system has `prefers-reduced-transparency: reduce` enabled, reduce or remove the glass blur effect:

```css
@media (prefers-reduced-transparency: reduce) {
  .glass-card,
  .glass-elevated,
  .glass-surface,
  .glass-nav-pill,
  .glass-nav-menu {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    background-color: var(--surface);
  }

  .glass-nav-item-active,
  .glass-nav-subitem-active {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
}
```

This fallback is implemented in `glass.css` and applied automatically. When `prefers-reduced-transparency` is active, glass surfaces become opaque solid surfaces with no blur. Navigation glass variants (`glass-nav-item-active`, `glass-nav-subitem-active`) also lose their blur effect. Content must remain fully readable and functional.

---

## Adding a New Glass Class

To add a new glass variant:

1. Determine the use case and verify it is in the [allowed list](#where-glass-is-allowed).
2. Choose an approved blur value and opacity from the [approved values](#approved-values) tables.
3. Add the class to `packages/design-tokens/glass.css` using the same `color-mix(in oklch, ...)` pattern.
4. Add the `prefers-reduced-transparency` fallback.
5. Document the new class in this file.
6. Verify contrast against both light and dark backgrounds.
7. Test scrolling performance on a lower-end device.
