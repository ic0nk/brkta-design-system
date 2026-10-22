# @brkta/ui-react

React implementation of the BRKTA Design System components.

## Purpose

`@brkta/ui-react` is the React (JSX / TSX) layer of the framework-agnostic BRKTA UI
component system. It is consumed by `apps/website` (Next.js 16 / React 19) and any
other React application within the BRKTA monorepo.

## Architecture

```
@brkta/ui-react
  │
  ├── depends on @brkta/design-tokens   (CSS custom properties — theme, base, glass)
  ├── depends on @brkta/ui-core          (framework-neutral types, contracts, CSS recipes)
  └── consumed by apps/website           (Next.js 16, React 19)
```

**Design decisions:**

- Every component renders **framework-neutral data attributes** (`data-brkta-button`,
  `data-variant`, `data-size`, etc.) so the CSS from `@brkta/ui-core` applies
  without any framework coupling.
- No runtime CSS-in-JS. All visual styling comes from the shared CSS recipes in
  `@brkta/ui-core` and the design tokens from `@brkta/design-tokens`.
- Components are strict TypeScript, use `forwardRef`, and follow the contracts defined
  in `@brkta/ui-core`.

## Usage with Next.js

### 1. Install

```bash
pnpm add @brkta/ui-react @brkta/design-tokens @brkta/ui-core
```

### 2. Import design tokens and component styles

In your root layout (`app/layout.tsx`):

```tsx
// Tokens (required)
import "@brkta/design-tokens/theme.css";
import "@brkta/design-tokens/base.css";
import "@brkta/design-tokens/glass.css";

// Component styles (import per component or globally)
import "@brkta/ui-react/styles/button.css";
```

### 3. Use components

```tsx
import { Button } from "@brkta/ui-react/button";

export default function Page() {
  return (
    <Button variant="primary" size="md" onClick={() => alert("Clicked!")}>
      Get Started
    </Button>
  );
}
```

### Icon-only

```tsx
import { Button } from "@brkta/ui-react/button";
import { PlusIcon } from "@brkta/icons";

<Button size="icon-md" iconBefore={<PlusIcon />} accessibleLabel="Add item" />;
```

### asChild (compose with Next.js Link)

```tsx
import { Button } from "@brkta/ui-react/button";
import Link from "next/link";

<Button asChild variant="outline">
  <Link href="/dashboard">Dashboard</Link>
</Button>;
```

For anchors rendered from a Next.js Server Component, use `ButtonLink` so the
design-system recipe does not depend on client-side child cloning:

```tsx
import { ButtonLink } from "@brkta/ui-react/button";

<ButtonLink href="/dashboard" variant="outline">
  Dashboard
</ButtonLink>;
```

### Loading state

```tsx
<Button loading={isSaving} iconBefore={<SaveIcon />}>
  Save
</Button>
```

## Component list

| Component  | Import path              | Status |
| ---------- | ------------------------ | ------ |
| Button     | `@brkta/ui-react/button` | Done   |
| ButtonLink | `@brkta/ui-react/button` | Done   |

More components will be added as the design system grows.

## Development

```bash
# Run unit tests
pnpm --filter @brkta/ui-react test

# Watch mode
pnpm --filter @brkta/ui-react test:watch
```

## Design token integration

The design system is driven by CSS custom properties defined in `@brkta/design-tokens`.
Components reference these tokens via `var(--token-name)` inside the shared CSS recipes
in `@brkta/ui-core`. This means:

- **Theming** is handled entirely at the CSS layer — no React context providers required.
- **Dark mode** / high-contrast / glass effects are toggled by swapping token classes
  on a root element.
- Components automatically respond to token changes (no re-renders needed).
