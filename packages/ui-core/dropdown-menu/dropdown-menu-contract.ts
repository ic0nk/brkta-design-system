// Framework-neutral Dropdown Menu contract
// Dropdown menu with items, separators, labels, icons, shortcuts

export interface DropdownMenuItemContract {
  label: string;
  value?: string;
  disabled?: boolean;
  destructive?: boolean;
  icon?: unknown; /* string | ReactNode — renders in icon slot via framework wrapper */
  shortcut?: string;
}

export interface DropdownMenuSeparatorContract {
  type: 'separator';
}

export interface DropdownMenuLabelContract {
  type: 'label';
  label: string;
}

export type DropdownMenuEntry =
  | DropdownMenuItemContract
  | DropdownMenuSeparatorContract
  | DropdownMenuLabelContract;

export interface DropdownMenuContract {
  items: DropdownMenuEntry[];
  open?: boolean;
  defaultOpen?: boolean;
  trigger: unknown;
}
