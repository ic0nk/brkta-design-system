import type { Meta, StoryObj } from '@storybook/react'; import { Pagination } from './pagination';
const meta = { title: 'Components/Pagination', component: Pagination, tags: ['autodocs'] } satisfies Meta<typeof Pagination>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { current: 1, total: 10 } };
export const MidRange: Story = { args: { current: 5, total: 20 } };
export const LastPage: Story = { args: { current: 20, total: 20 } };
export const FewPages: Story = { args: { current: 2, total: 3 } };
