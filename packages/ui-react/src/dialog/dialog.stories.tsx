import type { Meta, StoryObj } from '@storybook/react';
import { Dialog } from './dialog';
import { Button } from '../button/button';

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { trigger: 'Open Dialog', title: 'Edit Profile', description: 'Make changes to your profile.', children: <p>Form fields here.</p> },
};

export const WithFooter: Story = {
  render: () => (
    <Dialog trigger="Confirm" title="Save Changes" description="Are you sure you want to save?" footer={<><Button variant="outline" size="sm">Cancel</Button><Button variant="primary" size="sm">Save</Button></>}>
      <p>Your changes will be saved.</p>
    </Dialog>
  ),
};

export const LocalizedLabel: Story = { args: { open: true, title: 'تفاصيل الاتصال', closeLabel: 'إغلاق' } };
