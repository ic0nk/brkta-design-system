import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvatarComponent } from './avatar.component';

describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;
  let spanEl: HTMLSpanElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarComponent);
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

    it('should default src to empty string', () => {
      expect(component.src).toBe('');
    });

    it('should default alt to empty string', () => {
      expect(component.alt).toBe('');
    });
  });

  describe('data attributes', () => {
    it('should set data-brkta-avatar', () => {
      expect(spanEl.hasAttribute('data-brkta-avatar')).toBe(true);
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

  describe('image rendering', () => {
    it('should render <img> when src is set', () => {
      fixture.componentRef.setInput('src', 'https://example.com/photo.jpg');
      fixture.componentRef.setInput('alt', 'User');
      fixture.detectChanges();
      const img = fixture.nativeElement.querySelector('img');
      expect(img).toBeTruthy();
      expect(img.getAttribute('src')).toBe('https://example.com/photo.jpg');
      expect(img.getAttribute('alt')).toBe('User');
    });

    it('should show fallback when no src', () => {
      fixture.componentRef.setInput('fallback', 'JD');
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('img')).toBeFalsy();
      expect(spanEl.textContent).toContain('JD');
    });

    it('should show fallback on image error', () => {
      fixture.componentRef.setInput('src', 'https://example.com/bad.jpg');
      fixture.componentRef.setInput('fallback', 'AB');
      fixture.detectChanges();
      const img = fixture.nativeElement.querySelector('img');
      img.dispatchEvent(new Event('error'));
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('img')).toBeFalsy();
      expect(spanEl.textContent).toContain('AB');
    });

    it('should truncate fallback to 2 characters', () => {
      fixture.componentRef.setInput('fallback', 'ABCD');
      fixture.detectChanges();
      expect(spanEl.textContent).toContain('AB');
      expect(spanEl.textContent).not.toContain('ABCD');
    });
  });

  describe('status indicator', () => {
    it('should render status when set', () => {
      fixture.componentRef.setInput('status', 'online');
      fixture.detectChanges();
      const statusEl = fixture.nativeElement.querySelector('[data-brkta-avatar-status]');
      expect(statusEl).toBeTruthy();
      expect(statusEl.getAttribute('data-status')).toBe('online');
      expect(statusEl.getAttribute('aria-label')).toBe('online');
    });

    it('should not render status when not set', () => {
      fixture.componentRef.setInput('status', '');
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('[data-brkta-avatar-status]')).toBeFalsy();
    });
  });
});
