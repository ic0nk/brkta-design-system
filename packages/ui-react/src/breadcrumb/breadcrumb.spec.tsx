import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Breadcrumb } from './breadcrumb';

const items = [{ label: 'Home', href: '/' }, { label: 'Library', href: '/lib' }, { label: 'Data', current: true }];

describe('Breadcrumb', () => {
  it('renders all items', () => { render(<Breadcrumb items={items} />); expect(screen.getByText('Home')).toBeTruthy(); expect(screen.getByText('Data')).toBeTruthy(); });
  it('has aria-label Breadcrumb', () => { render(<Breadcrumb items={items} />); expect(screen.getByRole('navigation').getAttribute('aria-label')).toBe('Breadcrumb'); });
  it('marks current page with aria-current', () => { render(<Breadcrumb items={items} />); expect(screen.getByText('Data').getAttribute('aria-current')).toBe('page'); });
  it('has data-brkta-breadcrumb wrapper', () => { const { container } = render(<Breadcrumb items={items} />); expect(container.querySelector('[data-brkta-breadcrumb]')).toBeTruthy(); });
  it('renders separators', () => { const { container } = render(<Breadcrumb items={items} />); expect(container.querySelectorAll('[data-brkta-breadcrumb-separator]').length).toBe(2); });
});
