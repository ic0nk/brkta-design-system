# Source Audit: BRKTA-OS V1 (Legacy Project)

> This document records the audit of the original BRKTA-OS project (V1) to inform the design-system decisions for V2. All findings are based on direct inspection of the old repository's source code on disk.

---

## Source Repository

| Field | Value |
|-------|-------|
| **Local path** | `C:\Users\waeli\Documents\Web Files\Node\BRKTA-OS` |
| **GitHub remote** | `https://github.com/ic0nk/BRKTA-OS` |
| **Branch** | `main` |
| **Exact commit** | `af010cd2b37005aca00d251a197ba0d36eee56ab` |
| **Working-tree status** | **HAS uncommitted changes** — `git status --short` shows many `M`, `D`, and `??` entries (modified, deleted, and untracked files). The audit was performed on the working tree as it exists on disk, which may diverge from the committed state. |

---

## Framework & Library Stack

| Technology | Version / Notes |
|------------|----------------|
| **Next.js** | 16.1.6 |
| **React** | 19.2.3 |
| **Tailwind CSS** | 4 (CSS-first config, `@theme inline`, OKLCH colors) |
| **shadcn/ui** | New York style, v4 data-slot pattern |
| **Icons** | `lucide-react` |
| **Component primitives** | Radix UI |
| **Variant system** | `class-variance-authority` (cva) |
| **Utility** | `clsx` + `tailwind-merge` via `cn()` |
| **Theme provider** | `next-themes` |

---

## Files & Areas Inspected

| File / Directory | Lines | Purpose |
|------------------|-------|---------|
| `app/globals.css` | 723 | Global styles: theme variables, glass system, blog styles, scrollbar |
| `app/layout.tsx` | — | Root layout: theme provider, SEO, analytics |
| `components.json` | — | shadcn/ui configuration |
| `components/theme-provider.tsx` | — | Theme provider wrapper |
| `components/ui/button.tsx` | — | cva-based button with data-slot attributes |
| `components/ui/card.tsx` | — | Glass-card integration |
| `components/ui/input.tsx` | — | data-slot input with glass styling |
| `components/ui/badge.tsx` | — | cva-based badge |
| `components/ui/dialog.tsx` | — | Radix dialog with glass-elevated classes |
| `components/ui/` (all 48 files) | — | Full shadcn/ui component inventory |
| `lib/utils.ts` | — | `cn()` helper (`clsx` + `twMerge`) |
| `public/Brkta-small-logo.svg` | — | Complex brand SVG with embedded base64 |
| `package.json` | — | Full dependency manifest |

---

## 1. Existing Visual Language

### Dark-First Theming

The V1 project is **dark-first**: the `:root` block holds dark-theme values, and `[data-theme="light"]` overrides them toward light values. This is opposite to the standard practice of light-first (where `:root` = light, `.dark` = dark).

```css
/* V1 approach: dark-first */
:root {
  /* dark-theme values */
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... */
}

[data-theme="light"] {
  /* light-theme overrides */
  --background: oklch(0.985 0 0);
  --foreground: oklch(0.145 0 0);
  /* ... */
}
```

### Mixed Theme Strategy

Two competing theme mechanisms coexist:

1. **`data-theme` attribute** — used by `next-themes` with an inline `<script>` that reads `localStorage` before React hydration.
2. **`.dark` class** — traditional Tailwind approach, also present in `globals.css` (line 259+).

This dual system creates potential conflicts where one rule cancels another.

### Two Parallel Token Systems

Legacy tokens and modern shadcn/ui tokens coexist in `globals.css`:

| Token System | Location (approx.) | Color Format |
|-------------|-------------------|--------------|
| Legacy `--bg-main`, `--bg-surface`, `--text-*` | Lines 37–120 | Hex |
| shadcn `--background`, `--foreground`, `--card`, `--primary`, etc. | Lines 204–311 | OKLCH |

Both systems are actively referenced throughout the stylesheet, creating ambiguity about which is canonical.

### Glass Effects

Extensive glass-morphism system applied globally via **broad data-slot selectors** in `globals.css`. The system uses `color-mix()` for transparency and has 10+ CSS classes, **all using `!important`**.

### Brand SVG

The `Brkta-small-logo.svg` is a complex inline SVG containing embedded base64 image data — likely a branded illustration embedded directly into the vector file.

---

## 2. Existing Semantic Tokens

### Legacy Token Set (Hex)

| Token | Dark Value | Light Value |
|-------|-----------|-------------|
| `--bg-main` | `#0b0b0b` | `#ffffff` |
| `--bg-surface` | `#141414` | `#f5f5f5` |
| `--text-primary` | `#ffffff` | `#0b0b0b` |
| `--text-secondary` | (not documented from inspection) | |
| `--text-muted` | (not documented from inspection) | |

### shadcn/ui Token Set (OKLCH)

| Token | Light Value | Dark Value |
|-------|------------|------------|
| `--background` | `oklch(0.985 0 0)` | `oklch(0.145 0 0)` |
| `--foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` |
| `--card` | `oklch(1 0 0)` | `oklch(0.145 0 0)` |
| `--card-foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` |
| `--popover` | `oklch(1 0 0)` | `oklch(0.145 0 0)` |
| `--popover-foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` |
| `--primary` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` |
| `--primary-foreground` | `oklch(0.985 0 0)` | `oklch(0.145 0 0)` |
| `--secondary` | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` |
| `--secondary-foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` |
| `--muted` | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` |
| `--muted-foreground` | `oklch(0.556 0 0)` | `oklch(0.708 0 0)` |
| `--accent` | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` |
| `--accent-foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` |
| `--destructive` | `oklch(0.577 0.245 27.325)` | `oklch(0.577 0.245 27.325)` |
| `--destructive-foreground` | `oklch(0.577 0.245 27.325)` | `oklch(0.985 0 0)` |
| `--border` | `oklch(0.922 0 0)` | `oklch(0.269 0 0)` |
| `--input` | `oklch(0.922 0 0)` | `oklch(0.269 0 0)` |
| `--ring` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` |
| `--radius` | `0.625rem` | `0.625rem` |
| `--chart-1` | `oklch(0.646 0.222 41.116)` | `oklch(0.646 0.222 41.116)` |
| `--chart-2` | `oklch(0.6 0.118 184.704)` | `oklch(0.6 0.118 184.704)` |
| `--chart-3` | `oklch(0.398 0.07 227.392)` | `oklch(0.398 0.07 227.392)` |
| `--chart-4` | `oklch(0.828 0.189 84.429)` | `oklch(0.828 0.189 84.429)` |
| `--chart-5` | `oklch(0.769 0.188 70.08)` | `oklch(0.769 0.188 70.08)` |
| `--sidebar-width` | `288px` | `288px` |
| `--sidebar-width-icon` | `64px` | `64px` |

### Spacing Tokens

| Token | Value |
|-------|-------|
| `--space-0` through `--space-16` | Defined in legacy block |

### Typography / Sizing Declarations

| Token | Declared Value | Notes |
|-------|---------------|-------|
| `--button-height` | `2.75rem` (44px) | Declared but default button uses `h-9` (36px) |
| `--input-height` | `2.75rem` (44px) | Declared but default input uses `h-9` (36px) |

---

## 3. Component Inventory

**48 UI components** found under `components/ui/`:

| Component | Notes |
|-----------|-------|
| `action-form` | |
| `alert-dialog` | Radix-based |
| `alert` | |
| `avatar` | |
| `back-button` | |
| `badge` | cva-based |
| `brightness-down-icon` | Custom icon wrapper |
| `button` | cva-based, data-slot |
| `calendar` | |
| `card` | Glass-card integration |
| `chart` | |
| `checkbox` | |
| `collapsible` | |
| `currency-badge` | Domain-specific |
| `currency-select` | Domain-specific |
| `date-picker` | |
| `date-time-picker` | |
| `dialog` | Radix + glass-elevated |
| `dropdown-menu` | |
| `form` | |
| `input` | data-slot, glass |
| `label` | |
| `module-access-denied` | Domain-specific |
| `moon-icon` | Custom icon wrapper |
| `page-container` | Layout |
| `page-loader` | Loading state |
| `popover` | |
| `progress` | |
| `safe-blog-image` | Blog-specific |
| `scroll-area` | |
| `searchable-select` | |
| `select` | |
| `separator` | |
| `sheet` | |
| `skeleton` | |
| `sonner` | Toast |
| `switch` | |
| `table` | |
| `tabs` | |
| `textarea` | |
| `theme-toggle` | Theme switch |
| `tooltip` | |
| `upgrade-prompt` | Domain-specific |
| `upgrade-wall` | Domain-specific |
| `access-denied` | (in top-level components) |

**Count**: ~48 files including domain-specific components and icon wrappers.

---

## 4. Repeated Patterns

- **cva** (`class-variance-authority`) used for `button`, `badge`, and variant-driven components.
- **`data-slot="..."` attributes** on all shadcn/ui v4 components — consistent attribute selector pattern.
- **`glass-*` classes** applied globally via data-slot selectors in `globals.css`.
- **`cn()` utility** (`clsx` + `tailwind-merge`) used throughout for class merging.
- **`gap-2`** as the consistent spacing between icon and text in interactive elements.
- **`[&_svg]:pointer-events-none`** on interactive elements to prevent SVG click-jacking.
- **Consistent import structure**: named exports from `@/components/ui/*`.
- **Self-contained components**: each component owns its own Radix UI import and wiring.

---

## 5. Accessibility Findings

| Area | Status | Notes |
|------|--------|-------|
| **Focus rings** | Present on `button`, `input`, `badge` | Uses `focus-visible:ring-*` |
| **Screen-reader text** | `sr-only` used in `dialog` close button text | |
| **ARIA attributes** | `aria-invalid` on `input` | |
| **Disabled states** | `opacity-50` + `pointer-events-none` | Consistent pattern |
| **Icon buttons** | Some accessible labeling, not consistently enforced | Mixed pattern |
| **Glass focus visibility** | **Missing** — no visible focus when `!important` overrides take effect | Critical gap |
| **Color contrast** | Not measured — OKLCH values appear sufficient but no formal check | Needs verification |
| **Keyboard navigation** | Relies on Radix UI defaults | Acceptable baseline |

---

## 6. Responsive-Design Findings

| Area | Observation |
|------|-------------|
| **Breakpoint strategy** | Mixed — some Tailwind responsive prefixes (`md:`, `lg:`), some custom `@media` queries |
| **Documented system** | None — no consistent breakpoint strategy documented anywhere |
| **Sidebar behavior** | Collapse/expand pattern exists (sidebar + icon state) |
| **shadcn defaults** | Standard responsive patterns inherited from shadcn/ui |
| **Container widths** | Inconsistent — no single layout container pattern |

---

## 7. Theme Findings

| Aspect | Detail |
|--------|--------|
| **Provider** | `next-themes` |
| **Hydration guard** | Inline `<script>` before React hydration reads `localStorage` for theme |
| **Primary mechanism** | `data-theme` attribute on `<html>` |
| **Secondary mechanism** | `.dark` class (line 259+ in globals.css) |
| **Dark values in** | `:root` (meaning dark is the default) |
| **Light values in** | `[data-theme="light"]` |
| **Conflict** | `.dark` class overrides at line 259 — if both `data-theme="light"` and `.dark` class are somehow present, rules conflict |
| **Stored preference** | `localStorage` key written by `next-themes` |
| **Theme toggle** | Dedicated `theme-toggle` component exists |

### How the Dual System Causes Problems

```css
/* This sets dark background */
:root {
  --background: oklch(0.145 0 0);
}

/* This tries to set light background */
[data-theme="light"] {
  --background: oklch(0.985 0 0);
}

/* This ALSO tries to override — if .dark gets applied alongside data-theme="light", chaos */
.dark {
  --background: oklch(0.145 0 0);
}
```

---

## 8. Inconsistencies

### 8.1 Declared vs. Actual Heights

| Token | Declared | Actually Used | Difference |
|-------|----------|---------------|------------|
| `--button-height` | `2.75rem` (44px) | `h-9` (36px) | **8px** gap |
| `--input-height` | `2.75rem` (44px) | `h-9` (36px) | **8px** gap |

The design tokens declare a standard 44px interactive height, but the components use Tailwind's `h-9` (36px) as their default.

### 8.2 Dual Theme System

Both `data-theme` and `.dark` class mechanisms exist, creating potential conflicts.

### 8.3 Dual Token Systems

Legacy hex tokens (`--bg-main`, `--bg-surface`, `--text-*`) coexist with canonical shadcn OKLCH tokens. Both are used.

### 8.4 Glass Opacity Inconsistency

| Glass Class | Opacity | Notes |
|-------------|---------|-------|
| `glass-card` | 75% background opacity | No documented reason for difference |
| `glass-elevated` | 65% background opacity | No documented reason for difference |

### 8.5 `!important` Proliferation

Over **30 `!important` declarations** in the glass system alone. This makes component-level overrides extremely difficult and creates specificity wars.

### 8.6 Migration State

Some components use the shadcn v4 `data-slot` pattern while others appear to be pre-v4 patterns. The codebase is in a partial migration state.

### 8.7 V2 Lime Accent vs. Old Accent

| Context | `--accent` Value | Purpose |
|---------|------------------|---------|
| Old V1 project | `oklch(0.97 0 0)` — neutral | Generic UI accent |
| V2 website (Next.js) | `#d7ff3f` — vibrant lime | Marketing / brand accent |
| **Conflict** | The old project does NOT use lime; V2's marketing site does | |

---

## 9. Technical Debt

| Debt Item | Severity | Details |
|-----------|----------|---------|
| **Broad `!important` usage** | High | >30 `!important` declarations make overrides fragile and specificity-dependent. Every new component must out-specificity the global glass rules. |
| **Two parallel token systems** | High | Legacy hex tokens + shadcn OKLCH tokens = ambiguity about which token to use for what purpose. Maintenance burden: updating both. |
| **Two theme mechanisms** | High | `data-theme` + `.dark` class. Risk of conflicting states. Increases complexity of theme debugging. |
| **Monolithic globals.css** | Medium | 723 lines mixing theme variables, glass system, blog styles, scrollbar, and component-specific selectors. No separation of concerns. |
| **Global data-slot selectors** | Medium | Glass effects applied via global selectors like `[data-slot="card"]` mean component styling lives in the global stylesheet, not co-located with the component. |
| **Complex brand SVG** | Low | Embedded base64 image data inside an SVG makes the logo file large and harder to maintain. |
| **Business logic in components** | Medium | Components like `upgrade-prompt`, `upgrade-wall`, `module-access-denied` contain business rules that should live in services or feature modules. |
| **Partial shadcn v4 migration** | Medium | Some components migrated to `data-slot` pattern, others not. Inconsistent code style across the component library. |

---

## 10. Missing UI Specifications

These specifications were **not found** in the V1 codebase and need to be defined for V2:

- [x] **Typography scale**: ✅ Resolved — `--font-size-xs` through `--font-size-4xl` fluid clamp scale and `--line-height-*` tokens defined in `packages/design-tokens/theme.css`.
- [x] **Font family declaration**: ✅ Resolved — `--font-sans` (Geist Sans / Geist Variable), `--font-mono` (Geist Mono / Geist Mono Variable), `--font-arabic` (Noto Sans Arabic / Noto Sans Arabic Variable), and `--font-pixel` (planned/restricted) all defined in `theme.css` with internal `--font-family-*` tokens. Shared `packages/design-tokens/fonts.css` is the self-hosted font-face entry point imported first by both Angular and Next.js.
- [ ] **Spacing scale**: Tailwind defaults used without custom semantic spacing tokens beyond the legacy `--space-*` block.
- [ ] **Breakpoint strategy**: No documented breakpoint system. Mix of Tailwind defaults and custom media queries.
- [ ] **Elevation / shadow system**: No shadow token scale (`--shadow-sm`, `--shadow-md`, etc.) beyond Tailwind defaults.
- [ ] **Animation / transition tokens**: No `--transition-*` or `--ease-*` tokens. Durations and easings are ad-hoc.
- [ ] **Z-index scale**: No `--z-*` token system for layering management.
- [x] **Border radius scale**: `--radius: 0.625rem` (10px) with full `--radius-sm` (6px), `--radius-md` (8px), `--radius-lg` (10px), `--radius-xl` (14px), `--radius-2xl` (18px), `--radius-full` (9999px) token scale. See RADIUS.md for "Little Curve" usage rules.
- [ ] **Color roles beyond tokens**: No documentation of *when* to use `--primary` vs `--accent` vs `--muted`. Token usage guidance is absent.
- [ ] **Icon sizing convention**: No `--icon-*` token scale. Icon sizes are ad-hoc (`h-4`, `h-5`, etc.).
- [ ] **Data visualization palette**: `--chart-1` through `--chart-5` exist but no guidance on categorical vs. sequential usage.

---

## 11. Missing UX Specifications

These UX specifications were **not found** and should be created for V2:

- [ ] **Interaction states**: No documented hover, active, focus, disabled, loading, error, empty, and success state guidance.
- [ ] **Form validation patterns**: No standardized pattern for inline validation, error messages, or success feedback.
- [ ] **Empty states**: No consistent empty-state pattern for tables, lists, dashboards, or search results.
- [ ] **Loading skeletons**: Skeleton component exists but no documented pattern for *when* to use skeleton vs. spinner vs. shimmer.
- [ ] **Confirmation dialogs**: No documented standard for destructive-confirmation patterns.
- [ ] **Toast / notification hierarchy**: Sonner is used but no severity levels or placement standards are documented.
- [ ] **Responsive behavior per component**: No documented breakpoint behavior for individual components.
- [ ] **Keyboard navigation patterns**: No documented Tab order, shortcut keys, or focus-trapping patterns beyond Radix defaults.
- [ ] **Page layout system**: No documented page structure (header, content area, actions, detail panel) or responsive layout grid.
- [ ] **Motion / animation principles**: No documentation of when to animate, duration guidelines, or easing curves.
- [ ] **Error boundaries**: No documented error UI pattern for page-level or component-level errors.
- [ ] **Permission-based UI**: Components like `module-access-denied` and `upgrade-wall` exist but no systematic pattern for permission-gated UI.

---

## 12. Adopt / Adapt / Reject Decision Table

| # | Finding | Decision | Rationale |
|---|---------|----------|-----------|
| 1 | **shadcn/ui semantic tokens** | **ADOPT** | Canonical, well-understood, tooling-friendly. Make them **light-first** (`:root` = light, `.dark` = dark) instead of the V1 dark-first approach. |
| 2 | **Legacy `--bg-main`, `--bg-surface`, etc.** | **REJECT** | These duplicate the canonical shadcn tokens. Use `--background`, `--card`, `--foreground` etc. exclusively. |
| 3 | **44px button/input height** | **ADAPT** | Set `default-size = md` at 44px for all interactive elements. The V1 declared the right value but the components used the wrong utility class (h-9). V2 makes `md` (44px) the component default. |
| 4 | **Glass effects** | **ADAPT** | Keep the glass class system (`glass`, `glass-elevated`, `glass-card`) with `color-mix()`. Remove all `!important` usage. Apply glass through proper CSS specificity (component-owned styles, not global bleeders). |
| 5 | **`data-theme` + `.dark` dual system** | **REJECT** | Use only `.dark` class for theme switching. Single responsibility, no conflict surface. Aligns with Tailwind 4's native dark mode. |
| 6 | **cva variant approach** | **ADAPT** | Keep the concept of a variant-driven component API. Move shared variant contracts into `ui-core` so both Angular and React components share the same variant definitions. |
| 7 | **`data-slot` attributes** | **ADOPT** | Excellent pattern for targeting sub-elements in a component. Works equally well in Angular (via `@Attribute` or `HostBinding`) and React. Continue using them. |
| 8 | **Large globals.css** | **REJECT** | Split into three layers: (1) design tokens (`variables.css`), (2) component CSS (co-located with each component), (3) app styles (layouts, typography, utilities). |
| 9 | **Lucide icons** | **ADOPT** | Lucide is well-maintained, tree-shakeable, and consistent. Continue using `lucide-react` for React and `@lucide/angular` for Angular. |
| 10 | **Radix UI primitives** | **Reference only** | V2 uses **framework-native patterns** (Angular CDK for Angular, Radix for React reference). Radix is not a shared dependency; each framework uses its own primitives following the same behavioral contract. |
| 11 | **`cn()` utility** | **ADAPT** | Keep the concept of a `cn()`-style class merge utility. Implement natively per framework: `cn()` in React (via `clsx` + `twMerge`), a `cn()` equivalent in Angular (via a utility function using `classnames` or custom merge logic). |
| 12 | **V2 lime accent** | **ADOPT** | `#d7ff3f` → `oklch(0.92 0.3 120)` is the canonical BRKTA brand accent. The neutral accent in V1 was wrong; the lime is correct for brand emphasis. Uses sparingly in product UI; secondary/muted provide neutral alternatives for everyday surfaces. |
| 13 | **OKLCH colors** | **ADOPT** | Superior perceptual uniformity, better interpolation for dark/light themes, wider gamut. All V2 tokens use OKLCH. |
| 14 | **`color-mix()` for glass** | **ADOPT** | Cleaner than hardcoded alpha channels. Use `color-mix(in oklch, var(--background) X%, transparent)` for glass opacities. |
| 15 | **`!important` in glass system** | **REJECT** | Zero `!important` in V2 design system. Glass classes use proper specificity via component-scoped styles. |
| 16 | **Two token systems** | **REJECT** | Single canonical token system: shadcn/ui semantic tokens in OKLCH. No legacy hex tokens. One source of truth. |
| 17 | **Data-slot selectors in global stylesheet** | **ADAPT** | Move data-slot selectors into each component's own CSS/SCSS. Each component owns its styling. No global component selectors. |

---

## 13. Final V2 Design Decisions

Based on the audit, the following binding decisions govern the V2 design system:

### Token System

1. **Single canonical token set**: shadcn/ui semantic tokens (OKLCH) — `--background`, `--foreground`, `--card`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`, `--border`, `--input`, `--ring`, `--radius`, `--chart-1` through `--chart-5`, `--sidebar-width`, `--sidebar-width-icon`.
2. **Light-first**: `:root` holds light values; `.dark` holds dark values.
3. **No legacy tokens**: `--bg-main`, `--bg-surface`, `--text-primary`, `--text-secondary`, `--text-muted` are removed.
4. **Add missing tokens**: ~~`--font-sans`, `--font-mono`~~ ✅ *(resolved — see TYPOGRAPHY.md and packages/design-tokens/fonts.css / theme.css)*, ~~`--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-full`~~ ✅ *(resolved in theme.css — see RADIUS.md)*, `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`, `--transition-fast`, `--transition-normal`, `--transition-slow`, `--ease-default`, `--ease-enter`, `--ease-leave`, `--z-dropdown`, `--z-sticky`, `--z-modal`, `--z-toast`, `--icon-xs`, `--icon-sm`, `--icon-md`, `--icon-lg`.
5. **Default interactive height**: `44px` (2.75rem) as `--size-md`. All form controls, buttons, and inputs default to `md`.

### Theme System

6. **`.dark` class only**: No `data-theme` attribute. Single mechanism, zero conflicts.
7. **`next-themes` or equivalent**: Provider sets `.dark` class on `<html>`. Inline hydration guard checks `localStorage` and system preference, applies `.dark` before first paint.

### CSS Architecture

8. **Three-layer stylesheet model**:
   - `tokens.css` — CSS custom properties (theme variables, no component styles)
   - `base.css` — Reset, typography, utilities, scrollbar, font-face
   - Per-component CSS — Co-located with each component, scoped
9. **Zero `!important`** in the design system. Exceptions only for utility overrides in specific app-level contexts (documented and approved).
10. **`color-mix()`** for glass effects and alpha variants. No opaque alpha hex values.

### Component Architecture

11. **`data-slot` attributes**: Continue as the targeting mechanism for component sub-elements. Consistent across both Angular and React.
12. **Variant contracts defined in `ui-core`**: Shared TypeScript interfaces/contracts for component variants (size, intent, emphasis). Both Angular and React implementations consume the same contracts.
13. **Framework-native primitives**: Angular uses Angular CDK; React uses Radix UI. Behavioral parity is enforced by contract, not by framework sharing.
14. **`cn()` per framework**: React uses `clsx` + `tailwind-merge`. Angular gets a `cn()` utility function that provides equivalent class-merge behavior.

### Brand & Accent

15. **Lime accent**: `oklch(0.92 0.3 120)` (`#d7ff3f`) is the canonical `--accent` token value. Used sparingly for brand emphasis, calls to action, and marketing elements. Product UI surfaces default to `--secondary` and `--muted` for everyday accent needs.

### Glass Effects

16. **Glass is opt-in, not global**: No glass applied via broad data-slot selectors in the global stylesheet. Each component that needs glass explicitly includes the glass mixin/class.
17. **Glass classes** (defined in `ui-core`):
    - `glass` — standard glass surface (75% background)
    - `glass-elevated` — lifted glass surface (65% background, larger blur)
    - `glass-card` — card-specific glass (80% background, subtle border)
    - All use `color-mix(in oklch, var(--background) <opacity>, transparent)` with `backdrop-filter: blur()`.

### Migration from V1

18. **No backward compatibility** with V1 tokens. V2 is a clean break. Old hex tokens and data-theme attribute are not supported.
19. **All 48 V1 components** are individually evaluated for V2. Domain-specific components (`currency-badge`, `upgrade-prompt`, etc.) are reimplemented in their owning feature modules, not in the shared design system.

### Quality Gates

20. Every design system token and component must be documented with:
    - Purpose (what it's for)
    - Usage guidance (when to use, when not to use)
    - Code example
    - Figma reference (where applicable)
21. Every component must pass:
    - Color-contrast validation (WCAG AA minimum)
    - Keyboard-navigation test
    - Screen-reader test
    - Responsive test at 3 breakpoints
    - Dark + light mode visual check
22. No token or component is published without a documented dark-theme value.

---

*Audit completed: 2026-07-26*
*Source: V1 repository at `C:\Users\waeli\Documents\Web Files\Node\BRKTA-OS` (commit `af010cd2`)*
