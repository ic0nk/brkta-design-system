import type { Meta, StoryObj } from '@storybook/react';
import { AspectRatio } from './aspect-ratio';

const meta = {
  title: 'Wave 7B/Aspect Ratio',
  component: AspectRatio,
  tags: ['autodocs'],
  argTypes: {
    ratio: { control: 'object' },
  },
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ratio1x1: Story = {
  args: { ratio: [1, 1], children: <div className="flex items-center justify-center w-full h-full bg-muted text-xs">1:1</div> },
};
export const Ratio4x3: Story = {
  args: { ratio: [4, 3], children: <div className="flex items-center justify-center w-full h-full bg-muted text-xs">4:3</div> },
};
export const Ratio16x9: Story = {
  args: { ratio: [16, 9], children: <div className="flex items-center justify-center w-full h-full bg-muted text-xs">16:9</div> },
};
export const Ratio21x9: Story = {
  args: { ratio: [21, 9], children: <div className="flex items-center justify-center w-full h-full bg-muted text-xs">21:9</div> },
};
