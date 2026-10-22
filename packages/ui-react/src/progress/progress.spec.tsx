import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Progress, type ProgressProps } from './progress';

const renderProgress = (props: ProgressProps) => {
  const { container } = render(<Progress {...props} />);
  return {
    container,
    el: container.querySelector('[data-brkta-progress]')!,
    indicator: container.querySelector('[data-brkta-progress-indicator]')!,
  };
};

describe('Progress', () => {
  describe('data attributes', () => {
    it('applies data-brkta-progress', () => {
      const { el } = renderProgress({ value: 50 });
      expect(el).toHaveAttribute('data-brkta-progress');
    });

    it('defaults size to "md"', () => {
      const { el } = renderProgress({ value: 50 });
      expect(el).toHaveAttribute('data-size', 'md');
    });

    it('applies custom size', () => {
      const { el } = renderProgress({ value: 50, size: 'lg' });
      expect(el).toHaveAttribute('data-size', 'lg');
    });
  });

  describe('accessibility', () => {
    it('has role="progressbar"', () => {
      const { el } = renderProgress({ value: 50 });
      expect(el).toHaveAttribute('role', 'progressbar');
    });

    it('sets aria-valuenow, min, and max', () => {
      const { el } = renderProgress({ value: 75, max: 200 });
      expect(el.getAttribute('aria-valuenow')).toBe('75');
      expect(el.getAttribute('aria-valuemin')).toBe('0');
      expect(el.getAttribute('aria-valuemax')).toBe('200');
    });

    it('defaults max to 100', () => {
      const { el } = renderProgress({ value: 50 });
      expect(el.getAttribute('aria-valuemax')).toBe('100');
    });

    it('sets aria-label to percentage', () => {
      const { el } = renderProgress({ value: 50 });
      expect(el.getAttribute('aria-label')).toBe('50%');
    });

    it('clamps aria-label to 100% when value > max', () => {
      const { el } = renderProgress({ value: 150 });
      expect(el.getAttribute('aria-label')).toBe('100%');
    });

    it('clamps aria-label to 0% when value < 0', () => {
      const { el } = renderProgress({ value: -10 });
      expect(el.getAttribute('aria-label')).toBe('0%');
    });
  });

  describe('indicator bar', () => {
    it('renders indicator with correct width', () => {
      const { indicator } = renderProgress({ value: 42, max: 100 });
      expect(indicator).toBeInTheDocument();
      expect(indicator.style.width).toBe('42%');
    });

    it('clamps indicator width to 100%', () => {
      const { indicator } = renderProgress({ value: 200 });
      expect(indicator.style.width).toBe('100%');
    });

    it('clamps indicator width to 0%', () => {
      const { indicator } = renderProgress({ value: -5 });
      expect(indicator.style.width).toBe('0%');
    });
  });
});
