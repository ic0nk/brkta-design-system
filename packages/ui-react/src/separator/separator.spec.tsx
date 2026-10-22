import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Separator, type SeparatorProps } from './separator';

const renderSeparator = (props: Partial<SeparatorProps> = {}) => {
  const { container } = render(<Separator {...props} />);
  return { container, el: container.querySelector('[data-brkta-separator]')! };
};

describe('Separator', () => {
  describe('data attributes', () => {
    it('applies data-brkta-separator', () => {
      const { el } = renderSeparator();
      expect(el).toHaveAttribute('data-brkta-separator');
    });

    it('defaults orientation to "horizontal"', () => {
      const { el } = renderSeparator();
      expect(el).toHaveAttribute('data-orientation', 'horizontal');
    });

    it('applies vertical orientation', () => {
      const { el } = renderSeparator({ orientation: 'vertical' });
      expect(el).toHaveAttribute('data-orientation', 'vertical');
    });
  });

  describe('ARIA', () => {
    it('has role="separator"', () => {
      const { el } = renderSeparator();
      expect(el).toHaveAttribute('role', 'separator');
    });

    it('sets aria-orientation to horizontal by default', () => {
      const { el } = renderSeparator();
      expect(el).toHaveAttribute('aria-orientation', 'horizontal');
    });

    it('sets aria-orientation to vertical', () => {
      const { el } = renderSeparator({ orientation: 'vertical' });
      expect(el).toHaveAttribute('aria-orientation', 'vertical');
    });
  });
});
