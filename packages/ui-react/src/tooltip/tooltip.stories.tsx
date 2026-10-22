import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './tooltip';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { content: 'Save your changes', children: 'Save' },
};

export const LongText: Story = {
  args: { content: 'This action will permanently delete the selected item and all associated data.', children: 'Delete' },
};

export const TopPosition: Story = {
  args: { content: 'Edit this item', children: 'Edit' },
};
