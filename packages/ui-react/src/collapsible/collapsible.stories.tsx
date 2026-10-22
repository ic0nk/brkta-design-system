import type { Meta, StoryObj } from '@storybook/react';
import { Collapsible } from './collapsible';

const meta = {
  title: 'Components/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Show details', content: 'Here are the hidden details that appear when you click the trigger.' },
};

export const DefaultOpen: Story = {
  args: { label: 'Already open', content: 'This content is visible by default.', defaultOpen: true },
};

export const Disabled: Story = {
  args: { label: 'Cannot toggle', content: 'You cannot see this.', disabled: true },
};

export const Compact: Story = {
  args: {
    label: 'Advanced filters (2 active)',
    compact: true,
    content: (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        <div>Status</div>
        <div>Developer</div>
        <div>Price range</div>
        <div>Delivery date</div>
        <div>Unit type</div>
        <div>Payment plan</div>
        <div>Area</div>
        <div>Location</div>
      </div>
    ),
  },
};
