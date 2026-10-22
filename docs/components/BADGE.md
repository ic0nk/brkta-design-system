# Badge

> A small visual indicator for counts, statuses, and labels. Badges are non-interactive decorative elements that convey metadata at a glance.

---

## When to use

- Show a count (e.g., "3 new notifications").
- Label a status (e.g., "Draft", "Published", "Archived").
- Tag items with categories or properties.
- Highlight new or changed content.

Do not use a Badge for interactive elements. If the user needs to click, dismiss, or select, use a Button or interactive chip instead.

---

## Implementation

| Layer | Location |
|-------|----------|
| Contract | `@brkta/ui-core/badge/badge-contract.ts` |
| CSS | `@brkta/ui-core/badge/badge.css` |
| React | `@brkta/ui-react/badge` (`Badge` component) |
| Angular | `@brkta/ui-angular` (`BadgeComponent`) |

---

## React

```tsx
import { Badge } from '@brkta/ui-react/badge';

<Badge variant="default" size="md">3</Badge>
<Badge variant="secondary">Draft</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Filter</Badge>
```

## Angular

```html
<brkta-badge variant="default" size="md">3</brkta-badge>
<brkta-badge variant="secondary">Draft</brkta-badge>
<brkta-badge variant="destructive">Error</brkta-badge>
<brkta-badge variant="outline">Filter</brkta-badge>
```

---

## Variants

| Variant | Style | Use Case |
|---------|-------|----------|
| `default` | Primary background | Counts, active filters, new items |
| `secondary` | Muted background | Secondary labels, statuses |
| `destructive` | Destructive background | Errors, warnings, removals |
| `outline` | Bordered, transparent | Subtle tags, filters |

## Sizes

| Size | Height | Font |
|------|--------|------|
| `sm` | 20px | xs |
| `md` | 24px | xs |
| `lg` | 28px | sm |

## Accessibility

- Badges are decorative by nature. If the badge content is critical (e.g., "3 unread messages"), ensure the information is also available in the parent element's accessible name.
- Use `aria-label` on the badge when the visible content is not self-explanatory.

## Related

- **Button** — for interactive elements with badges inside (e.g., notification bell)
