# Accordion

## Overview

The Accordion component displays a vertically stacked list of items that can be expanded to reveal hidden content. Only one item (or multiple in `multiple` mode) can be open at a time.

## Data Attributes

| Attribute | Element | Purpose |
|-----------|---------|---------|
| `data-brkta-accordion` | Root | Accordion container |
| `data-brkta-accordion-item` | Item wrapper | Each accordion item |
| `data-brkta-accordion-trigger` | Button | Expand/collapse trigger |
| `data-brkta-accordion-chevron` | Span | Animated chevron indicator |
| `data-brkta-accordion-panel` | Div | Expandable panel wrapper |
| `data-brkta-accordion-content` | Div | Panel content area |

## API

### AccordionItemContract
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `value` | `string` | ✅ | Unique identifier |
| `label` | `string` | ✅ | Trigger label |
| `content` | `unknown` | — | Content rendered when expanded |
| `disabled` | `boolean` | — | Disables toggle |

### React
```tsx
import { Accordion } from '@brkta/ui-react/accordion';

<Accordion
  items={[
    { value: '1', label: 'Section 1', content: 'Content 1' },
    { value: '2', label: 'Section 2', content: 'Content 2' },
  ]}
  multiple={false}
  defaultValue="1"
/>
```

### Angular
```html
<brkta-accordion
  [items]="items"
  [multiple]="false"
  [defaultValue]="'1'"
></brkta-accordion>
```

## Accessibility

- Triggers use `aria-expanded` and `aria-controls`
- Panels use `role="region"` and `aria-labelledby`
- Keyboard: ArrowUp/Down, Home, End navigate between triggers
- Disabled items have `aria-disabled="true"`

## Animation

- Smooth open/close via CSS `grid-template-rows: 0fr` to `1fr` transition
- Chevron rotates 180° when expanded
- Duration: `var(--duration-normal)` (200ms)
- Reducing: `var(--ease-out)`
- Respects `prefers-reduced-motion: reduce`

## States

- Default (collapsed)
- Expanded
- Disabled
- Focus-visible (ring outline)
- Multiple open mode

## Usage Guidance

Use Accordion for FAQ sections, settings panels, or any content that benefits from progressive disclosure. Use the `multiple` mode when users should compare content across sections.
