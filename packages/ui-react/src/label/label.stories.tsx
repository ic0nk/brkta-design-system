import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './label';

const meta = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    htmlFor: { control: 'text' },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Username' },
};

export const Required: Story = {
  args: { required: true, children: 'Email address' },
};

export const Disabled: Story = {
  args: { disabled: true, children: 'Full name' },
};

export const WithHtmlFor: Story = {
  args: { htmlFor: 'username-input', children: 'Username' },
};
