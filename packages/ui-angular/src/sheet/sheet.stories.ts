import type { Meta, StoryObj } from '@storybook/angular';
import { SheetComponent } from './sheet.component';

const meta: Meta<SheetComponent> = {
  title: 'Components/Sheet',
  component: SheetComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<SheetComponent>;

export const Right: Story = { args: { open: true, side: 'right', size: 'md', title: 'Details' } };
export const Left: Story = { args: { open: true, side: 'left', size: 'sm', title: 'Menu' } };
export const Top: Story = { args: { open: true, side: 'top', size: 'lg', title: 'Notifications' } };
export const Bottom: Story = { args: { open: true, side: 'bottom', size: 'xl', title: 'Actions' } };
