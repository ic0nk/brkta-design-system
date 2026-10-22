import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    ariaLabel: { control: 'text' },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {
  args: { ariaLabel: 'Toggle switch' },
};

export const Checked: Story = {
  args: { checked: true, ariaLabel: 'Toggle switch' },
};

export const Disabled: Story = {
  args: { disabled: true, ariaLabel: 'Toggle switch' },
};

export const DisabledChecked: Story = {
  args: { disabled: true, checked: true, ariaLabel: 'Toggle switch' },
};
