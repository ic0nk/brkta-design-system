import type { Meta, StoryObj } from '@storybook/angular';
import { CollapsibleComponent } from './collapsible.component';

const meta: Meta<CollapsibleComponent> = {
  title: 'Components/Collapsible',
  component: CollapsibleComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<CollapsibleComponent>;

export const Default: Story = {
  args: {
    label: 'Show details',
    content: 'Here are the hidden details that appear when you click the trigger.',
  },
};

export const DefaultOpen: Story = {
  args: {
    label: 'Already open',
    content: 'This content is visible by default.',
    defaultOpen: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Cannot toggle',
    content: 'You cannot see this.',
    disabled: true,
  },
};

export const Compact: Story = {
  args: {
    label: 'Advanced filters (2 active)',
    compact: true,
    content: 'Status, developer, price range, delivery date, unit type, payment plan, area, location.',
  },
};
