# `@brkta/platform-core`

Framework-neutral contracts and deterministic primitives for theme, locale, RTL direction, currency, money formatting, region, preferences, identity, consent, feature flags, date/time, accessibility, and translations. It has no framework, browser, provider, or backend-domain dependency.

## Install

```sh
pnpm add @brkta/platform-core
```

Configure GitHub Packages with a user-level token that has `read:packages` before installing. See the [documentation index](../../docs/README.md).

## Use

Import the specific public entry point required by your app. For example:

```ts
import { getLocaleDirection, resolveLocale } from '@brkta/platform-core/locale';

const locale = resolveLocale({ explicit: 'ar' }, ['en', 'ar']);
const direction = getLocaleDirection(locale); // 'rtl'
```

Adapters for browser APIs, storage, or a framework belong in the consuming application. See the package exports and the [theming guide](../../docs/theming.md).
