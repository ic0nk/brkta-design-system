# Message Scroller

> A scrollable container for chat messages and bubbles with a bounded height, border, and card background.

---

## Implementation

| Layer | Location |
|-------|----------|
| Contract | `@brkta/ui-core/message-scroller/message-scroller-contract.ts` |
| CSS | `@brkta/ui-core/message-scroller/message-scroller.css` |
| React | `@brkta/ui-react/message-scroller` (`MessageScroller`) |
| Angular | `@brkta/ui-angular` (`MessageScrollerComponent`) |

---

## Usage

### React

```tsx
import { MessageScroller } from '@brkta/ui-react/message-scroller';
import { Message } from '@brkta/ui-react/message';

<MessageScroller>
  <Message variant="incoming" avatar="JD" name="Jane Doe" body="Hey, how is the report going?" timestamp="10:24 AM" />
  <Message variant="outgoing" name="You" body="Almost done!" timestamp="10:25 AM" status="read" />
</MessageScroller>
```

### Angular

```html
<brkta-message-scroller>
  <brkta-message variant="incoming" avatar="JD" name="Jane Doe" timestamp="10:24 AM">Hey, how is the report going?</brkta-message>
  <brkta-message variant="outgoing" name="You" timestamp="10:25 AM" status="read">Almost done!</brkta-message>
</brkta-message-scroller>
```

---

## Props / Inputs

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Message or Bubble content to scroll (React) |

The Angular component (`brkta-message-scroller`) takes no inputs; children are projected through `<ng-content>`.

## States

| State | Visual |
|-------|--------|
| Default | Column flex layout with `--space-2` gap, `400px` max height, `overflow-y: auto`, `1px` `--border` border, `--radius-md`, `--card` background, and a thin styled scrollbar |

## Accessibility

- The container is a plain `<div>` with native `overflow-y: auto` scrolling; no ARIA roles or keyboard handling are applied by the component.
- Content scrolls within the bounded `max-height: 400px` region.

## Related Components

- Message — message rows placed inside the scroller
- Bubble — chat bubbles placed inside the scroller
