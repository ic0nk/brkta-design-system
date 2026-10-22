import type { Meta, StoryObj } from '@storybook/react'; import { Tabs } from './tabs';
const meta = { title: 'Components/Tabs', component: Tabs, tags: ['autodocs'] } satisfies Meta<typeof Tabs>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { items: [{ label: 'Account', value: 'a', content: 'Account settings' }, { label: 'Password', value: 'p', content: 'Change password' }, { label: 'Billing', value: 'b', content: 'Billing info' }] } };
export const WithDisabled: Story = { args: { items: [{ label: 'Active', value: 'a', content: 'Active panel' }, { label: 'Disabled', value: 'd', content: 'Hidden', disabled: true }, { label: 'Other', value: 'o', content: 'Other panel' }] } };
export const Segmented: Story = { args: { items: [{ label: 'Overview', value: 'o', content: 'Overview panel' }, { label: 'Analytics', value: 'a', content: 'Analytics panel' }, { label: 'Reports', value: 'r', content: 'Reports panel' }, { label: 'Settings', value: 's', content: 'Settings panel' }], variant: 'segmented' } };
export const SegmentedDisabled: Story = { args: { items: [{ label: 'Active', value: 'a', content: 'Active' }, { label: 'Disabled', value: 'd', content: 'Hidden', disabled: true }], variant: 'segmented' } };
export const Vertical: Story = { args: { items: [{ label: 'Account', value: 'a', content: 'Account settings' }, { label: 'Password', value: 'p', content: 'Change password' }], orientation: 'vertical' } };
export const VerticalSegmented: Story = { args: { items: [{ label: 'Overview', value: 'o', content: 'Overview' }, { label: 'Settings', value: 's', content: 'Settings' }], variant: 'segmented', orientation: 'vertical' } };
