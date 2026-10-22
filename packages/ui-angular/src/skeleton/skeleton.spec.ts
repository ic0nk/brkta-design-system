import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkeletonComponent } from './skeleton.component';

describe('SkeletonComponent', () => {
  let component: SkeletonComponent;
  let fixture: ComponentFixture<SkeletonComponent>;
  let divEl: HTMLDivElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    divEl = fixture.nativeElement.querySelector('div');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('defaults', () => {
    it('should default variant to "text"', () => {
      expect(component.variant).toBe('text');
    });
  });

  describe('data attributes', () => {
    it('should set data-brkta-skeleton', () => {
      expect(divEl.hasAttribute('data-brkta-skeleton')).toBe(true);
    });

    it('should reflect default variant', () => {
      expect(divEl.getAttribute('data-variant')).toBe('text');
    });

    it('should reflect custom variant', () => {
      fixture.componentRef.setInput('variant', 'card');
      fixture.detectChanges();
      expect(divEl.getAttribute('data-variant')).toBe('card');
    });
  });

  describe('width / height styles', () => {
    it('should apply width via inline style', () => {
      fixture.componentRef.setInput('width', '75%');
      fixture.detectChanges();
      expect(divEl.style.width).toBe('75%');
    });

    it('should apply height via inline style', () => {
      fixture.componentRef.setInput('height', '24px');
      fixture.detectChanges();
      expect(divEl.style.height).toBe('24px');
    });
  });

  describe('accessibility', () => {
    it('should have aria-hidden="true"', () => {
      expect(divEl.getAttribute('aria-hidden')).toBe('true');
    });
  });
});
