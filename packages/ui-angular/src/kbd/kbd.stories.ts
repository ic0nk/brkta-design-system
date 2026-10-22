import type { Meta, StoryObj } from '@storybook/angular';
import { KbdComponent } from './kbd.component';

const meta: Meta<KbdComponent> = {
  title: 'Components/Kbd',
  component: KbdComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<KbdComponent>;

export const SingleKey: Story = {
  render: () => ({
    template: `<brkta-kbd keys="⌘"></brkta-kbd>`,
  }),
};

export const Shortcut: Story = {
  render: () => ({
    template: `<brkta-kbd keys="Ctrl+S"></brkta-kbd>`,
  }),
};

export const Chord: Story = {
  render: () => ({
    template: `<brkta-kbd keys="Shift+⌘+P"></brkta-kbd>`,
  }),
};
