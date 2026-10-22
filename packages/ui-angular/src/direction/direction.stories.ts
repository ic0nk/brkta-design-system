import type { Meta, StoryObj } from '@storybook/angular';
import { DirectionComponent } from './direction.component';

const meta: Meta<DirectionComponent> = {
  title: 'Wave 7B/Direction',
  component: DirectionComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<DirectionComponent>;

export const LTR: Story = {
  render: () => ({
    template: `<brkta-direction dir="ltr"><div class="flex gap-2"><span>&larr; Previous</span><span>&bull;</span><span>Next &rarr;</span></div></brkta-direction>`,
  }),
};
export const RTL: Story = {
  render: () => ({
    template: `<brkta-direction dir="rtl"><div class="flex gap-2"><span>&rarr; Previous</span><span>&bull;</span><span>Next &larr;</span></div></brkta-direction>`,
  }),
};
