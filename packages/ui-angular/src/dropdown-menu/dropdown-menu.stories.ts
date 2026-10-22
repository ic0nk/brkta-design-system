import type { Meta, StoryObj } from '@storybook/angular';
import { DropdownMenuComponent } from './dropdown-menu.component';
import type { DropdownMenuEntry } from '@brkta/ui-core/dropdown-menu/dropdown-menu-contract';

const iconEdit = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>';
const iconCopy = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';
const iconPaste = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/></svg>';

const sampleItems: DropdownMenuEntry[] = [
  { label: 'Edit', value: 'edit', icon: iconEdit, shortcut: '⌘E' },
  { label: 'Duplicate', value: 'duplicate', icon: iconCopy, shortcut: '⌘D' },
  { type: 'separator' },
  { label: 'Move to folder', value: 'move' },
  { type: 'label', label: 'Danger zone' },
  { label: 'Delete', value: 'delete', destructive: true, shortcut: '⌫' },
  { label: 'Archive', value: 'archive', disabled: true },
];

const meta: Meta<DropdownMenuComponent> = {
  title: 'Components/DropdownMenu',
  component: DropdownMenuComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<DropdownMenuComponent>;

export const Default: Story = { args: { items: sampleItems, triggerLabel: 'Actions' } };

export const WithIcons: Story = {
  args: {
    items: [
      { label: 'Edit', value: 'edit', icon: iconEdit },
      { label: 'Copy', value: 'copy', icon: iconCopy },
      { label: 'Paste', value: 'paste', icon: iconPaste },
    ],
    triggerLabel: 'Edit',
  },
};

export const WithShortcuts: Story = {
  args: {
    items: [
      { label: 'Undo', value: 'undo', shortcut: '⌘Z' },
      { label: 'Redo', value: 'redo', shortcut: '⌘⇧Z' },
    ],
    triggerLabel: 'History',
  },
};

export const IconOnly: Story = {
  args: {
    items: [{ label: 'Delete', value: 'delete', icon: 'trash', destructive: true }],
    triggerLabel: 'More options',
    iconOnly: true,
  },
};

export const DisabledItems: Story = {
  args: {
    items: [
      { label: 'Enabled', value: 'enabled' },
      { label: 'Disabled', value: 'disabled', disabled: true },
    ],
    triggerLabel: 'Options',
  },
};

export const DestructiveItem: Story = {
  args: {
    items: [
      { label: 'Rename', value: 'rename' },
      { label: 'Delete', value: 'delete', destructive: true },
    ],
    triggerLabel: 'File',
  },
};

export const WithSeparator: Story = {
  args: { items: sampleItems, triggerLabel: 'Actions' },
};
