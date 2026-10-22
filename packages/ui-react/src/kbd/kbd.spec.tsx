import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Kbd } from './kbd';

describe('Kbd', () => {
  it('renders keys text', () => {
    render(<Kbd keys="Ctrl+S" />);
    expect(screen.getByText('Ctrl+S')).toBeInTheDocument();
  });

  it('applies data-brkta-kbd', () => {
    render(<Kbd keys="Enter" />);
    expect(screen.getByText('Enter')).toHaveAttribute('data-brkta-kbd');
  });

  it('renders as <kbd> element', () => {
    render(<Kbd keys="Esc" />);
    expect(screen.getByText('Esc').tagName).toBe('KBD');
  });
});
