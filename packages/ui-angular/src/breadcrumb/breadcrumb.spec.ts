import { ComponentFixture, TestBed } from '@angular/core/testing'; import { BreadcrumbComponent } from './breadcrumb.component';
const items = [{ label: 'Home', href: '/' }, { label: 'Library', href: '/lib' }, { label: 'Data', current: true }];
describe('BreadcrumbComponent', () => {
  let c: BreadcrumbComponent; let f: ComponentFixture<BreadcrumbComponent>;
  beforeEach(async () => { await TestBed.configureTestingModule({ imports: [BreadcrumbComponent] }).compileComponents(); f = TestBed.createComponent(BreadcrumbComponent); c = f.componentInstance; f.componentRef.setInput('items', items); f.detectChanges(); });
  it('should create', () => expect(c).toBeTruthy());
  it('should render items', () => { expect(f.nativeElement.textContent).toContain('Home'); expect(f.nativeElement.textContent).toContain('Data'); });
  it('should have aria-label', () => { expect(f.nativeElement.querySelector('[aria-label="Breadcrumb"]')).toBeTruthy(); });
  it('should mark current with aria-current', () => { expect(f.nativeElement.querySelector('[aria-current="page"]')?.textContent).toContain('Data'); });
  it('should have data-brkta-breadcrumb', () => { expect(f.nativeElement.querySelector('[data-brkta-breadcrumb]')).toBeTruthy(); });
});
