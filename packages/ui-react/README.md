# `@brkta/ui-react`

React components for the BRKTA Design System. Each component uses shared contracts, semantic tokens, and CSS recipes so it can be used in React or Next.js projects.

## Install

```sh
pnpm add @brkta/ui-react @brkta/ui-core @brkta/design-tokens
```

Packages are served from GitHub Packages; set the `@brkta` registry and a user-level `read:packages` token before installing.

## Use

Import a component from its package entry point and include the shared CSS in your global stylesheet:

```tsx
import { Button } from '@brkta/ui-react/button';

export function Example() {
  return <Button variant="primary">Continue</Button>;
}
```

```css
@import "@brkta/design-tokens/theme.css";
@import "@brkta/ui-core/styles/components.css";
```

See the [Next.js guide](../../docs/getting-started/nextjs.md), [component docs](../../docs/README.md#components-and-contribution), and [live Storybook](https://ic0nk.github.io/brkta-design-system/react/).
