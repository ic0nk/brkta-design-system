import type { Meta, StoryObj } from '@storybook/angular';
import { AttachmentComponent } from './attachment.component';

const meta: Meta<AttachmentComponent> = {
  title: 'Wave 7A/Attachment',
  component: AttachmentComponent,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AttachmentComponent>;

export const Default: Story = {
  args: { filename: 'report-q3.pdf', size: '2.4 MB', type: 'pdf', status: 'default' },
};

export const Uploading: Story = {
  args: { filename: 'photo-2026.jpg', size: '8.1 MB', type: 'jpg', status: 'uploading' },
};

export const Success: Story = {
  args: { filename: 'invoice-0042.pdf', size: '340 KB', type: 'pdf', status: 'success' },
};

export const Error: Story = {
  args: { filename: 'broken-file.zip', size: '12 MB', type: 'zip', status: 'error' },
};
