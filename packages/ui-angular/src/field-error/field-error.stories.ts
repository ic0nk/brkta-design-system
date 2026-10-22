import type { Meta, StoryObj } from '@storybook/angular';
import { FieldErrorComponent } from './field-error.component';

const meta: Meta<FieldErrorComponent> = {
  title: 'Forms/FieldError',
  component: FieldErrorComponent,
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<FieldErrorComponent>;

export const Default: Story = {
  render: () => ({
    template: `<brkta-field-error>This field is required.</brkta-field-error>`,
  }),
};

export const WithId: Story = {
  render: () => ({
    template: `<brkta-field-error id="error-msg">Invalid email address.</brkta-field-error>`,
  }),
};

export const ValidationError: Story = {
  render: () => ({
    template: `<brkta-field-error>Password must contain at least one uppercase letter.</brkta-field-error>`,
  }),
};
