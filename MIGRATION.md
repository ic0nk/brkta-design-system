# BRKTA application repository migration (future)

This document describes a later migration only; the source application repository is not changed by this extraction.

1. Configure the application repository’s `.npmrc` for `@brkta` on GitHub Packages and store a classic PAT with `read:packages` as `GITHUB_TOKEN` in local/CI secret storage. Never commit credentials.
2. Replace each internal BRKTA `workspace:*` dependency with the corresponding released version (initially `^0.1.0`) and install using pnpm.
3. Keep the application imports on the same public package subpaths. Keep the global CSS imports for `@brkta/design-tokens/*` and `@brkta/ui-core/styles/components.css`.
4. Remove only the app repository’s workspace package declarations/aliases after all consumers have switched; validate dashboard and website builds, tests, and design-system audit before merging.
5. Verify the lockfile resolves from GitHub Packages and CI has package-read access.
