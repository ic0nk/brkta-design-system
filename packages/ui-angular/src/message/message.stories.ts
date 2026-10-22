import type { Meta, StoryObj } from '@storybook/angular';
import { MessageComponent } from './message.component';

const meta: Meta<MessageComponent> = {
  title: 'Wave 7A/Message',
  component: MessageComponent,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<MessageComponent>;

export const Incoming: Story = {
  args: { variant: 'incoming', avatar: 'JD', name: 'Jane Doe', timestamp: '10:24 AM', status: 'delivered' },
  render: (args) => ({
    props: args,
    template: `<brkta-message [variant]="variant" [avatar]="avatar" [name]="name" [timestamp]="timestamp" [status]="status">The Q3 numbers look great. Can we schedule a review?</brkta-message>`,
  }),
};

export const Outgoing: Story = {
  args: { variant: 'outgoing', name: 'You', timestamp: '10:25 AM', status: 'read' },
  render: (args) => ({
    props: args,
    template: `<brkta-message [variant]="variant" [name]="name" [timestamp]="timestamp" [status]="status">Sure, let me check the calendar and send an invite.</brkta-message>`,
  }),
};

export const SystemMessage: Story = {
  args: { variant: 'system', timestamp: '09:00 AM' },
  render: (args) => ({
    props: args,
    template: `<brkta-message [variant]="variant" [timestamp]="timestamp">Conversation started</brkta-message>`,
  }),
};
