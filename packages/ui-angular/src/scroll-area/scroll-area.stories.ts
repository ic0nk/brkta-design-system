import type { Meta, StoryObj } from '@storybook/angular';
import { ScrollAreaComponent } from './scroll-area.component';

const meta: Meta<ScrollAreaComponent> = {
  title: 'Components/ScrollArea',
  component: ScrollAreaComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ScrollAreaComponent>;

const longContent = Array.from({ length: 20 }, (_, i) =>
  `<div style="padding: 8px 0; border-bottom: 1px solid var(--border);">
    Item ${i + 1}: This is a scrollable content row with some text to demonstrate overflow.
  </div>`
).join('');

export const Default: Story = {
  args: { maxHeight: '200px' },
  render: (args) => ({
    props: args,
    template: `<brkta-scroll-area [maxHeight]="maxHeight">${longContent}</brkta-scroll-area>`,
  }),
};

export const HorizontalScroll: Story = {
  args: { horizontalScroll: true, maxWidth: '400px' },
  render: (args) => ({
    props: args,
    template: `<brkta-scroll-area [horizontalScroll]="horizontalScroll" [maxWidth]="maxWidth">
      <div style="width: 800px; display: flex; gap: 8px;">
        ${Array.from({ length: 15 }, (_, i) => `<div style="min-width: 100px; padding: 16px; border: 1px solid var(--border); border-radius: var(--radius-md);">Card ${i + 1}</div>`).join('')}
      </div>
    </brkta-scroll-area>`,
  }),
};
