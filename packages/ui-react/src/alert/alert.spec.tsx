import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Alert, AlertTitle, AlertDescription } from './alert';

describe('Alert', () => {
  describe('Alert', () => {
    it('renders children', () => {
      render(<Alert>Content</Alert>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('applies data-brkta-alert', () => {
      render(<Alert>Content</Alert>);
      expect(screen.getByText('Content')).toHaveAttribute('data-brkta-alert');
    });

    it('defaults variant to "information"', () => {
      render(<Alert>Content</Alert>);
      expect(screen.getByText('Content')).toHaveAttribute('data-variant', 'information');
    });

    it('applies custom variant', () => {
      render(<Alert variant="destructive">Content</Alert>);
      expect(screen.getByText('Content')).toHaveAttribute('data-variant', 'destructive');
    });

    it('has role="alert"', () => {
      render(<Alert>Content</Alert>);
      expect(screen.getByText('Content')).toHaveAttribute('role', 'alert');
    });
  });

  describe('AlertTitle', () => {
    it('renders children as <h5> with data-brkta-alert-title', () => {
      render(<AlertTitle>Title</AlertTitle>);
      const el = screen.getByText('Title');
      expect(el.tagName).toBe('H5');
      expect(el).toHaveAttribute('data-brkta-alert-title');
    });
  });

  describe('AlertDescription', () => {
    it('renders children with data-brkta-alert-description', () => {
      render(<AlertDescription>Desc</AlertDescription>);
      const el = screen.getByText('Desc');
      expect(el).toHaveAttribute('data-brkta-alert-description');
    });
  });
});
