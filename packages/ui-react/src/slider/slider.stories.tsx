import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './slider';

const meta = { title: 'Components/Slider', component: Slider, tags: ['autodocs'] } satisfies Meta<typeof Slider>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { defaultValue: 50 } };
export const Disabled: Story = { args: { defaultValue: 30, disabled: true } };

export const Range: Story = {
  args: {
    range: true,
    defaultLowerValue: 25,
    defaultUpperValue: 75,
    lowerAriaLabel: 'Minimum price',
    upperAriaLabel: 'Maximum price',
  },
};
export const RangeTouching: Story = {
  args: {
    range: true,
    defaultLowerValue: 50,
    defaultUpperValue: 50,
    lowerAriaLabel: 'Minimum price',
    upperAriaLabel: 'Maximum price',
  },
};
export const RangeDisabled: Story = {
  args: {
    range: true,
    defaultLowerValue: 25,
    defaultUpperValue: 75,
    disabled: true,
    lowerAriaLabel: 'Minimum price',
    upperAriaLabel: 'Maximum price',
  },
};
export const RangeRtl: Story = {
  args: {
    range: true,
    defaultLowerValue: 25,
    defaultUpperValue: 75,
    lowerAriaLabel: 'Minimum price',
    upperAriaLabel: 'Maximum price',
  },
  decorators: [
    (Story) => (
      <div dir="rtl">
        <Story />
      </div>
    ),
  ],
};
