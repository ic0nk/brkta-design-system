# Menubar

A horizontal menu bar with dropdown submenus. Supports disabled items, keyboard navigation, and blur-based auto-close.

## Data Attributes
| Attribute | Element | Purpose |
|-----------|---------|---------|
| `data-brkta-menubar` | Root | Menu bar (`role="menubar"`) |
| `data-brkta-menubar-trigger` | Button | Top-level menu trigger (`role="menuitem"`) |
| `data-brkta-menubar-content` | Content | Dropdown submenu (`role="menu"`) |
| `data-brkta-menubar-item` | Item | Submenu item (`role="menuitem"`) |
| `data-open` | Trigger | Open state |
| `data-disabled` | Item | Disabled state |

## API
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `MenubarItem[]` | `[]` | Menu definitions with optional children |

## Keyboard
- ArrowRight/ArrowLeft: Navigate between menus
- Escape: Close submenu
- Enter: Select item
- Click-outside closes submenu

## Accessibility
- `role="menubar"`, `role="menu"`, `role="menuitem"`
- `aria-haspopup` on items with submenus
- Disabled items have `data-disabled` and are not selectable
