import { describe,it,expect,beforeEach } from 'vitest';import { ComponentFixture,TestBed } from '@angular/core/testing';import { DataTableComponent } from './data-table.component';
describe('DataTableComponent',()=>{let f:ComponentFixture<DataTableComponent>;let c:DataTableComponent;
  const cols = [{key:'name',label:'Name',sortable:true},{key:'role',label:'Role'}];
  const rows = [{name:'Alice'},{name:'Bob'},{name:'Carol'}];
  beforeEach(async()=>{await TestBed.configureTestingModule({imports:[DataTableComponent]}).compileComponents();f=TestBed.createComponent(DataTableComponent);c=f.componentInstance;f.componentRef.setInput('columns',cols);f.componentRef.setInput('rows',rows);f.componentRef.setInput('selectable',true);f.detectChanges();});
  it('renders table',()=>{expect(f.nativeElement.querySelector('table')).toBeTruthy();});
  it('renders header row',()=>{expect(f.nativeElement.querySelectorAll('th').length).toBe(3);}); // name, role, checkbox
  it('uses the governed header surface hook',()=>{expect(f.nativeElement.querySelector('[data-brkta-data-table-header]')).toBeTruthy();});
  it('renders all data rows',()=>{expect(f.nativeElement.querySelectorAll('tbody tr').length).toBe(3);});
  it('shows empty state',()=>{f.componentRef.setInput('rows',[]);f.detectChanges();expect(f.nativeElement.textContent).toContain('No data.');});
  it('shows loading state',()=>{f.componentRef.setInput('loading',true);f.detectChanges();expect(f.nativeElement.textContent).toContain('Loading');});
  it('shows sortable header',()=>{expect(f.nativeElement.querySelector('[data-sortable]')).toBeTruthy();});
  it('renders multiple governed actions per matching row and emits action id with row',()=>{
    const events: Array<{ actionId: string; row: Record<string, unknown> }> = [];
    c.onRowActionEvent.subscribe((event)=>events.push(event));
    f.componentRef.setInput('rowActions',[
      { id:'edit', label:'Edit', variant:'ghost' as const, disabled:(row: Record<string, unknown>)=>row['name']==='Bob' },
      { id:'archive', label:'Archive', variant:'destructive' as const, visible:(row: Record<string, unknown>)=>row['name']==='Alice' },
    ]);
    f.componentRef.setInput('rowActionsLabel','Actions');
    f.detectChanges();
    expect(f.nativeElement.querySelector('[data-brkta-data-table-actions-heading]').textContent).toContain('Actions');
    const cells = f.nativeElement.querySelectorAll('[data-brkta-data-table-actions]');
    expect(cells.length).toBe(3);
    expect(cells[0].querySelectorAll('brkta-button').length).toBe(2);
    expect(cells[1].querySelectorAll('brkta-button').length).toBe(1);
    expect((cells[1].querySelector('brkta-button button') as HTMLButtonElement).disabled).toBe(true);
    (cells[0].querySelector('brkta-button button') as HTMLButtonElement).click();
    expect(events[0].actionId).toBe('edit');
    expect(events[0].row['name']).toBe('Alice');
  });

  describe('selection',()=>{
    it('select all via toggleAll',()=>{
      c.toggleAll();
      expect(c._internalSelected.length).toBe(3);
      expect(c.isAllSelected()).toBe(true);
      expect(c.isIndeterminate()).toBe(false);
    });
    it('deselect all after selecting all',()=>{
      c.toggleAll(); // select all
      c.toggleAll(); // deselect all
      expect(c._internalSelected.length).toBe(0);
      expect(c.isAllSelected()).toBe(false);
      expect(c.isIndeterminate()).toBe(false);
    });
    it('indeterminate when only some selected',()=>{
      c.toggleRow(rows[0],0); // select only first
      expect(c._internalSelected.length).toBe(1);
      expect(c.isAllSelected()).toBe(false);
      expect(c.isIndeterminate()).toBe(true);
    });
    it('toggleRow selects and deselects',()=>{
      c.toggleRow(rows[0],0);
      expect(c._internalSelected).toContain(0);
      c.toggleRow(rows[0],0);
      expect(c._internalSelected).not.toContain(0);
    });
    it('selection count updates',()=>{
      c.toggleRow(rows[0],0);
      c.toggleRow(rows[1],1);
      expect(c.selectionCount()).toBe(2);
    });
    it('toggleAll selects all and after deselect counts correctly',()=>{
      c.toggleAll();
      expect(c.selectionCount()).toBe(3);
      c.toggleAll();
      expect(c.selectionCount()).toBe(0);
    });
  });
});
