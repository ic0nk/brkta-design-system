import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Input, type InputProps } from './input';

const renderInput = (props: Partial<InputProps> = {}) =>
  render(<Input {...props} />);

describe('Input', () => {
  it('applies data-brkta-input', () => {
    renderInput();
    expect(screen.getByRole('textbox')).toHaveAttribute('data-brkta-input');
  });

  it('defaults variant to "default" and size to "md"', () => {
    renderInput();
    const el = screen.getByRole('textbox');
    expect(el).toHaveAttribute('data-variant', 'default');
    expect(el).toHaveAttribute('data-size', 'md');
  });

  it('applies custom variant', () => {
    renderInput({ variant: 'filled' });
    expect(screen.getByRole('textbox')).toHaveAttribute('data-variant', 'filled');
  });

  it('applies custom size', () => {
    renderInput({ size: 'lg' });
    expect(screen.getByRole('textbox')).toHaveAttribute('data-size', 'lg');
  });

  it('applies disabled attribute and data-disabled', () => {
    renderInput({ disabled: true });
    const el = screen.getByRole('textbox');
    expect(el).toBeDisabled();
    expect(el).toHaveAttribute('data-disabled');
  });

  it('applies invalid state with aria-invalid and data-invalid', () => {
    renderInput({ invalid: true });
    const el = screen.getByRole('textbox');
    expect(el).toHaveAttribute('aria-invalid', 'true');
    expect(el).toHaveAttribute('data-invalid');
  });

  it('does not set aria-invalid when invalid is false', () => {
    renderInput({ invalid: false });
    expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid');
  });

  it('renders with placeholder', () => {
    renderInput({ placeholder: 'Enter text' });
    expect(screen.getByRole('textbox')).toHaveAttribute(
      'placeholder',
      'Enter text'
    );
  });

  it('renders as an <input>', () => {
    renderInput();
    expect(screen.getByRole('textbox').tagName).toBe('INPUT');
  });

  it('applies custom className', () => {
    renderInput({ className: 'my-input' });
    expect(screen.getByRole('textbox')).toHaveClass('my-input');
  });

  it('renders a suffix inside the input container', () => {
    renderInput({ suffix: <button type="button">Show</button> });
    expect(screen.getByRole('button', { name: 'Show' })).toBeInTheDocument();
    expect(screen.getByRole('textbox').closest('[data-brkta-input-container]')).toBeInTheDocument();
  });
});
