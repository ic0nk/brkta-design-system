import type { Meta, StoryObj } from '@storybook/angular';
import { SliderComponent } from './slider.component';

const meta: Meta<SliderComponent> = { title: 'Components/Slider', component: SliderComponent, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<SliderComponent>;

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
  render: () => ({
    template: `<div dir="rtl"><brkta-slider [range]="true" [defaultLowerValue]="25" [defaultUpperValue]="75" lowerAriaLabel="Minimum price" upperAriaLabel="Maximum price"></brkta-slider></div>`,
  }),
};
