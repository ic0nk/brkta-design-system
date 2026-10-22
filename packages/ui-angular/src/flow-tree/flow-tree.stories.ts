import type { Meta, StoryObj } from '@storybook/angular';
import { FlowTreeComponent } from './flow-tree.component';

const meta: Meta<FlowTreeComponent> = { title: 'Components/Flow Tree', component: FlowTreeComponent, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<FlowTreeComponent>;
export const Example: Story = { args: { stemPath: 'M 50 100 L 50 20', limbPaths: ['M 50 60 L 20 60 L 20 30', 'M 50 45 L 80 45 L 80 15'] } };
