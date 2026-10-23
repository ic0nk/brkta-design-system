# BRKTA Design System

Standalone pnpm monorepo for BRKTA tokens, shared UI contracts/styles, React and Angular components, platform primitives, and governed icons. Packages publish privately to GitHub Packages under `@brkta`.

## Quick start with the CLI

Run the setup wizard from an Angular or React/Next.js project:

```sh
pnpm dlx @brkta/cli init
pnpm dlx @brkta/cli add button
```

The CLI detects the framework and package manager, configures the GitHub Packages registry without embedding credentials, and adds design-system styles. Set `GITHUB_TOKEN` to a classic GitHub PAT with `read:packages` before installing. Use `--css minimal` to add component CSS only as components are selected, and `pnpm dlx @brkta/cli update` to update installed BRKTA packages. The manual setup below remains available as a fallback.

## Consumer setup

Configure the consuming project’s `.npmrc` (use a classic GitHub PAT with `read:packages`; never commit the token):

```ini
@brkta:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Set `GITHUB_TOKEN` in your shell/CI secret store. Install for Angular:

```sh
pnpm add @brkta/ui-angular @brkta/design-tokens @brkta/ui-core @brkta/icons
```

Install for Next.js/React:

```sh
pnpm add @brkta/ui-react @brkta/design-tokens @brkta/ui-core @brkta/icons
```

Import the semantic tokens and shared component recipes in the application’s global stylesheet:

```css
@import "@brkta/design-tokens/fonts.css";
@import "@brkta/design-tokens/theme.css";
@import "@brkta/design-tokens/base.css";
@import "@brkta/ui-core/styles/components.css";
```

Check for available updates with `pnpm outdated "@brkta/*"`. To update all BRKTA packages together, add this consumer script and run it:

```json
{ "scripts": { "ds:update": "pnpm update \"@brkta/*\" --latest" } }
```

```sh
pnpm ds:update
```

## Development

Requirements: Node `>=24.0.0 <25`, pnpm 11.17.0. Install with `pnpm install`; run `pnpm build`, `pnpm test`, and `pnpm verify:pack` before submitting changes. `pnpm storybook:react` and `pnpm storybook:angular` launch each component catalog.

For local consumer development, in the package checkout run `pnpm link --global` and in the consumer run `pnpm link --global @brkta/ui-react` (or the package needed). Alternatively use a local `link:` dependency, for example `"@brkta/ui-react": "link:../brkta-design-system/packages/ui-react"`, with sibling package links set up similarly. Rebuild with `pnpm build` after source changes.

## Releases

Create a changeset with `pnpm changeset`, commit it, and merge to `main`. The Release Action builds and tests, opens version/changelog PRs as needed, then publishes approved versions to GitHub Packages.

## Brand assets

The original `packages/Brand-Logo` files are published within `@brkta/icons/brand/` with original filenames and formats. Use package paths such as `@brkta/icons/brand/BRKTA/Logo-light-brkta.svg`.
