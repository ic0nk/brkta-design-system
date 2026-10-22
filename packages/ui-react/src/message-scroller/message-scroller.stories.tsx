import type { Meta, StoryObj } from '@storybook/react';
import { MessageScroller } from './message-scroller';
import { Message } from '../message/message';
import { Bubble } from '../bubble/bubble';

const meta = {
  title: 'Wave 7A/Message Scroller',
  component: MessageScroller,
  tags: ['autodocs'],
} satisfies Meta<typeof MessageScroller>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Conversation: Story = {
  render: () => (
    <MessageScroller>
      <Message variant="incoming" avatar="JD" name="Jane Doe" body="Hey, how is the report going?" timestamp="10:24 AM" />
      <Message variant="outgoing" name="You" body="Almost done! Sending by noon." timestamp="10:25 AM" status="read" />
      <Message variant="incoming" avatar="JD" name="Jane Doe" body="Perfect, thanks!" timestamp="10:26 AM" />
    </MessageScroller>
  ),
};

export const WithBubbles: Story = {
  render: () => (
    <MessageScroller>
      <Bubble variant="incoming" timestamp="10:24 AM">Hello!</Bubble>
      <Bubble variant="outgoing" timestamp="10:25 AM" status="read">Hi there!</Bubble>
      <Bubble variant="system" timestamp="10:26 AM">Jane is typing...</Bubble>
    </MessageScroller>
  ),
};
