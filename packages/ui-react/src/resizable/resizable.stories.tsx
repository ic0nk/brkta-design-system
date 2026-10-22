import type { Meta, StoryObj } from '@storybook/react';
import { Resizable } from './resizable';

const meta = {
  title: 'Components/Resizable',
  component: Resizable,
  tags: ['autodocs'],
} satisfies Meta<typeof Resizable>;

export default meta;
type Story = StoryObj<typeof meta>;

const LeftPanel = (
  <div style={{ padding: '16px', backgroundColor: 'var(--card)', height: '100%', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
    <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>Panel A</h3>
    <p style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>Drag the handle to resize this panel. Content in both panels is scrollable.</p>
  </div>
);

const RightPanel = (
  <div style={{ padding: '16px', backgroundColor: 'var(--card)', height: '100%', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
    <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>Panel B</h3>
    <p style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>This panel flexes to fill the remaining space.</p>
  </div>
);

export const Horizontal: Story = {
  render: () => (
    <div style={{ height: '300px', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
      <Resizable first={LeftPanel} second={RightPanel} defaultSize={40} />
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ height: '400px', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
      <Resizable first={LeftPanel} second={RightPanel} direction="vertical" defaultSize={40} />
    </div>
  ),
};
