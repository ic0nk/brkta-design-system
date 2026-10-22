import type { Meta, StoryObj } from '@storybook/react'; import { Table } from './table';
const meta = { title: 'Components/Table', component: Table, tags: ['autodocs'] } satisfies Meta<typeof Table>;
export default meta; type Story = StoryObj<typeof meta>;
const cols = [{ key: 'name', label: 'Name' }, { key: 'role', label: 'Role' }, { key: 'status', label: 'Status' }];
const rows = [{ name: 'Alice', role: 'Admin', status: 'Active' }, { name: 'Bob', role: 'Editor', status: 'Active' }, { name: 'Carol', role: 'Viewer', status: 'Inactive' }];
export const Default: Story = { args: { columns: cols, rows } };
export const Dense: Story = { args: { columns: cols, rows, variant: 'dense' } };
export const Bordered: Story = { args: { columns: cols, rows, variant: 'bordered' } };
export const Empty: Story = { args: { columns: cols, rows: [] } };
