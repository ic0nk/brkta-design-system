# Message

> A chat message row with optional avatar, sender name, body, timestamp, and delivery status, in incoming, outgoing, and system variants.

---

## Implementation

| Layer | Location |
|-------|----------|
| Contract | `@brkta/ui-core/message/message-contract.ts` |
| CSS | `@brkta/ui-core/message/message.css` |
| React | `@brkta/ui-react/message` (`Message`) |
| Angular | `@brkta/ui-angular` (`MessageComponent`) |

---

## Usage

### React

```tsx
import { Message } from '@brkta/ui-react/message';

<Message variant="incoming" avatar="JD" name="Jane Doe" body="The Q3 numbers look great." timestamp="10:24 AM" status="delivered" />
<Message variant="outgoing" name="You" body="Sure, sending an invite." timestamp="10:25 AM" status="read" />
<Message variant="system" body="Conversation started" timestamp="09:00 AM" />
```

### Angular

```html
<brkta-message variant="incoming" avatar="JD" name="Jane Doe" timestamp="10:24 AM" status="delivered">The Q3 numbers look great.</brkta-message>
<brkta-message variant="outgoing" name="You" timestamp="10:25 AM" status="read">Sure, sending an invite.</brkta-message>
<brkta-message variant="system" timestamp="09:00 AM">Conversation started</brkta-message>
```

---

## Props / Inputs

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'incoming' \| 'outgoing' \| 'system'` | `'incoming'` | Message row variant |
| `avatar` | `string` | — | Initials shown in the avatar tile; falls back to the first letter of `name`, then `?` |
| `name` | `string` | — | Sender name shown above the body |
| `body` | `ReactNode` / projected content | — | Message content |
| `timestamp` | `string` | — | Time text shown below the body |
| `status` | `'sent' \| 'delivered' \| 'read' \| 'error'` | — | Delivery status appended to the timestamp line |

## States

| State | Visual |
|-------|--------|
| Incoming | Avatar on the left, content on the right |
| Outgoing | `flex-direction: row-reverse` — avatar on the right, name right-aligned |
| System | Row centered; no avatar rendered |
| Timestamp | `data-brkta-message-time` line in `--muted-foreground` at `0.6875rem`, shown when `timestamp` is present |

## Accessibility

- Renders a plain `<div>` structure; no ARIA roles are applied, leaving semantics to the author.
- The avatar tile is text-based (initials or `?` fallback) rather than an image.
- `status` renders as visible text alongside the timestamp.

## Related Components

- Bubble — message bubble used inside a conversation
- Message Scroller — scrollable container for messages
