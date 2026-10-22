import type { Meta, StoryObj } from '@storybook/angular';
import { PopoverComponent } from './popover.component';

const meta: Meta<PopoverComponent> = {
  title: 'Components/Popover',
  component: PopoverComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<PopoverComponent>;

export const Default: Story = {
  render: () => ({
    template: '<brkta-popover><span trigger>More info</span><div>This is a popover with helpful information about this feature.</div></brkta-popover>',
  }),
};

export const WithContent: Story = {
  render: () => ({
    template: '<brkta-popover><span trigger>Set status</span><div style="display:flex;flex-direction:column;gap:0.25rem"><span>Active</span><span>Away</span><span>Do not disturb</span></div></brkta-popover>',
  }),
};

export const AboveTrigger: Story = {
  render: () => ({
    template: '<brkta-popover side="top"><span trigger>Account</span><div>Account actions</div></brkta-popover>',
  }),
};
