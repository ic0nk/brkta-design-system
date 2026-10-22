import type { Meta, StoryObj } from '@storybook/angular';
import { TooltipComponent } from './tooltip.component';

const meta: Meta<TooltipComponent> = {
  title: 'Components/Tooltip',
  component: TooltipComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<TooltipComponent>;

export const Default: Story = {
  args: { content: 'Save your changes' },
  render: (args) => ({ props: args, template: '<brkta-tooltip [content]="content">Save</brkta-tooltip>' }),
};

export const LongText: Story = {
  args: { content: 'This action will permanently delete the selected item and all associated data.' },
  render: (args) => ({ props: args, template: '<brkta-tooltip [content]="content">Delete</brkta-tooltip>' }),
};

export const TopPosition: Story = {
  args: { content: 'Edit this item' },
  render: (args) => ({ props: args, template: '<brkta-tooltip [content]="content">Edit</brkta-tooltip>' }),
};
