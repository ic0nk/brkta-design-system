# Theming

## Import the design tokens

Import the design-token CSS and shared component recipes from your global stylesheet. The CLI adds these imports during `init`.

```css
@import "@brkta/design-tokens/fonts.css";
@import "@brkta/design-tokens/theme.css";
@import "@brkta/design-tokens/base.css";
@import "@brkta/ui-core/styles/components.css";
```

For component-by-component imports, use paths such as `@brkta/ui-core/button/button.css`. Optional glass utilities are available from `@brkta/design-tokens/glass.css`.

## Light and dark themes

Light mode is the default token set. Enable dark mode by adding `.dark` to a root element such as `<html>`:

```html
<html class="dark">
```

Components use semantic CSS custom properties, so they adapt when the theme class changes. Prefer semantic tokens such as `var(--background)`, `var(--foreground)`, and `var(--primary)` over hardcoded colors. See [colors](COLORS.md) for the token roles.

## RTL

Use logical CSS properties (`margin-inline`, `padding-inline`, `inset-inline-start`, and `text-align: start`) instead of physical left/right properties. Set the document direction on the root element when rendering right-to-left content:

```html
<html lang="ar" dir="rtl">
```

The direction component and shared styles support RTL-aware layouts. Verify focus order, icon direction, overlays, and mixed-direction text in the consuming application. Use locale-aware formatting for numbers, dates, and currencies.
