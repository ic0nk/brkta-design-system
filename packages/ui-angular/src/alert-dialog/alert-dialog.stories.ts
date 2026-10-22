import type { Meta, StoryObj } from '@storybook/angular';
import { AlertDialogComponent } from './alert-dialog.component';

const meta: Meta<AlertDialogComponent> = {
  title: 'Components/AlertDialog',
  component: AlertDialogComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<AlertDialogComponent>;

export const Default: Story = {
  args: { open: true, title: 'Delete Account', description: 'This action cannot be undone.', confirmLabel: 'Delete', cancelLabel: 'Cancel', destructive: true },
};

export const AsyncControlled: Story = {
  args: { open: true, title: 'Archive record', description: 'Dependencies are checked before archiving.', closeOnConfirm: false, loading: true, confirmLabel: 'Archive' },
};
