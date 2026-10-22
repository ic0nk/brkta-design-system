import type { Meta, StoryObj } from '@storybook/angular';
import { ToggleComponent } from './toggle.component';

const meta: Meta<ToggleComponent> = {
  title: 'Wave 7B/Toggle',
  component: ToggleComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ToggleComponent>;

export const Default: Story = {
  render: () => ({ template: `<brkta-toggle>Default</brkta-toggle>` }),
};
export const Pressed: Story = {
  render: () => ({ template: `<brkta-toggle pressed>Pressed</brkta-toggle>` }),
};
export const Disabled: Story = {
  render: () => ({ template: `<brkta-toggle disabled>Disabled</brkta-toggle>` }),
};
export const IconOnly: Story = {
  render: () => ({ template: `<brkta-toggle ariaLabel="Bold">B</brkta-toggle>` }),
};
