import type { Meta, StoryObj } from '@storybook/react';
import { Sheet } from './sheet';

const meta = {
  title: 'Components/Sheet',
  component: Sheet,
  tags: ['autodocs'],
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Right: Story = { args: { trigger: 'Open right', title: 'Details', children: <p>Content panel</p>, side: 'right', size: 'md', footer: <button>Save</button> } };
export const Left: Story = { args: { trigger: 'Open left', title: 'Menu', children: <p>Navigation</p>, side: 'left', size: 'sm' } };
export const Top: Story = { args: { trigger: 'Open top', title: 'Notifications', children: <p>Alerts</p>, side: 'top', size: 'lg' } };
export const Bottom: Story = { args: { trigger: 'Open bottom', title: 'Actions', children: <p>Quick actions</p>, side: 'bottom', size: 'xl' } };
