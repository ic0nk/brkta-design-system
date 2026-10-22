import type { Meta, StoryObj } from '@storybook/react';
import { ThemeToggle } from './theme-toggle';

const meta = { title: 'Wave 7C/Theme Toggle', component: ThemeToggle, tags: ['autodocs'] } satisfies Meta<typeof ThemeToggle>;
export default meta;
type Story = StoryObj<typeof meta>;

export const SystemLight: Story = { args: { mode: 'system', resolved: 'light', ariaLabel: 'Use light theme' } };
export const Dark: Story = { args: { mode: 'dark', resolved: 'dark', ariaLabel: 'Use system theme' } };
