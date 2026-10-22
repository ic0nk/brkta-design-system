import type { Meta, StoryObj } from '@storybook/angular'; import { PaginationComponent } from './pagination.component';
const meta: Meta<PaginationComponent> = { title: 'Components/Pagination', component: PaginationComponent, tags: ['autodocs'] };
export default meta; type Story = StoryObj<PaginationComponent>;
export const Default: Story = { args: { current: 1, total: 10 } };
