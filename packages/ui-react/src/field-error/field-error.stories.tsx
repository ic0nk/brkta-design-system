import type { Meta, StoryObj } from '@storybook/react';
import { FieldErrorText } from './field-error';

const meta = {
  title: 'Components/FieldErrorText',
  component: FieldErrorText,
  tags: ['autodocs'],
} satisfies Meta<typeof FieldErrorText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This field is required.',
  },
};

export const WithCustomId: Story = {
  args: {
    id: 'custom-error-id',
    children: 'Invalid value. Please try again.',
  },
};
