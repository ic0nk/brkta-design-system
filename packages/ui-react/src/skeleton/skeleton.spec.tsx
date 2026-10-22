import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Skeleton, type SkeletonProps } from './skeleton';

const renderSkeleton = (props: Partial<SkeletonProps> = {}) => {
  const { container } = render(<Skeleton {...props} />);
  return { container, el: container.querySelector('[data-brkta-skeleton]')! };
};

describe('Skeleton', () => {
  describe('data attributes', () => {
    it('applies data-brkta-skeleton', () => {
      const { el } = renderSkeleton();
      expect(el).toHaveAttribute('data-brkta-skeleton');
    });

    it('defaults variant to "text"', () => {
      const { el } = renderSkeleton();
      expect(el).toHaveAttribute('data-variant', 'text');
    });

    it('applies custom variant', () => {
      const { el } = renderSkeleton({ variant: 'card' });
      expect(el).toHaveAttribute('data-variant', 'card');
    });
  });

  describe('width / height', () => {
    it('applies width via inline style', () => {
      const { el } = renderSkeleton({ width: '75%' });
      expect(el.style.width).toBe('75%');
    });

    it('applies height via inline style', () => {
      const { el } = renderSkeleton({ style: { height: '24px' } });
      expect(el.style.height).toBe('24px');
    });

    it('merges width with custom style', () => {
      const { el } = renderSkeleton({ width: '50%', style: { opacity: '0.5' } });
      expect(el.style.width).toBe('50%');
      expect(el.style.opacity).toBe('0.5');
    });
  });

  describe('accessibility', () => {
    it('has aria-hidden="true"', () => {
      const { el } = renderSkeleton();
      expect(el.getAttribute('aria-hidden')).toBe('true');
    });
  });
});
