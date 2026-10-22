import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Spinner, type SpinnerProps } from './spinner';

const renderSpinner = (props: Partial<SpinnerProps> = {}) => {
  const { container } = render(<Spinner {...props} />);
  return { container, el: container.querySelector('[data-brkta-spinner]')! };
};

describe('Spinner', () => {
  describe('data attributes', () => {
    it('applies data-brkta-spinner', () => {
      const { el } = renderSpinner();
      expect(el).toHaveAttribute('data-brkta-spinner');
    });

    it('defaults size to "md"', () => {
      const { el } = renderSpinner();
      expect(el).toHaveAttribute('data-size', 'md');
    });

    it('applies custom size', () => {
      const { el } = renderSpinner({ size: 'lg' });
      expect(el).toHaveAttribute('data-size', 'lg');
    });
  });

  describe('accessibility', () => {
    it('has role="status"', () => {
      const { el } = renderSpinner();
      expect(el).toHaveAttribute('role', 'status');
    });

    it('has aria-label="Loading"', () => {
      const { el } = renderSpinner();
      expect(el).toHaveAttribute('aria-label', 'Loading');
    });

    it('renders screen-reader text', () => {
      renderSpinner();
      expect(screen.getByText('Loading', { selector: '.brkta-spinner-sr-label' })).toBeInTheDocument();
    });
  });
});
