export interface CommandGroup {
  label: string;
  items: CommandItem[];
}
export interface CommandItem {
  value: string;
  label: string;
  shortcut?: string;
  icon?: string;
  disabled?: boolean;
}
export interface CommandContract {
  items?: CommandItem[];
  groups?: CommandGroup[];
  placeholder?: string;
  emptyText?: string;
  onSelect?: (value: string) => void;
  onSearch?: (query: string) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
