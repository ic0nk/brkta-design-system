// Framework-neutral Tabs contract
export interface TabItemContract {
  label: string;
  value: string;
  disabled?: boolean;
  content?: unknown;
}

export interface TabsContract {
  items: TabItemContract[];
  value?: string;
  defaultValue?: string;
  variant?: 'default' | 'segmented';
  orientation?: 'horizontal' | 'vertical';
}
