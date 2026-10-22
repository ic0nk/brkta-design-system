import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from './popover';

const meta = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { trigger: 'More info', children: 'This is a popover with helpful information about this feature.' },
};

export const WithFormContent: Story = {
  render: () => (
    <Popover trigger="Set status">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <span style={{ fontWeight: 500 }}>Status</span>
        <span>Active</span>
        <span>Away</span>
        <span>Do not disturb</span>
      </div>
    </Popover>
  ),
};

export const AboveTrigger: Story = {
  args: { trigger: 'Account', children: 'Account actions', side: 'top' },
};
