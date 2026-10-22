import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EmptyState } from './empty-state';

describe('EmptyState', () => {
  it('renders title', () => { render(<EmptyState title="No items found" />); expect(screen.getByText('No items found')).toBeTruthy(); });
  it('renders description', () => { render(<EmptyState title="No items" description="Try adding some." />); expect(screen.getByText('Try adding some.')).toBeTruthy(); });
  it('renders action', () => { render(<EmptyState title="Empty" action={<button>Add</button>} />); expect(screen.getByText('Add')).toBeTruthy(); });
  it('defaults to default variant', () => { const { container } = render(<EmptyState title="T" />); expect(container.querySelector('[data-brkta-empty]')).toBeTruthy(); });
  it('supports compact variant', () => { const { container } = render(<EmptyState title="T" variant="compact" />); expect(container.querySelector('[data-variant="compact"]')).toBeTruthy(); });
});
