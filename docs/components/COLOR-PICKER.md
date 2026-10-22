# Colour Picker

> Advanced input — customer-owned branding values only.

## Overview

Colour Picker is the governed visual editor for opaque customer colour values. It uses a visible colour well, a saturation/brightness plane, hue slider, RGB channels, and exact hex entry. It emits canonical `#RRGGBB` output.

Use it for a fixed, server-authorised colour role. Do not use it to expose arbitrary product-theme tokens, saved/recent colours, status colours, or the BRKTA creamy neutral foundation.

## Branding roles

The Branding screen exposes five normal roles first. Its progressive **Advanced colours** section may split those values into only these server-authorised roles: buttons, links, active navigation, highlights, secondary emphasis, page and card backgrounds, body text, headings, borders, dividers, and secondary text. An unset advanced role inherits its normal role; it is never a new customer-defined CSS property.

The normal **Surface** role applies to the dashboard shell, sidebar, and grouped surfaces. The advanced **Page background** and **Card background** roles can override those layers independently, keeping the work area visually distinct from the shell.

## API

| Input | Type | Description |
| --- | --- | --- |
| `value` | `string` | Controlled opaque hex value. |
| `defaultValue` | `string` | Initial uncontrolled value. |
| `valueChange` / `onValueChange` | callback | Receives canonical `#RRGGBB`. |
| `ariaLabel` | `string` | Required accessible name. |
| `invalid` | `boolean` | Displays the validation state. |
| `disabled` | `boolean` | Prevents interaction. |

## Accessibility

- The trigger is a labelled button with the current hex value.
- The colour plane supports pointer interaction and Arrow/Home/End keys.
- Hue and RGB controls use native keyboard-operable range/number inputs.
- Escape closes the React implementation when focus is inside the popover.
- Colour is always accompanied by a textual hex value; it is never the only state indicator.

## Data attributes

| Attribute | Purpose |
| --- | --- |
| `data-brkta-color-picker` | Root container |
| `data-brkta-color-picker-trigger` | Visible colour-well button |
| `data-brkta-color-picker-swatch` | Colour preview |
| `data-brkta-color-picker-popover` | Visual editor surface |
| `data-brkta-color-picker-plane` | Saturation and brightness editor |
| `data-brkta-color-picker-hue` | Hue range input |
