import type { Meta, StoryObj } from '@storybook/angular';
import { NativeSelectComponent } from './native-select.component';

const meta: Meta<NativeSelectComponent> = {
  title: 'Forms/NativeSelect',
  component: NativeSelectComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<NativeSelectComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <brkta-native-select>
        <option value="">Select an option</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </brkta-native-select>
    `,
  }),
};

export const Filled: Story = {
  render: () => ({
    template: `
      <brkta-native-select variant="filled">
        <option value="">Select an option</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </brkta-native-select>
    `,
  }),
};

export const Small: Story = {
  render: () => ({
    template: `
      <brkta-native-select size="sm">
        <option value="">Small</option>
        <option value="1">Item 1</option>
      </brkta-native-select>
    `,
  }),
};

export const Large: Story = {
  render: () => ({
    template: `
      <brkta-native-select size="lg">
        <option value="">Large</option>
        <option value="1">Item 1</option>
      </brkta-native-select>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <brkta-native-select disabled>
        <option value="">Disabled</option>
        <option value="1">Option 1</option>
      </brkta-native-select>
    `,
  }),
};

export const Invalid: Story = {
  render: () => ({
    template: `
      <brkta-native-select invalid>
        <option value="">Select an option</option>
        <option value="1">Option 1</option>
      </brkta-native-select>
    `,
  }),
};

export const WithGroups: Story = {
  render: () => ({
    template: `
      <brkta-native-select>
        <optgroup label="Fruits">
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
        </optgroup>
        <optgroup label="Vegetables">
          <option value="carrot">Carrot</option>
          <option value="broccoli">Broccoli</option>
        </optgroup>
      </brkta-native-select>
    `,
  }),
};
