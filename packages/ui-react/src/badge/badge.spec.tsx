import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge, type BadgeProps } from './badge';

const renderBadge = (props: Partial<BadgeProps> = {}) =>
  render(<Badge {...props}>Badge</Badge>);

describe('Badge', () => {
  it('renders children', () => {
    renderBadge();
    expect(screen.getByText('Badge')).toBeInTheDocument();
  });

  describe('data attributes', () => {
    it('applies data-brkta-badge', () => {
      renderBadge();
      expect(screen.getByText('Badge')).toHaveAttribute('data-brkta-badge');
    });

    it('defaults variant to "default" and size to "md"', () => {
      renderBadge();
      const el = screen.getByText('Badge');
      expect(el).toHaveAttribute('data-variant', 'default');
      expect(el).toHaveAttribute('data-size', 'md');
    });

    it('applies custom variant', () => {
      renderBadge({ variant: 'destructive' });
      expect(screen.getByText('Badge')).toHaveAttribute('data-variant', 'destructive');
    });

    it('applies custom size', () => {
      renderBadge({ size: 'lg' });
      expect(screen.getByText('Badge')).toHaveAttribute('data-size', 'lg');
    });
  });

  it('renders as a <span>', () => {
    renderBadge();
    expect(screen.getByText('Badge').tagName).toBe('SPAN');
  });
});
