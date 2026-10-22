import type { Meta, StoryObj } from '@storybook/angular';
import { FileUploadComponent, UploadQueueComponent } from './file-upload.component';

const meta: Meta<FileUploadComponent> = {
  title: 'Wave 7A/File Upload',
  component: FileUploadComponent,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<FileUploadComponent>;

export const DropZone: Story = { args: { accept: 'image/*', multiple: true } };

export const UploadProgress: Story = {
  render: () => ({
    props: { items: [{ id: '1', filename: 'property-gallery.jpg', size: '8.1 MB', progress: 68, status: 'uploading' }, { id: '2', filename: 'floor-plan.pdf', size: '2.4 MB', status: 'success' }] },
    template: '<brkta-upload-queue [items]="items"></brkta-upload-queue>',
    moduleMetadata: { imports: [UploadQueueComponent] },
  }),
};
