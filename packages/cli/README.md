# `@brkta/cli`

Project setup and component helper CLI for BRKTA Design System. It detects Angular versus React/Next.js, configures shared styles, installs the matching UI package, and can list components or update installed BRKTA packages.

## Configure package access

Before `pnpm dlx`, configure the `@brkta` registry and a GitHub token with `read:packages` in your user-level npm configuration. See the [getting started guide](../../docs/README.md#getting-started).

## Use

```sh
pnpm dlx @brkta/cli init
pnpm dlx @brkta/cli add button
pnpm dlx @brkta/cli update
```

Run `pnpm dlx @brkta/cli --help` for the implemented usage. See the full [CLI reference](../../docs/cli.md).
