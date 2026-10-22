import type { Meta, StoryObj } from '@storybook/react';
import { Field } from './field';
import { Label } from '../label/label';
import { Input } from '../input/input';
import { FieldHelpText } from '../field-help/field-help';
import { FieldErrorText } from '../field-error/field-error';

const meta = {
  title: 'Components/Field',
  component: Field,
  tags: ['autodocs'],
  argTypes: {
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Field>
      <Label htmlFor="name">Name</Label>
      <Input id="name" placeholder="Enter your name" />
    </Field>
  ),
};

export const WithHelpText: Story = {
  render: () => (
    <Field>
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="email@example.com" />
      <FieldHelpText id="email-help">
        We will never share your email.
      </FieldHelpText>
    </Field>
  ),
};

export const WithError: Story = {
  render: () => (
    <Field invalid>
      <Label htmlFor="password">Password</Label>
      <Input id="password" type="password" invalid placeholder="Enter password" />
      <FieldErrorText id="password-error">
        Password must be at least 8 characters.
      </FieldErrorText>
    </Field>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Field disabled>
      <Label htmlFor="disabled-field">Disabled Field</Label>
      <Input id="disabled-field" disabled placeholder="This is disabled" />
    </Field>
  ),
};

export const Required: Story = {
  render: () => (
    <Field required>
      <Label htmlFor="required-field" required>
        Required Field
      </Label>
      <Input id="required-field" required placeholder="This is required" />
    </Field>
  ),
};
