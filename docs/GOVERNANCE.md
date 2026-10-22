# BRKTA ONE Design System Governance

> Mandatory governance for all UI work in BRKTA ONE.
> This document defines how the design system is used, extended, and maintained.
> Last updated: 2026-07-30

---

## Table of Contents

- [Design-System-First Rule](#design-system-first-rule)
- [Responsive and Motion Gate](#responsive-and-motion-gate)
- [What Exists Today](#what-exists-today)
- [When a Needed Design Does Not Exist](#when-a-needed-design-does-not-exist)
- [How to Request a New Component or Variant](#how-to-request-a-new-component-or-variant)
- [Application Composition vs. Reusable UI](#application-composition-vs-reusable-ui)
- [CSS Propagation Architecture](#css-propagation-architecture)
- [Why App-Local UI Is Prohibited](#why-app-local-ui-is-prohibited)
- [Package Ownership](#package-ownership)
- [Implementation Order for New Components](#implementation-order-for-new-components)
- [Quality Gates](#quality-gates)
- [Cross-References](#cross-references)

---

## Design-System-First Rule

**This rule is non-negotiable. Every UI change must comply.**

Before writing any UI code, you must check whether the needed component, variant, icon, motion pattern, layout pattern, or visual state already exists in the BRKTA ONE design system.

### Where to look

| What you need                                 | Where to check                                              |
| --------------------------------------------- | ----------------------------------------------------------- |
| Reusable component (Angular)                  | [`@brkta/ui-angular`](../../packages/ui-angular/src/)       |
| Reusable component (React)                    | [`@brkta/ui-react`](../../packages/ui-react/src/)           |
| Shared CSS recipe or contract                 | [`@brkta/ui-core`](../../packages/ui-core/)                 |
| Semantic token (color, spacing, shadow, etc.) | [`@brkta/design-tokens`](../../packages/design-tokens/)     |
| Brand icon or SVG asset                       | [`@brkta/icons`](../../packages/icons/)                     |
| Visual inventory (live preview)               | Next.js `/design-system` and Angular `/design-system` pages |
| Machine-readable registry                     | [`component-registry.json`](./component-registry.json)      |
| Component roadmap                             | [`COMPONENT-ROADMAP.md`](./COMPONENT-ROADMAP.md)            |

### The two outcomes

1. **The design pattern exists** → Use it. Import it from the design system package. Do not recreate it.
2. **The design pattern does NOT exist** → Stop. Follow the process in [When a Needed Design Does Not Exist](#when-a-needed-design-does-not-exist).

**Never silently create an app-local alternative.** This causes drift, duplication, and inconsistency across the platform.

## Responsive and Motion Gate

Responsive behavior and motion are part of the component contract, not finishing work. Every page and reusable component must preserve content hierarchy, interaction, accessibility, and visual integrity from 320px phones through ultrawide desktop screens.

The required review widths are 320px, 390px, 768px, 1024px, 1280px, and 1440px or wider. A change is not complete if it introduces horizontal overflow, clipped text, overlapping controls, unusable touch targets, missing focus states, or a motion sequence that blocks the user.

GSAP and ScrollTrigger timelines must:

- keep essential content available if JavaScript or motion is unavailable;
- respect `prefers-reduced-motion: reduce` by removing non-essential motion;
- avoid animating layout-heavy properties when transform or opacity is sufficient;
- clean up timelines, triggers, listeners, and body locks on unmount;
- be checked visually at mobile, tablet, and desktop widths.

Reusable shell patterns such as headers, footers, intro sequences, and route transitions belong in the shared package layer and must expose configuration instead of hardcoding one application's navigation.

## Dashboard-Shell Change Protocol

Dashboard workspace navigation must compose the governed `@brkta/ui-angular` Sidebar
with `variant="embedded"` inside the existing navigation card. Do not copy Sidebar
markup or recreate its styling in an application stylesheet, and do not flatten the
navigation card or reintroduce a divider at the work-area boundary. App navigation
must use governed BRKTA icons and semantic tokens; raw icon text and one-off SVGs are
prohibited.

When the Sidebar contract changes, update the framework-neutral contract, both the
Angular and React wrappers, both focused test suites, both stories, the Sidebar docs,
and the component registry. The Sidebar selection callback reports an item only;
Angular Router or React routing must remain in the consuming application.

---

## What Exists Today

The BRKTA ONE design system currently includes **63+ components** implemented across three layers:

| Wave     | Category                     | Components                                                                                                |
| -------- | ---------------------------- | --------------------------------------------------------------------------------------------------------- |
| Wave 1   | Foundations + Primitives     | Button, Badge, Card, Alert, Avatar, Separator, Skeleton, Spinner, Progress, Kbd                           |
| Wave 2   | Forms Foundation             | Label, Input, Textarea, Field, Field Help/Error/Description, Native Select, Checkbox, Radio Group, Switch |
| Wave 2.5 | Custom Select                | Select (custom dropdown/listbox)                                                                          |
| Wave 3A  | Overlay + Menu               | Dropdown Menu, Popover, Tooltip                                                                           |
| Wave 3B  | Modal + Feedback             | Dialog, Alert Dialog, Sheet, Toast                                                                        |
| Wave 4A  | Navigation + Data Display    | Breadcrumb, Tabs, Pagination, Table, Empty State                                                          |
| Wave 4B  | Advanced Navigation + Layout | Accordion, Collapsible, Button Group, Scroll Area, Sidebar, Resizable                                     |
| Wave 5   | Advanced Inputs + Pickers    | Slider, Input OTP, Calendar, Date Picker, Combobox                                                        |
| Wave 6   | Data + Operational           | Data Table, Chart, Command, Context Menu, Menubar                                                         |
| Wave 7A  | Communication                | Attachment, Bubble, Message, Message Scroller, Marker                                                     |
| Wave 7B  | Utility + Layout             | Aspect Ratio, Input Group, Item, Toggle, Toggle Group, Direction                                          |
| Wave 7C  | Complex Interactive          | Carousel, Hover Card                                                                                      |

Foundations also include: Design Tokens (colors, typography, spacing, shadows, glass), Icon Motion system, and the Warm Creamy Neutral theme.

For a complete machine-readable list with file paths, see [`component-registry.json`](./component-registry.json).

---

## When a Needed Design Does Not Exist

### Step 1: Confirm it does not exist

Do not assume. Verify:

1. **Search the component registry** — open [`component-registry.json`](./component-registry.json) and search for keywords related to what you need.
2. **Check the component roadmap** — read [`COMPONENT-ROADMAP.md`](./COMPONENT-ROADMAP.md) to see if the component is planned or already exists under a different name.
3. **Check existing variants** — the component may exist but with a different variant, size, or data attribute than you expect. Browse the Storybook stories for both React and Angular.
4. **Check the visual inventory** — both the Next.js `/design-system` page and the Angular `/design-system` page show live examples of every implemented component.

### Step 2: Determine if it should be a design-system component

Not every UI pattern belongs in the design system. See [Application Composition vs. Reusable UI](#application-composition-vs-reusable-ui) for the distinction.

**A pattern belongs in the design system when:**

- Two or more features or applications need it.
- It defines a shared visual contract (colors, spacing, interaction, states).
- It will be stable for at least 2+ sprints.

**A pattern stays in application code when:**

- Only one feature needs it.
- It is purely a layout composition (page grid, section arrangement).
- It is domain-specific data visualization unique to one module.
- It is experimental and not yet validated.

### Step 3: Stop and ask

If you confirm the component does not exist and you believe it should:

1. **Stop writing UI code.** Do not create a local workaround.
2. **Raise the need** — open a component proposal following the process in [`COMPONENT-GOVERNANCE.md`](./COMPONENT-GOVERNANCE.md), or ask the design-system maintainer directly.
3. **Wait for a decision** before implementing.

If the component is approved, it must be added to the design system following the [Implementation Order](#implementation-order-for-new-components) below.

### Step 4: Temporary workaround (only if approved)

In rare cases, a blocking deadline may require a temporary app-local component. This requires explicit approval and must:

- Be clearly marked with a `// TODO(design-system): promote to @brkta/ui-core` comment.
- Be tracked as a follow-up issue.
- Use design-system tokens and data-attribute patterns even in the temporary version.
- Be promoted to the design system within one sprint.

---

## How to Request a New Component or Variant

### New component

Follow the full proposal process in [`COMPONENT-GOVERNANCE.md`](./COMPONENT-GOVERNANCE.md):

1. Write a proposal with purpose, use cases, consumers, variants, sizes, states, and accessibility considerations.
2. Submit as a GitHub issue with the `design-system-proposal` label.
3. Design-system maintainers review within 1 week.
4. Approved proposals receive the `design-system-approved` label and are scheduled.

### New variant or size on an existing component

1. Check whether the existing component's contract can be extended.
2. If yes, propose the variant/size addition following the same proposal process.
3. The change must update: ui-core contract + CSS, React wrapper, Angular wrapper, tests, stories, docs, and the component registry.

### New icon

1. Check the Lucide icon library for the icon you need.
2. If available, create matching **React and Angular BRKTA-owned wrappers** from the same Lucide SVG source.
3. Add motion variants to `packages/ui-core/icon-motion/icon-motion.css`.
4. Follow the icon governance rules in `AGENTS.md`.

### New token

1. Check `packages/design-tokens/theme.css` — the token may already exist under a different name.
2. If it genuinely does not exist, add it to the design-tokens package first.
3. Run contrast validation: `node scripts/validate-contrast.mjs`.
4. Document the token in the relevant design-system documentation file.

---

## Application Composition vs. Reusable UI

This distinction is critical. Understanding it prevents the most common design-system violation.

### Application composition (allowed in app code)

Application pages **compose** design-system components for specific features. This is layout composition, not component design.

```text
Example: An "Invoice List" page in the dashboard

apps/dashboard/src/app/features/accounting/invoice-list/
├── invoice-list.component.ts    ← Composes Card, Table, Badge, Button, Pagination
├── invoice-list.html
└── invoice-list.css             ← Tailwind for layout/spacing only
```

Pages use Tailwind for:

- Grid and flex layout
- Responsive positioning
- Application-level spacing between design-system components
- Page-specific arrangement

Pages must NOT:

- Define new reusable visual patterns (buttons, inputs, cards, menus)
- Hardcode colors that a design token already provides
- Create CSS component classes that duplicate design-system CSS

### Reusable UI component (must live in the design system)

Reusable components define shared visual and behavioral contracts. They live in:

| Layer           | Package             | What it owns                                                                  |
| --------------- | ------------------- | ----------------------------------------------------------------------------- |
| Contract + CSS  | `@brkta/ui-core`    | TypeScript contract (`{name}-contract.ts`) + shared CSS recipe (`{name}.css`) |
| React wrapper   | `@brkta/ui-react`   | React component (`{name}.tsx`) + tests + stories                              |
| Angular wrapper | `@brkta/ui-angular` | Angular component (`{name}.component.ts`) + tests + stories                   |

### The decision test

Ask: **"Would a second feature or application want to use this exact same visual pattern?"**

- **Yes** → It belongs in the design system. Propose it.
- **No, only this page needs it** → It is composition. Keep it in the app page.
- **Maybe later** → Keep it in the app for now. When the second consumer appears, propose promotion.

---

## CSS Propagation Architecture

The BRKTA ONE design system uses a single aggregate CSS file for all component styles:

```text
@brkta/ui-core/styles/components.css
```

This file imports every component's shared CSS recipe from `@brkta/ui-core/{component}/{component}.css`.

### How CSS flows to applications

```text
packages/ui-core/button/button.css         ─┐
packages/ui-core/card/card.css              │
packages/ui-core/dialog/dialog.css          ├──→ packages/ui-core/styles/components.css
...                                         │         │
packages/ui-core/carousel/carousel.css     ─┘         │
                                                      ▼
                              apps/website/src/app/globals.css  (imports components.css)
                              apps/dashboard/src/tailwind.css   (imports components.css)
```

### What this means for you

1. **A CSS change in `@brkta/ui-core/{component}/{component}.css` automatically propagates to both applications.** You do not need to update the apps separately.
2. **Do not duplicate component CSS in app-level stylesheets.** If a component needs different styling, the fix belongs in `@brkta/ui-core`, not in the app.
3. **Both apps import the aggregate file, not individual component files.** This ensures consistent ordering and prevents missing styles.
4. **Adding a new component to the system** requires adding its CSS import to `packages/ui-core/styles/components.css`.

### CSS change checklist

When modifying component CSS in `@brkta/ui-core`:

- [ ] The change uses semantic tokens only (no raw color values).
- [ ] Both light and dark themes render correctly.
- [ ] The data-attribute targeting pattern is preserved (`data-brkta-{component}`).
- [ ] Angular and React wrappers still produce the correct HTML structure.
- [ ] Both apps build without errors after the change.
- [ ] Storybook stories in both frameworks still pass visual review.

---

## Why App-Local UI Is Prohibited

Creating app-local reusable UI when the design system already provides the component is the most damaging design-system violation. Here is why it is prohibited:

### 1. Visual inconsistency

Two implementations of "Button" or "Card" will inevitably drift apart. Different border radius, different shadow depth, different hover color. Users notice. Trust erodes.

### 2. Maintenance burden

Every app-local component must be maintained, tested, and updated independently. When the design system updates a pattern (e.g., increasing touch targets, changing focus ring style), app-local copies do not receive the fix automatically.

### 3. Accessibility regression

The design-system components are accessibility-reviewed (ARIA patterns, keyboard navigation, focus management, contrast validation). App-local copies skip this review and introduce accessibility violations.

### 4. Accessibility violations compound

A single accessibility bug in an app-local component may affect every page that uses it. A fix in the design system would fix all consumers at once — but app-local copies must be fixed individually.

### 5. Token drift

App-local components tend to hardcode values instead of using semantic tokens. This breaks theme support (light/dark mode) and makes the warm creamy neutral foundation inconsistent.

### 6. Onboarding cost

New developers must learn two sets of components: the design system and the app-local alternatives. This slows onboarding and creates confusion about which component to use.

### The rule is simple

**If the design system has it, use it. If it does not, propose it. Never recreate it locally.**

---

## Package Ownership

| Package                | Role                                          | Who changes it         |
| ---------------------- | --------------------------------------------- | ---------------------- |
| `@brkta/design-tokens` | Semantic tokens, themes, fonts, glass recipes | Design-system team     |
| `@brkta/ui-core`       | Contracts (TypeScript) + shared CSS recipes   | Design-system team     |
| `@brkta/ui-react`      | React/Next.js component wrappers              | React/Next.js team     |
| `@brkta/ui-angular`    | Angular component wrappers                    | Angular/Dashboard team |
| `@brkta/icons`         | Brand SVG assets, iconography rules           | Design-system team     |

### Cross-framework rules

- **Dashboard** (Angular) imports reusable UI from `@brkta/ui-angular`. **Never** import React into Angular.
- **Website** (Next.js) imports reusable UI from `@brkta/ui-react`. **Never** import Angular into React.
- **Reusable styling** (shared CSS recipes) always lives in `@brkta/ui-core`.
- Both frameworks use the same data attributes (`data-brkta-{component}`) for CSS targeting.
- Both frameworks implement the same variants, sizes, and states from the `@brkta/ui-core` contract.

---

## Implementation Order for New Components

When a new reusable UI pattern is approved, implement in this exact order:

```text
Step 1: @brkta/ui-core
        ├── {component}/{component}-contract.ts   (TypeScript interface)
        └── {component}/{component}.css            (shared CSS recipe)
        └── Add import to styles/components.css

Step 2: @brkta/ui-react
        └── {component}/{component}.tsx            (React wrapper)

Step 3: @brkta/ui-angular
        └── {component}/{component}.component.ts   (Angular wrapper)

Step 4: Tests (both frameworks)
        ├── packages/ui-react/src/{component}/{component}.spec.tsx
        └── packages/ui-angular/src/{component}/{component}.spec.ts

Step 5: Stories (both frameworks)
        ├── packages/ui-react/src/{component}/{component}.stories.tsx
        └── packages/ui-angular/src/{component}/{component}.stories.ts

Step 6: Documentation
        └── docs/design-system/components/{COMPONENT}.md

Step 7: Visual inventory
        ├── apps/website/src/app/design-system/     (add section to Next.js page)
        └── apps/dashboard/src/app/features/design-system/  (add section to Angular page)

Step 8: Registry
        └── docs/design-system/component-registry.json  (add entry)
```

### Why this order

1. **Contract + CSS first** — establishes the shared visual truth that both frameworks consume.
2. **React wrapper second** — implements the contract for the website.
3. **Angular wrapper third** — implements the contract for the dashboard.
4. **Tests fourth** — validates both implementations.
5. **Stories fifth** — documents both implementations visually.
6. **Documentation sixth** — narrative explanation for developers.
7. **Visual inventory seventh** — live demo in both apps.
8. **Registry eighth** — machine-readable record for automation and lookups.

---

## Quality Gates

Every design-system change must pass these gates before merging:

### Code quality

- [ ] All contracts use framework-neutral types (no React/Angular imports in ui-core).
- [ ] CSS uses semantic tokens only — no raw hex, rgb, or oklch values.
- [ ] Data attributes follow the `data-brkta-{component}` convention.
- [ ] Both Angular and React implementations produce identical HTML structure.

### Build + test

- [ ] `pnpm build:ui` passes (all 5 packages).
- [ ] `pnpm test:ui` passes (all React + Angular tests).
- [ ] `pnpm build:dashboard` passes (Angular app).
- [ ] `pnpm build:website` passes (Next.js app).

### Accessibility

- [ ] Keyboard navigation works for all interactive states.
- [ ] ARIA roles and attributes are correct.
- [ ] Focus-visible ring is visible on all interactive elements.
- [ ] Color contrast meets WCAG AA (≥ 4.5:1 normal text, ≥ 3:1 large text).
- [ ] `prefers-reduced-motion` is respected.
- [ ] Icon-only controls have accessible names.

### Documentation

- [ ] Component documentation file exists at `docs/design-system/components/{NAME}.md`.
- [ ] Storybook stories cover all variants, sizes, and states.
- [ ] Dark mode story included.
- [ ] The component registry (`component-registry.json`) is updated.

### Visual review

- [ ] Component renders correctly in both light and dark themes.
- [ ] Angular and React implementations are visually identical.
- [ ] The visual inventory section in both apps is updated.
- [ ] Review against [`VISUAL-REVIEW-CHECKLIST.md`](./VISUAL-REVIEW-CHECKLIST.md).

---

## Cross-References

| Document                                                     | Purpose                                                  |
| ------------------------------------------------------------ | -------------------------------------------------------- |
| [`AGENTS.md`](../../AGENTS.md)                               | Repository-wide rules (design-system section)            |
| [`COMPONENT-GOVERNANCE.md`](./COMPONENT-GOVERNANCE.md)       | Full component proposal, review, and deprecation process |
| [`COMPONENT-ROADMAP.md`](./COMPONENT-ROADMAP.md)             | Complete inventory of all components with status         |
| [`component-registry.json`](./component-registry.json)       | Machine-readable registry with file paths                |
| [`VISUAL-REVIEW-CHECKLIST.md`](./VISUAL-REVIEW-CHECKLIST.md) | Visual review checklist for all components               |
| [`IMPLEMENTATION-STATUS.md`](./IMPLEMENTATION-STATUS.md)     | Build, test, and implementation status log               |
| [`PRINCIPLES.md`](./PRINCIPLES.md)                           | Design principles                                        |
| [`ACCESSIBILITY.md`](./ACCESSIBILITY.md)                     | Accessibility standards                                  |
| [`COLORS.md`](./COLORS.md)                                   | Color token reference                                    |
| [`TYPOGRAPHY.md`](./TYPOGRAPHY.md)                           | Typography reference                                     |
