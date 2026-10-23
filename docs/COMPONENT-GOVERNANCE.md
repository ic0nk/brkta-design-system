# Component governance

This guide describes how to propose, implement, document, test, and maintain reusable components in the public BRKTA Design System.

## When a pattern belongs in the system

A component belongs in a shared package when it provides reusable visual or behavioral behavior rather than page-specific composition. Check the [component registry](component-registry.json), package exports, and Storybook examples before proposing a new component. A variant or extension of an existing component is usually preferable to a duplicate.

## Proposals

Use the [component request issue form](https://github.com/ic0nk/brkta-design-system/issues/new?template=component_request.yml). Include:

- Purpose, intended users, and representative use cases.
- Frameworks and package layers that need to support it.
- Variants, sizes, states, and expected interaction.
- Keyboard behavior and accessibility considerations.
- Dependencies and relationships to existing components.

Discuss the proposal before implementing a large API or design change.

## Package ownership

- `@brkta/design-tokens`: semantic tokens, themes, and shared visual foundations.
- `@brkta/ui-core`: framework-neutral contracts and shared CSS recipes.
- `@brkta/ui-react`: React wrappers.
- `@brkta/ui-angular`: Angular wrappers.

## Implementation checklist

For components supported in both frameworks, preserve API, behavior, semantics, and visual output across both wrappers:

1. Contract and CSS recipe in `packages/ui-core/`.
2. React and Angular wrappers in their corresponding packages.
3. Tests for both wrappers.
4. Stories for both frameworks.
5. Component documentation under `docs/components/`.
6. Registry update in `docs/component-registry.json`.
7. Changeset for affected packages.

Framework-specific support is acceptable when needed; document any parity gap instead of implying both implementations exist.

## Documentation and verification

Document installation/import paths that exist in the package exports. Describe keyboard and screen-reader behavior, responsive behavior, theme support, RTL behavior, and reduced motion where applicable. Run focused package tests plus repository checks described in [CONTRIBUTING.md](../CONTRIBUTING.md). Accessibility targets are goals; avoid asserting compliance without evidence.

## Deprecation

When a public API is superseded, document the replacement and migration path, mark it as deprecated, and coordinate removal through a breaking release. Keep release notes and changesets accurate.
