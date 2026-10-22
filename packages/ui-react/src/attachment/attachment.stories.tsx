import type { Meta, StoryObj } from '@storybook/react';
import { Attachment } from './attachment';

const meta = {
  title: 'Wave 7A/Attachment',
  component: Attachment,
  tags: ['autodocs'],
} satisfies Meta<typeof Attachment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    filename: 'report-q3.pdf',
    size: '2.4 MB',
    type: 'pdf',
    status: 'default',
  },
};

export const Uploading: Story = {
  args: {
    filename: 'photo-2026.jpg',
    size: '8.1 MB',
    type: 'jpg',
    status: 'uploading',
  },
};

export const Success: Story = {
  args: {
    filename: 'invoice-0042.pdf',
    size: '340 KB',
    type: 'pdf',
    status: 'success',
  },
};

export const Error: Story = {
  args: {
    filename: 'broken-file.zip',
    size: '12 MB',
    type: 'zip',
    status: 'error',
  },
};

export const WithActions: Story = {
  args: {
    filename: 'shared-document.docx',
    size: '1.2 MB',
    type: 'docx',
    status: 'default',
    onDownload: () => alert('Download clicked'),
    onRemove: () => alert('Remove clicked'),
  },
};
