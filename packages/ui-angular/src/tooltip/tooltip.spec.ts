import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TooltipComponent } from './tooltip.component';

describe('TooltipComponent', () => {
  let component: TooltipComponent;
  let fixture: ComponentFixture<TooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TooltipComponent] }).compileComponents();
    fixture = TestBed.createComponent(TooltipComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('content', 'Help text');
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
  it('should render wrapper', () => expect(fixture.nativeElement.querySelector('[data-brkta-tooltip]')).toBeTruthy());
  it('should render trigger', () => expect(fixture.nativeElement.querySelector('[data-brkta-tooltip-trigger]')).toBeTruthy());

  it('should show tooltip content when open', () => {
    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();
    const tooltip = fixture.nativeElement.querySelector('[role="tooltip"]');
    expect(tooltip).toBeTruthy();
    expect(tooltip.textContent).toContain('Help text');
  });

  it('should set role="tooltip" when open', () => {
    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="tooltip"]')).toBeTruthy();
  });

  it('should set aria-describedby on trigger', () => {
    expect(fixture.nativeElement.querySelector('[data-brkta-tooltip-trigger]').getAttribute('aria-describedby')).toBeTruthy();
  });

  it('should set data-open on wrapper when open', () => {
    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[data-brkta-tooltip][data-open]')).toBeTruthy();
  });

  it('should not render tooltip when closed', () => {
    expect(fixture.nativeElement.querySelector('[role="tooltip"]')).toBeNull();
  });
});
