# Get started with Next.js

## 1. Configure GitHub Packages access once

The packages are hosted at `npm.pkg.github.com`. Create a GitHub token with `read:packages` permission. Configure the `@brkta` registry:

```sh
npm config set @brkta:registry https://npm.pkg.github.com
```

Add the following to your **user-level** npm configuration (`~/.npmrc` on macOS/Linux or the `.npmrc` in your Windows user profile). This must be configured before `pnpm dlx @brkta/cli` because pnpm needs credentials to download the CLI itself.

```ini
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Set `GITHUB_TOKEN` in your shell or secret store; do not commit a token or a user `.npmrc` file to your project.

## 2. Initialize your Next.js app

From the directory containing `package.json`, run:

```sh
pnpm dlx @brkta/cli init
```

The CLI detects React/Next.js, installs `@brkta/ui-react`, adds token/shared CSS imports to a detected global stylesheet, and creates `brkta.json`. If detection is ambiguous, pass `--framework react`. To postpone package installation, pass `--skip-install`.

## 3. Add and use a component

```sh
pnpm dlx @brkta/cli add button
```

Import the component from its documented package entry point:

```tsx
import { Button } from '@brkta/ui-react/button';

export function Example() {
  return <Button variant="primary">Save</Button>;
}
```

## 4. Update

```sh
pnpm dlx @brkta/cli update
```

Use `pnpm dlx @brkta/cli update --check` to check for updates without applying them. See the complete [CLI reference](../cli.md).
