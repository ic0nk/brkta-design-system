import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FieldErrorText, type FieldErrorTextProps } from './field-error';

const renderFieldError = (props: Partial<FieldErrorTextProps> = {}) =>
  render(<FieldErrorText {...props}>Error message</FieldErrorText>);

describe('FieldErrorText', () => {
  it('renders children', () => {
    renderFieldError();
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('applies data-brkta-field-error', () => {
    renderFieldError();
    expect(screen.getByText('Error message')).toHaveAttribute(
      'data-brkta-field-error'
    );
  });

  it('has role="alert"', () => {
    renderFieldError();
    expect(screen.getByText('Error message')).toHaveAttribute('role', 'alert');
  });

  it('renders as a <p>', () => {
    renderFieldError();
    expect(screen.getByText('Error message').tagName).toBe('P');
  });

  it('applies custom id', () => {
    renderFieldError({ id: 'error-id' });
    expect(screen.getByText('Error message')).toHaveAttribute('id', 'error-id');
  });

  it('applies custom className', () => {
    renderFieldError({ className: 'my-error' });
    expect(screen.getByText('Error message')).toHaveClass('my-error');
  });
});
