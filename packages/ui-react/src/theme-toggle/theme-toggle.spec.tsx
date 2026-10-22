import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ThemeToggle } from './theme-toggle';

describe('ThemeToggle', () => {
  it('renders a distinct governed icon for each mode', () => {
    const { rerender } = render(<ThemeToggle mode="system" resolved="dark" ariaLabel="Use light theme" />);
    const toggle = screen.getByRole('button', { name: 'Use light theme' });
    expect(toggle.querySelector('.brkta-icon-motion-monitor')).toBeTruthy();

    rerender(<ThemeToggle mode="light" resolved="light" ariaLabel="Use dark theme" />);
    expect(screen.getByRole('button', { name: 'Use dark theme' }).querySelector('.brkta-icon-motion-sun')).toBeTruthy();

    rerender(<ThemeToggle mode="dark" resolved="dark" ariaLabel="Use system theme" />);
    expect(screen.getByRole('button', { name: 'Use system theme' }).querySelector('.brkta-icon-motion-moon')).toBeTruthy();
  });

  it('cycles through the platform modes from a ghost icon button', () => {
    const onModeChange = vi.fn();
    render(<ThemeToggle mode="system" resolved="light" ariaLabel="Use light theme" onModeChange={onModeChange} />);
    const toggle = screen.getByRole('button', { name: 'Use light theme' });

    expect(toggle.getAttribute('data-variant')).toBe('ghost');
    expect(toggle.getAttribute('data-icon-only')).toBe('true');
    toggle.click();
    expect(onModeChange).toHaveBeenCalledWith('light');
  });
});
