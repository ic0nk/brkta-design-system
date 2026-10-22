import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AlertDialog } from './alert-dialog';

describe('AlertDialog', () => {
  it('passes a translated pending announcement to its confirmation button', () => {
    render(<AlertDialog open title="T" description="D" loading loadingLabel="جار التنفيذ" />);
    expect(screen.getByText('جار التنفيذ')).toBeTruthy();
  });

  it('renders trigger', () => {
    render(<AlertDialog trigger="Delete" title="Confirm" description="Are you sure?" />);
    expect(screen.getByText('Delete')).toBeTruthy();
  });

  it('opens on trigger click', async () => {
    render(<AlertDialog trigger="Delete" title="Confirm" description="Sure?" />);
    await userEvent.click(screen.getByText('Delete'));
    expect(screen.getByRole('alertdialog')).toBeTruthy();
  });

  it('shows confirm and cancel buttons', async () => {
    render(<AlertDialog trigger="X" title="T" description="D" confirmLabel="Yes" cancelLabel="No" />);
    await userEvent.click(screen.getByText('X'));
    expect(screen.getByText('Yes')).toBeTruthy();
    expect(screen.getByText('No')).toBeTruthy();
  });

  it('closes on Escape', async () => {
    render(<AlertDialog trigger="X" title="T" description="D" />);
    await userEvent.click(screen.getByText('X'));
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('alertdialog')).toBeNull());
  });

  it('fires onConfirm on confirm click', async () => {
    let confirmed = false;
    render(<AlertDialog trigger="X" title="T" description="D" onConfirm={() => { confirmed = true; }} />);
    await userEvent.click(screen.getByText('X'));
    await userEvent.click(screen.getByText('Continue'));
    await waitFor(() => expect(confirmed).toBe(true));
  });

  it('keeps a controlled dialog open while confirmation is loading', async () => {
    render(<AlertDialog open title="Confirm" description="Wait" loading closeOnConfirm={false} onConfirm={() => undefined} />);
    await userEvent.click(screen.getByText('Continue'));
    expect(screen.getByRole('alertdialog')).toBeTruthy();
    expect(screen.getByText('Continue').closest('button')).toHaveAttribute('data-loading');
  });
});
