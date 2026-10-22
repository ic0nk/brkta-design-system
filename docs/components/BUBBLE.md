# Bubble

> A chat message bubble with incoming, outgoing, and system variants, plus an optional timestamp and delivery status line.

---

## Implementation

| Layer | Location |
|-------|----------|
| Contract | `@brkta/ui-core/bubble/bubble-contract.ts` |
| CSS | `@brkta/ui-core/bubble/bubble.css` |
| React | `@brkta/ui-react/bubble` (`Bubble`) |
| Angular | `@brkta/ui-angular` (`BubbleComponent`) |

---

## Usage

### React

```tsx
import { Bubble } from '@brkta/ui-react/bubble';

<Bubble variant="incoming" timestamp="10:24 AM">Hey, how is the Q3 report going?</Bubble>
<Bubble variant="outgoing" timestamp="10:25 AM" status="read">Almost done! Will send it by noon.</Bubble>
<Bubble variant="system" timestamp="10:20 AM">Jane joined the conversation</Bubble>
```

### Angular

```html
<brkta-bubble variant="incoming" timestamp="10:24 AM">Hey, how is the Q3 report going?</brkta-bubble>
<brkta-bubble variant="outgoing" timestamp="10:25 AM" status="read">Almost done! Will send it by noon.</brkta-bubble>
<brkta-bubble variant="system" timestamp="10:20 AM">Jane joined the conversation</brkta-bubble>
```

---

## Props / Inputs

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'incoming' \| 'outgoing' \| 'system'` | `'incoming'` | Bubble alignment and color variant |
| `children` | `ReactNode` / projected content | — | Message content |
| `timestamp` | `string` | — | Time text shown in the footer line |
| `status` | `'sent' \| 'delivered' \| 'read' \| 'error'` | — | Delivery status appended to the footer line |

## States

| State | Visual |
|-------|--------|
| Incoming | `--muted` background, `--foreground` text, left-aligned with `--radius-sm` on the bottom-left corner |
| Outgoing | `--primary` background, `--primary-foreground` text, right-aligned with `--radius-sm` on the bottom-right corner |
| System | Transparent background, centered `--muted-foreground` text at `0.75rem`, full width |
| Footer | `data-brkta-bubble-time` line at `0.6875rem` with 70% opacity, shown when `timestamp` or `status` is present |

## Accessibility

- Renders a plain `<div>`; no ARIA roles or labels are applied, leaving semantics to the author.
- `status` is rendered as visible text alongside the timestamp (e.g. `10:25 AM · read`).
- Text content is rendered as-is via children/projection.

## Related Components

- Message — full message row with avatar and sender name
- Message Scroller — scrollable container for messages and bubbles
