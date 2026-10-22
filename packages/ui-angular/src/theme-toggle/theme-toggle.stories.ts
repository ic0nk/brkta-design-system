import type { Meta, StoryObj } from '@storybook/angular';
import { ThemeToggleComponent } from './theme-toggle.component';

const meta: Meta<ThemeToggleComponent> = {
  title: 'Wave 7C/Theme Toggle',
  component: ThemeToggleComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ThemeToggleComponent>;

export const SystemLight: Story = { args: { mode: 'system', resolved: 'light', ariaLabel: 'Use light theme' } };
export const Dark: Story = { args: { mode: 'dark', resolved: 'dark', ariaLabel: 'Use system theme' } };
