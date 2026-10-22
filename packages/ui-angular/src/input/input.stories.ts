import type { Meta, StoryObj } from '@storybook/angular';
import { InputComponent } from './input.component';
import { InputSuffixDirective } from './input.component';
import { ButtonComponent } from '../button/button.component';

const meta: Meta<InputComponent> = {
  title: 'Forms/Input',
  component: InputComponent,
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
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    readonly: { control: 'boolean' },
    type: { control: 'text' },
    accept: { control: 'text' },
    multiple: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<InputComponent>;

export const Default: Story = {
  render: () => ({
    template: `<brkta-input placeholder="Enter text..." />`,
  }),
};

export const Filled: Story = {
  render: () => ({
    template: `<brkta-input variant="filled" placeholder="Filled variant" />`,
  }),
};

export const Ghost: Story = {
  render: () => ({
    template: `<brkta-input variant="ghost" placeholder="Ghost variant" />`,
  }),
};

export const Small: Story = {
  render: () => ({
    template: `<brkta-input size="sm" placeholder="Small input" />`,
  }),
};

export const Large: Story = {
  render: () => ({
    template: `<brkta-input size="lg" placeholder="Large input" />`,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `<brkta-input disabled placeholder="Disabled input" />`,
  }),
};

export const Invalid: Story = {
  render: () => ({
    template: `<brkta-input invalid placeholder="Invalid input" />`,
  }),
};

export const WithValue: Story = {
  render: () => ({
    template: `<brkta-input value="Some value" />`,
  }),
};

export const Password: Story = {
  render: () => ({
    template: `<brkta-input type="password" value="secret" />`,
  }),
};

export const File: Story = {
  render: () => ({
    template: `<brkta-input type="file" accept="image/png,image/jpeg" placeholder="Choose an image" />`,
  }),
};

export const MultipleFiles: Story = {
  render: () => ({
    template: `<brkta-input type="file" multiple accept="image/png,image/jpeg" placeholder="Choose images" />`,
  }),
};

export const WithSuffix: Story = {
  render: () => ({
    moduleMetadata: { imports: [InputComponent, InputSuffixDirective, ButtonComponent] },
    template: `
      <brkta-input type="password" value="secret">
        <brkta-button
          brktaInputSuffix
          variant="ghost"
          size="icon-sm"
          [iconOnly]="true"
          ariaLabel="Show password"
          [iconBefore]="'eye'"
        ></brkta-button>
      </brkta-input>
    `,
  }),
};
