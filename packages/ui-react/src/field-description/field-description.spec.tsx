import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  FieldDescription,
  type FieldDescriptionProps,
} from './field-description';

const renderFieldDescription = (props: Partial<FieldDescriptionProps> = {}) =>
  render(
    <FieldDescription {...props}>Description text</FieldDescription>
  );

describe('FieldDescription', () => {
  it('renders children', () => {
    renderFieldDescription();
    expect(screen.getByText('Description text')).toBeInTheDocument();
  });

  it('applies data-brkta-field-description', () => {
    renderFieldDescription();
    expect(screen.getByText('Description text')).toHaveAttribute(
      'data-brkta-field-description'
    );
  });

  it('renders as a <p>', () => {
    renderFieldDescription();
    expect(screen.getByText('Description text').tagName).toBe('P');
  });

  it('applies custom id', () => {
    renderFieldDescription({ id: 'desc-id' });
    expect(screen.getByText('Description text')).toHaveAttribute('id', 'desc-id');
  });

  it('applies custom className', () => {
    renderFieldDescription({ className: 'my-desc' });
    expect(screen.getByText('Description text')).toHaveClass('my-desc');
  });
});
