import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';
import { FileUploadComponent, UploadQueueComponent } from './file-upload.component';

describe('FileUploadComponent', () => {
  let fixture: ComponentFixture<FileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [FileUploadComponent] }).compileComponents();
    fixture = TestBed.createComponent(FileUploadComponent);
    fixture.detectChanges();
  });

  it('emits multiple files from a drop', () => {
    const onFiles = vi.spyOn(fixture.componentInstance.filesSelected, 'emit');
    const first = new File(['one'], 'one.jpg', { type: 'image/jpeg' });
    const second = new File(['two'], 'two.jpg', { type: 'image/jpeg' });
    const event = new Event('drop', { bubbles: true, cancelable: true }) as DragEvent;
    Object.defineProperty(event, 'dataTransfer', { value: { files: [first, second] } });

    fixture.nativeElement.querySelector('[data-brkta-file-upload-dropzone]').dispatchEvent(event);

    expect(onFiles).toHaveBeenCalledWith([first, second]);
  });

  function drop(files: File[]): void {
    const event = new Event('drop', { bubbles: true, cancelable: true }) as DragEvent;
    Object.defineProperty(event, 'dataTransfer', { value: { files } });
    fixture.nativeElement.querySelector('[data-brkta-file-upload-dropzone]').dispatchEvent(event);
  }

  it('enforces accept on a drop and reports the files it turned away', () => {
    fixture.componentInstance.accept = 'image/*,.pdf';
    const onFiles = vi.spyOn(fixture.componentInstance.filesSelected, 'emit');
    const onRejected = vi.spyOn(fixture.componentInstance.filesRejected, 'emit');
    const photo = new File(['one'], 'photo.JPG', { type: 'image/jpeg' });
    const brochure = new File(['two'], 'Brochure.PDF', { type: '' });
    const script = new File(['three'], 'run.exe', { type: 'application/x-msdownload' });

    drop([photo, script, brochure]);

    expect(onFiles).toHaveBeenCalledWith([photo, brochure]);
    expect(onRejected).toHaveBeenCalledWith([{ name: 'run.exe', reason: 'type' }]);
  });

  it('keeps maxFiles on a drop and names the extra files', () => {
    fixture.componentInstance.maxFiles = 1;
    const onFiles = vi.spyOn(fixture.componentInstance.filesSelected, 'emit');
    const onRejected = vi.spyOn(fixture.componentInstance.filesRejected, 'emit');
    const first = new File(['one'], 'one.jpg', { type: 'image/jpeg' });
    const second = new File(['two'], 'two.jpg', { type: 'image/jpeg' });

    drop([first, second]);

    expect(onFiles).toHaveBeenCalledWith([first]);
    expect(onRejected).toHaveBeenCalledWith([{ name: 'two.jpg', reason: 'count' }]);
  });

  it('emits nothing when every dropped file is refused', () => {
    fixture.componentInstance.accept = 'application/pdf';
    const onFiles = vi.spyOn(fixture.componentInstance.filesSelected, 'emit');
    const onRejected = vi.spyOn(fixture.componentInstance.filesRejected, 'emit');

    drop([new File(['x'], 'photo.png', { type: 'image/png' })]);

    expect(onFiles).not.toHaveBeenCalled();
    expect(onRejected).toHaveBeenCalledWith([{ name: 'photo.png', reason: 'type' }]);
  });

  it('keeps the dialog path unchanged: no accept filtering, only the count limit', () => {
    fixture.componentInstance.accept = 'image/*';
    const onFiles = vi.spyOn(fixture.componentInstance.filesSelected, 'emit');
    const onRejected = vi.spyOn(fixture.componentInstance.filesRejected, 'emit');
    const text = new File(['x'], 'notes.txt', { type: 'text/plain' });
    const input = { files: [text], value: 'notes.txt' } as unknown as HTMLInputElement;

    fixture.componentInstance.handleInputChange(input);

    expect(onFiles).toHaveBeenCalledWith([text]);
    expect(onRejected).not.toHaveBeenCalled();
  });

  it('renders the drag-and-drop card and browse control', () => {
    expect(fixture.nativeElement.querySelector('[data-brkta-file-upload-dropzone]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-brkta-file-upload-input]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-brkta-button]')).toBeTruthy();
  });
});

describe('UploadQueueComponent', () => {
  it('renders progress and failed upload actions', async () => {
    await TestBed.configureTestingModule({ imports: [UploadQueueComponent] }).compileComponents();
    const fixture = TestBed.createComponent(UploadQueueComponent);
    fixture.componentRef.setInput('items', [{ id: '1', filename: 'photo.jpg', progress: 42, status: 'uploading' }, { id: '2', filename: 'broken.pdf', status: 'error', error: 'Upload failed.' }]);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[data-brkta-upload-queue]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[role="progressbar"]')?.getAttribute('aria-valuenow')).toBe('42');
    expect(fixture.nativeElement.textContent).toContain('Retry');
  });

  it('says how many bytes of how many while sending', async () => {
    // A percentage on its own cannot tell somebody watching a large upload whether it has moved.
    await TestBed.configureTestingModule({ imports: [UploadQueueComponent] }).compileComponents();
    const fixture = TestBed.createComponent(UploadQueueComponent);
    fixture.componentRef.setInput('items', [
      { id: '1', filename: 'photo.jpg', status: 'uploading', progress: 36, loaded: 3_355_443, total: 9_227_469 },
    ]);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('3.2 MB / 8.8 MB');
  });

  it('keeps the bar full but does not claim to be finished while the server is still storing', async () => {
    // The browser's leg ends long before the upload does when object storage lives elsewhere. A
    // full bar labelled Complete would be a lie; a full bar labelled Saving is the truth.
    await TestBed.configureTestingModule({ imports: [UploadQueueComponent] }).compileComponents();
    const fixture = TestBed.createComponent(UploadQueueComponent);
    fixture.componentRef.setInput('items', [{ id: '1', filename: 'photo.jpg', status: 'processing' }]);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[role="progressbar"]')?.getAttribute('aria-valuenow')).toBe('100');
    expect(fixture.nativeElement.textContent).toContain('Saving');
    expect(fixture.nativeElement.textContent).not.toContain('Complete');
  });

  it('closes itself once everything has finished', async () => {
    vi.useFakeTimers();
    await TestBed.configureTestingModule({ imports: [UploadQueueComponent] }).compileComponents();
    const fixture = TestBed.createComponent(UploadQueueComponent);
    let closed = 0;
    fixture.componentInstance.close.subscribe(() => closed++);

    fixture.componentRef.setInput('items', [{ id: '1', filename: 'a.jpg', status: 'uploading' }]);
    fixture.detectChanges();
    vi.advanceTimersByTime(10_000);
    expect(closed).toBe(0);

    fixture.componentRef.setInput('items', [{ id: '1', filename: 'a.jpg', status: 'success' }]);
    fixture.detectChanges();
    vi.advanceTimersByTime(4_000);
    expect(closed).toBe(1);

    vi.useRealTimers();
    fixture.destroy();
  });

  it('stays open while the pointer is inside it', async () => {
    // Closing under somebody's cursor while they are reading which file failed is worse than
    // leaving the panel up.
    vi.useFakeTimers();
    await TestBed.configureTestingModule({ imports: [UploadQueueComponent] }).compileComponents();
    const fixture = TestBed.createComponent(UploadQueueComponent);
    let closed = 0;
    fixture.componentInstance.close.subscribe(() => closed++);

    fixture.componentRef.setInput('items', [{ id: '1', filename: 'a.jpg', status: 'error', error: 'nope' }]);
    fixture.detectChanges();

    fixture.componentInstance.hold(true);
    vi.advanceTimersByTime(60_000);
    expect(closed).toBe(0);

    // Moving away lets it go again.
    fixture.componentInstance.hold(false);
    vi.advanceTimersByTime(4_000);
    expect(closed).toBe(1);

    vi.useRealTimers();
    fixture.destroy();
  });

  it('offers a close control regardless of what the uploads are doing', async () => {
    await TestBed.configureTestingModule({ imports: [UploadQueueComponent] }).compileComponents();
    const fixture = TestBed.createComponent(UploadQueueComponent);
    fixture.componentRef.setInput('items', [{ id: '1', filename: 'a.jpg', status: 'uploading' }]);
    fixture.detectChanges();

    const close = fixture.nativeElement.querySelector('[aria-label="Close uploads"]');
    expect(close).toBeTruthy();
  });
});