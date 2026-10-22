// Shared variant contract for all BRKTA components
// These types are framework-neutral

export type ButtonVariant =
  "primary" | "secondary" | "outline" | "ghost" | "destructive" | "link";
export type ButtonAppearance = "default" | "glass";
export type ButtonSize = "sm" | "md" | "lg" | "icon-sm" | "icon-md" | "icon-lg";

export type BadgeVariant = "default" | "secondary" | "destructive" | "outline";
export type BadgeSize = "sm" | "md" | "lg";

export type AlertVariant =
  "information" | "success" | "warning" | "destructive";

export type AvatarSize = "sm" | "md" | "lg";

export type SeparatorOrientation = "horizontal" | "vertical";

export type SkeletonVariant = "text" | "card" | "table";

export type SpinnerSize = "sm" | "md" | "lg";

export type CardVariant = "default" | "outlined" | "ghost";

// Wave 2 — Forms Foundation
export type InputVariant = "default" | "filled" | "ghost";
export type InputSize = "sm" | "md" | "lg";

export type TextareaVariant = "default" | "filled" | "ghost";
export type TextareaSize = "sm" | "md" | "lg";

export type NativeSelectVariant = "default" | "filled";
export type NativeSelectSize = "sm" | "md" | "lg";

export type SelectVariant = "default" | "filled" | "ghost";
export type SelectSize = "sm" | "md" | "lg";

// Wave 3 — Overlay + Menu Foundation
export type OverlaySide = "top" | "bottom" | "left" | "right";
export type OverlayAlign = "start" | "center" | "end";

// Wave 3B — Modal + Feedback Overlay Foundation
export type SheetSide = "start" | "end" | "left" | "right" | "top" | "bottom";
export type SheetSize = "sm" | "md" | "lg" | "xl";
export type ToastVariant = "default" | "success" | "warning" | "destructive";

// Wave 4 — Navigation + Data Display Foundation
export type TableVariant = "default" | "dense" | "bordered";
export type EmptyStateVariant = "default" | "compact";

// Shared data attributes for CSS targeting
export const DATA_ATTRS = {
  button: "data-brkta-button",
  badge: "data-brkta-badge",
  card: "data-brkta-card",
  alert: "data-brkta-alert",
  avatar: "data-brkta-avatar",
  separator: "data-brkta-separator",
  skeleton: "data-brkta-skeleton",
  spinner: "data-brkta-spinner",
  progress: "data-brkta-progress",
  kbd: "data-brkta-kbd",
  // Wave 2 — Forms Foundation
  label: "data-brkta-label",
  input: "data-brkta-input",
  textarea: "data-brkta-textarea",
  field: "data-brkta-field",
  fieldHelp: "data-brkta-field-help",
  fieldError: "data-brkta-field-error",
  fieldDescription: "data-brkta-field-description",
  nativeSelect: "data-brkta-native-select",
  checkbox: "data-brkta-checkbox",
  radioGroup: "data-brkta-radio-group",
  radio: "data-brkta-radio",
  switch: "data-brkta-switch",
  select: "data-brkta-select",
  selectTrigger: "data-brkta-select-trigger",
  selectValue: "data-brkta-select-value",
  selectIcon: "data-brkta-select-icon",
  selectContent: "data-brkta-select-content",
  selectOption: "data-brkta-select-option",
  // Wave 3 — Overlay + Menu Foundation
  dropdownMenu: "data-brkta-dropdown-menu",
  dropdownMenuTrigger: "data-brkta-dropdown-menu-trigger",
  dropdownMenuContent: "data-brkta-dropdown-menu-content",
  dropdownMenuItem: "data-brkta-dropdown-menu-item",
  dropdownMenuSeparator: "data-brkta-dropdown-menu-separator",
  dropdownMenuLabel: "data-brkta-dropdown-menu-label",
  popover: "data-brkta-popover",
  popoverTrigger: "data-brkta-popover-trigger",
  popoverContent: "data-brkta-popover-content",
  tooltip: "data-brkta-tooltip",
  tooltipTrigger: "data-brkta-tooltip-trigger",
  tooltipContent: "data-brkta-tooltip-content",
  // Wave 3B — Modal + Feedback Overlay Foundation
  dialog: "data-brkta-dialog",
  dialogOverlay: "data-brkta-dialog-overlay",
  dialogContent: "data-brkta-dialog-content",
  dialogHeader: "data-brkta-dialog-header",
  dialogTitle: "data-brkta-dialog-title",
  dialogDescription: "data-brkta-dialog-description",
  dialogFooter: "data-brkta-dialog-footer",
  dialogClose: "data-brkta-dialog-close",
  alertDialog: "data-brkta-alert-dialog",
  sheet: "data-brkta-sheet",
  sheetOverlay: "data-brkta-sheet-overlay",
  sheetContent: "data-brkta-sheet-content",
  sheetHeader: "data-brkta-sheet-header",
  toast: "data-brkta-toast",
  toastViewport: "data-brkta-toast-viewport",
  toastTitle: "data-brkta-toast-title",
  toastDescription: "data-brkta-toast-description",
  toastClose: "data-brkta-toast-close",
  // Wave 4 — Navigation + Data Display Foundation
  breadcrumb: "data-brkta-breadcrumb",
  breadcrumbItem: "data-brkta-breadcrumb-item",
  breadcrumbSeparator: "data-brkta-breadcrumb-separator",
  tabs: "data-brkta-tabs",
  tabsList: "data-brkta-tabs-list",
  tabsTrigger: "data-brkta-tabs-trigger",
  tabsPanel: "data-brkta-tabs-panel",
  pagination: "data-brkta-pagination",
  paginationItem: "data-brkta-pagination-item",
  table: "data-brkta-table",
  tableHeader: "data-brkta-table-header",
  tableBody: "data-brkta-table-body",
  tableRow: "data-brkta-table-row",
  tableCell: "data-brkta-table-cell",
  emptyState: "data-brkta-empty",
  emptyStateIcon: "data-brkta-empty-icon",
  emptyStateTitle: "data-brkta-empty-title",
  emptyStateDescription: "data-brkta-empty-description",
  emptyStateAction: "data-brkta-empty-action",
} as const;
