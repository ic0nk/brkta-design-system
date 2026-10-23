# Scroll Area

## Overview

A styled scrollable container with custom scrollbar styling. Supports vertical and horizontal overflow.

## Data Attributes

| Attribute | Element | Purpose |
|-----------|---------|---------|
| `data-brkta-scroll-area` | Root | Scroll area container |
| `data-brkta-scroll-area-viewport` | Inner div | Scrollable viewport |
| `data-brkta-scroll-area-content` | Inner div | Content wrapper |
| `data-scroll="horizontal"` | Root | Horizontal scroll mode |

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `maxHeight` | `string` | `'300px'` | Maximum height |
| `maxWidth` | `string` | `'100%'` | Maximum width |
| `horizontalScroll` | `boolean` | `false` | Enable horizontal scroll |

## Design Notes

- Uses CSS `scrollbar-width: thin` with `scrollbar-color: var(--muted) transparent`
- WebKit custom scrollbar styling with rounded thumbs
- Viewport has `border` and `--card` background
- Horizontal mode uses `white-space: nowrap` and `inline-block` content
- Tokens: `--card`, `--border`, `--muted`, `--muted-foreground`, `--radius-md`
