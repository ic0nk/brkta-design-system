import type { Meta, StoryObj } from '@storybook/angular';
import { BubbleComponent } from './bubble.component';

const meta: Meta<BubbleComponent> = {
  title: 'Wave 7A/Bubble',
  component: BubbleComponent,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<BubbleComponent>;

export const Incoming: Story = {
  args: { variant: 'incoming', timestamp: '10:24 AM' },
  render: (args) => ({
    props: args,
    template: `<brkta-bubble [variant]="variant" [timestamp]="timestamp">Hey, how is the Q3 report going?</brkta-bubble>`,
  }),
};

export const Outgoing: Story = {
  args: { variant: 'outgoing', timestamp: '10:25 AM', status: 'read' },
  render: (args) => ({
    props: args,
    template: `<brkta-bubble [variant]="variant" [timestamp]="timestamp" [status]="status">Almost done! Will send it by noon.</brkta-bubble>`,
  }),
};

export const System: Story = {
  args: { variant: 'system', timestamp: '10:20 AM' },
  render: (args) => ({
    props: args,
    template: `<brkta-bubble [variant]="variant" [timestamp]="timestamp">Jane joined the conversation</brkta-bubble>`,
  }),
};
