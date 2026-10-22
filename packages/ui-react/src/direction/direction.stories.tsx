import type { Meta, StoryObj } from '@storybook/react';
import { Direction } from './direction';

const meta = {
  title: 'Wave 7B/Direction',
  component: Direction,
  tags: ['autodocs'],
} satisfies Meta<typeof Direction>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LTR: Story = {
  args: { dir: 'ltr', children: <div className="flex gap-2"><span>← Previous</span><span>•</span><span>Next →</span></div> },
};
export const RTL: Story = {
  args: { dir: 'rtl', children: <div className="flex gap-2"><span>→ Previous</span><span>•</span><span>Next ←</span></div> },
};
