import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Table } from './table';

const cols = [{ key: 'name', label: 'Name' }, { key: 'age', label: 'Age' }];
const rows = [{ name: 'Alice', age: 30 }, { name: 'Bob', age: 25 }];

describe('Table', () => {
  it('renders columns', () => { render(<Table columns={cols} rows={rows} />); expect(screen.getByText('Name')).toBeTruthy(); expect(screen.getByText('Age')).toBeTruthy(); });
  it('renders rows', () => { render(<Table columns={cols} rows={rows} />); expect(screen.getByText('Alice')).toBeTruthy(); });
  it('shows empty message with no rows', () => { render(<Table columns={cols} rows={[]} />); expect(screen.getByText('No data')).toBeTruthy(); });
  it('sets default variant', () => { const { container } = render(<Table columns={cols} rows={rows} />); expect(container.querySelector('[data-variant="default"]')).toBeTruthy(); });
  it('supports dense variant', () => { const { container } = render(<Table columns={cols} rows={rows} variant="dense" />); expect(container.querySelector('[data-variant="dense"]')).toBeTruthy(); });
  it('has data-brkta-table', () => { const { container } = render(<Table columns={cols} rows={rows} />); expect(container.querySelector('[data-brkta-table]')).toBeTruthy(); });
});
