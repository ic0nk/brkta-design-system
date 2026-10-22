import type { Meta, StoryObj } from '@storybook/angular';
import { AccordionComponent } from './accordion.component';

const meta: Meta<AccordionComponent> = {
  title: 'Components/Accordion',
  component: AccordionComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<AccordionComponent>;

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
