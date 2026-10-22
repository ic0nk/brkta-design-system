import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { DataTableComponent } from './data-table.component';
import { BadgeComponent } from '../badge/badge.component';

@Component({ standalone: true, imports: [DataTableComponent, BadgeComponent], template: `
  <ng-template #badge let-row let-value="value" let-column="column"><brkta-badge>{{row.name}}: {{value}} ({{column.key}})</brkta-badge></ng-template>
  <brkta-data-table [columns]="columns" [rows]="rows" [cellTemplates]="{ status: badge }" />` })
class Host {
  columns = [{ key: 'name', label: 'Name' }, { key: 'status', label: 'Status' }];
  rows = [{ id: 1, name: 'Synthetic', status: 'Ready' }];
}
describe('DataTable cell templates', () => {
  it('projects governed content with row/column/value and retains ordinary text cells', () => {
    const fixture = TestBed.createComponent(Host); fixture.detectChanges();
    const cells = fixture.nativeElement.querySelectorAll('tbody td');
    expect(cells[0].textContent.trim()).toBe('Synthetic');
    expect(cells[1].querySelector('[data-brkta-badge]').textContent).toContain('Synthetic: Ready (status)');
  });
});
