# Design system governance

The design system provides shared component contracts, styles, and tokens for Angular and React consumers. Use the published packages and documented patterns rather than recreating reusable UI in application code.

## Package boundaries

| Package | Owns |
| --- | --- |
| `@brkta/design-tokens` | Semantic CSS tokens, themes, fonts, and effects |
| `@brkta/ui-core` | Framework-neutral contracts, types, and shared CSS recipes |
| `@brkta/ui-react` | React component wrappers |
| `@brkta/ui-angular` | Angular component wrappers |
| `@brkta/platform-core` | Framework-neutral platform primitives |
| `@brkta/icons` | Icon assets and brand artwork (see brand restrictions) |

## Before building reusable UI

1. Search [component documentation](components/) and the [component registry](component-registry.json).
2. Inspect the package's public exports and Storybook examples for existing variants and states.
3. If a reusable pattern is missing, propose it using the [component request form](https://github.com/ic0nk/brkta-design-system/issues/new?template=component_request.yml).

Application-specific page composition can combine package components. Reusable visual behavior belongs in the shared packages rather than duplicated CSS or local component copies.

## New component checklist

Implement a shared component in this order:

1. Add the framework-neutral contract and shared CSS recipe to `packages/ui-core/`.
2. Add framework wrappers to `packages/ui-react/` and `packages/ui-angular/` when supported.
3. Add tests for both implementations.
4. Add stories in the corresponding Storybook projects.
5. Document usage in `docs/components/` and update `docs/component-registry.json`.
6. Add a changeset for affected packages.

## Quality expectations

- Use semantic tokens and keep Angular and React variants aligned.
- Cover keyboard access, visible focus, disabled/loading states, and accessible names where applicable.
- Respect reduced motion, light/dark themes, responsive layouts, and RTL.
- Validate examples against package exports; do not claim a compliance or test result unless it has been checked.

For contributor setup and required checks, see [CONTRIBUTING.md](../CONTRIBUTING.md).
