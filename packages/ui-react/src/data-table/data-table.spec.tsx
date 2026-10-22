import { describe, it, expect } from 'vitest'; import { render, fireEvent } from '@testing-library/react';
import { DataTable } from './data-table';
import { Badge } from '../badge/badge';
const cols = [{key:'name',label:'Name',sortable:true},{key:'role',label:'Role'}];
const rows = [{name:'Alice',role:'Admin'},{name:'Bob',role:'Editor'}];

describe('DataTable',()=>{
  it('renders governed cell templates with row/column/value and preserves plain cells',()=>{
    const {container}=render(<DataTable columns={cols} rows={rows} cellTemplates={{role:({row,column,value})=><Badge>{`${row.name}: ${value} (${column.key})`}</Badge>}}/>);
    const cells=container.querySelectorAll('tbody tr:first-child td');
    expect(cells[0].textContent).toBe('Alice');
    expect(cells[1].querySelector('[data-brkta-badge]')?.textContent).toBe('Alice: Admin (role)');
  });
  it('renders columns and rows',()=>{const{container}=render(<DataTable columns={cols} rows={rows}/>);expect(container.querySelector('table')).toBeTruthy();expect(container.textContent).toContain('Name');expect(container.textContent).toContain('Alice');});
  it('uses the governed header surface hook',()=>{const{container}=render(<DataTable columns={cols} rows={rows}/>);expect(container.querySelector('[data-brkta-data-table-header]')).toBeTruthy();});
  it('shows sortable header',()=>{const{container}=render(<DataTable columns={cols} rows={rows}/>);expect(container.querySelector('[data-sortable]')).toBeTruthy();});
  it('sorts on header click',()=>{const{container}=render(<DataTable columns={cols} rows={rows}/>);fireEvent.click(container.querySelector('[data-sortable]')!);expect(container.querySelector('[aria-sort]')).toBeTruthy();});
  it('renders empty state',()=>{const{container}=render(<DataTable columns={cols} rows={[]}/>);expect(container.textContent).toContain('No data.');});
  it('renders loading state',()=>{const{container}=render(<DataTable columns={cols} rows={[]} loading/>);expect(container.textContent).toContain('Loading');});
  it('renders row actions',()=>{const{container}=render(<DataTable columns={cols} rows={rows} rowActionLabel="Edit"/>);expect(container.textContent).toContain('Edit');});
  it('renders multiple governed actions per matching row and emits action id with row',()=>{
    const events: Array<{ actionId: string; row: Record<string, unknown> }> = [];
    const { container } = render(<DataTable
      columns={cols}
      rows={rows}
      rowActions={[
        { id: 'edit', label: 'Edit', variant: 'ghost', disabled: (row) => row.name === 'Bob' },
        { id: 'archive', label: 'Archive', variant: 'destructive', visible: (row) => row.name === 'Alice' },
      ]}
      rowActionsLabel="Actions"
      onRowActionEvent={(event) => events.push(event)}
    />);
    expect(container.querySelector('[data-brkta-data-table-actions-heading]')?.textContent).toBe('Actions');
    const actionCells = Array.from(container.querySelectorAll('[data-brkta-data-table-actions]'));
    expect(actionCells).toHaveLength(2);
    expect(actionCells[0].querySelectorAll('[data-brkta-button]')).toHaveLength(2);
    expect(actionCells[1].querySelectorAll('[data-brkta-button]')).toHaveLength(1);
    expect(actionCells[1].querySelector('[data-brkta-button]')).toBeDisabled();
    fireEvent.click(actionCells[0].querySelectorAll('[data-brkta-button]')[1]);
    expect(events).toEqual([{ actionId: 'archive', row: rows[0] }]);
  });
  it('supports selection',()=>{const{container}=render(<DataTable columns={cols} rows={rows} selectable/>);expect(container.querySelector('input[type="checkbox"]')).toBeTruthy();});
});
