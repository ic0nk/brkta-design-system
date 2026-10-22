# Icons

> Icon conventions and guidelines for BRKTA ONE. Lucide is the default application icon library; brand-specific assets live in `@brkta/icons`. React/Next.js may additionally use Its Hover (animated icons) and React Icons (fallback).

---

## Table of Contents

- [Icon Family](#icon-family)
- [Sizes](#sizes)
- [Stroke Width](#stroke-width)
- [Naming Conventions](#naming-conventions)
- [Accessibility](#accessibility)
- [Framework Rules](#framework-rules)
- [React/Next.js Icon Sources](#reactnextjs-icon-sources)
- [Angular Icon Policy](#angular-icon-policy)
- [Brand Icons](#brand-icons)
- [When to Use Custom SVGs](#when-to-use-custom-svgs)

---

## Icon Family

The governed `message-circle` (WhatsApp settings) and `inbox` (incoming price lists)
wrappers use Lucide's matching SVG geometry in Angular and React. Angular exports
`AnimatedMessageCircleComponent` and `AnimatedInboxComponent`; React exports
`AnimatedMessageCircle` and `AnimatedInbox` from `@brkta/ui-react/animated-icons`,
with website re-exports under `components/animated-icons`. Both default to 20px,
inherit `currentColor`, and remain decorative (`aria-hidden="true"`). The owning
control supplies its translated accessible name. Shared motion lifts the icon by
1px and scales it to 1.04 on parent button, Sidebar, menu, or trigger hover/focus.
Disabled controls and reduced-motion preferences suppress this effect. These
non-directional glyphs retain the same geometry in RTL and both themes.

### Default: Lucide

**Lucide** is the default application icon family for BRKTA ONE. It provides a consistent, minimal, and accessible icon set that matches the brand aesthetic.

| Framework | Package | Documentation |
|-----------|---------|---------------|
| React (Next.js) | `lucide-react` | https://lucide.dev/guide/packages/lucide-react |
| Angular (Dashboard) | `@lucide/angular` | https://lucide.dev/guide/packages/lucide-angular |

Lucide icons are tree-shakeable in both frameworks and are preferred over custom SVGs for all general-purpose UI icons: navigation, actions, status indicators, form controls, and data table elements.

---

## Sizes

Three standard icon sizes are defined as CSS custom properties in `@brkta/design-tokens`:

| Token | Size | Usage |
|-------|------|-------|
| `--icon-size-sm` | 16px (1rem) | Inline with small text, compact table cells, badge icons |
| `--icon-size-md` | 20px (1.25rem) | Default for toolbar items, menu items, buttons with text |
| `--icon-size-lg` | 24px (1.5rem) | Hero sections, empty states, large buttons, feature illustrations |

```css
/* Size classes for custom icon wrappers */
.icon-sm { width: var(--icon-size-sm); height: var(--icon-size-sm); }
.icon-md { width: var(--icon-size-md); height: var(--icon-size-md); }
.icon-lg { width: var(--icon-size-lg); height: var(--icon-size-lg); }
```

### Lucide size prop

Lucide components accept a `size` prop/input:

```tsx
// React
import { Save } from 'lucide-react';
<Save size={20} />

// Angular
<lucide-icon name="save" [size]="20"></lucide-icon>
```

### Icon sizing in buttons

Icon sizes inside buttons are automatic via CSS in `button.css`:

| Button Size | Icon Size |
|-------------|-----------|
| `sm` | 14px (0.875rem) |
| `md` | `--icon-size-sm` (16px) |
| `lg` | `--icon-size-md` (20px) |

Do not manually set icon sizes inside components — the component CSS handles it.

---

## Stroke Width

| Variant | Stroke Width | Usage |
|---------|-------------|-------|
| Default | 1.5px | Standard UI icons — most common |
| Bold | 2px | Emphasis, primary actions, alerts |
| Light | 1px | Decorative, subtle, large displays |

Lucide icons default to 1.5px and accept a `strokeWidth` prop/input:

```tsx
// React
<AlertCircle size={20} strokeWidth={2} />

// Angular
<lucide-icon name="alert-circle" [size]="20" [strokeWidth]="2"></lucide-icon>
```

Use the default stroke width (1.5px) for nearly all icons. Reserve bold (2px) for critical alerts and primary call-to-action icons. Light (1px) is decorative only — never use for interactive elements.

---

## Naming Conventions

Every icon must follow these rules:

1. **Descriptive** — the name describes what the icon represents, not where it appears.
2. **kebab-case** — all lowercase with hyphens separating words.
3. **No prefix** — do not prefix with `icon-`, `icn-`, or `ico-`.

```
✅  user.svg
✅  arrow-right.svg
✅  credit-card.svg
✅  settings.svg
✅  menu.svg
✅  file-text.svg

❌  icon-user.svg
❌  arrowRight.svg
❌  ArrowRight.svg
❌  profile-page-icon.svg
❌  ico-settings.svg
```

### Lucide icon names

Lucide uses kebab-case names natively. Use the same name for the same icon across frameworks:

```tsx
// React — same kebab-case name
import { ArrowRight, Settings, User } from 'lucide-react';

// Angular — same kebab-case name in string
<lucide-icon name="arrow-right"></lucide-icon>
<lucide-icon name="settings"></lucide-icon>
<lucide-icon name="user"></lucide-icon>
```

---

## Accessibility

### Decorative Icons → `aria-hidden="true"`

Icons that accompany visible text labels or are purely decorative must have `aria-hidden="true"` so assistive technology ignores them:

```tsx
// React
<button>
  <Save aria-hidden="true" />
  Save Invoice
</button>

// Angular
<button>
  <lucide-icon name="save" aria-hidden="true"></lucide-icon>
  Save Invoice
</button>
```

### Informative Icons → Accessible Name

An icon that is the **only content** of an interactive element must have an accessible name on the interactive parent:

```tsx
// React — aria-label on the button
<button aria-label="Settings">
  <Settings aria-hidden="true" />
</button>

// Angular — aria-label on the button
<button aria-label="Settings">
  <lucide-icon name="settings" aria-hidden="true"></lucide-icon>
</button>
```

```html
<!-- sr-only span pattern (alternative) -->
<button>
  <svg aria-hidden="true">...</svg>
  <span class="sr-only">Settings</span>
</button>
```

### Decorative-only rule

If an icon is accompanied by visible text, it is decorative — always use `aria-hidden="true"`. The visible text provides the accessible name.

### Brand SVGs

Brand assets should use `aria-hidden="true"` when used decoratively, or include an `alt` attribute when they represent the application:

```html
<img src="/icons/brkta-mark.svg" alt="BRKTA" />
```

---

## React/Next.js Icon Sources

### Tier 1 — Its Hover (Preferred Animated)

[Its Hover](https://www.itshover.com/) is the preferred animated icon source for React/Next.js experiences, especially buttons and interactive calls to action.

- Use Its Hover as a source for selected animated React icon components.
- Add selected icons through Its Hover's shadcn/manual-copy workflow — not via a universal npm package.
- Selected icons become reviewed local React components in the website or `@brkta/ui-react` layer.
- `motion` is the runtime dependency for those copied animated icons.
- Inspect generated code before committing.
- **Do not import Its Hover components into Angular.**
- **Do not add `itshover-react` or similar package names anywhere** unless a real published package or API is confirmed.

```tsx
// React / Next.js — Its Hover usage pattern (manual-copy workflow)
// Selected icon component lives as a reviewed local component:
//   apps/website/src/app/_components/hover-icons/ArrowRight.tsx
//
// import { ArrowRight } from '@/components/hover-icons/ArrowRight';

<Button variant="primary">
  Continue <ArrowRight />
</Button>
```

### Tier 2 — React Icons (Fallback)

[React Icons](https://react-icons.github.io/react-icons/) is the fallback React/Next.js icon source when Its Hover does not have the needed icon. **React Icons is for Next.js only.**

- Import from `react-icons/*` in Next.js pages and components only.
- Use `react-icons` for common UI icons that Lucide does not provide or when a broader ecosystem is needed.
- Keep imports specific to the icon set (e.g., `import { FiArrowRight } from 'react-icons/fi'`).
- Do not import the entire library — tree-shaking relies on named imports.
- **Never import `react-icons` in Angular code.**

```tsx
// Next.js only — React Icons usage pattern
import { FiArrowRight } from 'react-icons/fi';

<Button variant="primary">
  Continue <FiArrowRight />
</Button>
```

### Icon Source Decision Tree

| Need | Source |
|------|--------|
| Animated / interactive icon | Its Hover |
| Common UI icon (Lucide supplement) | React Icons |
| Brand asset (logo, mark) | `@brkta/icons` |
| Default UI icon | Lucide |

---

## Angular Icon Policy

### Do NOT import React icon libraries

Angular must **never** import React Icons or Its Hover React components. These packages bundle React and will break Angular builds.

- Use `@lucide/angular` for all standard UI icons (same Lucide set as React).
- Use hand-crafted or approved SVG assets for icons that Lucide does not provide.
- Animated React icons (e.g., from Its Hover) are **Next.js-only** unless rebuilt as Angular/SVG wrappers.
- When React and Angular need visual parity for an icon that Lucide does not provide, create an **BRKTA-owned SVG wrapper or asset** — one for React (as a component) and one for Angular (as a component or SVG string). Both reference the same authored SVG source. Do not import a React icon package into Angular.

```html
<!-- ✅ Angular (v1.26+) — Lucide SVG attribute selector -->
<svg lucideArrowRight size="20"></svg>

<!-- ✅ Angular — Icon name string via iconBefore -->
<brkta-button variant="primary" [iconAfter]="'arrow-right'">Continue</brkta-button>

<!-- ❌ Never import React icon libraries in Angular -->
```

---

## Framework Rules

### Do NOT cross-import icon libraries

- **React components** from `lucide-react` must never be imported into Angular code.
- **Angular components** from `@lucide/angular` must never be imported into React or Next.js code.
- Each framework uses its own Lucide binding — this prevents bundle bloat and framework conflicts.

```tsx
// ✅ React (in React/Next.js files)
import { Settings } from 'lucide-react';

// ✅ Angular (in Angular files) — individual Lucide icon components
import { LucideArrowRight } from '@lucide/angular';
// Template: <svg lucideArrowRight size="20"></svg>

// ❌ Never do this
import { Settings } from 'lucide-react'; // in an Angular component
```

### Use framework-native binding

```tsx
// ✅ React
import { ArrowRight } from 'lucide-react';
<ArrowRight size={20} strokeWidth={1.5} />

// ✅ Angular (v1.26+) — SVG attribute selector
import { LucideArrowRight } from '@lucide/angular';
// Template: <svg lucideArrowRight size="20" stroke-width="1.5"></svg>
```

---

## Animated Icon Toolbar

### Approved animated icons

The following icons are approved for toolbars, buttons, and compact actions with hover/focus motion:

| Icon | Motion class | Hover behavior |
|------|-------------|----------------|
| arrow-right | `.brkta-icon-motion-arrow` | Translates right 3px |
| arrow-left | `.brkta-icon-motion-arrow-left` | Nudges left in LTR, right in RTL |
| locate | `.brkta-icon-motion-locate` | Scales to emphasize current-location action |
| plus | `.brkta-icon-motion-plus` | Rotates 90° |
| search | `.brkta-icon-motion-search` | Scales up 1.1× |
| settings | `.brkta-icon-motion-settings` | Rotates 20° |
| bell | `.brkta-icon-motion-bell` | Shakes (brief keyframe) |
| copy | `.brkta-icon-motion-copy` | Translates up 1px |
| send | `.brkta-icon-motion-send` | Translates (2px, -2px) |
| check | `.brkta-icon-motion-check` | Scales up 1.15× |
| mail | `.brkta-icon-motion-mail` | Lifts and tilts 4° |
| phone | `.brkta-icon-motion-phone` | Rotates 12° |
| whatsapp | `.brkta-icon-motion-whatsapp` | Lifts and scales 1.08× |
| eye | `.brkta-icon-motion-eye` | Scales up 1.08× |
| eye-off | `.brkta-icon-motion-eye-off` | Scales up 1.08× |
| log-out | `.brkta-icon-motion-log-out` | Translates right 2px |
| panel-left | `.brkta-icon-motion-panel-left` | Translates left 2px |
| building-2 | `.brkta-icon-motion-building-2` | Lifts 1px and scales to 1.04× |

The navigation semantics are fixed: `log-out` represents exiting or signing out, `panel-left`
represents toggling or navigating a left-side panel, and `building-2` represents a company,
workspace, or organization. Their motion is intentionally neutral; semantic status colour remains
owned by the consuming workspace.

### Shared CSS

Hover animation classes live in `@brkta/ui-core/icon-motion/icon-motion.css`. The base class `.brkta-icon-motion` sets a `transition` on `transform`; each variant class adds the hover/focus-visible transform. `prefers-reduced-motion: reduce` disables all animation.

### Implementation

**React / Next.js** — Use the animated icon components from `@/components/animated-icons` (or from `@brkta/ui-react` when the consuming design-system component owns the wrapper). These wrap `lucide-react` components and apply the motion class. The website wrapper remains the public-site matching wrapper; the package-owned wrapper is used by the `@brkta/ui-react` Sidebar. The governed wrapper locations for the navigation set are:

- `apps/website/src/components/animated-icons/animated-log-out.tsx` — `AnimatedLogOut`
- `apps/website/src/components/animated-icons/animated-panel-left.tsx` — `AnimatedPanelLeft`
- `apps/website/src/components/animated-icons/animated-building-2.tsx` — `AnimatedBuilding2`
- `packages/ui-react/src/animated-icons/animated-panel-left.tsx` — `AnimatedPanelLeft` used by `@brkta/ui-react` Sidebar; exported from `packages/ui-react/src/animated-icons/index.ts`

```tsx
import { AnimatedArrowRight } from '@/components/animated-icons';

<button data-brkta-button data-variant="ghost" data-size="icon-md" aria-label="Arrow right">
  <AnimatedArrowRight size={20} />
</button>
```

**Angular** — Use the BRKTA-owned animated icon components from `@brkta/ui-angular`. These render inline SVGs with the same Lucide paths and apply the motion class. The implementation-owned wrapper locations are:

- `packages/ui-angular/src/animated-icons/animated-log-out.component.ts` — `AnimatedLogOutComponent`
- `packages/ui-angular/src/animated-icons/animated-arrow-left.component.ts` — `AnimatedArrowLeftComponent`
- `packages/ui-angular/src/animated-icons/animated-panel-left.component.ts` — `AnimatedPanelLeftComponent`
- `packages/ui-angular/src/animated-icons/animated-building-2.component.ts` — `AnimatedBuilding2Component`

```html
<button data-brkta-button data-variant="ghost" data-size="icon-md" aria-label="Arrow right">
  <brkta-animated-arrow-right></brkta-animated-arrow-right>
</button>
```

**React Icons (fallback)** — `react-icons/fi` may be used in Next.js as a static fallback when Lucide does not have the needed icon. These are not animated.

### Rules

- All animated icons must respect `prefers-reduced-motion: reduce`.
- Do not animate by importing React-only libraries into Angular.
- Do not use `motion` (framer-motion) for basic hover transforms — prefer the shared CSS approach unless implementing a copied Its Hover animated icon.
- Do not add `itshover-react` or similar fictional package names.
- Icons inside buttons, links, toolbar buttons, and compact actions **must** animate from the parent interactive state — hovering the button surface (not only the SVG) triggers the icon motion.
- Direct icon hover (`:hover` on the SVG/icon element) is allowed for standalone icon previews (e.g., the inventory grid in the design system), but production controls must use parent-triggered motion via `[data-brkta-button]` or `.brkta-icon-motion-trigger`.
- The `[data-brkta-button]` attribute selector targets production buttons; `.brkta-icon-motion-trigger` is a generic class for non-button interactive containers (toolbar items, link wrappers).
- Reduced motion disables both direct and parent-triggered animation.

---

## Brand Icons

Brand SVG assets live in `@brkta/icons` — this is separate from Lucide.

Current BRKTA ONE brand assets:

| File | Purpose | Usage |
|------|---------|-------|
| `brkta-one-logo-dark.svg` | Full BRKTA ONE logo, dark glyphs | Light surfaces — website header/footer, design-system headers |
| `brkta-one-logo-light.svg` | Full BRKTA ONE logo, cream glyphs | Dark surfaces |
| `brkta-one-icon-dark.svg` | BRKTA ONE icon mark only, dark glyphs | Light surfaces — favicon, app icon, avatar fallback |
| `brkta-one-icon-light.svg` | BRKTA ONE icon mark only, cream glyphs | Dark surfaces |

The `*-light`/`*-dark` suffix describes the **glyph color**, not the surface:
cream glyphs go on dark surfaces, dark glyphs go on light surfaces. Legacy
`brkta-logo.svg` / `brkta-mark.svg` assets are retained for reference only.
Source files live in `packages/Brand-Logo/`.

### Using brand SVGs

```tsx
// React / Next.js
import brktaMark from '@brkta/icons/brkta-one-icon-dark.svg';
<img src={brktaMark} alt="BRKTA ONE" className="h-8 w-8" />
```

```html
<!-- Angular — mirrored into /assets/icons from apps/dashboard/public/assets/icons -->
<img src="/assets/icons/brkta-one-icon-dark.svg" alt="BRKTA ONE" class="h-8 w-8" />
```

```css
/* Reference from CSS */
.logo {
  background-image: url('@brkta/icons/brkta-one-icon-dark.svg');
  background-size: contain;
  background-repeat: no-repeat;
}
```

---

## When to Use Custom SVGs

Only create or include custom SVG assets when:

1. **The asset is a brand-specific graphic** — logo, mark, wordmark, illustration.
2. **Lucide does not provide an equivalent icon** and the use case is unique to BRKTA ONE.

### Before adding a custom SVG

1. Search Lucide to confirm no equivalent exists: https://lucide.dev/icons/.
2. Consider if an existing Lucide icon can be adapted.
3. Compare the number of usages — a one-off icon may be better inline than in the icon package.
4. Get design-system team approval.

### Custom SVG quality requirements

- No embedded base64 images.
- No unused layers or hidden elements.
- Clean, hand-crafted paths.
- Consistent viewBox (`0 0 24 24` for matching Lucide sizing).
- Approved by the design team before publishing.
