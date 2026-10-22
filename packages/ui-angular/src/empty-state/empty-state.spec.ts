import { ComponentFixture, TestBed } from '@angular/core/testing'; import { EmptyStateComponent } from './empty-state.component';
describe('EmptyStateComponent', () => {
  let c: EmptyStateComponent; let f: ComponentFixture<EmptyStateComponent>;
  beforeEach(async () => { await TestBed.configureTestingModule({ imports: [EmptyStateComponent] }).compileComponents(); f = TestBed.createComponent(EmptyStateComponent); c = f.componentInstance; f.componentRef.setInput('title', 'No items'); f.detectChanges(); });
  it('should create', () => expect(c).toBeTruthy());
  it('should render title', () => { expect(f.nativeElement.textContent).toContain('No items'); });
  it('should render description', () => { f.componentRef.setInput('description', 'Try adding.'); f.detectChanges(); expect(f.nativeElement.textContent).toContain('Try adding.'); });
  it('should have data-brkta-empty', () => { expect(f.nativeElement.querySelector('[data-brkta-empty]')).toBeTruthy(); });
  it('should support compact variant', () => { f.componentRef.setInput('variant', 'compact'); f.detectChanges(); expect(f.nativeElement.querySelector('[data-variant="compact"]')).toBeTruthy(); });
});
