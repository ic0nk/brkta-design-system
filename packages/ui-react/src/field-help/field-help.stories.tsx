import type { Meta, StoryObj } from '@storybook/react';
import { FieldHelpText } from './field-help';

const meta = {
  title: 'Components/FieldHelpText',
  component: FieldHelpText,
  tags: ['autodocs'],
} satisfies Meta<typeof FieldHelpText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is helper text for a form field.',
  },
};

export const WithCustomId: Story = {
  args: {
    id: 'custom-help-id',
    children: 'Helper text with a custom ID for aria-describedby.',
  },
};
