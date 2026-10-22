import type { Meta, StoryObj } from '@storybook/angular';
import { ResizableComponent } from './resizable.component';

const meta: Meta<ResizableComponent> = {
  title: 'Components/Resizable',
  component: ResizableComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ResizableComponent>;

export const Horizontal: Story = {
  args: { defaultSize: 40 },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 300px; border: 1px solid var(--border); border-radius: var(--radius-md); display: flex;">
        <brkta-resizable [defaultSize]="defaultSize">
          <div first style="padding: 16px; background: var(--card); border: 1px solid var(--border); border-radius: var(--radius-md); height: 100%;">
            <h3 style="font-weight: 600; margin-bottom: 8px;">Panel A</h3>
            <p style="color: var(--muted-foreground); font-size: 0.875rem;">Drag the handle to resize.</p>
          </div>
          <div second style="padding: 16px; background: var(--card); border: 1px solid var(--border); border-radius: var(--radius-md); height: 100%;">
            <h3 style="font-weight: 600; margin-bottom: 8px;">Panel B</h3>
            <p style="color: var(--muted-foreground); font-size: 0.875rem;">This panel flexes to fill remaining space.</p>
          </div>
        </brkta-resizable>
      </div>
    `,
  }),
};

export const Vertical: Story = {
  args: { direction: 'vertical', defaultSize: 40 },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 400px; border: 1px solid var(--border); border-radius: var(--radius-md); display: flex;">
        <brkta-resizable [direction]="direction" [defaultSize]="defaultSize">
          <div first style="padding: 16px; background: var(--card); border: 1px solid var(--border); border-radius: var(--radius-md); height: 100%;">
            <h3 style="font-weight: 600; margin-bottom: 8px;">Panel A</h3>
            <p style="color: var(--muted-foreground); font-size: 0.875rem;">Drag the handle to resize.</p>
          </div>
          <div second style="padding: 16px; background: var(--card); border: 1px solid var(--border); border-radius: var(--radius-md); height: 100%;">
            <h3 style="font-weight: 600; margin-bottom: 8px;">Panel B</h3>
            <p style="color: var(--muted-foreground); font-size: 0.875rem;">This panel flexes to fill remaining space.</p>
          </div>
        </brkta-resizable>
      </div>
    `,
  }),
};
