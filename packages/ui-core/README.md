# `@brkta/ui-core`

Framework-neutral component contracts, shared CSS recipes, and types. React and Angular wrappers use the same contracts and `data-*` selectors so component behavior and styling stay aligned.

## Install

```sh
pnpm add @brkta/ui-core @brkta/design-tokens
```

Configure GitHub Packages access with a user-level token that has `read:packages`; see the [getting started guide](../../docs/README.md#getting-started).

## Use shared CSS

Import the aggregate component stylesheet in your global CSS:

```css
@import "@brkta/design-tokens/theme.css";
@import "@brkta/ui-core/styles/components.css";
```

You can import one recipe instead, for example `@brkta/ui-core/button/button.css`. Use the matching React or Angular wrapper for interactive components; see [component docs](../../docs/README.md#components-and-contribution).
