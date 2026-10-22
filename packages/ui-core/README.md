# @brkta/ui-core

Framework-neutral shared package that owns **component contracts**, **variant definitions**, **shared CSS recipes**, **accessibility requirements**, and **state conventions** for the BRKTA design system.

## Purpose

`@brkta/ui-core` is the single source of truth for what each component looks like and what contract it fulfills. It contains **no framework-specific code** — no React hooks, no Angular directives, no JSX or templates. Instead, it defines:

- **Component contracts** (`*.contract.ts`) — TypeScript interfaces that framework wrappers must implement.
- **CSS visual recipes** (`*.css`) — attribute-selector-driven styles that framework wrappers apply via data attributes.
- **Shared types** (`types/`) — variant unions, size unions, data attribute constants, and other framework-neutral primitives.

## Relationship to other packages

```
@brkta/design-tokens      # CSS custom properties (--primary, --radius-md, etc.)
       ↑
@brkta/ui-core            # Contracts + CSS recipes (this package)
       ↑
┌──────────────────────────┐
│   @brkta/ui-react       │   React components wrapping ui-core contracts
│   @brkta/ui-angular     │   Angular components wrapping ui-core contracts
└──────────────────────────┘
```

- **`@brkta/design-tokens`** defines the raw tokens (colors, spacing, typography). `ui-core` references them via `var(--token-name)`.
- **`@brkta/ui-core`** defines the *what* — contracts, CSS, types. It depends on design tokens but on no framework.
- **`@brkta/ui-react`** and **`@brkta/ui-angular`** implement the *how* — they map the contracts to framework-specific components and apply the CSS recipes from `ui-core`.

## Component contract pattern

Every component follows this pattern:

1. **Contract** (`button/button-contract.ts`) — A TypeScript interface listing all public properties (variant, size, state, etc.). No framework imports allowed.
2. **CSS recipe** (`button/button.css`) — A single CSS file using `data-*` attribute selectors. Framework wrappers set these attributes on host elements.
3. **Shared types** (`types/variant.ts`) — Union types and constants shared across all components.

### Example: Adding a new component

1. Create `your-component/your-component-contract.ts` — define the `YourComponentContract` interface.
2. Create `your-component/your-component.css` — write styles using `[data-brkta-your-component]` attribute selectors.
3. Export new variant types from `types/variant.ts` if needed.
4. Implement the contract in `@brkta/ui-react` and/or `@brkta/ui-angular`.

## The data-attribute approach

All CSS recipes in `ui-core` target **data attributes** rather than class names. This provides:

- **Framework neutrality** — any framework can set `data-brkta-button` on its host element.
- **Encapsulation** — styles only apply to BRKTA components, never leaking to generic elements.
- **No class name collisions** — no BEM or CSS modules overhead across frameworks.
- **State visibility** — states like `[data-loading="true"]` and `[data-disabled="true"]` are explicit in the DOM and easy to debug.

### Naming convention

| Attribute | Purpose |
|---|---|
| `data-brkta-{component}` | Component identifier (base selector) |
| `data-variant` | Visual variant |
| `data-size` | Component size |
| `data-loading` | Loading state |
| `data-disabled` | Disabled state |
| `data-icon-only` | Icon-only variant (no visible label) |

## Design principles

- **No raw colors** — all colors come from `var(--token)` references. Use `color-mix(in oklch, ...)` for dynamic variants.
- **No `!important`** — specificity is managed through attribute selectors and cascade.
- **Accessible by default** — focus-visible rings, disabled opacity, loading indicators, and minimum touch targets (44×44 px at `md` size) are baked into the CSS.
- **Single source of truth** — the CSS in `ui-core` is the *only* place button visuals are defined. Framework wrappers do not override styles.

## Running validation

```bash
# Type-check all contracts
npx tsc --noEmit packages/ui-core/**/*.ts
```
