import type { Meta, StoryObj } from '@storybook/angular'; import { EmptyStateComponent } from './empty-state.component';
const meta: Meta<EmptyStateComponent> = { title: 'Components/EmptyState', component: EmptyStateComponent, tags: ['autodocs'] };
export default meta; type Story = StoryObj<EmptyStateComponent>;
export const Default: Story = { args: { title: 'No items found', description: 'Get started by creating your first item.' } };
