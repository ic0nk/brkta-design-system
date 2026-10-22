import type { Meta, StoryObj } from '@storybook/angular';
import { FieldDescriptionComponent } from './field-description.component';

const meta: Meta<FieldDescriptionComponent> = {
  title: 'Forms/FieldDescription',
  component: FieldDescriptionComponent,
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<FieldDescriptionComponent>;

export const Default: Story = {
  render: () => ({
    template: `<brkta-field-description>Enter your full legal name as it appears on your ID.</brkta-field-description>`,
  }),
};

export const WithId: Story = {
  render: () => ({
    template: `<brkta-field-description id="desc-text">Your privacy is important to us.</brkta-field-description>`,
  }),
};

export const ShortDescription: Story = {
  render: () => ({
    template: `<brkta-field-description>Optional. Leave blank if not applicable.</brkta-field-description>`,
  }),
};
