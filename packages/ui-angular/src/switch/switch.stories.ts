import type { Meta, StoryObj } from '@storybook/angular';
import { SwitchComponent } from './switch.component';

const meta: Meta<SwitchComponent> = {
  title: 'Forms/Switch',
  component: SwitchComponent,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    ariaLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<SwitchComponent>;

export const Off: Story = {
  render: () => ({
    template: `<brkta-switch ariaLabel="Notifications">Notifications</brkta-switch>`,
  }),
};

export const On: Story = {
  render: () => ({
    template: `<brkta-switch [checked]="true" ariaLabel="Notifications">Notifications</brkta-switch>`,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `<brkta-switch disabled ariaLabel="Disabled switch">Disabled</brkta-switch>`,
  }),
};

export const DisabledOn: Story = {
  render: () => ({
    template: `<brkta-switch [checked]="true" disabled ariaLabel="Disabled on">Disabled & On</brkta-switch>`,
  }),
};

export const WithAriaLabel: Story = {
  render: () => ({
    template: `<brkta-switch ariaLabel="Enable dark mode">Dark mode</brkta-switch>`,
  }),
};

export const Composed: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <brkta-switch ariaLabel="Email notifications">Email</brkta-switch>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <brkta-switch ariaLabel="SMS notifications" [checked]="true">SMS</brkta-switch>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <brkta-switch ariaLabel="Push notifications" disabled>Push (disabled)</brkta-switch>
        </div>
      </div>
    `,
  }),
};
