# @brkta/design-tokens

> **Single source of truth** for every visual token used across BRKTA.

This package provides CSS custom properties, a base reset, and glass-effect
recipes consumed by both the **Angular dashboard** (`apps/dashboard`) and the
**Next.js website** (`apps/website`).

---

## Files

| File          | Purpose                                                                 |
|---------------|-------------------------------------------------------------------------|
| `fonts.css`   | Self-hosted font-face declarations via `@fontsource-variable` packages (Geist Sans, Geist Mono, Noto Sans Arabic). Must be imported first. |
| `theme.css`   | Full semantic colour system (light + dark), typography, spacing, radii, shadows, motion, z‑index, opacity. **The most important file.** |
| `base.css`    | CSS reset (`box-sizing`, font smoothing, scroll behaviour, typography defaults) and Tailwind v4 `@custom-variant dark` declaration. |
| `glass.css`   | Frosted-glass utility classes using `backdrop-filter` and `color-mix()` for automatic theme adaptation. |

---

## Usage

### Tailwind v4 (both apps)

```css
/* In your main CSS file (e.g. styles.css, globals.css) */

/* 1. Self-hosted font faces (Geist, Geist Mono, Noto Sans Arabic) */
@import "@brkta/design-tokens/fonts.css";

/* 2. Base reset & core styles */
@import "@brkta/design-tokens/base.css";

/* 3. Semantic design tokens */
@import "@brkta/design-tokens/theme.css";

/* 4. Tailwind — must come after tokens */
@import "tailwindcss";

/* 5. Glass effects (optional) */
@import "@brkta/design-tokens/glass.css";
```

### Import from TypeScript / Angular `styles` array

```json
{
  "styles": [
    "@brkta/design-tokens/fonts.css",
    "@brkta/design-tokens/base.css",
    "@brkta/design-tokens/theme.css",
    "@brkta/design-tokens/glass.css"
  ]
}
```

For Angular, ensure your bundler resolves `@brkta/design-tokens` by adding the
package to your `tsconfig.json` paths or rely on the pnpm workspace resolution.

---

## Theming

- **Light theme** is the default (`:root`).
- **Dark theme** is activated by adding the `.dark` class to any ancestor
  element (typically `<html>` or `<body>`):

  ```html
  <html class="dark">…</html>
  ```

  The Tailwind v4 dark variant is configured via:

  ```css
  @custom-variant dark (&:is(.dark *));
  ```

  This means `dark:` utilities will apply when any ancestor has `.dark`.

---

## Colour Space

All colours use **OKLCH**, a perceptually-uniform colour space that provides:

- Consistent lightness perception across hues
- Wide gamut support (Display P3 capable)
- Predictable dark-mode transformations

---

## Brand Colours (Reference)

| Token     | Light             | Dark              |
|-----------|-------------------|-------------------|
| Foreground | `oklch(0.205 0 0)` | `oklch(0.985 0 0)` |
| Accent    | `oklch(0.92 0.3 120)` | `oklch(0.82 0.25 120)` |

---

## Conventions

- All CSS custom properties are prefixed with `--` and use kebab-case.
- Semantic colour tokens follow the `--{role}` / `--{role}-foreground` naming
  pattern popularised by shadcn/ui.
- No `!important` declarations are used anywhere in this package.
- The `@theme inline` block in `theme.css` maps every token to a Tailwind v4
  utility, so you can write `bg-background`, `text-foreground`, `border-border`,
  `shadow-md`, etc.

---

## Development

This package is part of the BRKTA monorepo and uses `pnpm` workspaces.

```sh
# Install all workspace dependencies (from repo root)
pnpm install

# Verify the package resolves correctly
pnpm --filter @brkta/design-tokens ls
```

---

## License

Proprietary — BRKTA.
