import type { Meta, StoryObj } from '@storybook/angular';
import { TextareaComponent } from './textarea.component';

const meta: Meta<TextareaComponent> = {
  title: 'Forms/Textarea',
  component: TextareaComponent,
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
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    rows: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<TextareaComponent>;

export const Default: Story = {
  render: () => ({
    template: `<brkta-textarea placeholder="Enter description..." />`,
  }),
};

export const Filled: Story = {
  render: () => ({
    template: `<brkta-textarea variant="filled" placeholder="Filled variant" />`,
  }),
};

export const Ghost: Story = {
  render: () => ({
    template: `<brkta-textarea variant="ghost" placeholder="Ghost variant" />`,
  }),
};

export const Small: Story = {
  render: () => ({
    template: `<brkta-textarea size="sm" placeholder="Small textarea" rows="2" />`,
  }),
};

export const Large: Story = {
  render: () => ({
    template: `<brkta-textarea size="lg" placeholder="Large textarea" rows="5" />`,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `<brkta-textarea disabled placeholder="Disabled textarea" />`,
  }),
};

export const Invalid: Story = {
  render: () => ({
    template: `<brkta-textarea invalid placeholder="Invalid textarea" />`,
  }),
};

export const CustomRows: Story = {
  render: () => ({
    template: `<brkta-textarea [rows]="6" placeholder="6 rows tall" />`,
  }),
};
