# Combobox

## Overview

A searchable select combobox with a text input and filterable options list. Supports keyboard navigation and ARIA combobox pattern.

## Data Attributes

| Attribute                     | Element | Purpose              |
| ----------------------------- | ------- | -------------------- |
| `data-brkta-combobox`         | Root    | Combobox container   |
| `data-brkta-combobox-trigger` | Trigger | Input wrapper        |
| `data-brkta-combobox-input`   | Input   | Search/display input |
| `data-brkta-combobox-list`    | List    | Options listbox      |
| `data-brkta-combobox-option`  | Option  | Individual option    |
| `data-brkta-combobox-empty`   | Empty   | No-results state     |

## API

| Prop           | Type               | Default               | Description                                     |
| -------------- | ------------------ | --------------------- | ----------------------------------------------- |
| `options`      | `ComboboxOption[]` | `[]`                  | Available options                               |
| `inputId`      | `string`           | generated             | Input id; pair with a visible label's `htmlFor` |
| `ariaLabel`    | `string`           | —                     | Accessible name when there is no visible label  |
| `value`        | `string`           | —                     | Controlled value                                |
| `defaultValue` | `string`           | `''`                  | Uncontrolled default                            |
| `placeholder`  | `string`           | `'Search...'`         | Input placeholder                               |
| `disabled`     | `boolean`          | `false`               | Disables                                        |
| `invalid`      | `boolean`          | `false`               | Invalid state                                   |
| `emptyText`    | `string`           | `'No results found.'` | Empty list message                              |

## Accessibility

- `role="combobox"` on input, `role="listbox"` on list, `role="option"` on options
- `aria-expanded`, `aria-haspopup`, `aria-autocomplete`, `aria-controls`
- `aria-activedescendant` tracks active option
- A consumer-provided `inputId` is applied to the input, so a visible `brkta-label` can target it
- Keyboard: ArrowDown/Up, Enter to select, Escape to close
- `data-active` visual highlight on keyboard-focused option
