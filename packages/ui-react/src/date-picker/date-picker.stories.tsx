import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './date-picker';

const meta = { title: 'Components/DatePicker', component: DatePicker, tags: ['autodocs'] } satisfies Meta<typeof DatePicker>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithValue: Story = { args: { defaultValue: new Date(2026, 6, 15) } };
export const Disabled: Story = { args: { disabled: true } };
