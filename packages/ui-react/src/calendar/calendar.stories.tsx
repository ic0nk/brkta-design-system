import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './calendar';

const meta = { title: 'Components/Calendar', component: Calendar, tags: ['autodocs'] } satisfies Meta<typeof Calendar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { defaultMonth: new Date(2026, 6, 1) } };
export const WithSelected: Story = { args: { defaultMonth: new Date(2026, 6, 1), selected: new Date(2026, 6, 15) } };
export const Disabled: Story = { args: { disabled: true } };
