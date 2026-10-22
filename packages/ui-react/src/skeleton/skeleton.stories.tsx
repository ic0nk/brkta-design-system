import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './skeleton';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'card', 'table'],
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Skeleton variant="text" />
      <Skeleton variant="text" width="75%" />
      <Skeleton variant="text" width="50%" />
    </div>
  ),
};

export const Card: Story = {
  args: { variant: 'card' },
};

export const Table: Story = {
  args: { variant: 'table' },
};
