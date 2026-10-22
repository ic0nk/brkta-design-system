import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './toggle';

const meta = {
  title: 'Wave 7B/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    pressed: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Default' },
};
export const Pressed: Story = {
  args: { pressed: true, children: 'Pressed' },
};
export const Disabled: Story = {
  args: { disabled: true, children: 'Disabled' },
};
export const IconOnly: Story = {
  args: { 'aria-label': 'Bold', children: 'B', pressed: false },
};
