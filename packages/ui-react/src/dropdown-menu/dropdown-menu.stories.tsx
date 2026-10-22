import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenu, type DropdownMenuEntry } from './dropdown-menu';

const IconPen = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>
  </svg>
);
const IconCopy = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
  </svg>
);
const IconPaste = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
  </svg>
);

const sampleItems: DropdownMenuEntry[] = [
  { label: 'Edit', value: 'edit', icon: <IconPen />, shortcut: '⌘E' },
  { label: 'Duplicate', value: 'duplicate', icon: <IconCopy />, shortcut: '⌘D' },
  { type: 'separator' },
  { label: 'Move to folder', value: 'move' },
  { type: 'label', label: 'Danger zone' },
  { label: 'Delete', value: 'delete', destructive: true, shortcut: '⌫' },
  { label: 'Archive', value: 'archive', disabled: true },
];

const meta = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { items: sampleItems, trigger: 'Actions' } };

export const WithIcons: Story = {
  args: {
    items: [
      { label: 'Edit', value: 'edit', icon: <IconPen /> },
      { label: 'Copy', value: 'copy', icon: <IconCopy /> },
      { label: 'Paste', value: 'paste', icon: <IconPaste /> },
    ],
    trigger: 'Edit',
  },
};

export const WithShortcuts: Story = {
  args: {
    items: [
      { label: 'Undo', value: 'undo', shortcut: '⌘Z' },
      { label: 'Redo', value: 'redo', shortcut: '⌘⇧Z' },
    ],
    trigger: 'History',
  },
};

export const DisabledItems: Story = {
  args: {
    items: [
      { label: 'Enabled', value: 'enabled' },
      { label: 'Disabled', value: 'disabled', disabled: true },
    ],
    trigger: 'Options',
  },
};

export const DestructiveItem: Story = {
  args: {
    items: [
      { label: 'Rename', value: 'rename' },
      { label: 'Delete', value: 'delete', destructive: true },
    ],
    trigger: 'File',
  },
};

export const WithSeparatorLabel: Story = {
  args: { items: sampleItems, trigger: 'Actions' },
};
