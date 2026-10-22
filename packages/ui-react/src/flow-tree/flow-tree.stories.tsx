import type { Meta, StoryObj } from '@storybook/react';
import { FlowTree } from './flow-tree';

const meta = { title: 'Components/Flow Tree', component: FlowTree, tags: ['autodocs'] } satisfies Meta<typeof FlowTree>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Example: Story = { args: { stemPath: 'M 50 100 L 50 20', limbPaths: ['M 50 60 L 20 60 L 20 30', 'M 50 45 L 80 45 L 80 15'] } };
