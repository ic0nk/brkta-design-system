import { describe, it, expect } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dialog } from './dialog';

describe('Dialog', () => {
  it('focuses initially, traps Tab both ways, and restores the trigger on close', async () => {
    render(<Dialog trigger={<button>Open dialog</button>}><button>Last control</button></Dialog>);
    const trigger = screen.getByText('Open dialog');
    await userEvent.click(trigger);
    const close = screen.getByLabelText('Close'); const last = screen.getByText('Last control');
    expect(document.activeElement).toBe(close);
    last.focus(); fireEvent.keyDown(last, { key: 'Tab' }); expect(document.activeElement).toBe(close);
    fireEvent.keyDown(close, { key: 'Tab', shiftKey: true }); expect(document.activeElement).toBe(last);
    await userEvent.click(close);
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    expect(document.activeElement).toBe(trigger);
  });
  it('restores focus when a controlled dialog closes or unmounts', () => {
    const opener = document.createElement('button'); document.body.appendChild(opener); opener.focus();
    const { rerender, unmount } = render(<Dialog open><button>Inside</button></Dialog>);
    expect(document.activeElement).toBe(screen.getByLabelText('Close'));
    rerender(<Dialog open={false} />); expect(document.activeElement).toBe(opener);
    opener.focus(); rerender(<Dialog open />); unmount(); expect(document.activeElement).toBe(opener); opener.remove();
  });
  it('accepts a translated closeLabel', () => {
    render(<Dialog open closeLabel="إغلاق" />);
    expect(screen.getByRole('button', { name: 'إغلاق' })).toBeTruthy();
  });

  it('renders trigger', () => {
    render(<Dialog trigger="Open" />);
    expect(screen.getByText('Open')).toBeTruthy();
  });

  it('opens on trigger click', async () => {
    render(<Dialog trigger="Open"><p>Content</p></Dialog>);
    await userEvent.click(screen.getByText('Open'));
    expect(screen.getByRole('dialog')).toBeTruthy();
    expect(screen.getByText('Content')).toBeTruthy();
  });

  it('closes on Escape', async () => {
    render(<Dialog trigger="Open"><p>Content</p></Dialog>);
    await userEvent.click(screen.getByText('Open'));
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
  });

  it('closes on close button click', async () => {
    render(<Dialog trigger="Open"><p>Content</p></Dialog>);
    await userEvent.click(screen.getByText('Open'));
    await userEvent.click(screen.getByLabelText('Close'));
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
  });

  it('renders title and description', async () => {
    render(<Dialog trigger="Open" title="My Title" description="A description." />);
    await userEvent.click(screen.getByText('Open'));
    expect(screen.getByText('My Title')).toBeTruthy();
    expect(screen.getByText('A description.')).toBeTruthy();
  });

  it('has role="dialog" and aria-modal', async () => {
    render(<Dialog trigger="Open" />);
    await userEvent.click(screen.getByText('Open'));
    const d = screen.getByRole('dialog');
    expect(d.getAttribute('aria-modal')).toBe('true');
  });

  it('data-brkta-dialog-overlay exists when open', async () => {
    render(<Dialog trigger="Open" />);
    await userEvent.click(screen.getByText('Open'));
    expect(document.querySelector('[data-brkta-dialog-overlay]')).toBeTruthy();
  });
});
