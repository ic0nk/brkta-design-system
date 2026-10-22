import type { Meta, StoryObj } from '@storybook/angular';
import { CalendarComponent } from './calendar.component';

const meta: Meta<CalendarComponent> = { title: 'Components/Calendar', component: CalendarComponent, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<CalendarComponent>;

export const Default: Story = { args: { defaultMonth: new Date(2026, 6, 1) } };
export const WithSelected: Story = { args: { defaultMonth: new Date(2026, 6, 1), selected: new Date(2026, 6, 15) } };
export const Disabled: Story = { args: { disabled: true } };
