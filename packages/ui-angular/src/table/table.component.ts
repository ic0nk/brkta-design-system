import { Component, Input } from '@angular/core';

interface TableColumn { key: string; label: string; }

@Component({
  selector: 'brkta-table',
  standalone: true,
  template: `
    <div style="overflow-x:auto">
      <table data-brkta-table="" [attr.data-variant]="variant">
        <thead data-brkta-table-header="">
          <tr data-brkta-table-row="">
            @for (col of columns; track col.key) { <th data-brkta-table-cell="">{{ col.label }}</th> }
          </tr>
        </thead>
        <tbody data-brkta-table-body="">
          @if (rows.length === 0) {
            <tr data-brkta-table-row=""><td data-brkta-table-cell="" [attr.colspan]="columns.length" style="text-align:center;color:var(--muted-foreground)">No data</td></tr>
          } @else {
            @for (row of rows; track $index) {
              <tr data-brkta-table-row="">
                @for (col of columns; track col.key) { <td data-brkta-table-cell="">{{ $any(row)[col.key] ?? '' }}</td> }
              </tr>
            }
          }
        </tbody>
      </table>
    </div>
  `,
})
export class TableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() rows: Record<string, unknown>[] = [];
  @Input() variant: 'default' | 'dense' | 'bordered' = 'default';
}
