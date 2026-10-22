import type { Meta, StoryObj } from '@storybook/angular'; import { BreadcrumbComponent } from './breadcrumb.component';
const meta: Meta<BreadcrumbComponent> = { title: 'Components/Breadcrumb', component: BreadcrumbComponent, tags: ['autodocs'] };
export default meta; type Story = StoryObj<BreadcrumbComponent>;
export const Default: Story = { args: { items: [{ label: 'Home', href: '/' }, { label: 'Library', href: '/lib' }, { label: 'Data', current: true }] } };
