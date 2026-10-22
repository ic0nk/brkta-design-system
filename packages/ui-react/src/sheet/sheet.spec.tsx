import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Sheet } from './sheet';

describe('Sheet', () => {
  it('renders trigger', () => {
    render(<Sheet trigger="Open" />);
    expect(screen.getByText('Open')).toBeTruthy();
  });

  it('opens on trigger click', async () => {
    render(<Sheet trigger="Open"><p>Content</p></Sheet>);
    await userEvent.click(screen.getByText('Open'));
    expect(screen.getByRole('dialog')).toBeTruthy();
  });

  it('closes on Escape', async () => {
    render(<Sheet trigger="Open" />);
    await userEvent.click(screen.getByText('Open'));
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
  });

  it('renders title', async () => {
    render(<Sheet trigger="Open" title="Panel" />);
    await userEvent.click(screen.getByText('Open'));
    expect(screen.getByText('Panel')).toBeTruthy();
  });

  it('renders with side attribute on content', async () => {
    render(<Sheet trigger="Open" side="left" />);
    await userEvent.click(screen.getByText('Open'));
    expect(document.querySelector('[data-side="left"]')).toBeTruthy();
  });

  it('renders size and footer outside the scrolling body', async () => {
    render(<Sheet trigger="Open" size="xl" footer={<button>Save</button>}><p>Body</p></Sheet>);
    await userEvent.click(screen.getByText('Open'));
    expect(document.querySelector('[data-size="xl"]')).toBeTruthy();
    expect(document.querySelector('[data-brkta-sheet-body]')?.textContent).toContain('Body');
    expect(document.querySelector('[data-brkta-sheet-footer]')?.textContent).toContain('Save');
  });
});
