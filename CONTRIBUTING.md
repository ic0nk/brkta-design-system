# Contributing

Thanks for helping improve BRKTA Design System. Please open an issue first for substantial changes so the approach can be discussed before implementation.

## Development setup

Requirements: Node.js `>=24.0.0 <25` and pnpm `11`.

```sh
git clone https://github.com/ic0nk/brkta-design-system.git
cd brkta-design-system
pnpm install --frozen-lockfile
```

## Checks

Run these checks before opening a pull request:

```sh
pnpm build
pnpm test
pnpm verify:pack
```

Do not use `pnpm install --no-frozen-lockfile` over an existing `node_modules` directory. If a lockfile update is necessary, use `pnpm install --lockfile-only`, remove `node_modules`, then install with `pnpm install --frozen-lockfile`.

## Changesets and releases

Add a changeset for package changes:

```sh
pnpm changeset
```

Choose the affected packages and semver impact, then describe the user-visible change. Changesets are collected into release PRs; maintainers publish approved releases to GitHub Packages.

## Component checklist

A new shared component should include all of the following:

- Contract and CSS recipe in `packages/ui-core/`.
- React and Angular wrappers in `packages/ui-react/` and `packages/ui-angular/`.
- Tests for each framework implementation.
- Storybook stories for each framework where supported.
- Component documentation in `docs/components/` and an updated `docs/component-registry.json`.
- A changeset describing the package change.

Keep behavior and visual tokens aligned across frameworks, support keyboard and reduced-motion behavior where relevant, and avoid claiming accessibility compliance without verification.

## Pull requests

Use the pull request template. Keep changes focused, explain validation performed, and do not include credentials or unrelated generated files. See [Code of Conduct](CODE_OF_CONDUCT.md) and [Security](SECURITY.md).
