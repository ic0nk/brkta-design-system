# Color Picker

> An input for selecting and editing an opaque color value.

## Overview

The color picker provides a color well, saturation/brightness plane, hue slider, RGB channel inputs, and hexadecimal entry. It emits canonical `#RRGGBB` values. Use it when people need direct color selection; use semantic design tokens for ordinary component styling.

## Usage

### React

```tsx
import { ColorPicker } from '@brkta/ui-react/color-picker';

<ColorPicker ariaLabel="Accent color" value={color} onValueChange={setColor} />
```

### Angular

```ts
import { ColorPickerComponent } from '@brkta/ui-angular';
```

```html
<brkta-color-picker ariaLabel="Accent color" [value]="color" (valueChange)="setColor($event)"></brkta-color-picker>
```

## API

| Input / prop | Type | Description |
| --- | --- | --- |
| `value` | `string` | Controlled color value. |
| `defaultValue` | `string` | Initial uncontrolled value. |
| `onValueChange` / `valueChange` | callback | Receives canonical `#RRGGBB` values. |
| `ariaLabel` | `string` | Accessible name for the picker. |
| `disabled` | `boolean` | Prevents interaction. |
| `invalid` | `boolean` | Displays the invalid state. |
| `hexLabel`, `hueLabel`, `planeLabel`, `redLabel`, `greenLabel`, `blueLabel` | `string` | Localizable labels for the editor controls. |

## Accessibility

- Give the picker a localized accessible name and provide localized labels for its controls.
- The saturation/brightness plane supports pointer input and Arrow/Home/End keys.
- Hue and RGB controls use native keyboard-operable inputs.
- The current color is shown as text as well as a swatch; color is not the only indicator.
- Verify color contrast in the context where the selected value is applied.

## Data attributes

| Attribute | Purpose |
| --- | --- |
| `data-brkta-color-picker` | Root container |
| `data-brkta-color-picker-trigger` | Visible color-well button |
| `data-brkta-color-picker-swatch` | Color preview |
| `data-brkta-color-picker-popover` | Editor surface |
| `data-brkta-color-picker-plane` | Saturation and brightness editor |
| `data-brkta-color-picker-hue` | Hue range input |
