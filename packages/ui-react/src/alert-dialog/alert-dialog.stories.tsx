import type { Meta, StoryObj } from '@storybook/react';
import { AlertDialog } from './alert-dialog';

const meta = {
  title: 'Components/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { trigger: 'Delete account', title: 'Delete Account', description: 'This action cannot be undone. All data will be permanently removed.', confirmLabel: 'Delete', cancelLabel: 'Cancel', destructive: true },
};

export const Confirmation: Story = {
  args: { trigger: 'Publish', title: 'Publish Document', description: 'This document will be visible to all team members.', confirmLabel: 'Publish', cancelLabel: 'Cancel' },
};

export const AsyncControlled: Story = {
  args: { open: true, title: 'Archive record', description: 'Dependencies are checked before archiving.', closeOnConfirm: false, loading: true, confirmLabel: 'Archive' },
};
