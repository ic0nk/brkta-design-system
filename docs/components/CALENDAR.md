# Calendar

## Overview

A month calendar grid with selectable days, keyboard navigation, and today/selected/disabled day states.

## Data Attributes

| Attribute | Element | Purpose |
|-----------|---------|---------|
| `data-brkta-calendar` | Root | Calendar container |
| `data-brkta-calendar-header` | Header | Month/year bar |
| `data-brkta-calendar-title` | Title | Month/year text |
| `data-brkta-calendar-nav` | Button | Month nav buttons |
| `data-brkta-calendar-grid` | Grid | Day grid (`role="grid"`) |
| `data-brkta-calendar-weekday` | Header | Weekday label |
| `data-brkta-calendar-day` | Button | Day cell |

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `month` | `Date` | — | Controlled displayed month |
| `defaultMonth` | `Date` | Now | Uncontrolled month |
| `selected` | `Date` | — | Controlled selected date |
| `defaultSelected` | `Date` | — | Uncontrolled selection |
| `minDate` | `Date` | — | Minimum selectable |
| `maxDate` | `Date` | — | Maximum selectable |
| `disabled` | `boolean` | `false` | Disables interaction |

## Keyboard Navigation

| Key | Action |
|-----|--------|
| ArrowLeft/Right | Previous/next day |
| ArrowUp/Down | Previous/next week |
| Home | Start of week |
| End | End of week |
| PageUp | Previous month |
| PageDown | Next month |

Each day button uses `aria-label` with full date context (e.g., "Wednesday, July 15, 2026"). Roving tabindex: only the focused day has `tabIndex={0}`.
