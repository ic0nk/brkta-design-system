import type { Meta, StoryObj } from '@storybook/react';
import { ColorPicker } from './color-picker';

const meta = {
  title: 'Components/ColorPicker',
  component: ColorPicker,
  tags: ['autodocs'],
  args: { ariaLabel: 'Brand primary colour', value: '#61161c' },
} satisfies Meta<typeof ColorPicker>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Invalid: Story = { args: { invalid: true } };
export const Disabled: Story = { args: { disabled: true } };
