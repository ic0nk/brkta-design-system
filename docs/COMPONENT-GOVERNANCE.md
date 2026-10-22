# Component Governance

> Rules and processes for proposing, building, maintaining, and deprecating components in the BRKTA ONE Design System. This ensures consistency, quality, and long-term sustainability.

---

## Table of Contents

- [Component Proposal Process](#component-proposal-process)
- [Package Ownership](#package-ownership)
- [What Belongs in ui-core](#what-belongs-in-ui-core)
- [What Stays Application-Specific](#what-stays-application-specific)
- [Angular and React Parity](#angular-and-react-parity)
- [Documentation Requirements](#documentation-requirements)
- [TypeScript Contract Requirements](#typescript-contract-requirements)
- [Test Requirements](#test-requirements)
- [Storybook Requirements](#storybook-requirements)
- [Accessibility Review](#accessibility-review)
- [Versioning](#versioning)
- [Deprecation](#deprecation)
- [Contribution Workflow](#contribution-workflow)

---

## Component Proposal Process

Every new component must go through this process before any code is written.

### Step 1: Identify the Need

Ask these questions:

- **Is this a new pattern or a variant?** If an existing component can be extended with a new variant or prop, do not create a new component.
- **Is this reusable?** If only one feature needs it, keep it in that feature. Design-system components must have at least two consumers.
- **Is this visual or behavioral?** If it's purely behavioral (e.g., a hook that manages focus), it may belong in application code, not the design system.

### Step 2: Check Existing Components

- Search the existing component inventory (this docs directory + Storybook).
- Search Lucide icons for icon needs.
- Check if a similar component exists in Angular CDK or Radix UI that can be wrapped.

### Step 3: Create a Proposal

Write a short proposal covering:

```markdown
## Component Proposal: [Name]

**Purpose**: One-sentence description of what this component does.

**Use cases**:
- Use case 1
- Use case 2

**Consumers**: Which features/applications will use this?

**Framework requirements**: Angular only, React only, or both?

**Variants**: List all proposed variants.

**Sizes**: List all proposed sizes.

**States**: idle, hover, focus, active, disabled, loading, error, empty.

**Accessibility considerations**:
- Keyboard interaction
- ARIA roles/attributes
- Screen reader behavior

**Dependencies**: Does this rely on any new package or existing component?
```

### Step 4: Review and Approval

1. Submit the proposal as a GitHub issue with the `design-system-proposal` label.
2. Design system maintainers review within 1 week.
3. Approved proposals become actionable issues with the `design-system-approved` label.
4. Proposals may be: approved, rejected with reason, or returned for revision.

---

## Package Ownership

```
@brkta/design-tokens      → Design tokens (colors, spacing, typography, shadows, motion)
@brkta/ui-core            → Contracts + CSS recipes + types (framework-neutral)
@brkta/ui-react           → React wrappers implementing ui-core contracts
@brkta/ui-angular         → Angular wrappers implementing ui-core contracts
@brkta/icons              → Brand SVG assets + icon conventions
```

| Layer | Owns | Owned By |
|-------|------|----------|
| Tokens | CSS custom properties, themes, base styles | Design system team |
| Core | Contracts, CSS recipes, types | Design system team |
| React | React components, React Storybook | React / Next.js team |
| Angular | Angular components, Angular Storybook | Angular / Dashboard team |
| Icons | Brand SVGs, icon conventions | Design system team |

---

## What Belongs in ui-core

The `@brkta/ui-core` package owns the shared visual and behavioral contract. A component belongs in ui-core when:

- It has a **shared visual contract** across Angular and React (all components do — this is the default).
- It uses the **data-attribute convention** for CSS targeting.
- Its **CSS recipe** is shared (framework-neutral), not framework-specific.
- It defines **TypeScript interfaces** for its public API (variant, size, state).

### ui-core responsibilities

```text
ui-core/component/
├── component.css           # Shared CSS recipe — single source of visual truth
├── component-contract.ts   # Shared TypeScript interface — property contract
└── (no framework code)
```

**Example** — `button/` in ui-core:

| File | Content |
|------|---------|
| `button-contract.ts` | `ButtonContract` interface: variant, size, disabled, loading, iconBefore, iconAfter, ariaLabel, type |
| `button.css` | `[data-brkta-button]` styles: variants (primary, secondary, outline, ghost, destructive, link), sizes (sm, md, lg, icon-sm, icon-md, icon-lg), states (hover, focus-visible, disabled, loading) |

---

## What Stays Application-Specific

Not every UI pattern belongs in the design system. These should stay in application code:

- **Page layout** — page-specific grid arrangements, section placements.
- **Feature-specific composition** — how multiple design-system components combine for a specific feature (e.g., "invoice summary panel" that combines Card + Table + Badge).
- **Marketing components** — website-specific landing page sections, blog components, marketing CTAs.
- **Domain-specific components** — widgets that display domain data in a unique way (e.g., "currency pair chart" for a treasury module).
- **Temporary / experimental UI** — patterns being tested that have not yet proven their reusability.

### When to promote to the design system

An application-specific component should be promoted to the design system when:

1. A second feature or application needs the same pattern.
2. The pattern stabilizes (no breaking changes expected in the next 2 sprints).
3. The team agrees it provides clear value as a shared resource.

---

## Angular and React Parity

Every design-system component must have **matching implementations** in Angular and React when both frameworks need it. Parity means:

| Aspect | Requirement |
|--------|------------|
| **API** | Same prop/input names, same values, same defaults |
| **Behavior** | Same interaction on hover, focus, click, keyboard |
| **Visual output** | Same HTML structure (data attributes), same CSS classes |
| **Variants** | Same variant names, same visual outcome |
| **Sizes** | Same size names, same dimensions |
| **States** | Same state handling (disabled, loading, error) |
| **Accessibility** | Same ARIA attributes, same keyboard interaction |

### What to do when only one framework needs a component

- If only React needs it: build in `@brkta/ui-react` only. Document the gap clearly.
- If only Angular needs it: build in `@brkta/ui-angular` only. Document the gap clearly.
- When the second framework requires it, implement parity and close the gap.

### Avoiding drift

- Both framework implementations import the same contracts from `@brkta/ui-core`.
- Both use the same CSS from `@brkta/ui-core`.
- Both are reviewed against the same acceptance criteria.
- Pair review between Angular and React developers for new components.

---

## Documentation Requirements

Every component needs a documentation file at `docs/design-system/components/{component-name}.md`.

### Required sections

```markdown
# Component Name

## Purpose
One paragraph — what is this for, when do you use it?

## Usage
Code example for both frameworks (Angular + React).

## Variants
Table of all variants with descriptions and visual reference.

## Sizes
Table of all sizes with measurements.

## States
List of all interactive states and their visual appearance.

## Accessibility
Keyboard interaction, ARIA attributes, screen reader behavior.

## Related Components
Links to related components.

## Figma Reference
Link to the Figma component (if available).
```

### Documentation checklist

- [ ] Usage example for Angular
- [ ] Usage example for React
- [ ] Variant table
- [ ] Size table
- [ ] State descriptions
- [ ] Accessibility section
- [ ] Dark mode example (if behavior differs)
- [ ] Migration notes (if replacing a legacy component)

---

## TypeScript Contract Requirements

Every component contract in `@brkta/ui-core` must follow these rules:

```typescript
// Framework-neutral contract — NO framework imports allowed
export const componentVariants = ['primary', 'secondary', 'outline'] as const;
export const componentSizes = ['sm', 'md', 'lg'] as const;

export interface ComponentContract {
  variant: typeof componentVariants[number];
  size: typeof componentSizes[number];
  disabled: boolean;
  // Framework-specific types (React.ReactNode, Angular TemplateRef) must NOT appear here.
  // Use `unknown` and let each framework cast in its wrapper.
  children?: unknown;
}
```

### Rules

- No imports from `react`, `@angular/core`, or any framework library.
- Use `unknown` for values that will be framework-specific (children, templates, icons).
- All variants and sizes are defined as `const` arrays with literal types.
- All boolean states (disabled, loading, readonly) default to `false` in the contract.

---

## Test Requirements

### Unit Tests (Logic)

| Scope | Requirement | Framework |
|-------|-------------|-----------|
| Contract validation | Default values, required props | TypeScript (type tests) |
| Variant rendering | Each variant renders correctly | Angular + React |
| Size rendering | Each size renders correctly | Angular + React |
| State rendering | Each state renders correctly | Angular + React |

### Rendering Tests (Visual)

| Scope | Requirement |
|-------|-------------|
| Light mode | All variants, sizes, states |
| Dark mode | All variants, sizes, states (visual snapshot) |
| Responsive | Component at mobile and desktop widths |

### Interaction Tests

| Scope | Requirement |
|-------|-------------|
| Click | Fires the correct event |
| Keyboard (Enter) | Activates via Enter key |
| Keyboard (Space) | Activates via Space key |
| Focus | Focus-visible ring appears |
| Disabled | No events fire when disabled |

### CI Requirements

- All tests run on every PR that changes a component.
- Visual regression tests compare against the baseline.
- Accessibility tests run automatically (axe-core).
- TypeScript strict mode — no `any` or `@ts-ignore`.

---

## Storybook Requirements

Every component needs stories in both **React Storybook** and **Angular Storybook**.

### Required stories

| Story | Purpose |
|-------|---------|
| Default | Component in its most common variant and size |
| All variants | One story showing every variant side by side |
| All sizes | One story showing every size side by side |
| Dark mode | Component rendered in `.dark` theme |
| Disabled | Component in disabled state |
| Loading | Component in loading state (if applicable) |
| With icon | Component with icon (if applicable) |
| Accessibility | Component with a11y addon results visible |

### Story organization

```
Component Name
├── Overview        → Default usage, description
├── Variants        → All variants grid
├── Sizes           → All sizes grid
├── States          → Disabled, loading, etc.
├── Dark Mode       → Dark theme preview
└── Accessibility   → A11y audit results
```

### Requirements

- Stories demonstrate the component in both light and dark mode.
- Stories use the `@theme inline` mapping for Tailwind tokens.
- All interactive states are demonstrable in Storybook.
- Stories include code snippets for copy-paste.

---

## Accessibility Review

Every component must pass an automated accessibility review before merging.

### Automated checks

- **axe-core** scan — run in CI, 0 violations allowed.
- **Color contrast** — automated check for all text and interactive elements.
- **Keyboard navigation** — tab order, focus trapping, arrow key navigation.
- **ARIA attributes** — valid usage, no missing required attributes.
- **Focus-visible** — visible focus indicator on all interactive elements.

### Manual checks (required for new components)

- Complete keyboard-only workflow (Tab, Enter, Space, Escape, Arrow keys).
- Screen reader test with NVDA (Windows) and VoiceOver (macOS).
- Zoom to 200% — verify no content loss.
- Verify reduced motion behavior.

### Blocking issues

A component with any of these issues is blocked from merge:

- Color contrast violation for normal text.
- Missing keyboard operability.
- Missing focus indicator.
- Missing accessible name on icon-only elements.
- Form input without associated label.

---

## Versioning

### Token and Core Versioning

- `@brkta/design-tokens` and `@brkta/ui-core` are versioned together with the monorepo.
- Breaking token changes (removing a token, changing a token's semantic meaning) are major version bumps.
- Adding new tokens is a minor version bump.
- Token value adjustments (lightness, chroma adjustments) are patch versions.

### Framework Wrapper Versioning

- `@brkta/ui-react` and `@brkta/ui-angular` follow their own semver, aligned with the monorepo release cycle.
- A new component variant is a minor bump.
- A breaking API change is a major bump.
- A bug fix is a patch bump.

### Monorepo Release Cadence

- Releases follow the monorepo release process (see `docs/releases/VERSIONING.md`).
- Design-system changes are released as part of the monorepo release — never independently.

---

## Deprecation

### Deprecation Process

1. **Notice** — Mark the component as deprecated in its documentation and Storybook with a notice:
   ```markdown
   > **Deprecated** — Use `NewComponent` instead. This component will be removed in vNext.
   ```
2. **Migration guide** — Provide a clear migration path from the old component to the replacement.
3. **Grace period** — Deprecated components remain available for **1 major version**.
4. **Removal** — The component is removed in the next major version.

### Deprecation rules

- Deprecated components still work — they are not broken during the grace period.
- Deprecated components stop receiving new features or variants.
- Critical bug fixes still apply to deprecated components during the grace period.
- A build-time warning (console warning) is added to deprecated components.
- The deprecation notice links to the replacement component's documentation.

### What triggers deprecation

- A component is replaced by a new, better component.
- A component's design pattern is determined to be harmful (accessibility, usability, or performance issues).
- A component has no consumers for two consecutive releases.

---

## Contribution Workflow

### For design-system team members

1. Create a feature branch from `main`.
2. Implement the component in the correct order:
   - Tokens (if new tokens are needed) → `@brkta/design-tokens`.
   - Contract + CSS → `@brkta/ui-core`.
   - Framework wrappers → `@brkta/ui-react` + `@brkta/ui-angular`.
   - Documentation → `docs/design-system/components/`.
   - Stories → Framework-specific Storybook.
   - Tests → Framework-specific test files.
3. Run all validation commands:
   ```bash
   pnpm build
   pnpm test
   pnpm lint
   ```
4. Open a PR with the `component` label.
5. Request review from:
   - Another design-system team member (code review).
   - An accessibility reviewer (a11y review).
   - A developer from the opposite framework (parity review) — React dev reviews Angular implementation and vice versa.
6. Merge after all checks pass and all reviewers approve.

### For external contributors

1. Open a GitHub issue with the `design-system-proposal` label first.
2. Wait for design-system team feedback before starting work.
3. Follow the same workflow as team members once approved.
