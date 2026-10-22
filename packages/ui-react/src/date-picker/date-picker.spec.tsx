import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { DatePicker } from './date-picker';

describe('DatePicker', () => {
  it('renders trigger button', () => {
    const { container } = render(<DatePicker />);
    expect(container.querySelector('[data-brkta-date-picker-trigger]')).toBeTruthy();
  });

  it('shows placeholder when no value', () => {
    render(<DatePicker placeholder="Pick a date" />);
    expect(document.body.textContent).toContain('Pick a date');
  });

  it('renders disabled state', () => {
    const { container } = render(<DatePicker disabled />);
    expect(container.querySelector('[data-disabled]')).toBeTruthy();
  });

  it('opens calendar on trigger click', () => {
    const { container } = render(<DatePicker />);
    const trigger = container.querySelector('[data-brkta-date-picker-trigger]')!;
    fireEvent.click(trigger);
    expect(container.querySelector('[data-brkta-calendar]')).toBeTruthy();
  });

  it('has aria attributes on trigger', () => {
    const { container } = render(<DatePicker />);
    const trigger = container.querySelector('[data-brkta-date-picker-trigger]')!;
    expect(trigger.getAttribute('aria-haspopup')).toBe('dialog');
  });
});
