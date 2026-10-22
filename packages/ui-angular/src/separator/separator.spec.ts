import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeparatorComponent } from './separator.component';

describe('SeparatorComponent', () => {
  let component: SeparatorComponent;
  let fixture: ComponentFixture<SeparatorComponent>;
  let divEl: HTMLDivElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeparatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SeparatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    divEl = fixture.nativeElement.querySelector('div');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('defaults', () => {
    it('should default orientation to "horizontal"', () => {
      expect(component.orientation).toBe('horizontal');
    });
  });

  describe('data attributes', () => {
    it('should set data-brkta-separator', () => {
      expect(divEl.hasAttribute('data-brkta-separator')).toBe(true);
    });

    it('should reflect default orientation', () => {
      expect(divEl.getAttribute('data-orientation')).toBe('horizontal');
    });

    it('should reflect custom orientation', () => {
      fixture.componentRef.setInput('orientation', 'vertical');
      fixture.detectChanges();
      expect(divEl.getAttribute('data-orientation')).toBe('vertical');
    });
  });

  describe('ARIA', () => {
    it('should have role="separator"', () => {
      expect(divEl.getAttribute('role')).toBe('separator');
    });

    it('should have aria-orientation matching orientation', () => {
      expect(divEl.getAttribute('aria-orientation')).toBe('horizontal');
      fixture.componentRef.setInput('orientation', 'vertical');
      fixture.detectChanges();
      expect(divEl.getAttribute('aria-orientation')).toBe('vertical');
    });
  });
});
