import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonGroupComponent } from './button-group.component';
import { ButtonComponent } from '../button/button.component';

const meta: Meta<ButtonGroupComponent> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroupComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ButtonGroupComponent>;

export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [ButtonComponent] },
    template: `
      <brkta-button-group [orientation]="orientation">
        <button data-brkta-button="" data-variant="outline">Left</button>
        <button data-brkta-button="" data-variant="outline">Center</button>
        <button data-brkta-button="" data-variant="outline">Right</button>
      </brkta-button-group>
    `,
  }),
};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [ButtonComponent] },
    template: `
      <brkta-button-group [orientation]="orientation">
        <button data-brkta-button="" data-variant="outline">Top</button>
        <button data-brkta-button="" data-variant="outline">Middle</button>
        <button data-brkta-button="" data-variant="outline">Bottom</button>
      </brkta-button-group>
    `,
  }),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [ButtonComponent] },
    template: `
      <brkta-button-group [disabled]="disabled">
        <button data-brkta-button="" data-variant="outline">One</button>
        <button data-brkta-button="" data-variant="outline">Two</button>
      </brkta-button-group>
    `,
  }),
};
