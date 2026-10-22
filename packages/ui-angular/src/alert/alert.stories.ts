import type { Meta, StoryObj } from '@storybook/angular';
import { AlertComponent } from './alert.component';

const meta: Meta<AlertComponent> = {
  title: 'Components/Alert',
  component: AlertComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['information', 'success', 'warning', 'destructive'],
    },
  },
};

export default meta;
type Story = StoryObj<AlertComponent>;

export const Information: Story = {
  render: () => ({
    template: `
      <brkta-alert variant="information">
        <brkta-alert-title>Information</brkta-alert-title>
        <brkta-alert-description>This is an informational alert with helpful context.</brkta-alert-description>
      </brkta-alert>
    `,
  }),
};

export const Success: Story = {
  render: () => ({
    template: `
      <brkta-alert variant="success">
        <brkta-alert-title>Success</brkta-alert-title>
        <brkta-alert-description>The operation completed successfully.</brkta-alert-description>
      </brkta-alert>
    `,
  }),
};

export const Warning: Story = {
  render: () => ({
    template: `
      <brkta-alert variant="warning">
        <brkta-alert-title>Warning</brkta-alert-title>
        <brkta-alert-description>Please review the following before proceeding.</brkta-alert-description>
      </brkta-alert>
    `,
  }),
};

export const Destructive: Story = {
  render: () => ({
    template: `
      <brkta-alert variant="destructive">
        <brkta-alert-title>Error</brkta-alert-title>
        <brkta-alert-description>An unexpected error occurred. Please try again.</brkta-alert-description>
      </brkta-alert>
    `,
  }),
};
