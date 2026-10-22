import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressComponent } from './progress.component';

describe('ProgressComponent', () => {
  let component: ProgressComponent;
  let fixture: ComponentFixture<ProgressComponent>;
  let divEl: HTMLDivElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    divEl = fixture.nativeElement.querySelector('div');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('defaults', () => {
    it('should default value to 0', () => {
      expect(component.value).toBe(0);
    });

    it('should default max to 100', () => {
      expect(component.max).toBe(100);
    });

    it('should default size to "md"', () => {
      expect(component.size).toBe('md');
    });
  });

  describe('data attributes', () => {
    it('should set data-brkta-progress', () => {
      expect(divEl.hasAttribute('data-brkta-progress')).toBe(true);
    });

    it('should reflect default size', () => {
      expect(divEl.getAttribute('data-size')).toBe('md');
    });

    it('should reflect custom size', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();
      expect(divEl.getAttribute('data-size')).toBe('lg');
    });
  });

  describe('accessibility', () => {
    it('should have role="progressbar"', () => {
      expect(divEl.getAttribute('role')).toBe('progressbar');
    });

    it('should set aria-valuenow, min, and max', () => {
      fixture.componentRef.setInput('value', 75);
      fixture.componentRef.setInput('max', 200);
      fixture.detectChanges();
      expect(divEl.getAttribute('aria-valuenow')).toBe('75');
      expect(divEl.getAttribute('aria-valuemin')).toBe('0');
      expect(divEl.getAttribute('aria-valuemax')).toBe('200');
    });

    it('should set aria-label to percentage', () => {
      fixture.componentRef.setInput('value', 42);
      fixture.detectChanges();
      expect(divEl.getAttribute('aria-label')).toBe('42%');
    });

    it('should clamp aria-label to 100% when value > max', () => {
      fixture.componentRef.setInput('value', 150);
      fixture.detectChanges();
      expect(divEl.getAttribute('aria-label')).toBe('100%');
    });

    it('should clamp aria-label to 0% when value is negative', () => {
      fixture.componentRef.setInput('value', -10);
      fixture.detectChanges();
      expect(divEl.getAttribute('aria-label')).toBe('0%');
    });
  });

  describe('indicator bar', () => {
    it('should render indicator with correct width', () => {
      fixture.componentRef.setInput('value', 42);
      fixture.componentRef.setInput('max', 100);
      fixture.detectChanges();
      const indicator = fixture.nativeElement.querySelector('[data-brkta-progress-indicator]');
      expect(indicator).toBeTruthy();
      expect(indicator.style.width).toBe('42%');
    });

    it('should clamp indicator width to 100%', () => {
      fixture.componentRef.setInput('value', 200);
      fixture.detectChanges();
      const indicator = fixture.nativeElement.querySelector('[data-brkta-progress-indicator]');
      expect(indicator.style.width).toBe('100%');
    });

    it('should clamp indicator width to 0%', () => {
      fixture.componentRef.setInput('value', -5);
      fixture.detectChanges();
      const indicator = fixture.nativeElement.querySelector('[data-brkta-progress-indicator]');
      expect(indicator.style.width).toBe('0%');
    });
  });
});
