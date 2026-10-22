import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Label, type LabelProps } from './label';

const renderLabel = (props: Partial<LabelProps> = {}) =>
  render(<Label {...props}>Username</Label>);

describe('Label', () => {
  it('renders children', () => {
    renderLabel();
    expect(screen.getByText('Username')).toBeInTheDocument();
  });

  it('applies data-brkta-label', () => {
    renderLabel();
    expect(screen.getByText('Username')).toHaveAttribute('data-brkta-label');
  });

  it('renders as a <label>', () => {
    renderLabel();
    expect(screen.getByText('Username').tagName).toBe('LABEL');
  });

  it('applies htmlFor', () => {
    renderLabel({ htmlFor: 'username-input' });
    expect(screen.getByText('Username')).toHaveAttribute(
      'for',
      'username-input'
    );
  });

  it('applies data-required when required is true', () => {
    renderLabel({ required: true });
    expect(screen.getByText('Username')).toHaveAttribute('data-required');
  });

  it('does not apply data-required when required is false', () => {
    renderLabel({ required: false });
    expect(screen.getByText('Username')).not.toHaveAttribute('data-required');
  });

  it('applies data-disabled when disabled is true', () => {
    renderLabel({ disabled: true });
    expect(screen.getByText('Username')).toHaveAttribute('data-disabled');
  });

  it('does not apply data-disabled when disabled is false', () => {
    renderLabel({ disabled: false });
    expect(screen.getByText('Username')).not.toHaveAttribute('data-disabled');
  });

  it('applies custom className', () => {
    renderLabel({ className: 'my-label' });
    expect(screen.getByText('Username')).toHaveClass('my-label');
  });
});
