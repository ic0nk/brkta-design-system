import type { Meta, StoryObj } from '@storybook/angular';
import { SpinnerComponent } from './spinner.component';

const meta: Meta<SpinnerComponent> = {
  title: 'Components/Spinner',
  component: SpinnerComponent,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<SpinnerComponent>;

export const Small: Story = {
  render: () => ({
    template: `<brkta-spinner size="sm"></brkta-spinner>`,
  }),
};

export const Medium: Story = {
  render: () => ({
    template: `<brkta-spinner size="md"></brkta-spinner>`,
  }),
};

export const Large: Story = {
  render: () => ({
    template: `<brkta-spinner size="lg"></brkta-spinner>`,
  }),
};
