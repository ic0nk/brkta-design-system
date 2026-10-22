import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card';

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'ghost'],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description text</CardDescription>
      </CardHeader>
      <CardContent>Main card content goes here.</CardContent>
      <CardFooter>Footer area</CardFooter>
    </Card>
  ),
};

export const Outlined: Story = {
  render: () => (
    <Card variant="outlined">
      <CardHeader>
        <CardTitle>Outlined Card</CardTitle>
        <CardDescription>This card uses the outlined variant.</CardDescription>
      </CardHeader>
      <CardContent>Content area.</CardContent>
    </Card>
  ),
};

export const Ghost: Story = {
  render: () => (
    <Card variant="ghost">
      <CardHeader>
        <CardTitle>Ghost Card</CardTitle>
      </CardHeader>
      <CardContent>A card with no visible border or background.</CardContent>
    </Card>
  ),
};

export const Simple: Story = {
  args: { children: 'A plain card wrapping inline content.' },
};
