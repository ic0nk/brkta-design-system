import type { Meta, StoryObj } from '@storybook/angular';
import { LabelComponent } from './label.component';

const meta: Meta<LabelComponent> = {
  title: 'Forms/Label',
  component: LabelComponent,
  tags: ['autodocs'],
  argTypes: {
    htmlFor: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<LabelComponent>;

export const Default: Story = {
  render: () => ({
    template: `<brkta-label>Email Address</brkta-label>`,
  }),
};

export const Required: Story = {
  render: () => ({
    template: `<brkta-label required>Email Address <span aria-hidden="true">*</span></brkta-label>`,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `<brkta-label disabled>Email Address</brkta-label>`,
  }),
};

export const WithHtmlFor: Story = {
  render: () => ({
    template: `<brkta-label htmlFor="email-input">Email Address</brkta-label>`,
  }),
};

export const RequiredAndDisabled: Story = {
  render: () => ({
    template: `<brkta-label required disabled>Email Address <span aria-hidden="true">*</span></brkta-label>`,
  }),
};
