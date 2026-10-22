import type { Meta, StoryObj } from '@storybook/angular';
import { SeparatorComponent } from './separator.component';

const meta: Meta<SeparatorComponent> = {
  title: 'Components/Separator',
  component: SeparatorComponent,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
};

export default meta;
type Story = StoryObj<SeparatorComponent>;

export const Horizontal: Story = {
  render: () => ({
    template: `<brkta-separator orientation="horizontal"></brkta-separator>`,
  }),
};

export const Vertical: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; align-items: center; height: 60px;">
        <span>Left</span>
        <brkta-separator orientation="vertical"></brkta-separator>
        <span>Right</span>
      </div>
    `,
  }),
};
