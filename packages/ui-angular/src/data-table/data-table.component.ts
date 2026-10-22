import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { ButtonComponent } from '../button/button.component';
import type {
  DataTableRowAction,
  DataTableRowActionEvent,
  DataTableCellContext,
} from '@brkta/ui-core/data-table/data-table-contract';

@Component({
  selector: 'brkta-data-table', standalone: true, imports: [CheckboxComponent, ButtonComponent, NgTemplateOutlet],
  template: `
    <div>
      @if (selectionCount() > 0) { <p class="text-xs text-muted-foreground mb-2">{{ selectionCount() }} row(s) selected</p> }
      <table data-brkta-data-table="" [attr.data-dense]="dense ? '' : undefined">
        <thead data-brkta-data-table-header=""><tr>
          @if (selectable) {
            <th style="width:44px">
              <brkta-checkbox [checked]="isAllSelected()" [indeterminate]="isIndeterminate()" (checkedChange)="toggleAll()"></brkta-checkbox>
            </th>
          }
          @for (c of columns; track c.key) {
            <th [attr.data-sortable]="c.sortable ? '' : undefined"
              [attr.aria-sort]="sortCol===c.key ? (sortDir==='asc'?'ascending':'descending') : undefined"
              (click)="c.sortable && toggleSort(c.key)">{{c.label}} @if(sortCol===c.key){ {{sortDir==='asc'?' ↑':' ↓'}} }</th>
          }
          @if (hasActions()) { <th scope="col" data-brkta-data-table-actions-heading="">{{ rowActionsLabel }}</th> }
        </tr></thead>
        <tbody>
          @if (loading) { <tr><td [attr.colspan]="99"><div data-brkta-data-table-loading="">Loading...</div></td></tr> }
          @else if (sorted().length===0) { <tr><td [attr.colspan]="99"><div data-brkta-data-table-empty="">{{emptyText}}</div></td></tr> }
          @else {
            @for (row of sorted(); track rowId(row, $index); let i = $index) {
              <tr [attr.data-selected]="isSelected(row,i) ? '' : undefined">
                @if (selectable) {
                  <td>
                    <brkta-checkbox [checked]="isSelected(row,i)" (checkedChange)="toggleRow(row,i)"></brkta-checkbox>
                  </td>
                }
                @for (c of columns; track c.key) { <td>
                  @if (cellTemplates[c.key]; as cellTemplate) {
                    <ng-container [ngTemplateOutlet]="cellTemplate" [ngTemplateOutletContext]="{ $implicit: row, row: row, column: c, value: row[c.key] }" />
                  } @else { {{ $any(row)[c.key] ?? '' }} }
                </td> }
                @if (hasActions()) {
                  <td data-brkta-data-table-actions="">
                    <div data-brkta-data-table-action-list="">
                      @for (action of actionsFor(row); track action.id) {
                        <brkta-button
                          [variant]="action.variant ?? 'ghost'"
                          size="sm"
                          [loading]="actionLoading(action, row)"
                          [disabled]="actionDisabled(action, row)"
                          (click)="emitAction(action.id, row)"
                        >{{ action.label }}</brkta-button>
                      }
                    </div>
                  </td>
                }
              </tr>
            }
          }
        </tbody>
      </table>
    </div>`,
})
export class DataTableComponent {
  @Input() cellTemplates: Record<string, TemplateRef<DataTableCellContext & { $implicit: Record<string, unknown> }>> = {};
  @Input() columns: { key: string; label: string; sortable?: boolean }[] = [];
  @Input() rows: Record<string,unknown>[] = [];
  @Input() sortColumn?: string;
  @Input() sortDirection?: 'asc'|'desc';
  @Input() selectable = false;
  @Input() selectedIds: (string|number)[] | null = null;
  @Input() rowActionLabel?: string;
  @Input() rowActions: DataTableRowAction[] = [];
  @Input() rowActionsLabel = '';
  @Input() dense = false;
  @Input() emptyText = 'No data.';
  @Input() loading = false;
  @Output() sortChange = new EventEmitter<{column:string;direction:'asc'|'desc'}>();
  @Output() selectionChange = new EventEmitter<(string|number)[]>();
  @Output() onRowAction = new EventEmitter<Record<string,unknown>>();
  @Output() onRowActionEvent = new EventEmitter<DataTableRowActionEvent>();

  _internalSelected: (string|number)[] = [];
  sortCol = ''; sortDir: 'asc'|'desc' = 'asc';

  getInternal(): (string|number)[] { return this.selectedIds ?? this._internalSelected; }

  rowId(row: Record<string,unknown>, i: number): string|number { return (row['id'] as string|number) ?? i; }
  sorted() {
    if (!this.sortCol) return this.rows;
    return [...this.rows].sort((a,b)=>{
      const av = String((a as any)[this.sortCol] ?? ''), bv = String((b as any)[this.sortCol] ?? '');
      return this.sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
    });
  }
  isSelected(row: Record<string,unknown>, i: number): boolean {
    return this.getInternal().includes(this.rowId(row,i));
  }
  isAllSelected(): boolean {
    const s = this.sorted();
    return s.length > 0 && this.getInternal().length === s.length;
  }
  isIndeterminate(): boolean {
    const n = this.getInternal().length;
    return n > 0 && n < this.sorted().length;
  }
  selectionCount(): number { return this.getInternal().length; }

  hasActions(): boolean {
    return this.rowActions.length > 0 || !!this.rowActionLabel;
  }

  actionsFor(row: Record<string, unknown>): DataTableRowAction[] {
    if (this.rowActions.length > 0) {
      return this.rowActions.filter((action) => action.visible?.(row) ?? true);
    }
    return this.rowActionLabel
      ? [{ id: 'default', label: this.rowActionLabel, variant: 'ghost' }]
      : [];
  }

  actionLoading(action: DataTableRowAction, row: Record<string, unknown>): boolean {
    return action.loading?.(row) ?? false;
  }

  actionDisabled(action: DataTableRowAction, row: Record<string, unknown>): boolean {
    return action.disabled?.(row) ?? false;
  }

  emitAction(actionId: string, row: Record<string, unknown>): void {
    this.onRowActionEvent.emit({ actionId, row });
    if (actionId === 'default') this.onRowAction.emit(row);
  }

  toggleSort(col: string) {
    this.sortCol = col; this.sortDir = this.sortCol === col && this.sortDir === 'asc' ? 'desc' : 'asc';
    this.sortChange.emit({ column: col, direction: this.sortDir });
  }

  toggleRow(row: Record<string,unknown>, i: number) {
    const id = this.rowId(row,i);
    const cur = this.getInternal();
    const next = cur.includes(id) ? cur.filter(x => x !== id) : [...cur, id];
    if (this.selectedIds === null) this._internalSelected = next;
    this.selectionChange.emit(next);
  }

  toggleAll() {
    const s = this.sorted();
    const allIds = s.map((row,i) => this.rowId(row,i));
    const allSelected = allIds.every(id => this.getInternal().includes(id));
    const next = allSelected ? [] : allIds;
    if (this.selectedIds === null) this._internalSelected = next;
    this.selectionChange.emit(next);
  }
}
