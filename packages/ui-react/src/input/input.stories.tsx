import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';
import { Button } from '../button/button';
import { AnimatedMail } from '../animated-icons/animated-mail';

const meta = {
  title: 'Components/Input',
  component: Input,
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
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: 'Enter text...' },
};

export const Filled: Story = {
  args: { variant: 'filled', placeholder: 'Filled input...' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', placeholder: 'Ghost input...' },
};

export const Small: Story = {
  args: { size: 'sm', placeholder: 'Small input...' },
};

export const Medium: Story = {
  args: { size: 'md', placeholder: 'Medium input...' },
};

export const Large: Story = {
  args: { size: 'lg', placeholder: 'Large input...' },
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: 'Disabled input...' },
};

export const Invalid: Story = {
  args: { invalid: true, placeholder: 'Invalid input...' },
};

export const WithSuffix: Story = {
  render: () => (
    <Input
      type="password"
      value="secret"
      suffix={
        <Button
          variant="ghost"
          size="icon-sm"
          accessibleLabel="Show password"
          iconBefore={<AnimatedMail size={16} />}
        />
      }
    />
  ),
};
