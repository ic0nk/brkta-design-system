import type { Meta, StoryObj } from '@storybook/angular';
import { DatePickerComponent } from './date-picker.component';

const meta: Meta<DatePickerComponent> = { title: 'Components/DatePicker', component: DatePickerComponent, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<DatePickerComponent>;

export const Default: Story = {};
export const WithValue: Story = { args: { defaultValue: new Date(2026, 6, 15) } };
export const Disabled: Story = { args: { disabled: true } };
