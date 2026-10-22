import type { Meta, StoryObj } from '@storybook/react';
import { ToggleGroup } from './toggle-group';
import { Toggle } from '../toggle/toggle';

const meta = {
  title: 'Wave 7B/Toggle Group',
  component: ToggleGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleSelect: Story = {
  render: () => <ToggleGroup><Toggle pressed>Daily</Toggle><Toggle>Weekly</Toggle><Toggle>Monthly</Toggle></ToggleGroup>,
};
export const MultiSelect: Story = {
  render: () => <ToggleGroup type="multiple"><Toggle pressed>Bold</Toggle><Toggle pressed>Italic</Toggle><Toggle>Underline</Toggle></ToggleGroup>,
};
