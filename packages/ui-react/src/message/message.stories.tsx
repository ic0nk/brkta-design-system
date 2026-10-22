import type { Meta, StoryObj } from '@storybook/react';
import { Message } from './message';

const meta = {
  title: 'Wave 7A/Message',
  component: Message,
  tags: ['autodocs'],
} satisfies Meta<typeof Message>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Incoming: Story = {
  args: {
    variant: 'incoming',
    avatar: 'JD',
    name: 'Jane Doe',
    body: 'The Q3 numbers look great. Can we schedule a review?',
    timestamp: '10:24 AM',
    status: 'delivered',
  },
};

export const Outgoing: Story = {
  args: {
    variant: 'outgoing',
    name: 'You',
    body: 'Sure, let me check the calendar and send an invite.',
    timestamp: '10:25 AM',
    status: 'read',
  },
};

export const SystemMessage: Story = {
  args: {
    variant: 'system',
    body: 'Conversation started',
    timestamp: '09:00 AM',
  },
};

export const WithoutAvatar: Story = {
  args: {
    variant: 'incoming',
    name: 'Alex Morgan',
    body: 'Can someone review PR #412?',
    timestamp: '11:00 AM',
  },
};
