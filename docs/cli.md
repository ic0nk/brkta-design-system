# CLI reference

The `@brkta/cli` executable is named `brkta`. Run it through pnpm, for example `pnpm dlx @brkta/cli init`. Before using `pnpm dlx`, configure `@brkta:registry` and a GitHub Packages `read:packages` token in your user-level npm configuration; see the [Angular](getting-started/angular.md) or [Next.js](getting-started/nextjs.md) guide.

## `init`

```sh
pnpm dlx @brkta/cli init [--framework angular|react] [--css all|minimal] [--yes] [--skip-install] [--cwd <dir>]
```

Initializes the current project. It detects Angular vs React/Next.js from dependencies, chooses the package manager from lockfiles, writes the project `.npmrc` registry/token environment reference, updates a detected stylesheet, writes a `ds:update` script if absent, and creates `brkta.json`. It installs only the matching framework package unless skipped.

Flags:

- `--framework angular|react`: explicitly select the framework when detection is ambiguous. Any other value is rejected.
- `--css all|minimal`: install all component CSS (default `all`) or add CSS as components are selected. Other values are rejected.
- `--yes`: prevent interactive framework selection; if no framework is detected, an explicit `--framework` is required.
- `--skip-install`: configure the project without invoking the package manager to install the framework package.
- `--cwd <dir>`: use the specified project directory instead of the current working directory.

The CLI warns if neither `GITHUB_TOKEN` nor `NODE_AUTH_TOKEN` is set. The credential must be available to the package manager for successful private-scope package reads.

## `add`

```sh
pnpm dlx @brkta/cli add <component...> [--cwd <dir>]
```

Adds one or more component names to `brkta.json`. In `minimal` CSS mode, it adds the component and shared CSS imports to the managed stylesheet block. In `all` mode, CSS is unchanged. The command prints the framework-specific import/selector guidance and rejects unknown names with suggestions.

- `<component...>`: one or more names from the CLI component manifest.
- `--cwd <dir>`: use a project directory other than the current directory.

## `update`

```sh
pnpm dlx @brkta/cli update [--check] [--cwd <dir>]
```

Updates the `@brkta/*` packages found in the current project's dependencies. `--check` runs the package manager's outdated check without updating. `--cwd <dir>` selects a different project directory. Package-manager behavior is selected from the lockfile: pnpm updates `@brkta/*` with `--latest`; Yarn, Bun, and npm use their corresponding update/outdated commands.

## `list`

```sh
pnpm dlx @brkta/cli list
```

Prints every component in the CLI manifest and whether it is available for Angular and React. This command has no implemented flags.

## Help and version

```sh
pnpm dlx @brkta/cli --help
pnpm dlx @brkta/cli --version
```

Help is also available as `-h` or after a command with `--help`. Version is also available as `-v`. `--cwd` is accepted by `init`, `add`, and `update`.
