import type { Meta, StoryObj } from '@storybook/angular';
import { AvatarComponent } from './avatar.component';

const meta: Meta<AvatarComponent> = {
  title: 'Components/Avatar',
  component: AvatarComponent,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    status: {
      control: 'select',
      options: ['', 'online', 'away', 'busy', 'offline'],
    },
  },
};

export default meta;
type Story = StoryObj<AvatarComponent>;

export const WithImage: Story = {
  render: () => ({
    template: `<brkta-avatar src="https://i.pravatar.cc/120" alt="User avatar" fallback="U"></brkta-avatar>`,
  }),
};

export const WithFallback: Story = {
  render: () => ({
    template: `<brkta-avatar fallback="JD"></brkta-avatar>`,
  }),
};

export const Online: Story = {
  render: () => ({
    template: `<brkta-avatar fallback="JD" status="online"></brkta-avatar>`,
  }),
};

export const Away: Story = {
  render: () => ({
    template: `<brkta-avatar fallback="JD" status="away"></brkta-avatar>`,
  }),
};

export const Busy: Story = {
  render: () => ({
    template: `<brkta-avatar fallback="JD" status="busy"></brkta-avatar>`,
  }),
};

export const Offline: Story = {
  render: () => ({
    template: `<brkta-avatar fallback="JD" status="offline"></brkta-avatar>`,
  }),
};

export const Small: Story = {
  render: () => ({
    template: `<brkta-avatar size="sm" fallback="AB"></brkta-avatar>`,
  }),
};

export const Medium: Story = {
  render: () => ({
    template: `<brkta-avatar size="md" fallback="CD"></brkta-avatar>`,
  }),
};

export const Large: Story = {
  render: () => ({
    template: `<brkta-avatar size="lg" fallback="EF"></brkta-avatar>`,
  }),
};
