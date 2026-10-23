# Migrating an existing app from workspace packages

If your application currently consumes BRKTA packages through a local pnpm workspace or `link:` dependencies, move it to published GitHub Packages versions.

1. Create a GitHub token with `read:packages` permission.
2. Configure the `@brkta` registry and token in your user-level npm configuration, as shown in the [getting started guide](docs/getting-started/nextjs.md). Do not commit credentials.
3. Replace local workspace/link package specifications with published versions of the packages your framework needs. Use `@brkta/ui-angular` for Angular or `@brkta/ui-react` for React, plus `@brkta/design-tokens` and `@brkta/ui-core` as appropriate.
4. Remove app-local copies of shared component CSS and import the shared token and component styles from the packages.
5. Run your app's build and tests, then update the lockfile with your normal package-manager workflow.

For fresh projects, use the [`@brkta/cli`](docs/cli.md). For package/API differences, check the [release notes](https://github.com/ic0nk/brkta-design-system/releases) and package documentation.
