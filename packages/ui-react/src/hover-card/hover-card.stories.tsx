import type { Meta, StoryObj } from '@storybook/react';
import { HoverCard } from './hover-card';

const meta = { title: 'Wave 7C/Hover Card', component: HoverCard, tags: ['autodocs'] } satisfies Meta<typeof HoverCard>;
export default meta; type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    trigger: <span className="underline cursor-pointer text-sm">Hover me</span>,
    children: <div className="space-y-2"><p className="font-medium">Profile Info</p><p className="text-xs text-muted-foreground">Jane Doe · Engineering Team</p></div>,
  },
};
