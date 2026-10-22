export interface TableColumn { key: string; label: string; }
export interface TableProps { columns: TableColumn[]; rows: Record<string, unknown>[]; variant?: 'default' | 'dense' | 'bordered'; }

export function Table({ columns, rows, variant = 'default' }: TableProps) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table data-brkta-table="" data-variant={variant}>
        <thead data-brkta-table-header="">
          <tr data-brkta-table-row="">{columns.map(c => <th key={c.key} data-brkta-table-cell="">{c.label}</th>)}</tr>
        </thead>
        <tbody data-brkta-table-body="">
          {rows.length === 0 ? (
            <tr data-brkta-table-row=""><td data-brkta-table-cell="" colSpan={columns.length} style={{ textAlign: 'center', color: 'var(--muted-foreground)' }}>No data</td></tr>
          ) : rows.map((row, i) => (
            <tr key={i} data-brkta-table-row="">{columns.map(c => <td key={c.key} data-brkta-table-cell="">{String(row[c.key] ?? '')}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
