import type { Meta, StoryObj } from '@storybook/angular';
import { HoverCardComponent } from './hover-card.component';

const meta: Meta<HoverCardComponent> = { title: 'Wave 7C/Hover Card', component: HoverCardComponent, tags: ['autodocs'] };
export default meta; type Story = StoryObj<HoverCardComponent>;

export const Default: Story = {
  render: () => ({
    template: `<brkta-hover-card><span brkta-hover-card-trigger class="underline cursor-pointer text-sm">Hover me</span><div class="space-y-2"><p class="font-medium">Profile Info</p><p class="text-xs text-muted-foreground">Jane Doe · Engineering</p></div></brkta-hover-card>`,
  }),
};
