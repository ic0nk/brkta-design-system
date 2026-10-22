import type { Meta, StoryObj } from '@storybook/angular';
import { CheckboxComponent } from './checkbox.component';

const meta: Meta<CheckboxComponent> = {
  title: 'Forms/Checkbox',
  component: CheckboxComponent,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<CheckboxComponent>;

export const Unchecked: Story = {
  render: () => ({
    template: `<brkta-checkbox>Accept terms and conditions</brkta-checkbox>`,
  }),
};

export const Checked: Story = {
  render: () => ({
    template: `<brkta-checkbox [checked]="true">Accept terms and conditions</brkta-checkbox>`,
  }),
};

export const Indeterminate: Story = {
  render: () => ({
    template: `<brkta-checkbox [indeterminate]="true">Select all items (3 selected)</brkta-checkbox>`,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `<brkta-checkbox disabled>Disabled option</brkta-checkbox>`,
  }),
};

export const DisabledChecked: Story = {
  render: () => ({
    template: `<brkta-checkbox [checked]="true" disabled>Disabled & checked</brkta-checkbox>`,
  }),
};

export const Invalid: Story = {
  render: () => ({
    template: `<brkta-checkbox invalid>This selection is invalid</brkta-checkbox>`,
  }),
};
