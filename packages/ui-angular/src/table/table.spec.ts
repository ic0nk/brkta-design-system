import { ComponentFixture, TestBed } from '@angular/core/testing'; import { TableComponent } from './table.component';
const cols = [{ key: 'name', label: 'Name' }, { key: 'age', label: 'Age' }];
const rows = [{ name: 'Alice', age: 30 }];
describe('TableComponent', () => {
  let c: TableComponent; let f: ComponentFixture<TableComponent>;
  beforeEach(async () => { await TestBed.configureTestingModule({ imports: [TableComponent] }).compileComponents(); f = TestBed.createComponent(TableComponent); c = f.componentInstance; f.componentRef.setInput('columns', cols); f.componentRef.setInput('rows', rows); f.detectChanges(); });
  it('should create', () => expect(c).toBeTruthy());
  it('should render columns', () => { expect(f.nativeElement.textContent).toContain('Name'); });
  it('should render rows', () => { expect(f.nativeElement.textContent).toContain('Alice'); });
  it('should show empty message', () => { f.componentRef.setInput('rows', []); f.detectChanges(); expect(f.nativeElement.textContent).toContain('No data'); });
  it('should have data-brkta-table', () => { expect(f.nativeElement.querySelector('[data-brkta-table]')).toBeTruthy(); });
});
