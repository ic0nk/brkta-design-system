import type { Meta, StoryObj } from '@storybook/angular';
import { FieldComponent } from './field.component';
import { LabelComponent } from '../label/label.component';
import { InputComponent } from '../input/input.component';
import { FieldHelpComponent } from '../field-help/field-help.component';
import { FieldErrorComponent } from '../field-error/field-error.component';
import { FieldDescriptionComponent } from '../field-description/field-description.component';

const meta: Meta<FieldComponent> = {
  title: 'Forms/Field',
  component: FieldComponent,
  tags: ['autodocs'],
  argTypes: {
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<FieldComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <brkta-field>
        <brkta-label htmlFor="name">Name</brkta-label>
        <brkta-input id="name" placeholder="Enter your name" />
      </brkta-field>
    `,
    moduleMetadata: {
      imports: [LabelComponent, InputComponent],
    },
  }),
};

export const WithHelp: Story = {
  render: () => ({
    template: `
      <brkta-field>
        <brkta-label htmlFor="email">Email</brkta-label>
        <brkta-input id="email" type="email" placeholder="you@brkta.com" />
        <brkta-field-help id="email-help">We'll never share your email.</brkta-field-help>
      </brkta-field>
    `,
    moduleMetadata: {
      imports: [LabelComponent, InputComponent, FieldHelpComponent],
    },
  }),
};

export const WithError: Story = {
  render: () => ({
    template: `
      <brkta-field invalid>
        <brkta-label htmlFor="password">Password</brkta-label>
        <brkta-input id="password" type="password" invalid />
        <brkta-field-error id="password-error">Password must be at least 8 characters.</brkta-field-error>
      </brkta-field>
    `,
    moduleMetadata: {
      imports: [LabelComponent, InputComponent, FieldErrorComponent],
    },
  }),
};

export const WithDescription: Story = {
  render: () => ({
    template: `
      <brkta-field>
        <brkta-label htmlFor="bio">Biography</brkta-label>
        <brkta-field-description id="bio-desc">Tell us about yourself</brkta-field-description>
        <brkta-textarea id="bio" placeholder="Write something..." />
      </brkta-field>
    `,
    moduleMetadata: {
      imports: [LabelComponent, FieldDescriptionComponent, InputComponent],
    },
  }),
};

export const Required: Story = {
  render: () => ({
    template: `
      <brkta-field required>
        <brkta-label htmlFor="phone" required>Phone <span aria-hidden="true">*</span></brkta-label>
        <brkta-input id="phone" placeholder="+1 (555) 123-4567" />
      </brkta-field>
    `,
    moduleMetadata: {
      imports: [LabelComponent, InputComponent],
    },
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <brkta-field disabled>
        <brkta-label htmlFor="country" disabled>Country</brkta-label>
        <brkta-input id="country" disabled placeholder="United States" />
      </brkta-field>
    `,
    moduleMetadata: {
      imports: [LabelComponent, InputComponent],
    },
  }),
};
