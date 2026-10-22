import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    status: {
      control: 'select',
      options: [undefined, 'online', 'away', 'busy', 'offline'],
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/120',
    alt: 'User avatar',
    fallback: 'U',
  },
};

export const WithFallback: Story = {
  args: {
    fallback: 'JD',
  },
};

export const Online: Story = {
  args: {
    fallback: 'JD',
    status: 'online',
  },
};

export const Away: Story = {
  args: {
    fallback: 'JD',
    status: 'away',
  },
};

export const Busy: Story = {
  args: {
    fallback: 'JD',
    status: 'busy',
  },
};

export const Offline: Story = {
  args: {
    fallback: 'JD',
    status: 'offline',
  },
};

export const Small: Story = {
  args: { size: 'sm', fallback: 'AB' },
};

export const Medium: Story = {
  args: { size: 'md', fallback: 'CD' },
};

export const Large: Story = {
  args: { size: 'lg', fallback: 'EF' },
};
