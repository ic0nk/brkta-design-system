import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch, type SwitchProps } from './switch';

const renderSwitch = (props: Partial<SwitchProps> = {}) =>
  render(<Switch {...props} />);

describe('Switch', () => {
  it('applies data-brkta-switch', () => {
    renderSwitch();
    expect(
      screen.getByRole('switch').closest('[data-brkta-switch]')
    ).toHaveAttribute('data-brkta-switch');
  });

  it('renders a native checkbox input with role="switch"', () => {
    renderSwitch();
    const el = screen.getByRole('switch');
    expect(el.tagName).toBe('INPUT');
    expect(el).toHaveAttribute('type', 'checkbox');
  });

  it('renders the switch track and thumb', () => {
    renderSwitch();
    expect(document.querySelector('.brkta-switch-track')).toBeInTheDocument();
    expect(document.querySelector('.brkta-switch-thumb')).toBeInTheDocument();
  });

  it('applies checked state', () => {
    renderSwitch({ checked: true, ariaLabel: 'Toggle' });
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('applies disabled state and data-disabled', () => {
    renderSwitch({ disabled: true });
    const el = screen.getByRole('switch');
    expect(el).toBeDisabled();
    expect(el.closest('[data-brkta-switch]')).toHaveAttribute('data-disabled');
  });

  it('applies aria-label', () => {
    renderSwitch({ ariaLabel: 'Enable notifications' });
    expect(screen.getByRole('switch')).toHaveAttribute(
      'aria-label',
      'Enable notifications'
    );
  });

  it('calls onCheckedChange when toggled', async () => {
    const onCheckedChange = vi.fn();
    renderSwitch({ onCheckedChange });
    await userEvent.click(screen.getByRole('switch'));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });
});
