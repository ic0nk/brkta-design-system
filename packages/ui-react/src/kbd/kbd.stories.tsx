import type { Meta, StoryObj } from '@storybook/react';
import { Kbd } from './kbd';

const meta = {
  title: 'Components/Kbd',
  component: Kbd,
  tags: ['autodocs'],
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleKey: Story = {
  args: { keys: '⌘' },
};

export const Shortcut: Story = {
  args: { keys: 'Ctrl+S' },
};

export const Chord: Story = {
  args: { keys: 'Shift+⌘+P' },
};
