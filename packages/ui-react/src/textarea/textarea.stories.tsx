import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './textarea';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    rows: { control: 'number' },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: 'Enter your message...', rows: 4 },
};

export const Filled: Story = {
  args: { variant: 'filled', placeholder: 'Filled textarea...', rows: 4 },
};

export const Ghost: Story = {
  args: { variant: 'ghost', placeholder: 'Ghost textarea...', rows: 4 },
};

export const Small: Story = {
  args: { size: 'sm', placeholder: 'Small textarea...', rows: 3 },
};

export const Medium: Story = {
  args: { size: 'md', placeholder: 'Medium textarea...', rows: 4 },
};

export const Large: Story = {
  args: { size: 'lg', placeholder: 'Large textarea...', rows: 5 },
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: 'Disabled textarea...', rows: 4 },
};

export const Invalid: Story = {
  args: { invalid: true, placeholder: 'Invalid textarea...', rows: 4 },
};
