import type { Meta, StoryObj } from '@storybook/react';
import { Toast, ToastViewport } from './toast';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { title: 'Default', description: 'This is a default toast.' } };
export const Success: Story = { args: { title: 'Success', description: 'Operation completed.', variant: 'success' } };
export const Warning: Story = { args: { title: 'Warning', description: 'Proceed with caution.', variant: 'warning' } };
export const Destructive: Story = { args: { title: 'Error', description: 'Something went wrong.', variant: 'destructive' } };

export const Stacking: Story = {
  render: () => (
    <ToastViewport>
      <Toast title="First" description="First toast" />
      <Toast title="Second" description="Second toast" variant="success" />
      <Toast title="Third" description="Third toast" variant="warning" />
    </ToastViewport>
  ),
};

export const LocalizedLabel: Story = { args: { title: 'تم الحفظ', dismissLabel: 'إغلاق' } };
