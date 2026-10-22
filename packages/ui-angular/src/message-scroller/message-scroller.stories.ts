import type { Meta, StoryObj } from '@storybook/angular';
import { MessageScrollerComponent } from './message-scroller.component';
import { MessageComponent } from '../message/message.component';
import { BubbleComponent } from '../bubble/bubble.component';

const meta: Meta<MessageScrollerComponent> = {
  title: 'Wave 7A/Message Scroller',
  component: MessageScrollerComponent,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<MessageScrollerComponent>;

export const Conversation: Story = {
  render: () => ({
    moduleMetadata: { imports: [MessageScrollerComponent, MessageComponent] },
    template: `
      <brkta-message-scroller>
        <brkta-message variant="incoming" avatar="JD" name="Jane Doe" timestamp="10:24 AM">Hey, how is the report going?</brkta-message>
        <brkta-message variant="outgoing" name="You" timestamp="10:25 AM" status="read">Almost done!</brkta-message>
        <brkta-message variant="incoming" avatar="JD" name="Jane Doe" timestamp="10:26 AM">Perfect, thanks!</brkta-message>
      </brkta-message-scroller>
    `,
  }),
};

export const WithBubbles: Story = {
  render: () => ({
    moduleMetadata: { imports: [MessageScrollerComponent, BubbleComponent] },
    template: `
      <brkta-message-scroller>
        <brkta-bubble variant="incoming" timestamp="10:24 AM">Hello!</brkta-bubble>
        <brkta-bubble variant="outgoing" timestamp="10:25 AM" status="read">Hi there!</brkta-bubble>
        <brkta-bubble variant="system" timestamp="10:26 AM">Jane is typing...</brkta-bubble>
      </brkta-message-scroller>
    `,
  }),
};
