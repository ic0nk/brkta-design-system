# `@brkta/icons`

Static icon and brand artwork assets for BRKTA Design System consumers. Generic icon assets are MIT licensed; BRKTA, BRKTA ONE, and ICONK logos and brand marks are not licensed for reuse.

## Install

```sh
pnpm add @brkta/icons
```

The package is hosted on GitHub Packages; configure a user-level `read:packages` token and the `@brkta` registry before installing.

## Use

Reference an asset using its package subpath with the asset-loading behavior supported by your bundler:

```ts
import markUrl from '@brkta/icons/brkta-one-icon-dark.svg';
```

Use brand assets only to refer to BRKTA; do not use them to represent your own product or organization. Read the package [`LICENSE`](LICENSE) and repository [trademark guidance](../../TRADEMARKS.md) before using any artwork. See [icon guidance](../../docs/ICONS.md).
