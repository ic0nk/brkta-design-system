import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;
  let spanEl: HTMLSpanElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spanEl = fixture.nativeElement.querySelector('span');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('defaults', () => {
    it('should default size to "md"', () => {
      expect(component.size).toBe('md');
    });
  });

  describe('data attributes', () => {
    it('should set data-brkta-spinner', () => {
      expect(spanEl.hasAttribute('data-brkta-spinner')).toBe(true);
    });

    it('should reflect default size', () => {
      expect(spanEl.getAttribute('data-size')).toBe('md');
    });

    it('should reflect custom size', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();
      expect(spanEl.getAttribute('data-size')).toBe('lg');
    });
  });

  describe('accessibility', () => {
    it('should have role="status"', () => {
      expect(spanEl.getAttribute('role')).toBe('status');
    });

    it('should have aria-label="Loading"', () => {
      expect(spanEl.getAttribute('aria-label')).toBe('Loading');
    });

    it('should render screen-reader text', () => {
      const sr = spanEl.querySelector('.brkta-spinner-sr-label');
      expect(sr).toBeTruthy();
      expect(sr?.textContent).toContain('Loading');
    });
  });
});
