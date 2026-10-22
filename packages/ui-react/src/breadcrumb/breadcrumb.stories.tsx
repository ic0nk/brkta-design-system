import type { Meta, StoryObj } from '@storybook/react'; import { Breadcrumb } from './breadcrumb';
const meta = { title: 'Components/Breadcrumb', component: Breadcrumb, tags: ['autodocs'] } satisfies Meta<typeof Breadcrumb>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { items: [{ label: 'Home', href: '/' }, { label: 'Library', href: '/lib' }, { label: 'Data', current: true }] } };
export const LongPath: Story = { args: { items: [{ label: 'Home', href: '/' }, { label: 'Products', href: '/p' }, { label: 'Category', href: '/p/c' }, { label: 'Item', current: true }] } };
