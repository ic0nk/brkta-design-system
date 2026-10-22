# Date Picker

> Wave 5 — Advanced Inputs + Pickers

## Overview

A trigger button that opens a Calendar popover for date selection. Uses the Calendar component internally.

## Data Attributes

| Attribute | Element | Purpose |
|-----------|---------|---------|
| `data-brkta-date-picker` | Root | Date picker container |
| `data-brkta-date-picker-trigger` | Button | Open/display trigger |
| `data-brkta-date-picker-trigger-value` | Span | Date or placeholder text |
| `data-brkta-date-picker-popover` | Wrapper | Popover container |

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Date` | — | Controlled value |
| `defaultValue` | `Date` | — | Uncontrolled default |
| `placeholder` | `string` | `'Select date...'` | Placeholder text |
| `disabled` | `boolean` | `false` | Disables |
| `invalid` | `boolean` | `false` | Invalid state |
| `minDate` | `Date` | — | Min selectable date |
| `maxDate` | `Date` | — | Max selectable date |

## Accessibility

- `aria-haspopup="dialog"`, `aria-expanded` on trigger
- Calendar SVG has `aria-hidden="true"`
- Escape key closes the popover
- Click-outside closes the popover
- Inherits all Calendar accessibility attributes
