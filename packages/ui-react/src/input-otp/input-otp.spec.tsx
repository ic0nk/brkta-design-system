import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { InputOTP } from './input-otp';

describe('InputOTP', () => {
  it('renders correct number of slots', () => {
    const { container } = render(<InputOTP length={4} />);
    expect(container.querySelectorAll('[data-brkta-input-otp-slot]').length).toBe(4);
  });

  it('handles input change', () => {
    const onComplete = vi.fn();
    render(<InputOTP length={4} onComplete={onComplete} />);
    const slots = document.querySelectorAll('[data-brkta-input-otp-slot]');
    fireEvent.change(slots[0], { target: { value: '1' } });
    expect(slots[0]).toHaveValue('1');
  });

  it('renders disabled state', () => {
    const { container } = render(<InputOTP disabled />);
    expect(container.querySelector('[data-disabled]')).toBeTruthy();
  });
});
