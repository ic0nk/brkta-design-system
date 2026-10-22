import type { Meta, StoryObj } from '@storybook/angular';
import { DialogComponent } from './dialog.component';

const meta: Meta<DialogComponent> = {
  title: 'Components/Dialog',
  component: DialogComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<DialogComponent>;

export const Default: Story = {
  args: { open: true, title: 'Edit Profile', description: 'Make changes to your profile.' },
};

export const LocalizedLabel: Story = { args: { open: true, title: 'تفاصيل الاتصال', closeLabel: 'إغلاق' } };
