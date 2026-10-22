import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './select';
import { Field } from '../field/field';
import { Label } from '../label/label';
import { FieldErrorText } from '../field-error/field-error';

const sampleOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry', disabled: true },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
];

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { options: sampleOptions, placeholder: 'Select a fruit…' },
};

export const Filled: Story = {
  args: {
    options: sampleOptions,
    variant: 'filled',
    placeholder: 'Filled select…',
  },
};

export const Ghost: Story = {
  args: {
    options: sampleOptions,
    variant: 'ghost',
    placeholder: 'Ghost select…',
  },
};

export const Small: Story = {
  args: { options: sampleOptions, size: 'sm', placeholder: 'Small select…' },
};

export const Medium: Story = {
  args: { options: sampleOptions, size: 'md', placeholder: 'Medium select…' },
};

export const Large: Story = {
  args: { options: sampleOptions, size: 'lg', placeholder: 'Large select…' },
};

export const Disabled: Story = {
  args: {
    options: sampleOptions,
    disabled: true,
    defaultValue: 'apple',
    placeholder: 'Disabled…',
  },
};

export const Invalid: Story = {
  args: {
    options: sampleOptions,
    invalid: true,
    placeholder: 'Invalid select…',
  },
};

export const WithDisabledOption: Story = {
  args: {
    options: [
      { value: 'active', label: 'Active plan' },
      { value: 'archived', label: 'Archived plan', disabled: true },
      { value: 'legacy', label: 'Legacy plan' },
    ],
    placeholder: 'Choose a plan…',
  },
};

export const InField: Story = {
  render: () => (
    <Field>
      <Label htmlFor="story-select">Plan</Label>
      <Select
        options={sampleOptions}
        placeholder="Select a plan…"
        id="story-select"
      />
    </Field>
  ),
};

export const InFieldWithError: Story = {
  render: () => (
    <Field invalid>
      <Label htmlFor="story-select-err" required>
        Country
      </Label>
      <Select
        options={sampleOptions}
        placeholder="Select a country…"
        invalid
        id="story-select-err"
      />
      <FieldErrorText>Please select a country.</FieldErrorText>
    </Field>
  ),
};
