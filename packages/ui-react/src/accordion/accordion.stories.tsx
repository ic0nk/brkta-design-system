import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './accordion';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = [
  { value: 'item-1', label: 'What is BRKTA?', content: 'BRKTA is a multi-tenant business operating system built for modern teams.' },
  { value: 'item-2', label: 'How does billing work?', content: 'Billing is per-tenant with flexible plans. You can upgrade or downgrade at any time.' },
  { value: 'item-3', label: 'Can I export my data?', content: 'Yes, all data can be exported in CSV, JSON, or PDF format.', disabled: true },
];

export const Default: Story = {
  args: { items: defaultItems },
};

export const MultipleOpen: Story = {
  args: { items: defaultItems, multiple: true },
};

export const WithDefaultOpen: Story = {
  args: { items: defaultItems, defaultValue: 'item-1' },
};

export const WithMultipleDefaultOpen: Story = {
  args: { items: defaultItems, multiple: true, defaultValue: ['item-1', 'item-2'] },
};
