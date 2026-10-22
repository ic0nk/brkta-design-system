import type { Meta, StoryObj } from '@storybook/angular'; import { TableComponent } from './table.component';
const meta: Meta<TableComponent> = { title: 'Components/Table', component: TableComponent, tags: ['autodocs'] };
export default meta; type Story = StoryObj<TableComponent>;
const cols = [{ key: 'name', label: 'Name' }, { key: 'role', label: 'Role' }];
const rows = [{ name: 'Alice', role: 'Admin' }, { name: 'Bob', role: 'Editor' }];
export const Default: Story = { args: { columns: cols, rows } };
