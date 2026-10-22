import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Textarea, type TextareaProps } from './textarea';

const renderTextarea = (props: Partial<TextareaProps> = {}) =>
  render(<Textarea {...props} />);

describe('Textarea', () => {
  it('applies data-brkta-textarea', () => {
    renderTextarea();
    expect(screen.getByRole('textbox')).toHaveAttribute('data-brkta-textarea');
  });

  it('defaults variant to "default" and size to "md"', () => {
    renderTextarea();
    const el = screen.getByRole('textbox');
    expect(el).toHaveAttribute('data-variant', 'default');
    expect(el).toHaveAttribute('data-size', 'md');
  });

  it('applies custom variant', () => {
    renderTextarea({ variant: 'filled' });
    expect(screen.getByRole('textbox')).toHaveAttribute('data-variant', 'filled');
  });

  it('applies custom size', () => {
    renderTextarea({ size: 'lg' });
    expect(screen.getByRole('textbox')).toHaveAttribute('data-size', 'lg');
  });

  it('applies disabled attribute and data-disabled', () => {
    renderTextarea({ disabled: true });
    const el = screen.getByRole('textbox');
    expect(el).toBeDisabled();
    expect(el).toHaveAttribute('data-disabled');
  });

  it('applies invalid state with aria-invalid and data-invalid', () => {
    renderTextarea({ invalid: true });
    const el = screen.getByRole('textbox');
    expect(el).toHaveAttribute('aria-invalid', 'true');
    expect(el).toHaveAttribute('data-invalid');
  });

  it('does not set aria-invalid when invalid is false', () => {
    renderTextarea({ invalid: false });
    expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid');
  });

  it('renders with placeholder', () => {
    renderTextarea({ placeholder: 'Enter description' });
    expect(screen.getByRole('textbox')).toHaveAttribute(
      'placeholder',
      'Enter description'
    );
  });

  it('renders as a <textarea>', () => {
    renderTextarea();
    expect(screen.getByRole('textbox').tagName).toBe('TEXTAREA');
  });

  it('applies custom className', () => {
    renderTextarea({ className: 'my-textarea' });
    expect(screen.getByRole('textbox')).toHaveClass('my-textarea');
  });
});
