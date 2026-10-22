# BRKTA ONE Design System — Component Roadmap

> Full inventory and implementation status for every component in the design system.
> Last updated: 2026-07-28

---

## Status Legend

| Status | Meaning |
|--------|---------|
| ✅ **Implemented** | Fully built: ui-core CSS, ui-react wrapper, ui-angular wrapper, tests, stories, docs, visual inventory |
| 🏗️ **Implemented foundation** | ui-core CSS + contracts exist; wrappers may be partial |
| 📋 **Planned** | Agreed in roadmap, not yet started |
| 🔲 **Blocked** | Awaiting dependency decision or architecture approval |
| 👁️ **Needs visual review** | Code exists but design-system inventory/variants need validation |

---

## Foundations (✅ Complete)

| Component | Status | Data Attribute | Notes |
|-----------|--------|----------------|-------|
| Design Tokens | ✅ Implemented | — | `@brkta/design-tokens` — colors, typography, spacing, shadows, radius, glass |
| Typography | ✅ Implemented | — | Type scale, font families, line heights via design tokens |
| Radius (Little Curve) | ✅ Implemented | — | `--radius-{sm,md,lg,xl,2xl,full}` documented and restricted |
| Icon Motion | ✅ Implemented | `.brkta-icon-motion` | Parent-triggered animation CSS in `icon-motion.css` |
| Visual Inventory | ✅ Implemented | — | Both `/design-system` pages show tokens, radius, buttons, icons |

---

## Primitives (Phase 1 — ✅ Implemented)

| Component | Status | Data Attribute | React | Angular | Docs |
|-----------|--------|----------------|-------|---------|------|
| Badge | ✅ Implemented | `data-brkta-badge` | ✅ | ✅ | ✅ |
| Card | ✅ Implemented | `data-brkta-card` | ✅ | ✅ | ✅ |
| Alert | ✅ Implemented | `data-brkta-alert` | ✅ | ✅ | ✅ |
| Avatar | ✅ Implemented | `data-brkta-avatar` | ✅ | ✅ | ✅ |
| Separator | ✅ Implemented | `data-brkta-separator` | ✅ | ✅ | ✅ |
| Skeleton | ✅ Implemented | `data-brkta-skeleton` | ✅ | ✅ | ✅ |
| Spinner | ✅ Implemented | `data-brkta-spinner` | ✅ | ✅ | ✅ |
| Progress | ✅ Implemented | `data-brkta-progress` | ✅ | ✅ | ✅ |
| Kbd | ✅ Implemented | `data-brkta-kbd` | ✅ | ✅ | ✅ |

---

## Forms

| Component | Status | Data Attribute | React | Angular | Docs |
|-----------|--------|----------------|-------|---------|------|
| Input | ✅ Implemented | `data-brkta-input` | ✅ | ✅ | ✅ |
| Textarea | ✅ Implemented | `data-brkta-textarea` | ✅ | ✅ | ✅ |
| Label | ✅ Implemented | `data-brkta-label` | ✅ | ✅ | ✅ |
| Field | ✅ Implemented | `data-brkta-field` | ✅ | ✅ | ✅ |
| Field Help Text | ✅ Implemented | `data-brkta-field-help` | ✅ | ✅ | ✅ |
| Field Error Text | ✅ Implemented | `data-brkta-field-error` | ✅ | ✅ | ✅ |
| Field Description | ✅ Implemented | `data-brkta-field-description` | ✅ | ✅ | ✅ |
| Native Select | ✅ Implemented | `data-brkta-native-select` | ✅ | ✅ | ✅ |
| Checkbox | ✅ Implemented | `data-brkta-checkbox` | ✅ | ✅ | ✅ |
| Radio Group | ✅ Implemented | `data-brkta-radio-group` / `data-brkta-radio` | ✅ | ✅ | ✅ |
| Switch | ✅ Implemented | `data-brkta-switch` | ✅ | ✅ | ✅ |
| Input Group | 📋 Planned | — | — | — | Input with add-on, button, or icon |
| Input OTP | ✅ Implemented | `data-brkta-input-otp` | ✅ | ✅ | Wave 5 — See INPUT-OTP.md |
| Slider | ✅ Implemented | — | ✅ | ✅ | Wave 5 — See SLIDER.md |
| Combobox | ✅ Implemented | `data-brkta-combobox` | ✅ | ✅ | Wave 5 — See COMBOBOX.md |
| Select (custom) | ✅ Implemented | `data-brkta-select` / `data-brkta-select-trigger` / `data-brkta-select-option` | ✅ | ✅ | BRKTA ONE-styled dropdown/listbox. See SELECT.md |
| Date Picker | ✅ Implemented | `data-brkta-date-picker` | ✅ | ✅ | Wave 5 — See DATE-PICKER.md |
| Input Group | ✅ Implemented | `data-brkta-input-group` | ✅ | ✅ | Wave 7B — See INPUT-GROUP.md |

> **Native Select vs Custom Select:** `NativeSelect` wraps the browser-native `<select>` element — its opened dropdown menu is rendered by the operating system and cannot be styled with CSS. It's suitable for simple forms where browser-default styling is acceptable. `Select (custom)` is the BRKTA ONE-designed dropdown/listbox component — its opened menu uses warm cream surface tokens, little-curve radius, border, shadow, and full keyboard/ARIA support. Both coexist in the component library.

---

## Overlays

| Component | Status | Data Attribute | Priority | Notes |
|-----------|--------|----------------|----------|-------|
| Dialog | ✅ Implemented | `data-brkta-dialog` | ✅ | ✅ | Wave 3B — See DIALOG.md |
| Alert Dialog | ✅ Implemented | `data-brkta-alert-dialog` | ✅ | ✅ | Wave 3B — See ALERT-DIALOG.md |
| Sheet (Drawer) | ✅ Implemented | `data-brkta-sheet` | ✅ | ✅ | Wave 3B — Slide-in panel from any edge. See SHEET.md |
| Popover | ✅ Implemented | `data-brkta-popover` | ✅ | ✅ | Wave 3A — See POPOVER.md |
| Tooltip | ✅ Implemented | `data-brkta-tooltip` | ✅ | ✅ | Wave 3A — See TOOLTIP.md |
| Hover Card | ✅ Implemented | `data-brkta-hover-card` | ✅ | ✅ | Wave 7C — See HOVER-CARD.md |
| Context Menu | ✅ Implemented | `data-brkta-context-menu` | Medium | Wave 6 — Right-click menu. See CONTEXT-MENU.md |
| Command | ✅ Implemented | `data-brkta-command` | Medium | Wave 6 — Command palette (Ctrl+K). See COMMAND.md |
| Modal footer / dialog action layout | 📋 Planned | — | Medium | Layout pattern for dialog action bars |

---

## Navigation

| Component | Status | Data Attribute | Priority | Notes |
|-----------|--------|----------------|----------|-------|
| Navigation Menu | 📋 Planned | — | Medium | Top-level / sidebar navigation |
| Menubar | ✅ Implemented | `data-brkta-menubar` | Medium | Wave 6 — Horizontal menu with submenus. See MENUBAR.md |
| Breadcrumb | ✅ Implemented | `data-brkta-breadcrumb` | ✅ | ✅ | Wave 4A — See BREADCRUMB.md |
| Tabs | ✅ Implemented | `data-brkta-tabs` | ✅ | ✅ | Wave 4A — See TABS.md |
| Pagination | ✅ Implemented | `data-brkta-pagination` | ✅ | ✅ | Wave 4A — See PAGINATION.md |
| Sidebar | ✅ Implemented | `data-brkta-sidebar` | Medium | Wave 4B — App navigation shell primitive. See SIDEBAR.md |
| Filter bar / search bar | 📋 Planned | — | Medium | Filter/search toolbar pattern |
| Toolbar / action bar | 📋 Planned | — | Medium | Action toolbar pattern |

---

## Data Display

| Component | Status | Data Attribute | Priority | Notes |
|-----------|--------|----------------|----------|-------|
| Table | ✅ Implemented | `data-brkta-table` | ✅ | ✅ | Wave 4A — See TABLE.md |
| Data Table | ✅ Implemented | `data-brkta-data-table` | ✅ | ✅ | Wave 6 — Sortable, selectable, row actions. See DATA-TABLE.md |
| Card | ✅ Implemented | `data-brkta-card` | High | Content container |
| Avatar | ✅ Implemented | `data-brkta-avatar` | Medium | User/entity avatar |
| Badge | ✅ Implemented | `data-brkta-badge` | Medium | Status/count badge |
| Progress | ✅ Implemented | `data-brkta-progress` | Medium | Progress bar |
| Skeleton | ✅ Implemented | `data-brkta-skeleton` | Medium | Loading placeholder |
| Kbd | ✅ Implemented | `data-brkta-kbd` | Low | Keyboard shortcut display |
| Calendar | ✅ Implemented | — | ✅ | ✅ | Wave 5 — See CALENDAR.md |
| Chart | ✅ Implemented | `data-brkta-chart` | ✅ | ✅ | Wave 6 — Bar, donut, metric card. See CHART.md |
| Carousel | ✅ Implemented | `data-brkta-carousel` | ✅ | ✅ | Wave 7C — See CAROUSEL.md |
| Data Table (advanced) | ✅ Implemented | — | ✅ | ✅ | Wave 6 — See DATA-TABLE.md |

---

## Feedback

| Component | Status | Data Attribute | Priority | Notes |
|-----------|--------|----------------|----------|-------|
| Alert | ✅ Implemented | `data-brkta-alert` | High | Inline feedback messages |
| Spinner | ✅ Implemented | `data-brkta-spinner` | Medium | Standalone/global loading indicator |
| Toast | ✅ Implemented | `data-brkta-toast` | ✅ | ✅ | Wave 3B — See TOAST.md |
| Progress | ✅ Implemented | `data-brkta-progress` | Medium | Determinate progress bar |
| Skeleton | ✅ Implemented | `data-brkta-skeleton` | Medium | Loading placeholder |
| Empty state | ✅ Implemented | `data-brkta-empty` | ✅ | ✅ | Wave 4A — See EMPTY-STATE.md |
| Error state | 📋 Planned | — | Medium | Error page/content pattern |
| Loading state pattern | 📋 Planned | — | Medium | Consistent loading UX |

---

## Messaging

| Component | Status | Data Attribute | Priority | Notes |
|-----------|--------|----------------|----------|-------|
| Message | ✅ Implemented | `data-brkta-message` | Low | Wave 7A — See MESSAGE.md |
| Message Scroller | ✅ Implemented | `data-brkta-message-scroller` | Low | Wave 7A — See MESSAGE-SCROLLER.md |
| Bubble | ✅ Implemented | `data-brkta-bubble` | Low | Wave 7A — See BUBBLE.md |
| Attachment | ✅ Implemented | `data-brkta-attachment` | Low | Wave 7A — See ATTACHMENT.md |
| Notification center pattern | 📋 Planned | — | Low | Notification list/panel pattern |

---

## Layout Utilities

| Component | Status | Data Attribute | Priority | Notes |
|-----------|--------|----------------|----------|-------|
| Separator | ✅ Implemented | `data-brkta-separator` | Medium | Horizontal/vertical divider |
| Aspect Ratio | ✅ Implemented | `data-brkta-aspect-ratio` | Low | Wave 7B — See ASPECT-RATIO.md |
| Scroll Area | ✅ Implemented | `data-brkta-scroll-area` | Medium | Wave 4B — Custom scrollable container. See SCROLL-AREA.md |
| Resizable | ✅ Implemented | `data-brkta-resizable` | Medium | Wave 4B — Split panel foundation. See RESIZABLE.md |
| Button Group | ✅ Implemented | `data-brkta-button-group` | Medium | Wave 4B — Groups existing Button components. See BUTTON-GROUP.md |
| Direction | ✅ Implemented | `data-brkta-direction` | Low | Wave 7B — See DIRECTION.md |
| Page header | 📋 Planned | — | Medium | Consistent page header pattern |
| Section header | 📋 Planned | — | Medium | Consistent section heading pattern |
| Status indicator | 📋 Planned | `data-brkta-status` | Medium | Entity status dot/indicator |
| File upload / dropzone | 📋 Planned | — | Medium | Needs drag-and-drop decisions |

---

## Complex / Application Patterns

| Component | Status | Data Attribute | Priority | Notes |
|-----------|--------|----------------|----------|-------|
| Accordion | ✅ Implemented | `data-brkta-accordion` | Medium | Wave 4B — Expand/collapse sections. See ACCORDION.md |
| Collapsible | ✅ Implemented | `data-brkta-collapsible` | Medium | Wave 4B — Single expand/collapse. See COLLAPSIBLE.md |
| Command (palette) | ✅ Implemented | `data-brkta-command` | Low | Wave 6 — See COMMAND.md |
| Data Table (full) | ✅ Implemented | `data-brkta-data-table` | Medium | Wave 6 — See DATA-TABLE.md |
| Dropdown Menu | ✅ Implemented | `data-brkta-dropdown-menu` | — | Wave 3A — See DROPDOWN-MENU.md |
| Select (custom) | ✅ Implemented | `data-brkta-select` | — | Custom dropdown/listbox — BRKTA ONE-styled. See Forms section above. |
| Combobox | ✅ Implemented | `data-brkta-combobox` | Medium | Wave 5 — See COMBOBOX.md |
| Calendar | ✅ Implemented | — | Low | Wave 5 — See CALENDAR.md |
| Date Picker | ✅ Implemented | — | Low | Wave 5 — See DATE-PICKER.md |
| Chart | ✅ Implemented | `data-brkta-chart` | Low | Wave 6 — See CHART.md |
| Carousel | ✅ Implemented | `data-brkta-carousel` | Low | Wave 7C — See CAROUSEL.md |
| Message, Bubble, Attachment, Message Scroller | ✅ Implemented | various | Low | Wave 7A — See individual docs |

---

## Toggle & Item Components (Wave 7B)

| Component | Status | Data Attribute | Notes |
|-----------|--------|----------------|-------|
| Toggle | ✅ Implemented | `data-brkta-toggle` | Wave 7B — See TOGGLE.md |
| Toggle Group | ✅ Implemented | `data-brkta-toggle-group` | Wave 7B — See TOGGLE-GROUP.md |
| Item | ✅ Implemented | `data-brkta-item` | Wave 7B — See ITEM.md |

---

## Implementation Order

### Wave 1 — Foundations + Primitives ✅ Completed
Design Tokens, Typography, Radius, Icon Motion, Button, Badge, Card, Alert, Avatar, Separator, Skeleton, Spinner, Progress, Kbd

### Wave 2 — Forms Foundation ✅ Completed
Label, Input, Textarea, Field, Field Help/Error/Description, Native Select, Checkbox, Radio Group, Switch

### Wave 2.5 — Custom Select ✅ Completed
Select (custom dropdown/listbox)

### Wave 3A — Overlay + Menu Foundation ✅ Completed
Dropdown Menu, Popover, Tooltip

### Wave 3B — Modal + Feedback Overlay ✅ Completed
Dialog, Alert Dialog, Sheet (Drawer), Toast

### Wave 4A — Navigation + Data Display ✅ Completed
Breadcrumb, Tabs (default/segmented/vertical), Pagination, Table, Empty State

### Wave 4B — Advanced Navigation + Layout Utilities ✅ Completed
Accordion, Collapsible, Button Group, Scroll Area, Sidebar, Resizable

### Wave 5 — Advanced Inputs + Pickers ✅ Completed
Slider, Input OTP, Calendar, Date Picker, Combobox

### Wave 6 — Data + Operational Components ✅ Completed
Data Table (advanced), Chart, Command, Context Menu, Menubar

### Wave 7A — Communication Components ✅ Completed
Attachment, Bubble, Message, Message Scroller, Marker

### Wave 7B — Utility + Layout Components ✅ Completed
Aspect Ratio, Input Group, Item, Toggle, Toggle Group, Direction

### Wave 7C — Complex Interactive Components ✅ Completed
Carousel, Hover Card

---

## Key

- ✅ Implemented — working in both frameworks, tested, documented
- 🏗️ Implemented foundation — CSS + contracts exist, wrappers may be partial
- 📋 Planned — agreed on roadmap, not yet started
- 🔲 Blocked — requires architectural decision or dependency first
