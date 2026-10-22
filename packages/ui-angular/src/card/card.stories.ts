import type { Meta, StoryObj } from '@storybook/angular';
import { CardComponent } from './card.component';

const meta: Meta<CardComponent> = {
  title: 'Components/Card',
  component: CardComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'ghost'],
    },
  },
};

export default meta;
type Story = StoryObj<CardComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <brkta-card variant="default">
        <brkta-card-header>
          <brkta-card-title>Card Title</brkta-card-title>
          <brkta-card-description>Card description text</brkta-card-description>
        </brkta-card-header>
        <brkta-card-content>Main card content goes here.</brkta-card-content>
        <brkta-card-footer>Footer area</brkta-card-footer>
      </brkta-card>
    `,
  }),
};

export const Outlined: Story = {
  render: () => ({
    template: `
      <brkta-card variant="outlined">
        <brkta-card-header>
          <brkta-card-title>Outlined Card</brkta-card-title>
          <brkta-card-description>This card uses the outlined variant.</brkta-card-description>
        </brkta-card-header>
        <brkta-card-content>Content area.</brkta-card-content>
      </brkta-card>
    `,
  }),
};

export const Ghost: Story = {
  render: () => ({
    template: `
      <brkta-card variant="ghost">
        <brkta-card-header>
          <brkta-card-title>Ghost Card</brkta-card-title>
        </brkta-card-header>
        <brkta-card-content>A card with no visible border or background.</brkta-card-content>
      </brkta-card>
    `,
  }),
};

export const Simple: Story = {
  render: () => ({
    template: `<brkta-card>A plain card wrapping inline content.</brkta-card>`,
  }),
};
