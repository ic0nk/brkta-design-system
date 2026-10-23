# `@brkta/design-tokens`

CSS design tokens, semantic light/dark themes, base styles, font imports, and optional glass utilities for BRKTA Design System consumers.

## Install

```sh
pnpm add @brkta/design-tokens
```

The package is hosted on GitHub Packages; configure the `@brkta` registry and a token with `read:packages` in your user-level npm configuration first. See the [getting started guide](../../docs/README.md#getting-started).

## Use

Import tokens and base styles in your application's global stylesheet:

```css
@import "@brkta/design-tokens/fonts.css";
@import "@brkta/design-tokens/theme.css";
@import "@brkta/design-tokens/base.css";
```

The default theme is light. Add `.dark` to a root element to enable dark token values. Glass utilities are optional: `@import "@brkta/design-tokens/glass.css";`.

See [theming](../../docs/theming.md) and the [design foundations](../../docs/README.md#foundations). Font licensing is included in `fonts/OFL.txt`.
