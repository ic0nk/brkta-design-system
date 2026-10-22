import type { Meta, StoryObj } from '@storybook/angular';
import { ItemComponent, ItemLeadingComponent, ItemBodyComponent, ItemTitleComponent, ItemDescriptionComponent, ItemTrailingComponent } from './item.component';
import { AnimatedSettingsComponent, AnimatedBellComponent, AnimatedCopyComponent } from '../animated-icons';

const meta: Meta<ItemComponent> = {
  title: 'Wave 7B/Item',
  component: ItemComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ItemComponent>;

const subModules = { imports: [ItemLeadingComponent, ItemBodyComponent, ItemTitleComponent, ItemDescriptionComponent, ItemTrailingComponent] };

export const Default: Story = {
  render: () => ({
    moduleMetadata: { ...subModules, imports: [...(subModules as any).imports, AnimatedSettingsComponent] },
    template: `<brkta-item><brkta-item-leading><brkta-animated-settings /></brkta-item-leading><brkta-item-body><brkta-item-title>Account Settings</brkta-item-title><brkta-item-description>Manage your account details</brkta-item-description></brkta-item-body><brkta-item-trailing>\u2192</brkta-item-trailing></brkta-item>`,
  }),
};
export const Selected: Story = {
  render: () => ({
    moduleMetadata: { ...subModules, imports: [...(subModules as any).imports, AnimatedBellComponent] },
    template: `<brkta-item selected><brkta-item-leading><brkta-animated-bell /></brkta-item-leading><brkta-item-body><brkta-item-title>Notifications</brkta-item-title><brkta-item-description>Email, push, and in-app</brkta-item-description></brkta-item-body><brkta-item-trailing>On</brkta-item-trailing></brkta-item>`,
  }),
};
export const Disabled: Story = {
  render: () => ({
    moduleMetadata: { ...subModules, imports: [...(subModules as any).imports, AnimatedCopyComponent] },
    template: `<brkta-item disabled><brkta-item-leading><brkta-animated-copy /></brkta-item-leading><brkta-item-body><brkta-item-title>Export Data</brkta-item-title><brkta-item-description>Feature not available</brkta-item-description></brkta-item-body></brkta-item>`,
  }),
};
export const WithMetadata: Story = {
  render: () => ({
    moduleMetadata: subModules,
    template: `<brkta-item><brkta-item-leading>J</brkta-item-leading><brkta-item-body><brkta-item-title>Jane Doe</brkta-item-title><brkta-item-description>Engineering Team</brkta-item-description></brkta-item-body><brkta-item-trailing>Active</brkta-item-trailing></brkta-item>`,
  }),
};
