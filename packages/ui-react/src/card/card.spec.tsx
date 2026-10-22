import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card';

describe('Card', () => {
  describe('Card', () => {
    it('renders children', () => {
      render(<Card>Content</Card>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('applies data-brkta-card', () => {
      render(<Card>Content</Card>);
      expect(screen.getByText('Content')).toHaveAttribute('data-brkta-card');
    });

    it('defaults variant to "default"', () => {
      render(<Card>Content</Card>);
      expect(screen.getByText('Content')).toHaveAttribute('data-variant', 'default');
    });

    it('applies custom variant', () => {
      render(<Card variant="outlined">Content</Card>);
      expect(screen.getByText('Content')).toHaveAttribute('data-variant', 'outlined');
    });

    it('renders as a <div>', () => {
      render(<Card>Content</Card>);
      expect(screen.getByText('Content').tagName).toBe('DIV');
    });
  });

  describe('CardHeader', () => {
    it('renders children with data-brkta-card-header', () => {
      render(<CardHeader>Header</CardHeader>);
      const el = screen.getByText('Header');
      expect(el).toBeInTheDocument();
      expect(el).toHaveAttribute('data-brkta-card-header');
    });
  });

  describe('CardTitle', () => {
    it('renders children as <h3> with data-brkta-card-title', () => {
      render(<CardTitle>Title</CardTitle>);
      const el = screen.getByText('Title');
      expect(el.tagName).toBe('H3');
      expect(el).toHaveAttribute('data-brkta-card-title');
    });
  });

  describe('CardDescription', () => {
    it('renders children as <p> with data-brkta-card-description', () => {
      render(<CardDescription>Desc</CardDescription>);
      const el = screen.getByText('Desc');
      expect(el.tagName).toBe('P');
      expect(el).toHaveAttribute('data-brkta-card-description');
    });
  });

  describe('CardContent', () => {
    it('renders children with data-brkta-card-content', () => {
      render(<CardContent>Content</CardContent>);
      const el = screen.getByText('Content');
      expect(el).toHaveAttribute('data-brkta-card-content');
    });
  });

  describe('CardFooter', () => {
    it('renders children with data-brkta-card-footer', () => {
      render(<CardFooter>Footer</CardFooter>);
      const el = screen.getByText('Footer');
      expect(el).toHaveAttribute('data-brkta-card-footer');
    });
  });
});
