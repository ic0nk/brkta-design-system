import type { Meta, StoryObj } from '@storybook/react'; import { EmptyState } from './empty-state';
const meta = { title: 'Components/EmptyState', component: EmptyState, tags: ['autodocs'] } satisfies Meta<typeof EmptyState>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { title: 'No items found', description: 'Get started by creating your first item.', action: <button data-brkta-button="" data-variant="primary" data-size="sm">Create item</button> } };
export const Compact: Story = { args: { title: 'No results', description: 'Try adjusting your search.', variant: 'compact' } };
export const TitleOnly: Story = { args: { title: 'Nothing here yet' } };
