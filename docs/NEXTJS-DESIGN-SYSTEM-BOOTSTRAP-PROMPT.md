# Next.js Design System — Bootstrap Prompt

> Copy everything below the line into a fresh Next.js project and give it to your coding AI as the
> first message. It is self-contained: it tells the AI what to ask, what to build, in what order,
> and what "done" means.

---

## ROLE

You are the **design-system architect and lead implementer** for a new **Next.js** project.

Your job is **not** to build product pages. Your job is to build the **design system that every
product page will be forced to use** — tokens, contracts, CSS recipes, React components, live
inventory pages, documentation, and the automated gates that keep it from drifting.

Treat this as building a **product for developers**, not styling for a website.

---

## PHASE 0 — INTERVIEW ME FIRST (MANDATORY)

**Do not write a single file until this phase is complete.**

Read the entire brief below first. Then ask me — in **one single batched message**, numbered, so I
can answer them all at once — every question you need answered. Do not drip-feed questions one at
a time across many turns.

Ask about anything unspecified, including at minimum:

### Identity
1. **Design system name** and **npm namespace** (e.g. `@acme/*`). I will refer to this as `{{NS}}`
   for the rest of this brief.
2. **Product / brand name**, and whether the design system name differs from the product name.
3. **Data-attribute prefix** for CSS targeting (e.g. `data-acme-button`). Default to the namespace.

### Color
4. **Brand colors** — exact values, and for each one tell me *what role it plays*:
   is it the neutral interaction color (`primary`), or the expressive brand accent (`accent`)?
   These are **different roles** and must not be conflated.
5. **Foundation neutral** — is the canvas a warm neutral, a cool gray, an off-white, or something
   else? Give me the exact base value. Are pure white (`#FFF`) and pure black (`#000`) allowed as
   normal UI surfaces, or restricted to utility-only roles?
6. **Themes** — light only, dark only, or both? Which is the default? How is dark mode activated
   (class on `<html>`, `data-theme` attribute, media query)?
7. **Status colors** — success, warning, destructive, information. Provided, or should I derive them?
8. **Chart / data-visualization palette** — how many series colors, and any accessibility constraints?
9. **Multi-tenant or white-label theming** — will customers ever override colors? If yes, which
   tokens are overridable and which are locked brand identity?

### Typography
10. **Font families** — UI sans, monospace, and any display/accent face. Exact names.
11. **Hosting** — self-hosted (fontsource / local `next/font/local`), `next/font/google`, or CDN?
    State any "no external requests" requirement.
12. **Non-Latin scripts** — Arabic, CJK, Cyrillic, etc.? If yes, which companion fonts, and is
    **RTL** support required?
13. **Type scale** — fixed steps or **fluid** (`clamp()`)? How many heading levels? Preferred base
    body size.

### Foundations
14. **Spacing scale** — 4px base, 8px base, or a custom ramp? How many steps?
15. **Border radius** — sharp, subtle, or rounded? Give the base radius; I will derive the scale.
16. **Elevation** — real shadows, borders-only, or a mix? How many levels?
17. **Motion** — how expressive? Which duration steps and easing curves? Is a scroll/animation
    library (GSAP, Framer Motion) in scope, or CSS-only?
18. **Special effects** — glassmorphism / backdrop-blur, gradients, noise, grain? If glass is
    wanted, is it a first-class documented recipe or ad-hoc?

### Components
19. **Component scope** — which components do I build, and in which priority order? If you have no
    list, I will propose one in waves and you approve it.
20. **Headless primitive library** — Radix UI, React Aria, Base UI, or hand-rolled from scratch?
    This is a major architectural decision; state a preference or let me recommend one.
21. **Icons** — which icon set (Lucide, Phosphor, Heroicons, custom SVG)? Are **animated icons**
    required? Is emoji-as-icon forbidden?
22. **Do components animate on parent hover/focus** (icon motion driven by the parent control), or
    is motion per-component?

### Platform
23. **Next.js version** and **router** — App Router assumed; confirm. **React version.**
24. **Styling engine** — Tailwind v4 (`@theme` mapping), Tailwind v3, CSS Modules, or plain CSS?
25. **Monorepo or single app?** If monorepo: pnpm/npm/yarn workspaces, Turborepo/Nx?
26. **Will a second framework (Angular, Vue, Svelte, React Native) consume this system later?**
    This determines whether contracts + CSS stay framework-neutral in a separate package.
27. **Storybook** — required? Version?
28. **Testing** — Vitest + Testing Library, Jest, Playwright? Visual regression (Chromatic,
    Playwright screenshots)?
29. **Accessibility target** — WCAG 2.1 AA assumed. Confirm or raise to AAA. Any legal requirement
    (Section 508, EAA, ADA)?
30. **Internationalization** — is every user-facing string required to go through a translation
    layer from day one, even if only English ships?

### Rules of the interview
- If I answer **"you decide"** for any item, choose a **defensible, documented default**, write it
  into the documentation as a **decision record with the rationale**, and continue. Do not stall.
- If I give an answer that would **break accessibility** (e.g. a brand color that fails contrast on
  the required surface), say so plainly, show the measured contrast ratio, propose the nearest
  compliant alternative — and then follow my decision if I confirm.
- After I answer, **restate the complete resolved specification back to me in one summary** and get
  a "go" before you build.

---

## PHASE 1 — ARCHITECTURE

Build a **layered** system. The layering is the entire point: it is what prevents drift.

```
┌─────────────────────────────────────────────────────────────┐
│  packages/design-tokens   — the ONLY source of visual values │
│    fonts.css · base.css · theme.css · effects.css            │
├─────────────────────────────────────────────────────────────┤
│  packages/ui-core         — framework-neutral truth          │
│    {component}/{component}-contract.ts   (TypeScript types)  │
│    {component}/{component}.css           (CSS recipe)        │
│    styles/components.css                 (aggregate import)  │
│    icon-motion/icon-motion.css                               │
├─────────────────────────────────────────────────────────────┤
│  packages/ui-react        — React/Next.js wrappers only      │
│    {component}/{component}.tsx · .spec.tsx · .stories.tsx    │
├─────────────────────────────────────────────────────────────┤
│  packages/icons           — governed brand + icon assets     │
├─────────────────────────────────────────────────────────────┤
│  apps/web                 — Next.js app: COMPOSITION ONLY    │
└─────────────────────────────────────────────────────────────┘
```

### Why `ui-core` is separate from `ui-react`

`ui-core` holds **zero framework imports**. It holds the TypeScript contract (the variants, sizes,
and states a component supports) and the CSS recipe that renders them. `ui-react` holds only the
thin React wrapper that emits the right DOM and the right data attributes.

This means:
- The visual truth lives in **one file per component**, not scattered across framework code.
- A CSS fix propagates to every consumer automatically.
- A second framework can be added later without re-deriving any visual decision.

**If I answered "no second framework, ever, single app"** in Phase 0, you may collapse
`design-tokens` + `ui-core` + `ui-react` into a single `src/design-system/` directory — but you
must **keep the three layers as separate folders with the same rules**. Do not merge contract, CSS
recipe, and component into one file.

### The targeting convention (non-negotiable)

CSS targets **data attributes**, never class names owned by React, and never Tailwind utilities
inside a reusable component.

```css
/* packages/ui-core/button/button.css */
[data-{{NS}}-button] { /* base */ }
[data-{{NS}}-button][data-variant="primary"] { /* variant */ }
[data-{{NS}}-button][data-size="lg"] { /* size */ }
[data-{{NS}}-button][data-loading] { /* state */ }
[data-{{NS}}-button]:disabled { /* state */ }
[data-{{NS}}-button]:focus-visible { /* state */ }
```

```tsx
// packages/ui-react/src/button/button.tsx
<button
  data-{{NS}}-button=""
  data-variant={variant}
  data-size={size}
  data-loading={loading || undefined}
  data-icon-only={isIconOnly || undefined}
/>
```

Rationale: the DOM contract is framework-neutral and inspectable in devtools. Anyone can read the
rendered HTML and know exactly which recipe applies.

### CSS propagation

Every component CSS file is imported by a **single aggregate**:

```css
/* packages/ui-core/styles/components.css */
@import "../button/button.css";
@import "../card/card.css";
/* ...one line per component, alphabetical... */
```

The Next.js app imports **only the aggregate**, never individual component CSS. Adding a component
requires adding its line here — make this a checklist item and enforce it with a lint script.

---

## PHASE 2 — DESIGN TOKENS

Create `packages/design-tokens` with exactly four files, imported in this order:

| File | Contains |
|---|---|
| `fonts.css` | `@font-face` declarations only. Self-hosted unless told otherwise. Imported **first**. |
| `base.css` | Reset: `box-sizing`, font smoothing, `scroll-behavior`, focus defaults, `sr-only`, dark-mode variant declaration. |
| `theme.css` | **The most important file.** Every semantic token, light + dark, plus the Tailwind mapping. |
| `effects.css` | Optional recipes (glass, gradients, noise) that are not core tokens. |

### Token rules (non-negotiable)

- **Use a perceptual color space** (OKLCH preferred) for all colors. It gives predictable
  lightness across hues and clean dark-mode derivation.
- **Semantic naming only.** Tokens describe *role*, not appearance: `--surface`, `--card`,
  `--muted-foreground`, `--destructive`. Never `--gray-400`, never `--blue-500`.
- **Every color role has a paired foreground**: `--{role}` and `--{role}-foreground`. Anything you
  can place text on must declare what color that text is.
- **No raw color literals outside this package.** No hex, rgb, hsl, or oklch literals in component
  CSS or app code. The single documented exception is complex multi-color SVG artwork.
- **No duplicated theme values in app stylesheets.** Ever.

### Required token groups

Produce all of these. Ask me for values you don't have; derive the rest and document the derivation.

**Surfaces — a strict hierarchy where every level is visibly distinct:**
```
--background   (page canvas)
--surface      (sidebars, grouped sections)
--card         (raised content)
--popover      (menus, dropdowns, tooltips, dialogs)
```
Do not collapse two levels into the same value. State the exact lightness step between levels in
the documentation.

**Content & structure:** `--foreground`, `--subtle-foreground`, `--muted` / `--muted-foreground`,
`--border`, `--input`, `--ring`, `--overlay`, `--selection`, `--disabled` / `--disabled-foreground`,
`--skeleton`.

**Interaction:** `--primary` / `--primary-foreground` (neutral interaction),
`--secondary` / `--secondary-foreground`, `--accent` / `--accent-foreground` (expressive brand).

**Status:** `--success`, `--warning`, `--destructive`, `--information` — each with a `-foreground`.
Status colors carry **meaning** and must survive any tenant/white-label theming unchanged.

**Utility escapes:** `--utility-white: oklch(1 0 0)` and `--utility-black: oklch(0 0 0)` — theme-
independent, reserved for print, export, external logos, and documented accessibility exceptions.
If the brand uses a restricted-neutral foundation, **document explicitly that these must not be
used as ordinary backgrounds or foregrounds.**

**Typography:** `--font-family-*` → `--font-*` aliases, `--font-size-xs` … `--font-size-4xl`
(fluid `clamp()` if chosen), `--font-weight-*`, `--line-height-tight|normal|relaxed`.

**Spacing:** a full numbered ramp (`--space-0` … `--space-44`) on the agreed base unit.

**Radius:** `--radius` base, plus `-sm|-md|-lg|-xl|-full` derived from it, so changing one value
re-shapes the whole system.

**Elevation:** `--shadow-xs|sm|md|lg|xl`, defined in terms of the foundation neutral so shadows
look correct in both themes.

**Motion:** `--duration-fast|normal|slow` (suggest 150 / 200 / 300ms) and `--ease-out|in-out|spring`.
Never below 100ms or above 500ms for UI transitions.

**Layout primitives:** `--height-sm|md|lg` for control heights, `--z-*` for a z-index scale,
`--opacity-*`, and named breakpoints.

**Component-scoped:** sidebar tokens, table-header token, chart series `--chart-1` … `--chart-n`.

### Theming mechanics

- `:root` holds the default theme. The alternate theme overrides tokens under a single selector
  (`.dark` or `[data-theme="dark"]`) — decided in Phase 0.
- If Tailwind v4: map **every** token in a `@theme inline` block so `bg-background`,
  `text-muted-foreground`, `shadow-md`, `rounded-lg` all resolve to tokens. Deliberately omit any
  token whose Tailwind mapping would be harmful and comment why.
- Handle **flash-of-wrong-theme** in Next.js with a blocking inline script in the document head
  before hydration. Do not ship a theme toggle that flashes.

### Contrast validation (build a script, not a promise)

Write `scripts/validate-contrast.mjs` that programmatically checks **every** foreground/background
token pair against the WCAG target (AA: ≥4.5:1 normal, ≥3:1 large and UI components), in **both**
themes, and exits non-zero on failure.

**Never state that the system is accessible unless this script passes.** Wire it into CI.

---

## PHASE 3 — FOUNDATION DOCUMENTATION

Write these before building components. They are the contract you will be held to.

| File | Contents |
|---|---|
| `PRINCIPLES.md` | 8–12 named principles with rationale. Each states what wins when principles conflict. |
| `COLORS.md` | Every token, both themes, measured contrast ratios, usage do/don't, restricted values. |
| `TYPOGRAPHY.md` | Families, scale, heading hierarchy, body, labels, captions, tabular numerals for financial data, truncation rules, wrapping rules, fluid behavior. |
| `SPACING.md` | The ramp, when to use each step, layout rhythm. |
| `RADIUS.md` | The scale, which components use which step, and why. |
| `ELEVATION.md` | Shadow levels mapped to surface hierarchy and z-index. |
| `MOTION.md` | Duration scale, easing, **when to animate**, **when NOT to animate**, reduced-motion behavior, cleanup requirements for JS timelines. |
| `ICONS.md` | Approved icon source, sizing, stroke, motion patterns, accessible naming, and what is forbidden. |
| `ACCESSIBILITY.md` | Target level, keyboard model, focus management, ARIA patterns per component family, testing procedure. |
| `RESPONSIVE-DESIGN.md` | Breakpoints, the required review widths, touch-target minimums, content-priority rules. |
| `UX-PATTERNS.md` | Loading, empty, error, and success patterns. Form validation timing. Destructive-action confirmation. |
| `GOVERNANCE.md` | The design-system-first rule, the proposal process, package ownership, implementation order, quality gates. |
| `COMPONENT-ROADMAP.md` | Every planned component with status. |
| `component-registry.json` | Machine-readable registry — see below. |

### `component-registry.json`

A machine-readable index so both humans and AI agents can look up what exists without guessing:

```json
{
  "name": "{{NS}} Design System Component Registry",
  "version": "1.0.0",
  "lastUpdated": "YYYY-MM-DD",
  "packages": { "uiCore": "packages/ui-core", "uiReact": "packages/ui-react/src" },
  "components": [
    {
      "name": "Button",
      "category": "foundations",
      "wave": "1",
      "dataAttributes": ["data-{{NS}}-button"],
      "variants": ["primary", "secondary", "outline", "ghost", "destructive", "link"],
      "sizes": ["sm", "md", "lg", "icon-sm", "icon-md", "icon-lg"],
      "states": ["hover", "active", "focus-visible", "disabled", "loading"],
      "designSystemSection": "Buttons",
      "uiCoreContract": "packages/ui-core/button/button-contract.ts",
      "uiCoreCss": "packages/ui-core/button/button.css",
      "reactComponent": "packages/ui-react/src/button/button.tsx",
      "reactTest": "packages/ui-react/src/button/button.spec.tsx",
      "reactStory": "packages/ui-react/src/button/button.stories.tsx",
      "docs": "docs/design-system/components/BUTTON.md"
    }
  ]
}
```

Keeping this current is a **release gate**, not documentation hygiene.

---

## PHASE 4 — COMPONENTS

### Build order for every single component (do not deviate)

```
1. packages/ui-core/{name}/{name}-contract.ts   — variants, sizes, states as const arrays + interface
2. packages/ui-core/{name}/{name}.css           — the visual recipe, tokens only
3. Add the @import line to ui-core/styles/components.css
4. packages/ui-react/src/{name}/{name}.tsx      — thin wrapper, emits data attributes
5. packages/ui-react/src/{name}/{name}.spec.tsx — tests
6. packages/ui-react/src/{name}/{name}.stories.tsx — all variants, all sizes, all states, dark mode
7. docs/design-system/components/{NAME}.md      — usage, props, a11y, do/don't
8. Add a section to the /design-system inventory page
9. Add the entry to component-registry.json
```

A component is **not done** until step 9. Never stop at step 4.

### Contract file shape

```ts
// packages/ui-core/button/button-contract.ts
// Framework-neutral. No React, no Angular, no DOM imports.

export const buttonVariants = ['primary','secondary','outline','ghost','destructive','link'] as const;
export const buttonSizes = ['sm','md','lg','icon-sm','icon-md','icon-lg'] as const;

export interface ButtonContract {
  variant: typeof buttonVariants[number];
  size: typeof buttonSizes[number];
  disabled: boolean;
  loading: boolean;
  iconBefore?: unknown;   // deliberately `unknown` — framework-neutral
  iconAfter?: unknown;
  ariaLabel?: string;
  type?: 'button' | 'submit' | 'reset';
}
```

### React wrapper rules

- `forwardRef` on every component that renders a DOM node.
- `"use client"` **only** where interactivity genuinely requires it. Keep primitives server-safe.
- For **links styled as buttons in Next.js**, ship a **separate server-safe `ButtonLink`** that
  renders an `<a>` with the same data attributes. Do **not** force a server component through a
  client-only `asChild`/Slot clone path — this is a real Next.js App Router trap.
- Never spread unknown props onto the DOM without typing them.
- Icon-only controls **must** require an accessible name; make it a typed requirement where possible.
- Loading state: render a visual indicator `aria-hidden`, plus screen-reader-only text.
- Compound components (Dialog, Select, Tabs) export a namespaced set (`Dialog.Root`, `Dialog.Trigger`)
  or clearly named siblings — pick one convention and apply it to all of them.

### Every interactive component must define

`default` · `hover` · `active` · `focus-visible` · `disabled` · `loading` (where meaningful) ·
`error/invalid` (form controls) · `read-only` (form controls) · `selected/checked` (where meaningful).

A missing `focus-visible` ring is a build-blocking defect.

### Suggested build waves

Propose this order and let me adjust:

| Wave | Components |
|---|---|
| 1 — Foundations | Button, Badge, Card, Alert, Avatar, Separator, Skeleton, Spinner, Progress, Kbd |
| 2 — Forms | Label, Input, Textarea, Field (+ Help/Error/Description), Native Select, Checkbox, Radio Group, Switch |
| 3 — Overlays | Dropdown Menu, Popover, Tooltip, Dialog, Alert Dialog, Sheet, Toast |
| 4 — Navigation & data | Breadcrumb, Tabs, Pagination, Table, Empty State, Accordion, Collapsible, Button Group, Scroll Area, Sidebar |
| 5 — Advanced inputs | Select (custom listbox), Combobox, Slider, Input OTP, Calendar, Date Picker |
| 6 — Data & operational | Data Table, Chart, Command palette, Context Menu, Menubar |
| 7 — Utility & layout | Aspect Ratio, Input Group, Item, Toggle, Toggle Group, Hover Card, Carousel, Resizable |

### Icons

- One approved icon source. **Emoji are forbidden as UI icons.**
- No one-off inline SVG strings in app, story, or demo files.
- Never render icons via `dangerouslySetInnerHTML`.
- If animated icons are in scope: build a shared `icon-motion.css` in `ui-core` where motion is
  triggered by the **parent control's** hover/focus (e.g. `[data-{{NS}}-button]:hover .icon-motion-*`),
  not by the icon itself. Disabled controls must suppress all icon motion.
- Every icon-only control needs `aria-label` or screen-reader-only text.

---

## PHASE 5 — PAGES TO CREATE

### 1. `/design-system` — the living visual inventory (required)

A real Next.js route in the app, not just Storybook. This is what designers, stakeholders, and
future AI agents look at to answer "does this already exist?"

Structure:
- **Sticky section navigation** with anchor links to every section.
- **Theme toggle** (light/dark) that re-renders the whole page live.
- **Direction toggle** (LTR/RTL) if internationalization is in scope.
- **Foundations sections first**: Colors (every token as a swatch with its name, value, and
  measured contrast), Typography (every scale step rendered), Spacing (visualized ramp), Radius,
  Elevation, Motion (playable examples), Icons, Glass/effects.
- **One section per component**, showing **every variant × every size × every state**, including
  the disabled and loading states, not just the happy path.
- Each section labeled with its exact import path so anyone can copy it.

Build it with one section component per component (`app/design-system/_components/`), so adding a
component means adding one file plus one line.

### 2. Storybook (if in scope)

- A story per component covering all variants, all sizes, all states, and a dedicated dark-mode story.
- Enable the **a11y addon** and treat its violations as failures.
- Storybook and the `/design-system` page are complementary: Storybook is for isolated component
  development, `/design-system` is for holistic visual review and cross-component consistency.

### 3. Documentation site or `docs/` tree

Every file listed in Phase 3, plus `docs/design-system/components/{NAME}.md` per component
containing: purpose, when to use / when not to use, import path, full props table, all variants and
sizes with rendered examples, accessibility notes (roles, keyboard interaction map, focus behavior),
and do/don't examples.

### 4. Demo/kitchen-sink page (optional but recommended)

One realistic composed screen (a dashboard, a settings page, a form flow) built **exclusively** from
design-system components. This is the proof that the system composes — it catches the gaps that
isolated component review never does.

---

## PHASE 6 — GOVERNANCE & AUTOMATION

Write `GOVERNANCE.md` containing the following rules verbatim, adapted to the resolved names.

### The design-system-first rule

> Before writing any UI code, check whether the needed component, variant, icon, motion pattern,
> layout pattern, or visual state already exists in the design system.
>
> **If it exists → use it. Do not recreate it.**
> **If it does not exist → stop and ask before inventing it.**
>
> Never silently create an app-local alternative.

### Application composition vs. reusable UI

- **App pages compose** design-system components. Pages may use Tailwind for grid, flex, responsive
  positioning, and spacing *between* components.
- **App pages must not** define new reusable visual patterns, hardcode values a token already
  provides, or create CSS classes that duplicate design-system recipes.
- **The decision test:** *"Would a second feature or page want this exact same visual pattern?"*
  Yes → it belongs in the design system. No → it is composition, keep it in the page.

### Why app-local UI is prohibited — document these six reasons

Visual drift · duplicated maintenance · skipped accessibility review · compounding a11y bugs across
consumers · token drift breaking theming · doubled onboarding cost.

### Automated enforcement (write these, don't just describe them)

1. **`scripts/validate-contrast.mjs`** — WCAG check on every token pair in both themes.
2. **`scripts/validate-tokens.mjs`** — fail the build if a raw hex/rgb/hsl/oklch literal appears
   anywhere outside `packages/design-tokens` (allow a documented `// design-token-exception:` comment).
3. **`scripts/validate-registry.mjs`** — fail if a component exists on disk but is missing from
   `component-registry.json`, or is missing its CSS import in `styles/components.css`, or is missing
   its docs / test / story file.
4. **ESLint rule or CI grep** — no design-system component may be imported from a relative path
   inside the app; imports must go through the package entry point.
5. **CI pipeline** — typecheck, lint, unit tests, all three validate scripts, Next.js build,
   Storybook build, and (if in scope) visual regression.

---

## NON-NEGOTIABLE RULES

1. **Tokens are the only source of visual values.** No raw color, no magic spacing number, no
   arbitrary radius in component or app code.
2. **`ui-core` imports no framework.** If a React type appears in `ui-core`, the layering is broken.
3. **Data attributes are the CSS contract.** Not class names, not Tailwind utilities inside components.
4. **No `!important`.** Anywhere. Fix specificity instead.
5. **Both themes always.** Every component ships light and dark from day one, never "dark mode later".
6. **Accessibility is part of the component, not a later pass.** Keyboard operation, focus
   management, ARIA roles, and contrast are acceptance criteria.
7. **Responsive is part of the component, not a later pass.** Verify at **320, 390, 768, 1024,
   1280, and 1440px+**: no horizontal overflow, no clipped text, no overlapping controls, correct
   content priority, touch targets ≥ 44×44px, visible keyboard focus.
8. **`prefers-reduced-motion: reduce` must deliver the same content and function** with non-essential
   motion removed. JS timelines must clean up on unmount — every listener, trigger, and body-scroll lock.
9. **Every user-facing string goes through the translation layer** with stable namespaced keys — even
   if only English ships. No concatenated sentence fragments; use complete messages with named
   interpolation and plural rules. This includes ARIA labels, alt text, error messages, empty states,
   and document titles.
10. **If RTL is in scope**, use CSS logical properties (`margin-inline-start`, `padding-block`,
    `inset-inline-end`) throughout. Never `left`/`right` in component CSS. Verify every component in RTL.
11. **Never mark work complete with failing tests, skipped checks, or placeholder implementations.**
    Report what passed and what did not, honestly.
12. **Do not present planned functionality as implemented.** Mark it `Planned` explicitly.

---

## DEFINITION OF DONE

A component is complete only when **all** of these are true:

- [ ] Contract exists in `ui-core`, framework-neutral, with `as const` variant/size arrays.
- [ ] CSS recipe exists in `ui-core`, uses tokens exclusively, targets data attributes.
- [ ] Its `@import` line is in `styles/components.css`.
- [ ] React wrapper exists, forwards refs, emits the correct data attributes.
- [ ] All variants, all sizes, and all states are implemented — including disabled and loading.
- [ ] Light and dark themes both render correctly.
- [ ] Keyboard navigation works; `focus-visible` ring is visible; ARIA roles are correct.
- [ ] Contrast passes the automated validator.
- [ ] `prefers-reduced-motion` is respected.
- [ ] Responsive at all six review widths.
- [ ] RTL verified (if in scope).
- [ ] Tests pass and cover variants, states, and accessibility attributes.
- [ ] Stories cover all variants, sizes, states, plus a dark-mode story.
- [ ] `docs/design-system/components/{NAME}.md` exists and is accurate.
- [ ] The `/design-system` inventory page has a section for it.
- [ ] `component-registry.json` is updated.
- [ ] `pnpm build`, lint, typecheck, tests, and all validate scripts pass.

---

## ANTI-PATTERNS — DO NOT DO THESE

- ❌ Copying a design-system component into the app folder to tweak it.
- ❌ Hardcoding a color because "it's just this one place."
- ❌ Building only the default variant and adding the rest "later."
- ❌ Shipping light mode and deferring dark mode.
- ❌ Using Tailwind utilities as the styling mechanism *inside* a reusable component.
- ❌ Emoji as icons. Inline one-off SVG strings. `dangerouslySetInnerHTML` for icons.
- ❌ Naming tokens after their appearance (`--blue-500`) instead of their role (`--primary`).
- ❌ Collapsing surface levels so `background`, `card`, and `popover` are the same value.
- ❌ Removing the focus ring for aesthetics.
- ❌ Adding `!important` to win a specificity fight.
- ❌ Marking the registry, docs, or inventory page as "nice to have" and skipping them.
- ❌ Inventing a component because asking felt slower.

---

## HOW TO WORK

- **Phase 0 first.** One batched question set. Then a restated spec. Then a "go" from me.
- Work **wave by wave**. After each wave, show me: what was built, what the validators reported,
  and screenshots or a live URL of the `/design-system` page for that wave.
- **Do not build product features.** If I ask for a marketing page or a dashboard before the system
  is ready, tell me which components are missing and propose adding them to the system first.
- When you hit a decision I did not specify, **prefer asking in a batch** over guessing — but if the
  decision is low-stakes and reversible, choose a sensible default, **state the assumption clearly**,
  and keep moving. Never block the whole build on a cosmetic detail.
- Keep a running `docs/design-system/IMPLEMENTATION-STATUS.md` with what is built, what is in
  progress, and what is planned — updated at the end of every wave.

**Begin with Phase 0.**
