export interface SidebarItemContract {
  /** Unique identifier */
  value: string;
  /** Display label */
  label: string;
  /** Icon — React: ReactNode; Angular: supported icon name string. Unknown Angular names render no icon. Renders inside [data-brkta-sidebar-item-icon] */
  icon?: unknown;
  /** Whether this item is currently active */
  active?: boolean;
  /** Whether this item is disabled */
  disabled?: boolean;
  /** Badge count or text */
  badge?: string | number;
}

export type SidebarItemSelectHandler = (item: SidebarItemContract) => void;

export interface SidebarContract {
  /** Navigation items */
  items: SidebarItemContract[];
  /** Public layout variant; standalone is used when the prop is omitted */
  variant?: "standalone" | "embedded";
  /** Whether sidebar is collapsed (compact rail mode) */
  collapsed?: boolean;
  /** Whether the wrapper renders the collapse/expand toggle; defaults to true */
  showCollapseToggle?: boolean;
  /** Sidebar header content or title */
  header?: string;
  /** Sidebar footer content or title */
  footer?: string;
  /** Callback when collapsed state changes */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Callback when an enabled navigation item is selected */
  onItemSelect?: SidebarItemSelectHandler;
}
