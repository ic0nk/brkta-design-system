import type { Meta, StoryObj } from '@storybook/angular';
import { InputGroupComponent, InputGroupAddonComponent } from './input-group.component';
import { InputComponent } from '../input/input.component';
import { ButtonComponent } from '../button/button.component';
import { AnimatedSearchComponent } from '../animated-icons';

const meta: Meta<InputGroupComponent> = {
  title: 'Wave 7B/Input Group',
  component: InputGroupComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<InputGroupComponent>;

export const LeadingAddon: Story = {
  render: () => ({
    moduleMetadata: { imports: [InputGroupAddonComponent, InputComponent] },
    template: `<brkta-input-group><brkta-input-group-addon>@</brkta-input-group-addon><brkta-input placeholder="Username"></brkta-input></brkta-input-group>`,
  }),
};
export const TrailingAddon: Story = {
  render: () => ({
    moduleMetadata: { imports: [InputGroupAddonComponent, InputComponent, AnimatedSearchComponent] },
    template: `<brkta-input-group><brkta-input placeholder="Search"></brkta-input><brkta-input-group-addon><brkta-animated-search /></brkta-input-group-addon></brkta-input-group>`,
  }),
};
export const CurrencyWithAction: Story = {
  render: () => ({
    moduleMetadata: { imports: [InputGroupAddonComponent, InputComponent, ButtonComponent] },
    template: `<brkta-input-group><brkta-input-group-addon>USD</brkta-input-group-addon><brkta-input placeholder="0.00"></brkta-input><brkta-input-group-addon><brkta-button variant="ghost" size="sm">Pay</brkta-button></brkta-input-group-addon></brkta-input-group>`,
  }),
};
export const Disabled: Story = {
  render: () => ({
    moduleMetadata: { imports: [InputGroupAddonComponent, InputComponent] },
    template: `<brkta-input-group disabled><brkta-input-group-addon>€</brkta-input-group-addon><brkta-input placeholder="Disabled" disabled></brkta-input></brkta-input-group>`,
  }),
};
export const Invalid: Story = {
  render: () => ({
    moduleMetadata: { imports: [InputGroupAddonComponent, InputComponent] },
    template: `<brkta-input-group invalid><brkta-input-group-addon>@</brkta-input-group-addon><brkta-input placeholder="Invalid" invalid></brkta-input></brkta-input-group>`,
  }),
};
