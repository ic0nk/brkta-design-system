import { ComponentFixture, TestBed } from '@angular/core/testing'; import { PaginationComponent } from './pagination.component';
describe('PaginationComponent', () => {
  let c: PaginationComponent; let f: ComponentFixture<PaginationComponent>;
  beforeEach(async () => { await TestBed.configureTestingModule({ imports: [PaginationComponent] }).compileComponents(); f = TestBed.createComponent(PaginationComponent); c = f.componentInstance; f.componentRef.setInput('current', 3); f.componentRef.setInput('total', 10); f.detectChanges(); });
  it('should create', () => expect(c).toBeTruthy());
  it('should mark current active', () => { expect(f.nativeElement.querySelector('[data-active="true"]')?.textContent).toBe('3'); });
  it('should disable previous on first page', () => { f.componentRef.setInput('current', 1); f.detectChanges(); expect(f.nativeElement.querySelector('[aria-label="Previous"]')?.hasAttribute('data-disabled')).toBe(true); });
  it('should emit pageChange on next', () => { let page = 0; c.pageChange.subscribe(p => page = p); (f.nativeElement.querySelector('[aria-label="Next"]') as HTMLElement).click(); expect(page).toBe(4); });
  it('should have aria-label', () => { expect(f.nativeElement.querySelector('[aria-label="Pagination"]')).toBeTruthy(); });
});
