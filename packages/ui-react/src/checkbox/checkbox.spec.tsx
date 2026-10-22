import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox, type CheckboxProps } from './checkbox';

const renderCheckbox = (props: Partial<CheckboxProps> = {}) =>
  render(<Checkbox {...props} />);

describe('Checkbox', () => {
  it('applies data-brkta-checkbox', () => {
    renderCheckbox();
    expect(screen.getByRole('checkbox').closest('[data-brkta-checkbox]')).toHaveAttribute(
      'data-brkta-checkbox'
    );
  });

  it('renders a native checkbox input', () => {
    renderCheckbox();
    expect(screen.getByRole('checkbox').tagName).toBe('INPUT');
    expect(screen.getByRole('checkbox')).toHaveAttribute('type', 'checkbox');
  });

  it('renders with label text', () => {
    renderCheckbox({ label: 'Accept terms' });
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
  });

  it('applies checked state', () => {
    renderCheckbox({ checked: true, label: 'Option' });
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('applies disabled state and data-disabled', () => {
    renderCheckbox({ disabled: true });
    const el = screen.getByRole('checkbox');
    expect(el).toBeDisabled();
    expect(el.closest('[data-brkta-checkbox]')).toHaveAttribute('data-disabled');
  });

  it('applies invalid state', () => {
    renderCheckbox({ invalid: true });
    const el = screen.getByRole('checkbox');
    expect(el).toHaveAttribute('aria-invalid', 'true');
    expect(el.closest('[data-brkta-checkbox]')).toHaveAttribute('data-invalid');
  });

  it('renders the indicator span', () => {
    renderCheckbox();
    expect(
      document.querySelector('.brkta-checkbox-indicator')
    ).toBeInTheDocument();
  });

  it('calls onCheckedChange when clicked', async () => {
    const onCheckedChange = vi.fn();
    renderCheckbox({ onCheckedChange });
    await userEvent.click(screen.getByRole('checkbox'));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });
});
