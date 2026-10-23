# Icons

Use Lucide geometry for general-purpose interface icons. React wrappers are provided through `lucide-react` where used in the package; Angular consumers should use the BRKTA-owned animated icon exports from `@brkta/ui-angular`. Shared motion recipes live in `@brkta/ui-core/icon-motion/icon-motion.css`.

## Usage principles

- Keep general-purpose icons consistent in stroke, scale, and visual weight.
- Use semantic icon names and do not use emoji as replacements for interface icons.
- Give icon-only controls an accessible name on the control. Icons beside visible text are decorative and should be hidden from assistive technology.
- Use logical direction-aware variants for directional icons in RTL layouts.
- Respect `prefers-reduced-motion`; motion must not be required to understand a control.

React animated icon wrappers are exported from `@brkta/ui-react/animated-icons`; Angular wrappers are exported from `@brkta/ui-angular`. The owning interactive component supplies its accessible label.

## Generic icons and licensing

Lucide icons are available under the ISC License. The runtime React dependency is `lucide-react`; use framework-appropriate wrapper exports rather than importing React code into Angular. See [Lucide license](https://github.com/lucide-icons/lucide/blob/main/LICENSE).

## BRKTA brand assets

Brand logos and marks are not licensed for reuse. You may display a mark only to refer to BRKTA; do not use it to represent your own product or organization. The restriction covers `packages/icons/brand/**` and `brkta-*` / `iconk-*` SVGs at the package root. See [`packages/icons/LICENSE`](../packages/icons/LICENSE) and [TRADEMARKS.md](../TRADEMARKS.md).

For generic package icon assets and paths, see [`@brkta/icons`](../packages/icons/README.md).
