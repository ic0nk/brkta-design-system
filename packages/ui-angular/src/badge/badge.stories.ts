import type { Meta, StoryObj } from '@storybook/angular';
import { BadgeComponent } from './badge.component';

const meta: Meta<BadgeComponent> = {
  title: 'Components/Badge',
  component: BadgeComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<BadgeComponent>;

export const Default: Story = {
  render: () => ({
    template: `<brkta-badge variant="default">Default</brkta-badge>`,
  }),
};

export const Secondary: Story = {
  render: () => ({
    template: `<brkta-badge variant="secondary">Secondary</brkta-badge>`,
  }),
};

export const Destructive: Story = {
  render: () => ({
    template: `<brkta-badge variant="destructive">Destructive</brkta-badge>`,
  }),
};

export const Outline: Story = {
  render: () => ({
    template: `<brkta-badge variant="outline">Outline</brkta-badge>`,
  }),
};

export const Small: Story = {
  render: () => ({
    template: `<brkta-badge variant="default" size="sm">Small</brkta-badge>`,
  }),
};

export const Medium: Story = {
  render: () => ({
    template: `<brkta-badge variant="default" size="md">Medium</brkta-badge>`,
  }),
};

export const Large: Story = {
  render: () => ({
    template: `<brkta-badge variant="default" size="lg">Large</brkta-badge>`,
  }),
};
