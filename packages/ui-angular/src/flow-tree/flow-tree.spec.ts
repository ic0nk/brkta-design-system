import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlowTreeComponent } from './flow-tree.component';

describe('FlowTreeComponent', () => {
  let fixture: ComponentFixture<FlowTreeComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [FlowTreeComponent] }).compileComponents();
    fixture = TestBed.createComponent(FlowTreeComponent);
    fixture.componentRef.setInput('stemPath', 'M 0 100 L 0 0');
    fixture.componentRef.setInput('limbPaths', ['M 0 50 L 40 50']);
    fixture.detectChanges();
  });
  it('renders the governed stem and limb slots', () => {
    expect(fixture.nativeElement.querySelector('[data-brkta-flow-tree]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-brkta-flow-tree-stem]')?.getAttribute('d')).toContain('M 0');
    expect(fixture.nativeElement.querySelectorAll('[data-brkta-flow-tree-limb]').length).toBe(1);
  });
});
