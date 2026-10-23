# Input OTP

## Overview

One-time password input with individually focused slots. Supports paste, backspace navigation, and keyboard arrow movement.

## Data Attributes

| Attribute | Element | Purpose |
|-----------|---------|---------|
| `data-brkta-input-otp` | Root | OTP container |
| `data-brkta-input-otp-slot` | Input | Individual digit slot |

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `length` | `number` | `6` | Number of slots |
| `value` | `string` | — | Controlled value |
| `defaultValue` | `string` | `''` | Uncontrolled default |
| `disabled` | `boolean` | `false` | Disables input |
| `invalid` | `boolean` | `false` | Invalid state |
| `onComplete` | `(v: string) => void` | — | Fires when all slots filled |

## Accessibility

- Each slot has `aria-label="Digit N"`
- `inputMode="numeric"`, `autoComplete="one-time-code"`
- Backspace: clears current, then previous slot
- ArrowLeft/ArrowRight: moves between slots
- Paste: strips non-digits, truncates to length
