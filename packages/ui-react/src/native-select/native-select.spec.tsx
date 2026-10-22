import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NativeSelect, type NativeSelectProps } from './native-select';

const renderNativeSelect = (props: Partial<NativeSelectProps> = {}) =>
  render(
    <NativeSelect {...props}>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
    </NativeSelect>
  );

describe('NativeSelect', () => {
  it('applies data-brkta-native-select', () => {
    renderNativeSelect();
    expect(screen.getByRole('combobox')).toHaveAttribute(
      'data-brkta-native-select'
    );
  });

  it('defaults variant to "default" and size to "md"', () => {
    renderNativeSelect();
    const el = screen.getByRole('combobox');
    expect(el).toHaveAttribute('data-variant', 'default');
    expect(el).toHaveAttribute('data-size', 'md');
  });

  it('applies custom variant', () => {
    renderNativeSelect({ variant: 'filled' });
    expect(screen.getByRole('combobox')).toHaveAttribute(
      'data-variant',
      'filled'
    );
  });

  it('applies custom size', () => {
    renderNativeSelect({ size: 'lg' });
    expect(screen.getByRole('combobox')).toHaveAttribute('data-size', 'lg');
  });

  it('applies disabled attribute and data-disabled', () => {
    renderNativeSelect({ disabled: true });
    const el = screen.getByRole('combobox');
    expect(el).toBeDisabled();
    expect(el).toHaveAttribute('data-disabled');
  });

  it('applies invalid state with aria-invalid and data-invalid', () => {
    renderNativeSelect({ invalid: true });
    const el = screen.getByRole('combobox');
    expect(el).toHaveAttribute('aria-invalid', 'true');
    expect(el).toHaveAttribute('data-invalid');
  });

  it('renders children (option elements)', () => {
    renderNativeSelect();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('renders as a <select>', () => {
    renderNativeSelect();
    expect(screen.getByRole('combobox').tagName).toBe('SELECT');
  });

  it('applies custom className', () => {
    renderNativeSelect({ className: 'my-select' });
    expect(screen.getByRole('combobox')).toHaveClass('my-select');
  });
});
