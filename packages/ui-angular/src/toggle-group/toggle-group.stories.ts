import type { Meta, StoryObj } from '@storybook/angular';
import { ToggleGroupComponent } from './toggle-group.component';
import { ToggleComponent } from '../toggle/toggle.component';

const meta: Meta<ToggleGroupComponent> = {
  title: 'Wave 7B/Toggle Group',
  component: ToggleGroupComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ToggleGroupComponent>;

export const SingleSelect: Story = {
  render: () => ({
    moduleMetadata: { imports: [ToggleComponent] },
    template: `<brkta-toggle-group><brkta-toggle pressed>Daily</brkta-toggle><brkta-toggle>Weekly</brkta-toggle><brkta-toggle>Monthly</brkta-toggle></brkta-toggle-group>`,
  }),
};
export const MultiSelect: Story = {
  render: () => ({
    moduleMetadata: { imports: [ToggleComponent] },
    template: `<brkta-toggle-group type="multiple"><brkta-toggle pressed>Bold</brkta-toggle><brkta-toggle pressed>Italic</brkta-toggle><brkta-toggle>Underline</brkta-toggle></brkta-toggle-group>`,
  }),
};
