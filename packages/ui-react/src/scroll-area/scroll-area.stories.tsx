import type { Meta, StoryObj } from '@storybook/react';
import { ScrollArea } from './scroll-area';

const meta = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const longContent = (
  <div style={{ width: '800px' }}>
    {Array.from({ length: 20 }, (_, i) => (
      <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
        Item {i + 1}: This is a scrollable content row with some text to demonstrate overflow.
      </div>
    ))}
  </div>
);

export const Default: Story = {
  render: () => <ScrollArea maxHeight="200px">{longContent}</ScrollArea>,
};

export const HorizontalScroll: Story = {
  render: () => <ScrollArea horizontalScroll maxWidth="400px">{longContent}</ScrollArea>,
};
