# `@brkta/ui-angular`

Standalone Angular components for the BRKTA Design System, using shared contracts and CSS recipes from `@brkta/ui-core`.

## Install

```sh
pnpm add @brkta/ui-angular @brkta/ui-core @brkta/design-tokens
```

Packages are served from GitHub Packages; configure the `@brkta` registry and a user-level token with `read:packages` before installing.

## Use

Import the standalone component in the Angular component that uses it:

```ts
import { Component } from '@angular/core';
import { ButtonComponent } from '@brkta/ui-angular';

@Component({
  standalone: true,
  imports: [ButtonComponent],
  template: `<brkta-button variant="primary">Continue</brkta-button>`,
})
export class ExampleComponent {}
```

Load tokens and shared CSS in the application global stylesheet:

```css
@import "@brkta/design-tokens/theme.css";
@import "@brkta/ui-core/styles/components.css";
```

See the [Angular guide](../../docs/getting-started/angular.md), [component docs](../../docs/README.md#components-and-contribution), and [live Storybook](https://ic0nk.github.io/brkta-design-system/angular/).
