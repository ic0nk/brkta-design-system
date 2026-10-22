import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './progress';

const meta = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TwentyFivePercent: Story = {
  args: { value: 25 },
};

export const FiftyPercent: Story = {
  args: { value: 50 },
};

export const SeventyFivePercent: Story = {
  args: { value: 75 },
};

export const Complete: Story = {
  args: { value: 100 },
};

export const Small: Story = {
  args: { value: 60, size: 'sm' },
};

export const Medium: Story = {
  args: { value: 60, size: 'md' },
};

export const Large: Story = {
  args: { value: 60, size: 'lg' },
};

export const CustomMax: Story = {
  args: { value: 30, max: 60 },
};
