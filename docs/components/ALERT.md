# Alert

> An inline feedback message that communicates information, success, warning, or destructive states. Alerts appear within the page flow and are not transient.

---

## When to use

- Show the result of an action (success, error).
- Display important information that needs user attention.
- Warn about potential issues or destructive consequences.
- Provide contextual help or tips.

Do not use Alert for transient notifications. Use Toast for temporary messages that disappear automatically.

---

## Implementation

| Layer | Location |
|-------|----------|
| Contract | `@brkta/ui-core/alert/alert-contract.ts` |
| CSS | `@brkta/ui-core/alert/alert.css` |
| React | `@brkta/ui-react/alert` (`Alert`, `AlertTitle`, `AlertDescription`) |
| Angular | `@brkta/ui-angular` (`AlertComponent`, `AlertTitleComponent`, `AlertDescriptionComponent`) |

---

## React

```tsx
import { Alert, AlertTitle, AlertDescription } from '@brkta/ui-react/alert';

<Alert variant="information">
  <AlertTitle>New update available</AlertTitle>
  <AlertDescription>Version 2.4.0 includes security improvements.</AlertDescription>
</Alert>

<Alert variant="success">
  <AlertTitle>Invoice sent</AlertTitle>
  <AlertDescription>The invoice has been emailed to the customer.</AlertDescription>
</Alert>

<Alert variant="warning">
  <AlertTitle>Approaching storage limit</AlertTitle>
  <AlertDescription>You are using 85% of your available storage.</AlertDescription>
</Alert>

<Alert variant="destructive">
  <AlertTitle>Error saving changes</AlertTitle>
  <AlertDescription>Please check your connection and try again.</AlertDescription>
</Alert>
```

## Angular

```html
<brkta-alert variant="information">
  <brkta-alert-title>New update available</brkta-alert-title>
  <brkta-alert-description>Version 2.4.0 includes security improvements.</brkta-alert-description>
</brkta-alert>
```

---

## Variants

| Variant | Color | Use Case |
|---------|-------|----------|
| `information` | Blue/info | General information, tips, updates |
| `success` | Green | Success confirmations, completed actions |
| `warning` | Amber/yellow | Warnings, approaching limits, potential issues |
| `destructive` | Red | Errors, failures, destructive confirmations |

## Visual Recipe

Alert backgrounds use a transparent tint of the status token:

```css
background-color: color-mix(in oklch, var(--brkta-alert-color) 14%, transparent);
border-color: color-mix(in oklch, var(--brkta-alert-color) 28%, transparent);
```

Do not mix alert status colors directly with `--background`. The warm cream background has its own hue, and low-percentage OKLCH mixes can shift blue/green/red alerts toward beige instead of preserving the status color.

## Structure

An Alert can contain:
- **Icon** (optional) — an icon element with `data-brkta-alert-icon`.
- **Title** (optional) — a short heading with `data-brkta-alert-title`.
- **Description** (optional) — the message body with `data-brkta-alert-description`.
- **Action** (optional) — a button or link with `data-brkta-alert-action`.

## Accessibility

- Alert has `role="alert"` for screen reader announcement.
- Do not use Alert for critical system errors that require immediate user action. Use a Dialog for blocking errors.

## Related

- **Toast** — For transient notifications.
- **Dialog** — For blocking messages requiring user action.
