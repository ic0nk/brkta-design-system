import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DropdownMenu, type DropdownMenuEntry } from './dropdown-menu';

const sampleItems: DropdownMenuEntry[] = [
  { label: 'Edit', value: 'edit', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg> },
  { label: 'Duplicate', value: 'duplicate', shortcut: '⌘D' },
  { type: 'separator' },
  { label: 'Delete', value: 'delete', destructive: true },
  { label: 'Archive', value: 'archive', disabled: true },
];

describe('DropdownMenu', () => {
  it('renders trigger', () => {
    render(<DropdownMenu items={sampleItems} trigger="Actions" />);
    expect(screen.getByText('Actions')).toBeTruthy();
  });

  it('renders default trigger when none provided', () => {
    render(<DropdownMenu items={sampleItems} />);
    expect(screen.getByText('Menu ▾')).toBeTruthy();
  });

  it('opens menu on trigger click', async () => {
    render(<DropdownMenu items={sampleItems} />);
    await userEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('menu')).toBeTruthy();
  });

  it('closes on Escape', async () => {
    render(<DropdownMenu items={sampleItems} />);
    await userEvent.click(screen.getByRole('button'));
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('menu')).toBeNull());
  });

  it('ArrowDown navigates items', async () => {
    render(<DropdownMenu items={sampleItems} />);
    await userEvent.click(screen.getByRole('button'));
    const menu = screen.getByRole('menu');
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    fireEvent.keyDown(menu, { key: 'ArrowDown' }); // moves to Duplicate
    const items = screen.getAllByRole('menuitem');
    expect(items[1].hasAttribute('data-active')).toBe(true);
  });

  it('Enter selects item and closes', async () => {
    let selected = '';
    render(<DropdownMenu items={sampleItems} onItemSelect={(v) => { selected = v; }} />);
    await userEvent.click(screen.getByRole('button'));
    const menu = screen.getByRole('menu');
    fireEvent.keyDown(menu, { key: 'ArrowDown' }); // move to Edit (index 0)
    fireEvent.keyDown(menu, { key: 'Enter' });
    expect(selected).toBe('edit');
    await waitFor(() => expect(screen.queryByRole('menu')).toBeNull());
  });

  it('does not select disabled item', async () => {
    render(<DropdownMenu items={sampleItems} />);
    await userEvent.click(screen.getByRole('button'));
    const archive = screen.getByRole('menuitem', { name: /Archive/ });
    await userEvent.click(archive);
    expect(screen.getByRole('menu')).toBeTruthy(); // still open
  });

  it('renders separator', async () => {
    render(<DropdownMenu items={sampleItems} />);
    await userEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('separator')).toBeTruthy();
  });

  it('destructive item has data-destructive', async () => {
    render(<DropdownMenu items={sampleItems} />);
    await userEvent.click(screen.getByRole('button'));
    const del = screen.getByRole('menuitem', { name: /Delete/ });
    expect(del.hasAttribute('data-destructive')).toBe(true);
  });

  it('sets aria-expanded on trigger', async () => {
    render(<DropdownMenu items={sampleItems} />);
    const trigger = screen.getByRole('button');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    await userEvent.click(trigger);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });

  it('click outside closes', async () => {
    render(<DropdownMenu items={sampleItems} />);
    await userEvent.click(screen.getByRole('button'));
    await userEvent.click(document.body);
    await waitFor(() => expect(screen.queryByRole('menu')).toBeNull());
  });

  it('data-brkta-dropdown-menu on wrapper', () => {
    const { container } = render(<DropdownMenu items={sampleItems} />);
    expect(container.querySelector('[data-brkta-dropdown-menu]')).toBeTruthy();
  });
});
