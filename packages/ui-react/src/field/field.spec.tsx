import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Field, type FieldProps } from './field';

const renderField = (props: Partial<FieldProps> = {}) =>
  render(<Field {...props}><input /></Field>);

const getField = () => document.querySelector('[data-brkta-field]');

describe('Field', () => {
  it('applies data-brkta-field', () => {
    renderField();
    expect(getField()).toHaveAttribute('data-brkta-field');
  });

  it('renders children', () => {
    render(
      <Field>
        <input data-testid="child-input" />
      </Field>
    );
    expect(screen.getByTestId('child-input')).toBeInTheDocument();
  });

  it('applies data-invalid when invalid is true', () => {
    renderField({ invalid: true });
    expect(getField()).toHaveAttribute('data-invalid');
  });

  it('does not apply data-invalid when invalid is false', () => {
    renderField({ invalid: false });
    expect(getField()).not.toHaveAttribute('data-invalid');
  });

  it('applies data-disabled when disabled is true', () => {
    renderField({ disabled: true });
    expect(getField()).toHaveAttribute('data-disabled');
  });

  it('applies data-required when required is true', () => {
    renderField({ required: true });
    expect(getField()).toHaveAttribute('data-required');
  });

  it('renders as a <div>', () => {
    renderField();
    expect(getField()?.tagName).toBe('DIV');
  });

  it('applies custom id', () => {
    renderField({ id: 'field-1' });
    expect(getField()).toHaveAttribute('id', 'field-1');
  });
});
