import type { Meta, StoryObj } from '@storybook/angular';
import { SkeletonComponent } from './skeleton.component';

const meta: Meta<SkeletonComponent> = {
  title: 'Components/Skeleton',
  component: SkeletonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'card', 'table'],
    },
  },
};

export default meta;
type Story = StoryObj<SkeletonComponent>;

export const Text: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <brkta-skeleton variant="text"></brkta-skeleton>
        <brkta-skeleton variant="text" width="75%"></brkta-skeleton>
        <brkta-skeleton variant="text" width="50%"></brkta-skeleton>
      </div>
    `,
  }),
};

export const Card: Story = {
  render: () => ({
    template: `<brkta-skeleton variant="card"></brkta-skeleton>`,
  }),
};

export const Table: Story = {
  render: () => ({
    template: `<brkta-skeleton variant="table"></brkta-skeleton>`,
  }),
};
