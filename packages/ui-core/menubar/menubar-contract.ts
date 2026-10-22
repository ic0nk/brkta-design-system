export interface MenubarItem {
  label: string;
  value: string;
  disabled?: boolean;
  children?: MenubarItem[];
}
export interface MenubarContract {
  items: MenubarItem[];
  onSelect?: (value: string) => void;
}
