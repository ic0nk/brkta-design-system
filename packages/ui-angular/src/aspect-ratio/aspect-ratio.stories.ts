import type { Meta, StoryObj } from '@storybook/angular';
import { AspectRatioComponent, AspectRatioInnerComponent } from './aspect-ratio.component';

const meta: Meta<AspectRatioComponent> = {
  title: 'Wave 7B/Aspect Ratio',
  component: AspectRatioComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<AspectRatioComponent>;

export const Ratio1x1: Story = {
  render: () => ({
    moduleMetadata: { imports: [AspectRatioInnerComponent] },
    template: `<brkta-aspect-ratio [ratio]="[1,1]" class="rounded overflow-hidden bg-muted"><span brkta-aspect-ratio-inner class="text-xs">1:1</span></brkta-aspect-ratio>`,
  }),
};
export const Ratio4x3: Story = {
  render: () => ({
    moduleMetadata: { imports: [AspectRatioInnerComponent] },
    template: `<brkta-aspect-ratio [ratio]="[4,3]" class="rounded overflow-hidden bg-muted"><span brkta-aspect-ratio-inner class="text-xs">4:3</span></brkta-aspect-ratio>`,
  }),
};
export const Ratio16x9: Story = {
  render: () => ({
    moduleMetadata: { imports: [AspectRatioInnerComponent] },
    template: `<brkta-aspect-ratio [ratio]="[16,9]" class="rounded overflow-hidden bg-muted"><span brkta-aspect-ratio-inner class="text-xs">16:9</span></brkta-aspect-ratio>`,
  }),
};
export const Ratio21x9: Story = {
  render: () => ({
    moduleMetadata: { imports: [AspectRatioInnerComponent] },
    template: `<brkta-aspect-ratio [ratio]="[21,9]" class="rounded overflow-hidden bg-muted"><span brkta-aspect-ratio-inner class="text-xs">21:9</span></brkta-aspect-ratio>`,
  }),
};
