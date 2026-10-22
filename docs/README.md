# BRKTA ONE Design System

> The single source of truth for every visual and interaction pattern across BRKTA ONE — the multi-tenant business operating system.

The BRKTA ONE Design System provides a consistent, accessible, and efficient visual language for both the **Angular dashboard** (`apps/dashboard`) and the **Next.js website** (`apps/website`). Built for business workflows, it prioritizes clarity, speed, and accuracy over decoration.

---

## Table of Contents

- [Architecture](#architecture)
- [Package Overview](#package-overview)
- [Quick Start](#quick-start)
- [Using the Design System](#using-the-design-system)
  - [In Angular Dashboard](#in-angular-dashboard)
  - [In Next.js Website](#in-nextjs-website)
- [Documentation Index](#documentation-index)
- [Key Conventions](#key-conventions)

---

## Architecture

```
@brkta/design-tokens          # CSS custom properties (colors, typography, spacing, shadows, motion)
        ↑
@brkta/ui-core                # Framework-neutral contracts, CSS recipes, variant types
        ↑
┌──────────────────────────────────────┐
│ @brkta/ui-react    @brkta/ui-angular │  # Thin framework wrappers
│ (Next.js/website) (dashboard)        │
└──────────────────────────────────────┘

@brkta/icons                  # Brand SVG assets + Lucide icon conventions (standalone)
```

**Design-tokens** owns every raw visual value. **ui-core** owns the shared contracts and CSS. **ui-react** and **ui-angular** are thin framework wrappers — they render semantic HTML with data attributes and delegate all styling to ui-core CSS. **Icons** is a standalone package with no framework dependencies.

---

## Package Overview

| Package | Location | Responsibility |
|---------|----------|---------------|
| `@brkta/design-tokens` | `packages/design-tokens/` | Semantic CSS custom properties, light/dark themes, base reset, glass effects |
| `@brkta/ui-core` | `packages/ui-core/` | Framework-neutral component contracts (`*.contract.ts`), shared CSS recipes (`*.css`), variant types |
| `@brkta/ui-react` | `packages/ui-react/` | React 19 component wrappers, Storybook stories, tests |
| `@brkta/ui-angular` | `packages/ui-angular/` | Angular standalone component wrappers, Storybook stories, tests |
| `@brkta/icons` | `packages/icons/` | Brand SVG assets (logo, mark), Lucide icon conventions |

---

## Quick Start

### 1. Import design tokens

```css
/* In your global CSS file */
@import "@brkta/design-tokens/fonts.css";    /* self-hosted font faces */
@import "@brkta/design-tokens/base.css";
@import "@brkta/design-tokens/theme.css";
@import "tailwindcss";
@import "@brkta/design-tokens/glass.css";   /* optional — glass effects */
```

### 2. Use semantic tokens

```css
.my-card {
  background: var(--card);
  color: var(--card-foreground);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: var(--space-4);
}
```

### 3. Use Tailwind utilities (mapped via `@theme inline`)

```html
<div class="bg-card text-card-foreground border border-border rounded-md p-4 shadow-sm">
  <h2 class="text-lg font-semibold">Revenue</h2>
  <p class="text-3xl font-bold text-foreground">$12,450</p>
</div>
```

### 4. Use a shared component

```tsx
// React (Next.js)
import { Button } from '@brkta/ui-react/button';

<Button variant="primary" size="md" onClick={handleSubmit}>
  Save Invoice
</Button>
```

```typescript
// Angular (dashboard)
import { ButtonComponent } from '@brkta/ui-angular/button';

// In template
<brkta-button variant="primary" size="md" (click)="handleSubmit()">
  Save Invoice
</brkta-button>
```

---

## Using the Design System

### In Angular Dashboard

1. Add packages to `apps/dashboard/package.json`:
   ```json
   {
     "dependencies": {
       "@brkta/design-tokens": "workspace:*",
       "@brkta/ui-core": "workspace:*",
       "@brkta/ui-angular": "workspace:*",
       "@brkta/icons": "workspace:*"
     }
   }
   ```
2. Import styles in your global CSS file:
   ```css
   @import "@brkta/design-tokens/fonts.css";
   @import "@brkta/design-tokens/base.css";
   @import "@brkta/design-tokens/theme.css";
   @import "@brkta/design-tokens/glass.css";
   ```
3. Import standalone components as needed in your feature modules or components.

### In Next.js Website

1. Add packages to `apps/website/package.json`:
   ```json
   {
     "dependencies": {
       "@brkta/design-tokens": "workspace:*",
       "@brkta/ui-core": "workspace:*",
       "@brkta/ui-react": "workspace:*",
       "@brkta/icons": "workspace:*"
     }
   }
   ```
2. Import styles in your root layout or global CSS:
   ```css
   @import "@brkta/design-tokens/fonts.css";
   @import "@brkta/design-tokens/base.css";
   @import "@brkta/design-tokens/theme.css";
   @import "@brkta/design-tokens/glass.css";
   ```
3. Import React components in your pages:
    ```tsx
    import { Button } from '@brkta/ui-react/button';
    import { Badge } from '@brkta/ui-react/badge';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@brkta/ui-react/card';
    import { Alert, AlertTitle, AlertDescription } from '@brkta/ui-react/alert';
    import { Avatar } from '@brkta/ui-react/avatar';
    import { Separator } from '@brkta/ui-react/separator';
    import { Skeleton } from '@brkta/ui-react/skeleton';
    import { Spinner } from '@brkta/ui-react/spinner';
    import { Progress } from '@brkta/ui-react/progress';
    import { Kbd } from '@brkta/ui-react/kbd';
    import { Select } from '@brkta/ui-react/select';
    ```

---

## Documentation Index

| Document | Purpose |
|----------|---------|
| [PRINCIPLES.md](PRINCIPLES.md) | Design philosophy and governing principles |
| [COLORS.md](COLORS.md) | Semantic color system, OKLCH, light/dark tokens |
| [TYPOGRAPHY.md](TYPOGRAPHY.md) | Font families, type scale, usage patterns |
| [SPACING.md](SPACING.md) | Spacing scale, layout and component spacing |
| [ELEVATION.md](ELEVATION.md) | Shadows, z-index, elevation hierarchy |
| [RADIUS.md](RADIUS.md) | Little-curve border radius scale, rules, and exceptions |
| [GLASS.md](GLASS.md) | Frosted-glass effect recipes and constraints |
| [MOTION.md](MOTION.md) | Duration, easing, animation guidelines |
| [RESPONSIVE-DESIGN.md](RESPONSIVE-DESIGN.md) | Breakpoints, mobile-first, responsive patterns |
| [ACCESSIBILITY.md](ACCESSIBILITY.md) | WCAG 2.2 AA, keyboard, screen reader, contrast |
| [ICONS.md](ICONS.md) | Lucide conventions, sizes, accessibility |
| [UX-PATTERNS.md](UX-PATTERNS.md) | Forms, validation, loading, empty states, dialogs |
| [COMPONENT-GOVERNANCE.md](COMPONENT-GOVERNANCE.md) | Proposals, package ownership, testing, deprecation |
| [SOURCE-AUDIT.md](SOURCE-AUDIT.md) | V1 legacy audit — findings, decisions, migration |

---

## Key Conventions

- **All colors use OKLCH** — perceptually uniform, wide gamut, no raw hex/rgb/hsl in components.
- **Light-first theming** — `:root` = light, `.dark` class = dark.
- **Zero `!important`** — specificity managed through attribute selectors and cascade.
- **Data-attribute targeting** — `[data-brkta-button]`, `[data-variant]`, `[data-size]` selectors keep CSS framework-neutral.
- **No raw colors in components** — every color reference uses `var(--token)`.
- **Default interactive height is 44px** — the `md` size meets WCAG touch-target minimum.
- **Lucide is the default icon library** — brand assets live in `@brkta/icons`.
- **WCAG 2.2 AA minimum** for all components and color combinations.
- **"Little curve" radius language** — reusable UI uses `--radius-*` tokens (4–8 px); pill/circle radii are restricted to avatars, status dots, circular icons, and progress indicators.
- **Second-person voice** in all documentation — "you" not "the user".

---

## Related Resources

- [Architecture Overview](../../docs/architecture/SYSTEM-OVERVIEW.md)
- [ADR-0004: Cross-Framework Design System](../../docs/decisions/0004-CROSS-FRAMEWORK-DESIGN-SYSTEM.md)
- [Source Audit: V1 Legacy](../../docs/design-system/SOURCE-AUDIT.md)
- Figma: [BRKTA ONE Design System](https://figma.com/files/brkta-design-system)

---

## Component Status

### Foundations + Primitives

| Component | Status | React | Angular | Tests |
|-----------|--------|-------|---------|-------|
| Button | ✅ Done | `@brkta/ui-react/button` | `brkta-button` | 54 (24+30) |
| Badge | ✅ Done | `@brkta/ui-react/badge` | `brkta-badge` | 15 (6+9) |
| Card | ✅ Done | `@brkta/ui-react/card` | `brkta-card` + sub-components | 20 (10+10) |
| Alert | ✅ Done | `@brkta/ui-react/alert` | `brkta-alert` + sub-components | 15 (7+8) |
| Avatar | ✅ Done | `@brkta/ui-react/avatar` | `brkta-avatar` | 23 (10+13) |
| Separator | ✅ Done | `@brkta/ui-react/separator` | `brkta-separator` | 13 (6+7) |
| Skeleton | ✅ Done | `@brkta/ui-react/skeleton` | `brkta-skeleton` | 15 (7+8) |
| Spinner | ✅ Done | `@brkta/ui-react/spinner` | `brkta-spinner` | 14 (6+8) |
| Progress | ✅ Done | `@brkta/ui-react/progress` | `brkta-progress` | 27 (12+15) |
| Kbd | ✅ Done | `@brkta/ui-react/kbd` | `brkta-kbd` | 8 (3+5) |

### Wave 2 — Forms Foundation

| Component | Status | React | Angular | Tests |
|-----------|--------|-------|---------|-------|
| Label | ✅ Done | `@brkta/ui-react/label` | `brkta-label` | Included in total |
| Input | ✅ Done | `@brkta/ui-react/input` | `brkta-input` | Included in total |
| Textarea | ✅ Done | `@brkta/ui-react/textarea` | `brkta-textarea` | Included in total |
| Field | ✅ Done | `@brkta/ui-react/field` | `brkta-field` | Included in total |
| Field Help Text | ✅ Done | `@brkta/ui-react/field-help` | `brkta-field-help` | Included in total |
| Field Error Text | ✅ Done | `@brkta/ui-react/field-error` | `brkta-field-error` | Included in total |
| Field Description | ✅ Done | `@brkta/ui-react/field-description` | `brkta-field-description` | Included in total |
| Native Select | ✅ Done | `@brkta/ui-react/native-select` | `brkta-native-select` | Included in total |
| Checkbox | ✅ Done | `@brkta/ui-react/checkbox` | `brkta-checkbox` | Included in total |
| Radio Group | ✅ Done | `@brkta/ui-react/radio-group` | `brkta-radio-group` + `brkta-radio` | Included in total |
| Switch | ✅ Done | `@brkta/ui-react/switch` | `brkta-switch` | Included in total |
| Select (custom) | ✅ Done | `@brkta/ui-react/select` | `brkta-select` | 37 (17+20) |

### Wave 3A — Overlay + Menu Foundation

| Component | Status | React | Angular | Tests |
|-----------|--------|-------|---------|-------|
| Dropdown Menu | ✅ Done | `@brkta/ui-react/dropdown-menu` | `brkta-dropdown-menu` | 24 (12+12) |
| Popover | ✅ Done | `@brkta/ui-react/popover` | `brkta-popover` | 13 (6+7) |
| Tooltip | ✅ Done | `@brkta/ui-react/tooltip` | `brkta-tooltip` | 14 (6+8) |

### Wave 3B — Modal + Feedback Overlay

| Component | Status | React | Angular | Tests |
|-----------|--------|-------|---------|-------|
| Dialog | ✅ Done | `@brkta/ui-react/dialog` | `brkta-dialog` | 12 (7+5) |
| Alert Dialog | ✅ Done | `@brkta/ui-react/alert-dialog` | `brkta-alert-dialog` | 11 (6+5) |
| Sheet | ✅ Done | `@brkta/ui-react/sheet` | `brkta-sheet` | 10 (5+5) |
| Toast | ✅ Done | `@brkta/ui-react/toast` | `brkta-toast` | 10 (5+5) |

### Wave 4A — Navigation + Data Display Foundation

| Component | Status | React | Angular | Tests |
|-----------|--------|-------|---------|-------|
| Breadcrumb | ✅ Done | `@brkta/ui-react/breadcrumb` | `brkta-breadcrumb` | 10 (5+5) |
| Tabs | ✅ Done | `@brkta/ui-react/tabs` | `brkta-tabs` | 12 (7+5) |
| Pagination | ✅ Done | `@brkta/ui-react/pagination` | `brkta-pagination` | 11 (6+5) |
| Table | ✅ Done | `@brkta/ui-react/table` | `brkta-table` | 11 (6+5) |
| Empty State | ✅ Done | `@brkta/ui-react/empty-state` | `brkta-empty-state` | 10 (5+5) |

### Wave 4B — Advanced Navigation + Layout Utilities

| Component | Status | React | Angular | Tests |
|-----------|--------|-------|---------|-------|
| Accordion | ✅ Done | `@brkta/ui-react/accordion` | `brkta-accordion` | 18 (9+9) |
| Collapsible | ✅ Done | `@brkta/ui-react/collapsible` | `brkta-collapsible` | 14 (7+7) |
| Button Group | ✅ Done | `@brkta/ui-react/button-group` | `brkta-button-group` | 10 (5+5) |
| Scroll Area | ✅ Done | `@brkta/ui-react/scroll-area` | `brkta-scroll-area` | 8 (4+4) |
| Sidebar | ✅ Done | `@brkta/ui-react/sidebar` | `brkta-sidebar` | 12 (6+6) |
| Resizable | ✅ Done | `@brkta/ui-react/resizable` | `brkta-resizable` | 12 (6+6) |

### Wave 6 — Data + Operational Components

| Component | Status | React | Angular | Tests |
|-----------|--------|-------|---------|-------|
| Data Table | ✅ Done | `@brkta/ui-react/data-table` | `brkta-data-table` | 13 (7+6) |
| Chart | ✅ Done | `@brkta/ui-react/chart` | `brkta-chart` | 8 (5+3) |
| Command | ✅ Done | `@brkta/ui-react/command` | `brkta-command` | 9 (5+4) |
| Context Menu | ✅ Done | `@brkta/ui-react/context-menu` | `brkta-context-menu` | 6 (4+2) |
| Menubar | ✅ Done | `@brkta/ui-react/menubar` | `brkta-menubar` | 6 (4+2) |

### Wave 7A — Communication Components

| Component | Status | React | Angular | Tests |
|-----------|--------|-------|---------|-------|
| Attachment | ✅ Done | `@brkta/ui-react/attachment` | `brkta-attachment` | 6 (3+3) |
| Bubble | ✅ Done | `@brkta/ui-react/bubble` | `brkta-bubble` | 5 (3+2) |
| Message | ✅ Done | `@brkta/ui-react/message` | `brkta-message` | 6 (4+2) |
| Message Scroller | ✅ Done | `@brkta/ui-react/message-scroller` | `brkta-message-scroller` | 4 (3+1) |
| Marker | ✅ Done | `@brkta/ui-react/marker` | `brkta-marker` | 4 (2+2) |

### Wave 7B — Utility + Layout Components

| Component | Status | React | Angular | Tests |
|-----------|--------|-------|---------|-------|
| Aspect Ratio | ✅ Done | `@brkta/ui-react/aspect-ratio` | `brkta-aspect-ratio` | 3 (2+1) |
| Input Group | ✅ Done | `@brkta/ui-react/input-group` | `brkta-input-group` | 6 (4+2) |
| Item | ✅ Done | `@brkta/ui-react/item` | `brkta-item` | 14 (8+6) |
| Toggle | ✅ Done | `@brkta/ui-react/toggle` | `brkta-toggle` | 8 (5+3) |
| Toggle Group | ✅ Done | `@brkta/ui-react/toggle-group` | `brkta-toggle-group` | 4 (3+1) |
| Direction | ✅ Done | `@brkta/ui-react/direction` | `brkta-direction` | 3 (2+1) |

### Wave 7C — Complex Interactive Components

| Component | Status | React | Angular | Tests |
|-----------|--------|-------|---------|-------|
| Carousel | ✅ Done | `@brkta/ui-react/carousel` | `brkta-carousel` | 6 (4+2) |
| Hover Card | ✅ Done | `@brkta/ui-react/hover-card` | `brkta-hover-card` | 3 (2+1) |

**Grand total:** 845 tests (402 React + 443 Angular). All passing via `pnpm test:ui`.

**NativeSelect vs Select (custom):** `NativeSelect` wraps the browser-native `<select>` element — its opened dropdown is OS/browser controlled and cannot be CSS-styled. Use it for simple forms where browser-default styling is acceptable. `Select (custom)` is the BRKTA ONE-designed listbox with warm cream dropdown, keyboard nav, and full design-system integration. Both coexist in the component library.

See [COMPONENT-ROADMAP.md](COMPONENT-ROADMAP.md) for the full inventory and upcoming waves.
