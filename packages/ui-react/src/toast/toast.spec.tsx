import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import userEvent from '@testing-library/user-event';
import { Toast } from './toast';

describe('Toast', () => {
  afterEach(() => vi.useRealTimers());

  it('accepts a translated dismissLabel', () => {
    render(<Toast dismissLabel="إغلاق" />);
    expect(screen.getByRole('button', { name: 'إغلاق' })).toBeTruthy();
  });

  it('renders title and description', () => {
    render(<Toast title="Saved" description="Changes saved." />);
    expect(screen.getByText('Saved')).toBeTruthy();
    expect(screen.getByText('Changes saved.')).toBeTruthy();
  });

  it('renders dismiss button when dismissible', () => {
    render(<Toast title="T" />);
    expect(screen.getByLabelText('Dismiss')).toBeTruthy();
  });

  it('closes on dismiss click', async () => {
    render(<Toast title="T" />);
    await userEvent.click(screen.getByLabelText('Dismiss'));
    await waitFor(() => expect(screen.queryByText('T')).toBeNull());
  });

  it('renders success variant', () => {
    const { container } = render(<Toast title="OK" variant="success" />);
    expect(container.querySelector('[data-variant="success"]')).toBeTruthy();
  });

  it('uses the shared elevated glass recipe', () => {
    const { container } = render(<Toast title="Glass" />);
    expect(container.querySelector('[data-brkta-toast]')?.classList.contains('glass-elevated')).toBe(true);
  });

  it('auto-dismisses after the default duration', () => {
    vi.useFakeTimers();
    const onDismiss = vi.fn();
    render(<Toast title="Temporary" onDismiss={onDismiss} />);

    act(() => vi.advanceTimersByTime(4000));
    expect(screen.getByText('Temporary')).toBeTruthy();
    act(() => vi.advanceTimersByTime(200));
    expect(screen.queryByText('Temporary')).toBeNull();
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it('pauses dismissal while hovered and resumes after leaving', () => {
    vi.useFakeTimers();
    const { container } = render(<Toast title="Hover me" />);
    const toast = container.querySelector('[data-brkta-toast]') as HTMLElement;

    fireEvent.mouseEnter(toast);
    act(() => vi.advanceTimersByTime(5000));
    expect(screen.getByText('Hover me')).toBeTruthy();

    fireEvent.mouseLeave(toast);
    act(() => vi.advanceTimersByTime(4000));
    act(() => vi.advanceTimersByTime(200));
    expect(screen.queryByText('Hover me')).toBeNull();
  });

  it('renders destructive variant', () => {
    const { container } = render(<Toast title="Error" variant="destructive" />);
    expect(container.querySelector('[data-variant="destructive"]')).toBeTruthy();
  });

  it('announces success politely and destructive feedback assertively', () => {
    const { container, rerender } = render(<Toast title="Saved" />);
    expect(container.querySelector('[data-brkta-toast]')?.getAttribute('role')).toBe('status');
    rerender(<Toast title="Error" variant="destructive" />);
    expect(container.querySelector('[data-brkta-toast]')?.getAttribute('aria-live')).toBe('assertive');
  });
});
