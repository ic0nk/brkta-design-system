import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './pagination';

describe('Pagination', () => {
  it('renders page buttons', () => { render(<Pagination current={1} total={5} />); expect(screen.getByText('1')).toBeTruthy(); expect(screen.getByText('5')).toBeTruthy(); });
  it('marks current page as active', () => { render(<Pagination current={3} total={5} />); expect(screen.getByText('3').getAttribute('data-active')).toBe('true'); });
  it('disables previous when on first page', () => { render(<Pagination current={1} total={5} />); expect(screen.getByLabelText('Previous').hasAttribute('data-disabled')).toBe(true); });
  it('disables next when on last page', () => { render(<Pagination current={5} total={5} />); expect(screen.getByLabelText('Next').hasAttribute('data-disabled')).toBe(true); });
  it('fires onPageChange on next click', () => { let page = 1; render(<Pagination current={page} total={5} onPageChange={p => page = p} />); fireEvent.click(screen.getByLabelText('Next')); expect(page).toBe(2); });
  it('has aria-label Pagination', () => { render(<Pagination current={1} total={3} />); expect(screen.getByRole('navigation').getAttribute('aria-label')).toBe('Pagination'); });
});
