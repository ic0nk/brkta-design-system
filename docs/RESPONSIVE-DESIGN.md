# Responsive Design

> A mobile-first responsive system that works across 320px phones to 2560px ultrawide monitors. Layout adapts, meaning persists.

## Mandatory Delivery Gate

Every user-facing change must be checked at 320px, 390px, 768px, 1024px, 1280px, and 1440px or wider. The implementation must preserve content priority, readable text, visible focus, 44x44px touch targets, and zero horizontal overflow. Animated content must remain usable when `prefers-reduced-motion: reduce` is enabled.

Do not solve a narrow viewport by hiding essential content, shrinking text until it is unreadable, or allowing the user to pan sideways. Reflow, stack, collapse, or provide an accessible menu instead.

---

## Table of Contents

- [Breakpoints](#breakpoints)
- [Mobile-First Approach](#mobile-first-approach)
- [Dashboard Specific Patterns](#dashboard-specific-patterns)
- [Website Specific Patterns](#website-specific-patterns)
- [Touch Targets](#touch-targets)
- [Typography](#typography)
- [Navigation Patterns](#navigation-patterns)
- [Data Tables Responsive Patterns](#data-tables-responsive-patterns)

---

## Breakpoints

Breakpoints are defined by Tailwind v4 and used consistently across both the dashboard and website. They are documented here for reference.

| Breakpoint | Min Width | CSS                          | Target Devices              |
| ---------- | --------- | ---------------------------- | --------------------------- |
| `sm`       | 640px     | `@media (min-width: 640px)`  | Large phones, small tablets |
| `md`       | 768px     | `@media (min-width: 768px)`  | Tablets, small laptops      |
| `lg`       | 1024px    | `@media (min-width: 1024px)` | Laptops, landscape tablets  |
| `xl`       | 1280px    | `@media (min-width: 1280px)` | Desktops                    |
| `2xl`      | 1536px    | `@media (min-width: 1536px)` | Large desktops, ultrawide   |

```css
/* Mobile-first — default styles apply to all screens */
.sidebar { ... }

/* Tablet and up */
@media (min-width: 640px) { ... }

/* Desktop and up */
@media (min-width: 1024px) { ... }
```

### Breakpoint usage in Tailwind

```html
<!-- Stack on mobile, row on desktop -->
<div class="flex flex-col md:flex-row gap-4">
  <!-- Sidebar is overlay on mobile, fixed on desktop -->
  <div class="fixed inset-y-0 left-0 lg:static w-72"></div>
</div>
```

---

## Mobile-First Approach

All styles are written **mobile-first**: the base CSS targets the smallest viewport, and `min-width` media queries add styles for larger screens.

```css
/* Mobile base — single column, full width */
.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

/* Tablet — two columns */
@media (min-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-6);
  }
}

/* Desktop — three columns */
@media (min-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
```

### Content Priority

On small screens, show the most important content first. Secondary panels, sidebars, and non-critical data can move below the fold or be hidden behind expand controls.

```
Mobile:     [Primary Content]
            [Secondary Content]
            [Navigation]

Desktop:    [Sidebar] [Primary Content] [Detail Panel]
```

---

## Dashboard Specific Patterns

### Sidebar Behavior

| Breakpoint         | Sidebar State       | Behavior                                                                               |
| ------------------ | ------------------- | -------------------------------------------------------------------------------------- |
| Default (< 1024px) | Collapsed / overlay | Sidebar hidden by default; toggleable via hamburger menu; overlays content as a drawer |
| lg (1024px+)       | Expanded            | Sidebar is fixed, visible, and persistent                                              |

```css
.sidebar {
  position: fixed;
  inset: 0;
  z-index: var(--z-fixed);
  transform: translateX(-100%);
  transition: transform var(--duration-normal) var(--ease-out);
}

.sidebar.open {
  transform: translateX(0);
}

@media (min-width: 1024px) {
  .sidebar {
    position: static;
    transform: none;
    z-index: auto;
  }
}
```

### Layout Stacking

| Breakpoint        | Layout                                                                    |
| ----------------- | ------------------------------------------------------------------------- |
| Default (< 768px) | All sections stacked vertically — full width                              |
| md (768px+)       | Two-column layout for dashboards with sidebar + content                   |
| lg (1024px+)      | Full multi-column layout with sidebar, content, and optional detail panel |

### Dashboard Grid

Dashboard grids (metric cards, chart panels) should use `auto-fill` with a minimum column width:

```css
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(18rem, 100%), 1fr));
  gap: var(--space-4);
}

@media (min-width: 768px) {
  .dashboard-grid {
    gap: var(--space-6);
  }
}
```

---

## Website Specific Patterns

### Content Layout

| Breakpoint        | Layout                                                               |
| ----------------- | -------------------------------------------------------------------- |
| Default (< 768px) | Single column, full-width content, stacked sections                  |
| md (768px+)       | Two-column layout for feature sections, side-by-side text and media  |
| lg (1024px+)      | Wider content area with constrained max-width, multi-column features |

```css
.website-content {
  padding-inline: var(--space-4);
  max-width: 72rem;
  margin-inline: auto;
}

@media (min-width: 768px) {
  .website-content {
    padding-inline: var(--space-8);
  }
}

@media (min-width: 1024px) {
  .website-content {
    padding-inline: var(--space-12);
  }
}
```

### Feature Sections

Website feature sections (marketing pages, product pages) stack vertically on mobile and align side-by-side on desktop:

```css
.feature-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

@media (min-width: 768px) {
  .feature-section {
    flex-direction: row;
    align-items: center;
  }

  .feature-section.reverse {
    flex-direction: row-reverse;
  }
}
```

---

## Touch Targets

All interactive elements must have a minimum touch target of **44px × 44px** (WCAG 2.2 requirement).

| Element                  | Height (CSS Token)      | PX   |
| ------------------------ | ----------------------- | ---- |
| Default interactive (md) | `--height-md` = 2.75rem | 44px |
| Compact (sm)             | `--height-sm` = 2rem    | 32px |
| Comfortable (lg)         | `--height-lg` = 3.5rem  | 56px |

The **md size is the default** for all interactive elements: buttons, inputs, selects, toggles, pagination controls.

### Spacing Between Touch Targets

Interactive elements must have at least `--space-1` (4px) between their bounding boxes to prevent accidental taps on small screens.

```css
.toolbar {
  display: flex;
  gap: var(--space-1); /* minimum gap between touch targets */
}
```

---

## Typography

### Fluid Type Scale

All heading and body font sizes use `clamp()` for fluid typography that scales smoothly between breakpoints without media queries.

| Token              | clamp() Expression                               | Min  | Default | Max  |
| ------------------ | ------------------------------------------------ | ---- | ------- | ---- |
| `--font-size-xs`   | `clamp(0.75rem, 0.7rem + 0.25vw, 0.8125rem)`     | 12px | —       | 13px |
| `--font-size-sm`   | `clamp(0.8125rem, 0.75rem + 0.3125vw, 0.875rem)` | 13px | —       | 14px |
| `--font-size-base` | `clamp(0.875rem, 0.8125rem + 0.375vw, 1rem)`     | 14px | —       | 16px |
| `--font-size-lg`   | `clamp(1rem, 0.9375rem + 0.5vw, 1.125rem)`       | 16px | —       | 18px |
| `--font-size-xl`   | `clamp(1.125rem, 1rem + 0.75vw, 1.25rem)`        | 18px | —       | 20px |
| `--font-size-2xl`  | `clamp(1.25rem, 1rem + 1.25vw, 1.5rem)`          | 20px | —       | 24px |
| `--font-size-3xl`  | `clamp(1.5rem, 1.125rem + 1.875vw, 1.875rem)`    | 24px | —       | 30px |
| `--font-size-4xl`  | `clamp(1.875rem, 1.3125rem + 2.8125vw, 2.25rem)` | 30px | —       | 36px |

```css
/* Usage — automatically fluid */
h1 {
  font-size: var(--font-size-4xl);
  line-height: var(--line-height-tight);
}

p {
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
}
```

### Viewport-based Padding

Use `clamp()` for page padding to create smooth transitions:

```css
.page {
  padding-inline: clamp(var(--space-4), 2vw + var(--space-4), var(--space-8));
}
```

---

## Navigation Patterns

### Top Navigation

| Breakpoint        | Behavior                                  |
| ----------------- | ----------------------------------------- |
| Default (< 768px) | Hamburger menu, full-screen overlay nav   |
| md (768px+)       | Horizontal nav links, hamburger hidden    |
| lg (1024px+)      | Full horizontal navigation with dropdowns |

```html
<!-- Mobile navigation pattern -->
<nav>
  <!-- Hamburger toggle (mobile only) -->
  <button class="md:hidden" aria-label="Menu">
    <MenuIcon />
  </button>

  <!-- Nav links (hidden on mobile, visible on desktop) -->
  <div class="hidden md:flex md:items-center md:gap-4">
    <a href="/features">Features</a>
    <a href="/pricing">Pricing</a>
    <a href="/docs">Docs</a>
  </div>

  <!-- Mobile menu overlay (shown when toggled) -->
  <div class="mobile-menu" data-open="false">
    <a href="/features">Features</a>
    <a href="/pricing">Pricing</a>
    <a href="/docs">Docs</a>
  </div>
</nav>
```

### Sidebar Navigation (Dashboard)

| Breakpoint         | Behavior                                      |
| ------------------ | --------------------------------------------- |
| Default (< 1024px) | Icons-only collapsed sidebar or hidden drawer |
| lg (1024px+)       | Full expanded sidebar with icons + labels     |

---

## Data Tables Responsive Patterns

### Horizontal Scroll

On screens narrower than the table content, data tables should overflow with horizontal scroll while keeping the header sticky:

```css
.table-container {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

table {
  min-width: 100%;
}

th {
  position: sticky;
  top: 0;
  z-index: 1;
}
```

### Card Layout Fallback

On very small screens (< 640px), complex tables may convert to a card-based layout where each row becomes a labeled card:

```css
/* Mobile: table → cards */
@media (max-width: 639px) {
  table thead {
    display: none; /* Hide header */
  }

  table tr {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-2);
    padding: var(--space-4);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    margin-bottom: var(--space-4);
  }

  table td {
    display: flex;
    flex-direction: column;
  }

  table td::before {
    content: attr(data-label);
    font-size: 0.75rem;
    font-weight: var(--font-weight-medium);
    color: var(--muted-foreground);
  }
}
```

### Priority Columns

For medium-sized tables (640px–1024px), hide lower-priority columns:

```css
/* Hide lower priority columns on medium screens */
@media (max-width: 1023px) {
  .col-priority-3 {
    display: none;
  }
}

@media (max-width: 767px) {
  .col-priority-2 {
    display: none;
  }
}
```

Assign priority to table columns via data attributes:

```html
<th data-priority="1">Name</th>
<!-- Always visible -->
<th data-priority="2">Email</th>
<!-- Hidden below 768px -->
<th data-priority="3">Last Login</th>
<!-- Hidden below 1024px -->
```

---

## Testing Requirements

Every component must pass responsive testing at these viewport widths:

| Width   | Device Type                |
| ------- | -------------------------- |
| 320px   | Small phone                |
| 375px   | Standard phone             |
| 640px   | Large phone / small tablet |
| 768px   | Tablet                     |
| 1024px  | Laptop                     |
| 1440px  | Desktop                    |
| 1920px+ | Large desktop              |

Test in both portrait and landscape where applicable. Verify that:

- All interactive elements are reachable and tappable (minimum 44px).
- No horizontal scroll is introduced at any breakpoint (except data tables).
- Text does not overflow or clip.
- Navigation works at all breakpoints.
- Critical actions are available on mobile.
