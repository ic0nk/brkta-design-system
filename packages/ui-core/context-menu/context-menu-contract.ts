export interface ContextMenuContract {
  items: (ContextMenuItem | { type: 'separator' })[];
}
export interface ContextMenuItem {
  label: string;
  value: string;
  shortcut?: string;
  disabled?: boolean;
  destructive?: boolean;
  icon?: string;
}
