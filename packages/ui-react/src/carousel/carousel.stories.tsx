import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from './carousel';

const meta = { title: 'Wave 7C/Carousel', component: Carousel, tags: ['autodocs'] } satisfies Meta<typeof Carousel>;
export default meta; type Story = StoryObj<typeof meta>;

const slides = [<div key="0" className="flex items-center justify-center h-48 bg-muted rounded">Dashboard Overview</div>,<div key="1" className="flex items-center justify-center h-48 bg-muted rounded">Sales Report Q3</div>,<div key="2" className="flex items-center justify-center h-48 bg-muted rounded">Team Activity</div>];

export const Default: Story = { args: { children: slides } };
export const NoLoop: Story = { args: { children: slides, loop: false } };
export const Loop: Story = { args: { children: slides, loop: true } };
