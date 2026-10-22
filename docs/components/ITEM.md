# Item

> A general-purpose row/list item primitive. Supports title, description, leading slot (avatar/icon), trailing action/status, and selected/disabled states. Useful for settings rows, command lists, object pickers, and select menus.

---

## When to use

- Settings or preference lists with icon + description + action.
- Object pickers, search results, or command palette entries.
- Notification or activity feed rows.
- Any list where items need consistent leading/trailing slots and state.

Do not use Item inside a table or data grid — those have their own row structure.

---

## Implementation

| Layer | Location |
|-------|----------|
| Contract | `@brkta/ui-core/item/item-contract.ts` |
| CSS | `@brkta/ui-core/item/item.css` |
| React | `@brkta/ui-react/item` (`Item`, `ItemLeading`, `ItemBody`, `ItemTitle`, `ItemDescription`, `ItemTrailing`) |
| Angular | `@brkta/ui-angular` (`ItemComponent`, sub-components use attribute selectors) |

---

## React

```tsx
import { Item, ItemLeading, ItemBody, ItemTitle, ItemDescription, ItemTrailing } from '@brkta/ui-react/item';

<Item selected>
  <ItemLeading><Avatar fallback="JD" /></ItemLeading>
  <ItemBody>
    <ItemTitle>Jane Doe</ItemTitle>
    <ItemDescription>Engineering Team</ItemDescription>
  </ItemBody>
  <ItemTrailing>Active</ItemTrailing>
</Item>
```

### Props — Item

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selected` | `boolean` | `false` | Highlights the item with muted background |
| `disabled` | `boolean` | `false` | Reduces opacity, disables pointer events |

### Slots

| Component | Data Attribute | Purpose |
|-----------|----------------|---------|
| `ItemLeading` | `data-brkta-item-leading` | Avatar, icon, or leading content |
| `ItemBody` | `data-brkta-item-body` | Flex container for title + description |
| `ItemTitle` | `data-brkta-item-title` | Primary label text |
| `ItemDescription` | `data-brkta-item-description` | Secondary supporting text |
| `ItemTrailing` | `data-brkta-item-trailing` | Action, status, or metadata |

## Angular

```html
<brkta-item selected>
  <brkta-item-leading><brkta-avatar fallback="JD"></brkta-avatar></brkta-item-leading>
  <brkta-item-body>
    <brkta-item-title>Jane Doe</brkta-item-title>
    <brkta-item-description>Engineering Team</brkta-item-description>
  </brkta-item-body>
  <brkta-item-trailing>Active</brkta-item-trailing>
</brkta-item>
```

### Inputs — Item

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `selected` | `boolean` | `false` | Selected state |
| `disabled` | `boolean` | `false` | Disabled state |

---

## States

| State | CSS | Notes |
|-------|-----|-------|
| Default | `[data-brkta-item]` | Flex row, gap, padding, border-radius |
| Hover | `:hover` | Muted background |
| Selected | `[data-selected]` | Muted background (same as hover) |
| Disabled | `[data-disabled]` | 40% opacity, no pointer events |

---

## Accessibility

- Uses `aria-selected` and `aria-disabled` on the root element.
- When used as a selectable list item inside a listbox, the parent container should provide `role="listbox"` and `role="option"` on each Item.
