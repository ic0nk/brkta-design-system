# Sidebar

## Overview

An app navigation shell primitive with collapsible/expanded states. Supports header, nav items with badges, footer, and a compact rail variant. Its public layout variants are `standalone` and `embedded`; the standalone wrapper may omit `data-variant` as an implementation detail.

## Data Attributes

| Attribute                       | Element          | Purpose                |
| ------------------------------- | ---------------- | ---------------------- |
| `data-brkta-sidebar`            | Root (`<aside>`) | Sidebar container      |
| `data-brkta-sidebar-header`     | Div              | Header area            |
| `data-brkta-sidebar-nav`        | `<nav>`          | Navigation list        |
| `data-brkta-sidebar-item`       | Button           | Each nav item          |
| `data-brkta-sidebar-item-icon`  | Span             | Icon slot              |
| `data-brkta-sidebar-item-label` | Span             | Text label             |
| `data-brkta-sidebar-item-badge` | Span             | Count badge            |
| `data-brkta-sidebar-toggle`     | Button           | Collapse/expand toggle |

## Variants

| Variant    | Attribute                                                          | Description                                                                                                                                                                                                                                                |
| ---------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Standalone | `data-variant="standalone"` (or omitted by the standalone wrapper) | Standalone sidebar with a `260px` expanded width, `64px` collapsed rail, surface background, end border, and viewport-height minimum.                                                                                                                      |
| Embedded   | `data-variant="embedded"`                                          | Fills the containing block with `inline-size: 100%` and `block-size: 100%`; removes the standalone background, outer shadow, end border, and header divider. The compact `64px` collapsed rail, nav scrolling, and focus-visible styling remain available. |

Embedded sizing requires the containing layout to provide a usable block size. The embedded variant does not add elevation; any surrounding `.navigation-card` elevation is owned by that card pattern and is out of scope for Sidebar.

## API

| Prop                | Type                         | Default      | Description                                     |
| ------------------- | ---------------------------- | ------------ | ----------------------------------------------- |
| `items`             | `SidebarItemContract[]`      | `[]`         | Navigation items                                |
| `variant`           | `'standalone' \| 'embedded'` | `standalone` | Standalone shell or container-filling layout    |
| `collapsed`         | `boolean`                    | —            | Controlled collapse state                       |
| `showCollapseToggle` | `boolean`                   | `true`       | Whether the wrapper renders the collapse/expand toggle control |
| `header`            | `string`                     | —            | Header title                                    |
| `footer`            | `string`                     | —            | Footer text                                     |
| `onCollapsedChange` | `(boolean) => void`          | —            | Collapse callback                               |
| `onItemSelect`      | `(item) => void`             | —            | Selection callback for enabled navigation items |

### SidebarItemContract

| Prop       | Type                                                      | Description                                          |
| ---------- | --------------------------------------------------------- | ---------------------------------------------------- |
| `value`    | `string`                                                  | Unique identifier                                    |
| `label`    | `string`                                                  | Display label                                        |
| `icon`     | `unknown` (React: `ReactNode`, Angular: icon name string) | Icon rendered via BRKTA animated icon components |
| `active`   | `boolean`                                                 | Active state (sets `aria-current="page"`)            |
| `disabled` | `boolean`                                                 | Disabled state                                       |
| `badge`    | `string \| number`                                        | Count badge                                          |

`onItemSelect` receives the selected `SidebarItemContract`. Angular exposes the same
selection as the `itemSelect` output. The Sidebar only reports selection; routing and
authorization remain application concerns.

## Icon Rendering

**React:** Accepts any `ReactNode` — pass a BRKTA animated icon wrapper or `lucide-react` component with `brkta-icon-motion` classes. Icons render inside `[data-brkta-sidebar-item-icon]` with `aria-hidden="true"`.

**Angular:** Accepts an icon name string (e.g. `'dashboard'`, `'users'`, `'settings'`). The component uses an `@if`/`@else-if` chain to render the matching BRKTA animated icon component (`<brkta-animated-dashboard>`, `<brkta-animated-users>`, etc.). 17 icon names are supported; unrecognized names render no icon.

## Design Notes

- Standalone: expanded width `260px`, collapsed width `64px`, `var(--surface)` background, inline end border, smooth width transition, and `100vh` minimum height
- Embedded: logical and physical safe sizing to the parent (`100%` width/height), transparent background, no outer shadow, no inline end border, and no `100vh` minimum height
- Embedded collapsed header: `gap: 0` and `padding-inline: var(--space-2)`; its collapse toggle uses `var(--height-md)` logical sizing, a `100%` inline-size cap, borderless styling, and retains centered collapse behavior plus the visible focus outline
- Collapsed mode hides labels and badges, centers icons
- Active item uses the solid `var(--navigation-active)` background with `var(--navigation-active-foreground)` text and bold weight
- Active item badge uses `var(--primary)` / `var(--primary-foreground)`
- Navigation retains vertical overflow scrolling in both variants
- Uses semantic `<aside>` and `<nav>` elements
- `showCollapseToggle` defaults to `true` for backward compatibility. When a wrapper omits the control with `false`, the Sidebar contract and CSS still support controlled collapse state, navigation scrolling, and visible focus styling; no additional CSS is required.
