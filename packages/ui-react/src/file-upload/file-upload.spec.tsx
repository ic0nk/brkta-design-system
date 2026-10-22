import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { FileUpload, UploadQueue } from './file-upload';

describe('FileUpload', () => {
  it('keeps completed upload progress while saving and accepts a translated processing label', () => {
    const { rerender } = render(<UploadQueue items={[{ id: 'saving', filename: 'synthetic.pdf', status: 'processing' }]} />);
    expect(screen.getByText('Saving')).toBeTruthy();
    expect(screen.getByRole('progressbar').getAttribute('aria-valuenow')).toBe('100');
    rerender(<UploadQueue items={[{ id: 'saving', filename: 'synthetic.pdf', status: 'processing' }]} statusLabels={{ processing: 'جارٍ الحفظ' }} />);
    expect(screen.getByText('جارٍ الحفظ')).toBeTruthy();
  });
  it('emits multiple files from a drop', () => {
    const onFilesSelected = vi.fn();
    const first = new File(['one'], 'one.jpg', { type: 'image/jpeg' });
    const second = new File(['two'], 'two.jpg', { type: 'image/jpeg' });
    const { container } = render(<FileUpload onFilesSelected={onFilesSelected} />);

    fireEvent.drop(container.querySelector('[data-brkta-file-upload-dropzone]')!, {
      dataTransfer: { files: [first, second] },
    });

    expect(onFilesSelected).toHaveBeenCalledWith([first, second]);
  });

  it('limits selected files when maxFiles is supplied', () => {
    const onFilesSelected = vi.fn();
    const first = new File(['one'], 'one.jpg');
    const second = new File(['two'], 'two.jpg');
    const { container } = render(<FileUpload maxFiles={1} onFilesSelected={onFilesSelected} />);

    fireEvent.drop(container.querySelector('[data-brkta-file-upload-dropzone]')!, {
      dataTransfer: { files: [first, second] },
    });

    expect(onFilesSelected).toHaveBeenCalledWith([first]);
  });

  it('renders a bottom-right queue with progress and retry', () => {
    const onRetry = vi.fn();
    render(<UploadQueue items={[{ id: '1', filename: 'photo.jpg', progress: 42, status: 'uploading' }, { id: '2', filename: 'broken.pdf', status: 'error', error: 'Upload failed.' }]} onRetry={onRetry} />);

    expect(screen.getByText('Uploads')).toBeTruthy();
    expect(screen.getByText('photo.jpg')).toBeTruthy();
    expect(screen.getByRole('progressbar').getAttribute('aria-valuenow')).toBe('42');
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
    expect(onRetry).toHaveBeenCalledWith('2');
  });
});
