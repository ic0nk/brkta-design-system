import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    label: { control: 'text' },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {
  args: { label: 'Unchecked' },
};

export const Checked: Story = {
  args: { checked: true, label: 'Checked' },
};

export const Indeterminate: Story = {
  args: { indeterminate: true, label: 'Indeterminate' },
};

export const Disabled: Story = {
  args: { disabled: true, label: 'Disabled' },
};

export const DisabledChecked: Story = {
  args: { disabled: true, checked: true, label: 'Disabled & checked' },
};

export const Invalid: Story = {
  args: { invalid: true, label: 'Invalid' },
};

export const WithoutLabel: Story = {
  args: {},
};
