# Dropdown Menu

## Overview

The Dropdown Menu component renders a menu list that opens from a trigger button. It follows the same visual direction as the Select dropdown — warm cream surface, little-curve radius, border, and shadow tokens.

## Data attributes

| Attribute | Element |
|---|---|
| `data-brkta-dropdown-menu` | Wrapper |
| `data-brkta-dropdown-menu-trigger` | Trigger button |
| `data-brkta-dropdown-menu-content` | Menu panel |
| `data-brkta-dropdown-menu-item` | Menu item |
| `data-brkta-dropdown-menu-separator` | Divider |
| `data-brkta-dropdown-menu-label` | Group label |
| `data-brkta-dropdown-menu-item-icon` | Leading icon |
| `data-brkta-dropdown-menu-item-shortcut` | Keyboard shortcut |

## API

### DropdownMenuEntry

```typescript
type DropdownMenuEntry =
  | { label: string; value?: string; disabled?: boolean; destructive?: boolean; icon?: string; shortcut?: string }
  | { type: 'separator' }
  | { type: 'label'; label: string };
```

### React

```tsx
import { DropdownMenu } from '@brkta/ui-react/dropdown-menu';

<DropdownMenu
  items={items}
  trigger="Actions ▾"
  onItemSelect={(value) => console.log(value)}
/>
```

### Angular

```html
<brkta-dropdown-menu [items]="items" triggerLabel="Actions ▾" (itemSelect)="onSelect($event)">
</brkta-dropdown-menu>
```

## Accessibility

- Trigger: `role="button"`, `aria-haspopup="menu"`, `aria-expanded`
- Menu: `role="menu"`
- Items: `role="menuitem"`, `aria-disabled`
- Separator: `role="separator"`
- Keyboard: ArrowUp/Down, Home/End, Enter/Space to select, Escape to close

## Icons

Menu item icons should use Lucide SVG strings matching the approved Lucide icon set. Icon strings are rendered inside `<span data-brkta-dropdown-menu-item-icon="">`. Do not use emoji, raw inline SVG art, or React Icons inside menu items.

## Files

| Framework | Path |
|---|---|
| Contract | `packages/ui-core/dropdown-menu/dropdown-menu-contract.ts` |
| CSS | `packages/ui-core/dropdown-menu/dropdown-menu.css` |
| React | `packages/ui-react/src/dropdown-menu/dropdown-menu.tsx` |
| Angular | `packages/ui-angular/src/dropdown-menu/dropdown-menu.component.ts` |
