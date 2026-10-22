# Theme Toggle

`ThemeToggle` is the shared icon-only control for selecting the application theme mode.

The component is deliberately presentation-only: it receives the current `light`, `dark`, or `system` mode and the resolved theme, then emits the next mode. Applications connect those values to `@brkta/platform-core`'s theme engine and preference store so resolution follows the shared precedence rules and persists across reloads.

The control uses the shared ghost icon-button treatment without a bordered surface. The accessible name describes the next mode, and each mode has a distinct governed icon: monitor for `system`, sun for `light`, and moon for `dark`. The `brkta-icon-motion` wrappers share the reduced-motion rule, which disables their non-essential motion when requested.
