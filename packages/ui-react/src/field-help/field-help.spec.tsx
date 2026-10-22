import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FieldHelpText, type FieldHelpTextProps } from './field-help';

const renderFieldHelp = (props: Partial<FieldHelpTextProps> = {}) =>
  render(<FieldHelpText {...props}>Helper text</FieldHelpText>);

describe('FieldHelpText', () => {
  it('renders children', () => {
    renderFieldHelp();
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  it('applies data-brkta-field-help', () => {
    renderFieldHelp();
    expect(screen.getByText('Helper text')).toHaveAttribute(
      'data-brkta-field-help'
    );
  });

  it('renders as a <p>', () => {
    renderFieldHelp();
    expect(screen.getByText('Helper text').tagName).toBe('P');
  });

  it('applies custom id', () => {
    renderFieldHelp({ id: 'help-id' });
    expect(screen.getByText('Helper text')).toHaveAttribute('id', 'help-id');
  });

  it('applies custom className', () => {
    renderFieldHelp({ className: 'my-help' });
    expect(screen.getByText('Helper text')).toHaveClass('my-help');
  });
});
