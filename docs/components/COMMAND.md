# Command

A keyboard-driven command/search palette. Opens via `Ctrl+K` / `Cmd+K` global shortcut.

## Data Attributes
| Attribute | Element | Purpose |
|-----------|---------|---------|
| `data-brkta-command` | Root | Command container |
| `data-brkta-command-input` | Input | Search input |
| `data-brkta-command-list` | List | Results list (`role="listbox"`) |
| `data-brkta-command-item` | Item | Result item (`role="option"`) |
| `data-brkta-command-item-shortcut` | Shortcut | Keyboard shortcut hint |
| `data-brkta-command-empty` | Empty | No-results state |

## API
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `CommandItem[]` | `[]` | Command items |
| `placeholder` | `string` | `'Type a command...'` | Input placeholder |
| `emptyText` | `string` | `'No results.'` | Empty state text |

## Keyboard
- `Ctrl+K` / `Cmd+K`: Open/close palette
- ArrowUp/Down: Navigate items
- Enter: Select item
- Escape: Close
- Type to filter

## Accessibility
- `role="listbox"` on list, `role="option"` on items
- Disabled items not selectable
- Keyboard navigation throughout
