import type { Meta, StoryObj } from '@storybook/react';
import { Bubble } from './bubble';

const meta = {
  title: 'Wave 7A/Bubble',
  component: Bubble,
  tags: ['autodocs'],
} satisfies Meta<typeof Bubble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Incoming: Story = {
  args: {
    variant: 'incoming',
    children: 'Hey, how is the Q3 report going?',
    timestamp: '10:24 AM',
  },
};

export const Outgoing: Story = {
  args: {
    variant: 'outgoing',
    children: 'Almost done! Will send it by noon.',
    timestamp: '10:25 AM',
    status: 'read',
  },
};

export const System: Story = {
  args: {
    variant: 'system',
    children: 'Jane joined the conversation',
    timestamp: '10:20 AM',
  },
};

export const ErrorStatus: Story = {
  args: {
    variant: 'outgoing',
    children: 'This message failed to send.',
    timestamp: '10:30 AM',
    status: 'error',
  },
};
