import type { Meta, StoryObj } from '@storybook/react';
import { FieldDescription } from './field-description';

const meta = {
  title: 'Components/FieldDescription',
  component: FieldDescription,
  tags: ['autodocs'],
} satisfies Meta<typeof FieldDescription>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a longer description for a form field.',
  },
};

export const WithCustomId: Story = {
  args: {
    id: 'custom-desc-id',
    children: 'Description text with a custom ID for aria-describedby.',
  },
};
