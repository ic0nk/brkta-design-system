import type { Meta, StoryObj } from '@storybook/react';
import { Item, ItemLeading, ItemBody, ItemTitle, ItemDescription, ItemTrailing } from './item';

const meta = {
  title: 'Wave 7B/Item',
  component: Item,
  tags: ['autodocs'],
} satisfies Meta<typeof Item>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Item><ItemLeading>Ac</ItemLeading><ItemBody><ItemTitle>Account Settings</ItemTitle><ItemDescription>Manage your account details</ItemDescription></ItemBody><ItemTrailing>{'\u2192'}</ItemTrailing></Item>,
};
export const Selected: Story = {
  render: () => <Item selected><ItemLeading>Nt</ItemLeading><ItemBody><ItemTitle>Notifications</ItemTitle><ItemDescription>Email, push, and in-app</ItemDescription></ItemBody><ItemTrailing>On</ItemTrailing></Item>,
};
export const Disabled: Story = {
  render: () => <Item disabled><ItemLeading>Ex</ItemLeading><ItemBody><ItemTitle>Export Data</ItemTitle><ItemDescription>Feature not available</ItemDescription></ItemBody></Item>,
};
export const WithMetadata: Story = {
  render: () => <Item><ItemLeading>JD</ItemLeading><ItemBody><ItemTitle>Jane Doe</ItemTitle><ItemDescription>Engineering Team</ItemDescription></ItemBody><ItemTrailing>Active</ItemTrailing></Item>,
};
