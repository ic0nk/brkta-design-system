import type { Meta, StoryObj } from '@storybook/angular';
import { ProgressComponent } from './progress.component';

const meta: Meta<ProgressComponent> = {
  title: 'Components/Progress',
  component: ProgressComponent,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<ProgressComponent>;

export const TwentyFivePercent: Story = {
  render: () => ({
    template: `<brkta-progress [value]="25"></brkta-progress>`,
  }),
};

export const FiftyPercent: Story = {
  render: () => ({
    template: `<brkta-progress [value]="50"></brkta-progress>`,
  }),
};

export const SeventyFivePercent: Story = {
  render: () => ({
    template: `<brkta-progress [value]="75"></brkta-progress>`,
  }),
};

export const Complete: Story = {
  render: () => ({
    template: `<brkta-progress [value]="100"></brkta-progress>`,
  }),
};

export const Small: Story = {
  render: () => ({
    template: `<brkta-progress [value]="60" size="sm"></brkta-progress>`,
  }),
};

export const Medium: Story = {
  render: () => ({
    template: `<brkta-progress [value]="60" size="md"></brkta-progress>`,
  }),
};

export const Large: Story = {
  render: () => ({
    template: `<brkta-progress [value]="60" size="lg"></brkta-progress>`,
  }),
};

export const CustomMax: Story = {
  render: () => ({
    template: `<brkta-progress [value]="30" [max]="60"></brkta-progress>`,
  }),
};
