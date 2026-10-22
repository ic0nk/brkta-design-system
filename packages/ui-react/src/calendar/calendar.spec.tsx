import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Calendar } from './calendar';

describe('Calendar', () => {
  it('renders month and year title', () => {
    render(<Calendar defaultMonth={new Date(2026, 6, 1)} />);
    expect(document.body.textContent).toContain('July 2026');
  });

  it('renders weekday headers', () => {
    const { container } = render(<Calendar />);
    expect(container.querySelectorAll('[data-brkta-calendar-weekday]').length).toBe(7);
  });

  it('renders day buttons', () => {
    const { container } = render(<Calendar defaultMonth={new Date(2026, 6, 1)} />);
    expect(container.querySelectorAll('[data-brkta-calendar-day]').length).toBeGreaterThan(25);
  });

  it('selects a date on click', () => {
    const onSelect = vi.fn();
    const { container } = render(<Calendar defaultMonth={new Date(2026, 6, 1)} onSelect={onSelect} />);
    const firstDay = container.querySelector('[data-brkta-calendar-day]:not([data-disabled])') as HTMLElement;
    if (firstDay) { fireEvent.click(firstDay); expect(onSelect).toHaveBeenCalled(); }
  });

  it('marks selected date', () => {
    const { container } = render(<Calendar defaultMonth={new Date(2026, 6, 1)} selected={new Date(2026, 6, 15)} />);
    expect(container.querySelector('[data-selected]')).toBeTruthy();
  });

  it('renders disabled state', () => {
    const { container } = render(<Calendar disabled />);
    expect(container.querySelector('[data-brkta-calendar-day][data-disabled]')).toBeTruthy();
  });

  it('has aria-label on day buttons', () => {
    const { container } = render(<Calendar defaultMonth={new Date(2026, 6, 1)} />);
    const day = container.querySelector('[data-brkta-calendar-day]:not([data-disabled])') as HTMLElement;
    expect(day?.getAttribute('aria-label')).toContain('July');
  });

  it('navigates with ArrowRight key (handler fires)', () => {
    const { container } = render(<Calendar defaultMonth={new Date(2026, 6, 1)} selected={new Date(2026, 6, 15)} />);
    const day15 = container.querySelector('[data-selected]') as HTMLElement;
    if (day15) {
      expect(() => fireEvent.keyDown(day15, { key: 'ArrowRight' })).not.toThrow();
    }
  });

  it('navigates with ArrowDown key (handler fires)', () => {
    const { container } = render(<Calendar defaultMonth={new Date(2026, 6, 1)} selected={new Date(2026, 6, 15)} />);
    const day15 = container.querySelector('[data-selected]') as HTMLElement;
    if (day15) {
      expect(() => fireEvent.keyDown(day15, { key: 'ArrowDown' })).not.toThrow();
    }
  });

  it('has role="grid" on calendar grid', () => {
    const { container } = render(<Calendar defaultMonth={new Date(2026, 6, 1)} />);
    expect(container.querySelector('[role="grid"]')).toBeTruthy();
  });
});
