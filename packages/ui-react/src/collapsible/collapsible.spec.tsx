import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Collapsible } from './collapsible';

describe('Collapsible', () => {
  it('renders the trigger label', () => {
    render(<Collapsible label="Toggle me" content="Hidden content" />);
    expect(screen.getByText('Toggle me')).toBeTruthy();
  });

  it('shows content when trigger is clicked', () => {
    render(<Collapsible label="Toggle" content="Visible now" />);
    fireEvent.click(screen.getByText('Toggle'));
    expect(screen.getByText('Visible now')).toBeTruthy();
  });

  it('hides content when toggled again', () => {
    render(<Collapsible label="Toggle" content="Content" />);
    const btn = screen.getByText('Toggle');
    fireEvent.click(btn);
    fireEvent.click(btn);
    const panel = document.querySelector('[data-brkta-collapsible-panel]');
    expect(panel?.hasAttribute('data-open')).toBe(false);
  });

  it('starts open when defaultOpen is true', () => {
    render(<Collapsible label="Toggle" content="Content" defaultOpen />);
    expect(screen.getByText('Content')).toBeTruthy();
  });

  it('has aria-expanded attribute', () => {
    const { container } = render(<Collapsible label="Toggle" content="Content" />);
    const btn = container.querySelector('[data-brkta-collapsible-trigger]');
    expect(btn?.getAttribute('aria-expanded')).toBe('false');
  });

  it('does not toggle when disabled', () => {
    render(<Collapsible label="Toggle" content="Content" disabled />);
    fireEvent.click(screen.getByText('Toggle'));
    const panel = document.querySelector('[data-brkta-collapsible-panel]');
    expect(panel?.hasAttribute('data-open')).toBe(false);
  });

  it('has data-brkta-collapsible on root', () => {
    const { container } = render(<Collapsible label="Toggle" content="Content" />);
    expect(container.querySelector('[data-brkta-collapsible]')).toBeTruthy();
  });

  it('does not render data-compact when compact is not set', () => {
    const { container } = render(<Collapsible label="Toggle" content="Content" />);
    expect(container.querySelector('[data-brkta-collapsible]')?.hasAttribute('data-compact')).toBe(false);
  });

  it('renders data-compact on root when compact is true', () => {
    const { container } = render(<Collapsible label="Advanced filters" content="Content" compact />);
    expect(container.querySelector('[data-brkta-collapsible]')?.hasAttribute('data-compact')).toBe(true);
  });

  it('preserves label, expand/collapse, and ARIA behavior in compact mode', () => {
    render(<Collapsible label="Advanced filters (2 active)" content="Filter fields" compact />);
    const btn = screen.getByText('Advanced filters (2 active)');
    expect(btn.closest('[data-brkta-collapsible-trigger]')?.getAttribute('aria-expanded')).toBe('false');
    fireEvent.click(btn);
    expect(screen.getByText('Filter fields')).toBeTruthy();
    expect(btn.closest('[data-brkta-collapsible-trigger]')?.getAttribute('aria-expanded')).toBe('true');
  });

  it('does not toggle in compact mode when disabled', () => {
    render(<Collapsible label="Advanced filters" content="Content" compact disabled />);
    fireEvent.click(screen.getByText('Advanced filters'));
    const panel = document.querySelector('[data-brkta-collapsible-panel]');
    expect(panel?.hasAttribute('data-open')).toBe(false);
  });
});
