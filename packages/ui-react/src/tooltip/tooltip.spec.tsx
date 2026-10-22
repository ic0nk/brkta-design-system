import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Tooltip } from './tooltip';

describe('Tooltip', () => {
  it('renders trigger', () => {
    render(<Tooltip content="Help text">Hover me</Tooltip>);
    expect(screen.getByText('Hover me')).toBeTruthy();
  });

  it('shows tooltip on mouseenter', async () => {
    render(<Tooltip content="Help text" delay={0}>Hover me</Tooltip>);
    fireEvent.mouseEnter(screen.getByText('Hover me'));
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeTruthy();
    });
    expect(screen.getByText('Help text')).toBeTruthy();
  });

  it('hides tooltip on mouseleave', async () => {
    render(<Tooltip content="Help text" delay={0}>Hover me</Tooltip>);
    fireEvent.mouseEnter(screen.getByText('Hover me'));
    await waitFor(() => expect(screen.getByRole('tooltip')).toBeTruthy());
    fireEvent.mouseLeave(screen.getByText('Hover me'));
    await waitFor(() => {
      expect(screen.getByRole('tooltip').hasAttribute('data-closing')).toBe(true);
    });
  });

  it('has role="tooltip"', async () => {
    render(<Tooltip content="Help" delay={0}>Trigger</Tooltip>);
    fireEvent.mouseEnter(screen.getByText('Trigger'));
    await waitFor(() => expect(screen.getByRole('tooltip')).toBeTruthy());
  });

  it('sets aria-describedby on trigger', () => {
    render(<Tooltip content="Help">Trigger</Tooltip>);
    expect(screen.getByText('Trigger').getAttribute('aria-describedby')).toBeTruthy();
  });

  it('data-brkta-tooltip wrapper', () => {
    const { container } = render(<Tooltip content="Help">Trigger</Tooltip>);
    expect(container.querySelector('[data-brkta-tooltip]')).toBeTruthy();
  });

  it('aria-describedby matches tooltip content id', async () => {
    render(<Tooltip content="Help text" delay={0}>Trigger</Tooltip>);
    const trigger = screen.getByText('Trigger');
    fireEvent.mouseEnter(trigger);
    await waitFor(() => expect(screen.getByRole('tooltip')).toBeTruthy());
    const tooltipContent = screen.getByRole('tooltip');
    expect(trigger.getAttribute('aria-describedby')).toBe(tooltipContent.id);
  });
});
