import type { Meta, StoryObj } from '@storybook/angular'; import { TabsComponent } from './tabs.component';
const meta: Meta<TabsComponent> = { title: 'Components/Tabs', component: TabsComponent, tags: ['autodocs'] };
export default meta; type Story = StoryObj<TabsComponent>;
export const Default: Story = { args: { items: [{ label: 'Account', value: 'a', content: 'Account settings' }, { label: 'Password', value: 'p', content: 'Change password' }, { label: 'Billing', value: 'b', content: 'Billing info' }] } };
export const Segmented: Story = { args: { items: [{ label: 'Overview', value: 'o', content: 'Overview panel' }, { label: 'Analytics', value: 'a', content: 'Analytics panel' }, { label: 'Reports', value: 'r', content: 'Reports panel' }, { label: 'Settings', value: 's', content: 'Settings panel' }], variant: 'segmented' } };
export const TemplatePanel: Story = {
  render: () => ({
    template: `
      <ng-template #overviewPanel>
        <p><strong>Template content</strong> can include rich Angular markup.</p>
      </ng-template>
      <brkta-tabs [items]="[
        { label: 'Overview', value: 'overview', content: overviewPanel },
        { label: 'Details', value: 'details', content: 'String content still works.' }
      ]" />
    `,
    props: {},
  }),
};
