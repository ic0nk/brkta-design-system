'use client';
import { useState, type ReactNode } from 'react';
import { Checkbox } from '../checkbox/checkbox';
import { Button } from '../button/button';
import type {
  DataTableContract,
  DataTableRowAction,
  DataTableCellContext,
} from '@brkta/ui-core/data-table/data-table-contract';

export type { DataTableColumn, DataTableRow } from '@brkta/ui-core/data-table/data-table-contract';
export type { DataTableRowAction, DataTableRowActionEvent } from '@brkta/ui-core/data-table/data-table-contract';

export function DataTable({
  columns, rows, sortColumn, sortDirection, selectable, selectedIds: controlledIds,
  rowActionLabel, rowActions = [], rowActionsLabel = '', dense, emptyText = 'No data.', loading,
  onSortChange, onSelectionChange, onRowAction, onRowActionEvent, cellTemplates = {},
}: DataTableContract<(context: DataTableCellContext) => ReactNode>) {
  const [sortCol, setSortCol] = useState(sortColumn ?? '');
  const [sortDir, setSortDir] = useState<'asc'|'desc'>(sortDirection ?? 'asc');
  const [internalSelected, setInternalSelected] = useState<(string|number)[]>([]);
  const selectedIds = controlledIds ?? internalSelected;

  const toggleSort = (col: string) => {
    const nextDir = sortCol === col && sortDir === 'asc' ? 'desc' : 'asc';
    setSortCol(col); setSortDir(nextDir); onSortChange?.(col, nextDir);
  };

  const sorted = [...rows].sort((a, b) => {
    if (!sortCol) return 0;
    const av = String(a[sortCol] ?? ''), bv = String(b[sortCol] ?? '');
    return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
  });

  const getRowId = (row: Record<string, unknown>, i: number): string|number => (row.id as string|number) ?? i;
  const allIds = sorted.map((row,i) => getRowId(row,i));
  const someSelected = selectedIds.length > 0 && selectedIds.length < sorted.length;
  const allSelected = sorted.length > 0 && selectedIds.length === sorted.length;
  const effectiveActions: DataTableRowAction[] = rowActions.length > 0
    ? rowActions
    : rowActionLabel
      ? [{ id: 'default', label: rowActionLabel, variant: 'ghost' }]
      : [];

  const toggleRow = (id: string|number) => {
    const next = selectedIds.includes(id) ? selectedIds.filter(i => i !== id) : [...selectedIds, id];
    if (onSelectionChange) onSelectionChange(next);
    else setInternalSelected(next);
  };

  const toggleAll = () => {
    const next = allSelected ? [] : allIds;
    if (onSelectionChange) onSelectionChange(next);
    else setInternalSelected(next);
  };

  return (
    <div>
      {selectedIds.length > 0 && <p className="text-xs text-muted-foreground mb-2">{selectedIds.length} row(s) selected</p>}
      <table data-brkta-data-table="" data-dense={dense ? '' : undefined}>
        <thead data-brkta-data-table-header=""><tr>
          {selectable && (
            <th style={{width:44}}>
              <Checkbox checked={allSelected} indeterminate={someSelected} onChange={toggleAll} />
            </th>
          )}
          {columns.map(c => (
            <th key={c.key} data-sortable={c.sortable ? '' : undefined}
              aria-sort={sortCol===c.key ? (sortDir==='asc'?'ascending':'descending') : undefined}
              onClick={() => c.sortable && toggleSort(c.key)}>
              {c.label} {sortCol===c.key && (sortDir==='asc'?' ↑':' ↓')}
            </th>
          ))}
          {effectiveActions.length > 0 && <th scope="col" data-brkta-data-table-actions-heading="">{rowActionsLabel}</th>}
        </tr></thead>
        <tbody>
          {loading ? <tr><td colSpan={99}><div data-brkta-data-table-loading="">Loading...</div></td></tr> :
           sorted.length===0 ? <tr><td colSpan={99}><div data-brkta-data-table-empty="">{emptyText}</div></td></tr> :
           sorted.map((row, i) => {
             const rid = getRowId(row,i);
             return (
               <tr key={rid} data-selected={selectedIds.includes(rid) ? '' : undefined}>
                 {selectable && (
                   <td>
                     <Checkbox checked={selectedIds.includes(rid)} onChange={() => toggleRow(rid)} />
                   </td>
                 )}
                 {columns.map(c => <td key={c.key}>{cellTemplates[c.key]
                   ? cellTemplates[c.key]({ row, column: c, value: row[c.key] }) : String(row[c.key] ?? '')}</td>)}
                 {effectiveActions.length > 0 && (
                   <td data-brkta-data-table-actions="">
                     <div data-brkta-data-table-action-list="">
                       {effectiveActions.filter(action => action.visible?.(row) ?? true).map(action => (
                         <Button
                           key={action.id}
                           variant={action.variant ?? 'ghost'}
                           size="sm"
                           loading={action.loading?.(row) ?? false}
                           disabled={action.disabled?.(row) ?? false}
                           onClick={() => {
                             onRowActionEvent?.({ actionId: action.id, row });
                             if (action.id === 'default') onRowAction?.(row);
                           }}
                         >{action.label}</Button>
                       ))}
                     </div>
                   </td>
                 )}
               </tr>
             );
           })}
        </tbody>
      </table>
    </div>
  );
}
