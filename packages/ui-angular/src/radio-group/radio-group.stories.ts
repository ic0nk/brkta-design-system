import type { Meta, StoryObj } from '@storybook/angular';
import { RadioGroupComponent, RadioComponent } from './radio-group.component';

const meta: Meta<RadioGroupComponent> = {
  title: 'Forms/RadioGroup',
  component: RadioGroupComponent,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    invalid: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<RadioGroupComponent>;

export const Vertical: Story = {
  render: () => ({
    template: `
      <brkta-radio-group orientation="vertical">
        <brkta-radio value="small" name="size">Small</brkta-radio>
        <brkta-radio value="medium" name="size" [checked]="true">Medium</brkta-radio>
        <brkta-radio value="large" name="size">Large</brkta-radio>
      </brkta-radio-group>
    `,
    moduleMetadata: {
      imports: [RadioComponent],
    },
  }),
};

export const Horizontal: Story = {
  render: () => ({
    template: `
      <brkta-radio-group orientation="horizontal">
        <brkta-radio value="yes" name="confirm">Yes</brkta-radio>
        <brkta-radio value="no" name="confirm">No</brkta-radio>
        <brkta-radio value="maybe" name="confirm">Maybe</brkta-radio>
      </brkta-radio-group>
    `,
    moduleMetadata: {
      imports: [RadioComponent],
    },
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <brkta-radio-group orientation="vertical">
        <brkta-radio value="option-1" name="disabled-group" disabled>Option 1</brkta-radio>
        <brkta-radio value="option-2" name="disabled-group" disabled>Option 2</brkta-radio>
      </brkta-radio-group>
    `,
    moduleMetadata: {
      imports: [RadioComponent],
    },
  }),
};

export const Invalid: Story = {
  render: () => ({
    template: `
      <brkta-radio-group orientation="vertical" invalid>
        <brkta-radio value="option-1" name="invalid-group">Option 1</brkta-radio>
        <brkta-radio value="option-2" name="invalid-group">Option 2</brkta-radio>
      </brkta-radio-group>
    `,
    moduleMetadata: {
      imports: [RadioComponent],
    },
  }),
};

export const WithSelection: Story = {
  render: () => ({
    template: `
      <brkta-radio-group orientation="vertical">
        <brkta-radio value="free" name="plan">Free</brkta-radio>
        <brkta-radio value="pro" name="plan" [checked]="true">Pro</brkta-radio>
        <brkta-radio value="enterprise" name="plan">Enterprise</brkta-radio>
      </brkta-radio-group>
    `,
    moduleMetadata: {
      imports: [RadioComponent],
    },
  }),
};
