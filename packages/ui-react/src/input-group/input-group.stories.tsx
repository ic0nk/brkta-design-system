import type { Meta, StoryObj } from '@storybook/react';
import { InputGroup, InputGroupAddon } from './input-group';
import { Input } from '../input/input';
import { Button } from '../button/button';

const meta = {
  title: 'Wave 7B/Input Group',
  component: InputGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LeadingAddon: Story = {
  render: () => <InputGroup><InputGroupAddon>@</InputGroupAddon><Input placeholder="Username" /></InputGroup>,
};
export const TrailingAddon: Story = {
  render: () => <InputGroup><Input placeholder="Search" /><InputGroupAddon aria-label="Search">{'\u2315'}</InputGroupAddon></InputGroup>,
};
export const CurrencyWithAction: Story = {
  render: () => <InputGroup><InputGroupAddon>USD</InputGroupAddon><Input placeholder="0.00" /><InputGroupAddon><Button variant="ghost" size="sm">Pay</Button></InputGroupAddon></InputGroup>,
};
export const Disabled: Story = {
  render: () => <InputGroup disabled><InputGroupAddon>€</InputGroupAddon><Input placeholder="Disabled" disabled /></InputGroup>,
};
export const Invalid: Story = {
  render: () => <InputGroup invalid><InputGroupAddon>@</InputGroupAddon><Input placeholder="Invalid" invalid /></InputGroup>,
};
