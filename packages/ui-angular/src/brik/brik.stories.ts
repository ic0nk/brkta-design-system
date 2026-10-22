import type { Meta, StoryObj } from '@storybook/angular';
import { BrikComponent } from './brik.component';

const meta: Meta<BrikComponent> = {
  title: 'Components/Brik',
  component: BrikComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<BrikComponent>;

export const Idle: Story = {
  render: () => ({
    template: `<div style="width:160px"><brkta-brik state="idle"></brkta-brik></div>`,
  }),
};

export const Wave: Story = {
  render: () => ({
    template: `<div style="width:160px"><brkta-brik state="wave"></brkta-brik></div>`,
  }),
};

export const Party: Story = {
  render: () => ({
    template: `<div style="width:160px"><brkta-brik state="party"></brkta-brik></div>`,
  }),
};
