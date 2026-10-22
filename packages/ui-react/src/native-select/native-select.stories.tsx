import type { Meta, StoryObj } from '@storybook/react';
import { NativeSelect } from './native-select';

const meta = {
  title: 'Components/NativeSelect',
  component: NativeSelect,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof NativeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <NativeSelect>
      <option value="">Select an option</option>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </NativeSelect>
  ),
};

export const Filled: Story = {
  render: () => (
    <NativeSelect variant="filled">
      <option value="">Select an option</option>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </NativeSelect>
  ),
};

export const Small: Story = {
  render: () => (
    <NativeSelect size="sm">
      <option value="">Select</option>
      <option value="1">One</option>
      <option value="2">Two</option>
    </NativeSelect>
  ),
};

export const Medium: Story = {
  render: () => (
    <NativeSelect size="md">
      <option value="">Select</option>
      <option value="1">One</option>
      <option value="2">Two</option>
    </NativeSelect>
  ),
};

export const Large: Story = {
  render: () => (
    <NativeSelect size="lg">
      <option value="">Select</option>
      <option value="1">One</option>
      <option value="2">Two</option>
    </NativeSelect>
  ),
};

export const Disabled: Story = {
  render: () => (
    <NativeSelect disabled>
      <option value="">Disabled select</option>
      <option value="1">Option 1</option>
    </NativeSelect>
  ),
};

export const Invalid: Story = {
  render: () => (
    <NativeSelect invalid>
      <option value="">Select an option</option>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
    </NativeSelect>
  ),
};
