# Context Menu

A right-click context menu with items, separators, disabled items, and destructive items.

## Data Attributes
| Attribute | Element | Purpose |
|-----------|---------|---------|
| `data-brkta-context-menu` | Root | Context menu container |
| `data-brkta-context-menu-list` | List | Menu (`role="menu"`) |
| `data-brkta-context-menu-item` | Item | Menu item (`role="menuitem"`) |
| `data-brkta-context-menu-separator` | Separator | Divider (`role="separator"`) |
| `data-brkta-context-menu-shortcut` | Shortcut | Keyboard shortcut text |

## API
| Prop | Type | Description |
|------|------|-------------|
| `items` | `ContextMenuItem[]` | Menu items (supports `type:'separator'`) |

## Design Notes
- Opens on right-click (`contextmenu` event)
- Click-outside closes
- `data-destructive` on destructive items (red text)
- `data-disabled` on non-interactive items

## Accessibility
- `role="menu"`, `role="menuitem"`, `role="separator"`
- Disabled items have `data-disabled` and are not selectable
