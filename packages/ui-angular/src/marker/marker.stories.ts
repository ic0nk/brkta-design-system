import type { Meta, StoryObj } from '@storybook/angular';
import { MarkerComponent } from './marker.component';

const meta: Meta<MarkerComponent> = {
  title: 'Wave 7A/Marker',
  component: MarkerComponent,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<MarkerComponent>;

export const Default: Story = {
  args: { variant: 'default', label: 'Status' },
};

export const Success: Story = {
  args: { variant: 'success', label: 'Active' },
};

export const Warning: Story = {
  args: { variant: 'warning', label: 'Pending' },
};

export const Destructive: Story = {
  args: { variant: 'destructive', label: 'Offline' },
};

export const Info: Story = {
  args: { variant: 'info', label: 'Beta' },
};

export const DotOnly: Story = {
  args: { variant: 'success' },
};

export const Small: Story = {
  args: { variant: 'default', label: 'S', size: 'sm' },
};

export const Large: Story = {
  args: { variant: 'info', label: 'L', size: 'lg' },
};
