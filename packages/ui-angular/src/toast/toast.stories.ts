import type { Meta, StoryObj } from '@storybook/angular';
import { ToastComponent } from './toast.component';

const meta: Meta<ToastComponent> = {
  title: 'Components/Toast',
  component: ToastComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ToastComponent>;

export const Default: Story = { args: { title: 'Default', description: 'This is a default toast.' } };
export const Success: Story = { args: { title: 'Success', description: 'Operation completed.', variant: 'success' } };
export const Warning: Story = { args: { title: 'Warning', description: 'Proceed with caution.', variant: 'warning' } };
export const Destructive: Story = { args: { title: 'Error', description: 'Something went wrong.', variant: 'destructive' } };

export const LocalizedLabel: Story = { args: { title: 'تم الحفظ', dismissLabel: 'إغلاق' } };
