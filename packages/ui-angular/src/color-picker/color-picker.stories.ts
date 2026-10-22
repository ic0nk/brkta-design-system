import type { Meta, StoryObj } from '@storybook/angular';
import { ColorPickerComponent } from './color-picker.component';

const meta: Meta<ColorPickerComponent> = {
  title: 'Components/ColorPicker',
  component: ColorPickerComponent,
  tags: ['autodocs'],
  args: { ariaLabel: 'Brand primary colour', value: '#61161c' },
};
export default meta;
type Story = StoryObj<ColorPickerComponent>;

export const Default: Story = {};
export const Invalid: Story = { args: { invalid: true } };
export const Disabled: Story = { args: { disabled: true } };
