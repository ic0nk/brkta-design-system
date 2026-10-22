# Visual Review Checklist

> Use this checklist when reviewing a component, page, or feature for visual consistency with the BRKTA ONE Design System.
>
> **Mandatory prerequisite**: Before starting any UI work, you must follow the [design-system-first rule](./GOVERNANCE.md#design-system-first-rule). Check the [component registry](./component-registry.json) and [COMPONENT-ROADMAP.md](./COMPONENT-ROADMAP.md) to confirm whether the component, variant, or pattern already exists. If it exists, use it. If it does not exist, [stop and ask](./GOVERNANCE.md#when-a-needed-design-does-not-exist) before creating app-local UI.
>
> Full governance: [`GOVERNANCE.md`](./GOVERNANCE.md)

---

## Design-System-First Compliance

Before checking visual details, verify governance compliance:

- [ ] Checked the [component registry](./component-registry.json) — the needed component/variant does not already exist in the design system (or if it does, you are using it)
- [ ] Checked [COMPONENT-ROADMAP.md](./COMPONENT-ROADMAP.md) — confirmed the component status
- [ ] No app-local reusable UI has been created — all reusable components come from `@brkta/ui-angular` (dashboard) or `@brkta/ui-react` (website)
- [ ] No design token values have been hardcoded — all colors, spacing, radius, and shadows reference `var(--token)` from `@brkta/design-tokens`
- [ ] Component CSS lives in `@brkta/ui-core` — not duplicated in app-level stylesheets
- [ ] If a new reusable pattern was needed, it was proposed via the [component governance process](./COMPONENT-GOVERNANCE.md) before implementation

---

## Token Usage

- [ ] All colors reference CSS custom properties (`var(--token)`), not raw values
- [ ] No hex, rgb, rgba, hsl, or raw oklch literals in component styles
- [ ] No Tailwind arbitrary color values (`bg-[#...]`, `text-[#...]`) in reusable components
- [ ] Typography uses `--font-sans`, `--font-mono`, `--font-arabic`, or `--font-pixel` tokens, not hardcoded font stacks
- [ ] Spacing uses the `--space-*` scale where practical
- [ ] Border radius uses `--radius-*` tokens
- [ ] Shadows use `--shadow-*` tokens

## Light / Dark Theme

- [ ] Component renders correctly in light theme (`:root`, default)
- [ ] Component renders correctly in dark theme (`.dark` class on ancestor)
- [ ] All token pairs have appropriate contrast in both themes
- [ ] No hardcoded light-only or dark-only colors outside theme.css

## Interactive States

- [ ] **Default** — component appears as expected
- [ ] **Hover** — visual feedback (background, border, or transform change)
- [ ] **Focus-visible** — 2px ring using `--ring` token, visible on keyboard focus
- [ ] **Active** — pressed state visual feedback
- [ ] **Disabled** — opacity `--opacity-disabled` (0.5), `cursor: not-allowed`, `pointer-events: none`
- [ ] **Loading** — three-dot animation, preserved layout, disabled interaction
- [ ] Transitions use `--duration-fast` (150ms) or `--duration-normal` (200ms) with `--ease-out`

## Accessibility

- [ ] Color contrast: normal text ≥ 4.5:1, large text ≥ 3:1 (WCAG 2.2 AA)
- [ ] Touch targets ≥ 44×44px (default `md` size)
- [ ] Keyboard navigable — Tab order follows visual order
- [ ] `aria-label` on icon-only controls
- [ ] Screen-reader text uses framework-independent classes (e.g. `.brkta-spinner-sr-label`) rather than Tailwind's `sr-only` for shared components
- [ ] No `title` attribute as primary labeling (use `aria-label`)
- [ ] Focus ring visible on all interactive elements
- [ ] `prefers-reduced-motion` respected (animations reduced or removed)
- [ ] `prefers-reduced-transparency` respected (glass effects become solid)

## Responsive Behavior

- [ ] Works at 320px width (minimum supported)
- [ ] Works at 768px (tablet)
- [ ] Works at 1280px+ (desktop)
- [ ] Text does not overflow or truncate unexpectedly
- [ ] Touch targets remain ≥ 44px on mobile
- [ ] No horizontal scroll on any supported breakpoint

## Framework Parity (Cross-Framework Components)

- [ ] React and Angular implementations render identically
- [ ] Same variants, sizes, and states available in both frameworks
- [ ] Same CSS data attributes used (`data-brkta-*`)
- [ ] Same visual result (compare screenshots if possible)
- [ ] Alert status fills preserve their hue in both frameworks (information stays blue, success green, warning amber, destructive red)
- [ ] Alert backgrounds use transparent status tints, not direct OKLCH mixes with `--background`

## Glass Effects (when used)

- [ ] `backdrop-filter: blur()` active on supporting browsers
- [ ] Solid-color fallback on browsers without `backdrop-filter`
- [ ] Text contrast ≥ 4.5:1 against glass background
- [ ] `prefers-reduced-transparency: reduce` removes blur, uses solid surface
- [ ] No `!important` in glass classes

## Motion

- [ ] Animations are subtle (< 300ms)
- [ ] Animations use `--ease-out` or `--ease-in-out` curves
- [ ] No decorative animations that delay user interaction
- [ ] Loading indicators use `brkta-loading-dots` keyframes
- [ ] Box buttons (primary/secondary/outline/destructive/glass) show a moving border dash (`::after` offset-path pill) on hover/focus — no extra border highlight, glow, or outline
- [ ] Box button dash uses `offset-path: inset(1px round var(--radius-lg))` with `offset-distance: 100%` keyframes
- [ ] `@supports (offset-path: inset(0 round 10px))` guard present; gracefully falls back to no animation when unsupported
- [ ] Dash is a 12×2px pill (`border-radius: 999px`) — not a full border, not a conic-gradient artifact
- [ ] Dash starts `opacity: 0`, transitions to `opacity: 1` on hover/focus, animates at 1.8s per revolution
- [ ] Ghost button does NOT show border dash
- [ ] Link label shows underline visible by default (`scaleX(1)`, `transform-origin: right`), retracts on hover/focus (`scaleX(0)`)
- [ ] Link underline is attached to `.brkta-button-label::after` — icon-only links (no label) have no underline
- [ ] Loading link buttons have no underline
- [ ] Disabled link buttons have no underline
- [ ] Disabled buttons do not show border dash or underline animation
- [ ] Loading buttons do not show border dash or underline animation
- [ ] `--brkta-button-motion-color` set per variant/appearance: primary/destructive = `currentColor 70%`, secondary/outline/glass appearance = `var(--foreground) 55%`
- [ ] Dash color uses `--brkta-button-motion-color` — visible in both light and dark themes
- [ ] Z-index stacking: dash (`z-index: 0`) ← content, loader, icon motion (`z-index: 1`)
- [ ] `overflow: hidden` on base button clips dash to border radius
- [ ] Icon motion uses `.brkta-icon-motion` base class and variant class (`.brkta-icon-motion-arrow`, etc.)
- [ ] Icon motion inside buttons gets `z-index: 1` (above dash pseudo-element)
- [ ] Hover/focus-visible triggers icon motion (transform or keyframe) for all trigger paths:
  - [ ] Direct icon hover/focus
  - [ ] Parent button hover/focus (`[data-brkta-button]:hover`)
- [ ] `prefers-reduced-motion: reduce` hides dash (`opacity: 0 !important`), removes transitions on link underline (snaps). Icon motion also disabled.
  - [ ] Generic trigger class (`.brkta-icon-motion-trigger:hover`)
- [ ] Icons inside buttons animate from the button surface (not only from the SVG)
- [ ] Icon motion respects `prefers-reduced-motion: reduce` (transform: none, animation: none)
- [ ] `prefers-reduced-motion: reduce` disables non-essential animations
- [ ] Reduced motion preserves functionality (content still appears, just without animation)
- [ ] Angular does not import React icon libraries for animation

## Forms

- [ ] Label uses `data-brkta-label` and connects to control via `htmlFor`/`for`
- [ ] Required label shows `*` indicator via `data-required="true"`
- [ ] Input/Textarea/Native Select all share the same variant system (`default`, `filled`, `ghost`)
- [ ] Input/Textarea/Native Select all share the same size system (`sm`: 32px, `md`: 44px, `lg`: 56px)
- [ ] Focus-visible uses design-system ring token on all interactive controls
- [ ] Disabled controls show 50% opacity and `cursor: not-allowed`
- [ ] Invalid controls show `--destructive` border and `aria-invalid="true"`
- [ ] Field layout wrapper correctly composes label + control + help/error/description
- [ ] Field Help Text uses `data-brkta-field-help` with muted color
- [ ] Field Error Text uses `data-brkta-field-error` with destructive color and `role="alert"`
- [ ] Checkbox uses native `<input type="checkbox">`, visually hidden, with custom indicator
- [ ] Checkbox supports indeterminate state
- [ ] Radio Group uses native `<input type="radio">`, visually hidden, with custom indicator
- [ ] Radio Group supports vertical and horizontal orientation
- [ ] Switch uses native `<input type="checkbox" role="switch">` with track + thumb
- [ ] All form controls use data-attribute CSS targeting (no class-based styling)
- [ ] React and Angular form controls render identically
- [ ] No Tailwind utilities used in reusable form control CSS
- [ ] Form controls preserve existing typography, little-curve radius, and warm cream theme

## Custom Select

- [ ] Closed trigger visually matches Input / NativeSelect (height, border, radius, font)
- [ ] Dropdown menu uses BRKTA ONE tokens: `--popover` surface, `--border` border, `--radius-lg` radius, soft shadow
- [ ] Selected option shows checkmark accent (CSS mask-image, no raw SVGs)
- [ ] Hover option uses `--muted` background on hover
- [ ] Keyboard-active option uses `data-active="true"` with `--muted` background
- [ ] Keyboard navigation works: ArrowUp/Down, Home/End, Enter/Space to select, Escape to close
- [ ] Tab does not trap focus — focus moves normally out of the select
- [ ] Click outside closes the dropdown
- [ ] Trigger `aria-expanded` reflects open/closed state
- [ ] Options have `aria-selected` and `aria-disabled` as appropriate
- [ ] `role="combobox"` + `role="listbox"` ARIA pattern is correct
- [ ] Disabled select cannot open and shows 50% opacity
- [ ] Invalid select shows `--destructive` border and `aria-invalid="true"`
- [ ] Disabled options show 40% opacity and are not selectable
- [ ] Chevron rotates 180° when open (`data-brkta-select-icon`)
- [ ] Dropdown animates open (subtle fade + translateY, respects `prefers-reduced-motion`)
- [ ] React and Angular implementations render identically
- [ ] NativeSelect note: native option menu is not fully stylable across browsers — documented alongside Custom Select

## Overlay + Menu (Wave 3A)

- [ ] Dropdown Menu renders with correct data attributes and ARIA roles
- [ ] Dropdown Menu supports items, separators, labels, destructive items, disabled items
- [ ] Dropdown Menu keyboard navigation works (ArrowUp/Down, Enter, Escape)
- [ ] Popover opens/closes on click with correct `aria-expanded`
- [ ] Tooltip shows on hover/focus with configurable delay and side
- [ ] All overlay components use portal/floating positioning correctly
- [ ] React and Angular implementations render identically

## Modal + Feedback Overlay (Wave 3B)

- [ ] Dialog renders with `role="dialog"`, `aria-modal="true"`, overlay backdrop
- [ ] Dialog Escape closes, click-outside closes (if dismissible)
- [ ] Alert Dialog uses `role="alertdialog"` with destructive confirm pattern
- [ ] Sheet slides in from any edge (left, right, top, bottom)
- [ ] Sheet uses semantic tokens for glass effects
- [ ] Toast supports 4 variants: default, success, warning, destructive
- [ ] Toast glass styling: `color-mix(in oklch, var(--popover), transparent 5%)` + `backdrop-filter: blur(12px)`
- [ ] Toast dismiss button works, closing animation plays before remove
- [ ] Toast Viewport supports stacking with correct z-index (`--z-toast`)
- [ ] Toast respects `prefers-reduced-motion`
- [ ] React and Angular implementations render identically

## Navigation + Data Display (Wave 4A)

- [ ] Breadcrumb renders with `aria-label="Breadcrumb"` and `aria-current="page"`
- [ ] Tabs supports default, segmented, and vertical variants
- [ ] Tabs indicator moves smoothly on hover and selection
- [ ] Tabs keyboard navigation: ArrowLeft/Right (horizontal), ArrowUp/Down (vertical), Home, End
- [ ] Pagination highlights current page, disables Previous/Next at boundaries
- [ ] Table supports default, dense, and bordered variants
- [ ] Empty State renders centered layout with icon, title, description, action slot
- [ ] All Wave 4A components render identically in React and Angular

## Advanced Navigation + Layout Utilities (Wave 4B)

- [ ] Accordion opens/closes smoothly with CSS `grid-template-rows` animation
- [ ] Accordion keyboard nav: ArrowUp/Down, Home, End, disabled skip
- [ ] Collapsible opens/closes smoothly with unique per-instance IDs
- [ ] Button Group renders attached buttons with little-curve outer corners
- [ ] Button Group shows one group-level moving border dash on hover/focus-within
- [ ] Button Group individual child button dashes are suppressed inside groups
- [ ] Button Group icon motion on child buttons still works from parent hover/focus
- [ ] Button Group disabled state suppresses group dash
- [ ] Scroll Area handles vertical and horizontal overflow
- [ ] Sidebar expands/collapses with smooth width transition
- [ ] Sidebar icons render via BRKTA ONE animated icon components
- [ ] Sidebar active item has `aria-current="page"`
- [ ] Resizable drag handle works with pointer events (mouse + touch)
- [ ] Resizable keyboard resize: Arrow keys ±10px
- [ ] All Wave 4B components render identically in React and Angular

## Data + Operational Components (Wave 6)

- [ ] Data Table renders with semantic `<table>` and `<th>`/`<td>` structure
- [ ] Data Table sortable columns have `aria-sort` and respond to click
- [ ] Data Table row selection with checkboxes updates `data-selected`
- [ ] Data Table row action buttons are visible and keyboard accessible
- [ ] Data Table shows empty state when no rows and loading state when loading
- [ ] Chart renders bars/donut/metric with BRKTA ONE semantic tokens
- [ ] Chart has accessible description for screen readers
- [ ] Command palette opens/closes and filters search results
- [ ] Command keyboard navigation: ArrowDown/Up, Enter, Escape works
- [ ] Context Menu opens on right-click with `role="menu"` items
- [ ] Context Menu disabled items have `aria-disabled` and cannot be selected
- [ ] Context Menu destructive items render with correct styling
- [ ] Menubar renders horizontal menu items with `role="menubar"`
- [ ] Menubar submenus open on click and close on Escape/blur
- [ ] All Wave 6 components render identically in React and Angular

## Communication Components (Wave 7A)

- [ ] Attachment renders default, uploading, success, and error states
- [ ] Bubble renders incoming, outgoing, and system variants
- [ ] Message renders with avatar, name, timestamp, and status indicators
- [ ] Message Scroller renders scrollable thread with multiple message types
- [ ] Marker renders status dot variants: default, success, warning, destructive, info, large
- [ ] All Wave 7A components render identically in React and Angular

## Utility + Layout Components (Wave 7B)

- [ ] Aspect Ratio renders 1:1, 4:3, 16:9, 21:9 with real content inside
- [ ] Input Group renders leading addon, trailing addon, disabled, invalid examples
- [ ] Item renders default, selected, disabled, with leading/body/trailing slots
- [ ] Toggle renders default, pressed, disabled, icon-only with accessible label
- [ ] Toggle Group renders single-select and multi-select with correct aria
- [ ] Direction renders LTR and RTL containers side by side
- [ ] All Wave 7B components render identically in React and Angular

## Complex Interactive Components (Wave 7C)

- [ ] Carousel renders slides with prev/next controls and indicators
- [ ] Carousel ArrowLeft/ArrowRight keyboard navigation works
- [ ] Carousel indicators are clickable and show active state
- [ ] Carousel prev button is disabled at first slide (non-loop)
- [ ] Carousel loop mode wraps correctly
- [ ] Hover Card opens on mouse hover after delay
- [ ] Hover Card opens on keyboard focus
- [ ] Hover Card closes on mouseleave/blur after delay
- [ ] Hover Card content has correct z-index and positioning
- [ ] All Wave 7C components render identically in React and Angular

- [ ] Component has a `.md` file in `docs/design-system/components/`
- [ ] Storybook stories exist for each variant, size, and state
- [ ] Dark mode story included
- [ ] Responsive story included (where relevant)
- [ ] Accessibility story included (focus, keyboard, screen reader)
- [ ] Documentation matches actual implementation

## CSS Architecture

- [ ] App imports the aggregate CSS file: `@brkta/ui-core/styles/components.css` (not individual component CSS files)
- [ ] All reusable component CSS lives in `@brkta/ui-core/` — not duplicated in app styles
- [ ] Data attributes used for CSS targeting: `data-brkta-{component}`, `data-variant`, `data-size`

## Build & Test

- [ ] `pnpm build:ui` passes
- [ ] `pnpm test:ui` passes (all framework tests)
- [ ] `pnpm build:dashboard` passes (Angular)
- [ ] `pnpm build:website` passes (Next.js)
- [ ] No TypeScript errors
- [ ] No new ESLint warnings

---

## Governance Cross-References

This checklist is part of the BRKTA ONE design-system governance framework. All items above must be satisfied **in addition to** the mandatory governance rules:

| Document | What it covers |
|----------|---------------|
| [`GOVERNANCE.md`](./GOVERNANCE.md) | Design-system-first rule, what to do when a component does not exist, CSS propagation, package ownership |
| [`COMPONENT-GOVERNANCE.md`](./COMPONENT-GOVERNANCE.md) | Component proposal process, contribution workflow, deprecation rules |
| [`COMPONENT-ROADMAP.md`](./COMPONENT-ROADMAP.md) | Full inventory of all components with implementation status |
| [`component-registry.json`](./component-registry.json) | Machine-readable registry with file paths for every component |
| [`AGENTS.md`](../../AGENTS.md) | Repository-wide rules including the mandatory design-system-first rule |

### Why this checklist matters

This checklist enforces the design-system-first approach at the visual-review level. Every check here exists because a past violation caused one of these problems:

- **Visual drift** — two implementations of the same pattern looked different
- **Token bypass** — raw colors broke light/dark theme consistency
- **Accessibility regression** — app-local components skipped ARIA review
- **Maintenance burden** — duplicated CSS that did not receive design-system updates

When in doubt: **use the design system, do not recreate it locally.**
