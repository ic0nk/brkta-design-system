import type { Meta, StoryObj } from '@storybook/angular';
import { FieldHelpComponent } from './field-help.component';

const meta: Meta<FieldHelpComponent> = {
  title: 'Forms/FieldHelp',
  component: FieldHelpComponent,
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<FieldHelpComponent>;

export const Default: Story = {
  render: () => ({
    template: `<brkta-field-help>This is help text for the field above.</brkta-field-help>`,
  }),
};

export const WithId: Story = {
  render: () => ({
    template: `<brkta-field-help id="my-help">This help text has an ID for aria-describedby.</brkta-field-help>`,
  }),
};

export const LongerHelp: Story = {
  render: () => ({
    template: `<brkta-field-help>Password must be at least 8 characters and include a number and a special character.</brkta-field-help>`,
  }),
};
