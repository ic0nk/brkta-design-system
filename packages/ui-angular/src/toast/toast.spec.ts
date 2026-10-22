import { ComponentFixture, TestBed } from '@angular/core/testing';
import { readFileSync } from 'node:fs';
import { afterEach, vi } from 'vitest';
import { ToastComponent } from './toast.component';

const toastStyles = readFileSync('../ui-core/toast/toast.css', 'utf8');

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  afterEach(() => vi.useRealTimers());

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ToastComponent] }).compileComponents();
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('accepts a translated dismissLabel', () => {
    fixture.componentRef.setInput('dismissLabel', 'إغلاق');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[data-brkta-toast-close]').getAttribute('aria-label')).toBe('إغلاق');
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should render title and description', () => {
    fixture.componentRef.setInput('title', 'Saved');
    fixture.componentRef.setInput('description', 'Done');
    fixture.detectChanges();
    expect(document.querySelector('[data-brkta-toast-title]')?.textContent).toContain('Saved');
  });

  it('should render dismiss button when dismissible', () => {
    expect(document.querySelector('[data-brkta-toast-close]')).toBeTruthy();
  });

  it('should not render dismiss button when not dismissible', () => {
    fixture.componentRef.setInput('dismissible', false);
    fixture.detectChanges();
    expect(document.querySelector('[data-brkta-toast-close]')).toBeNull();
  });

  it('should set variant data attribute', () => {
    fixture.componentRef.setInput('variant', 'success');
    fixture.detectChanges();
    expect(document.querySelector('[data-variant="success"]')).toBeTruthy();
  });

  it('uses the shared elevated glass recipe', () => {
    expect(document.querySelector('[data-brkta-toast]')?.classList.contains('glass-elevated')).toBe(true);
  });

  it('uses visible semantic colors for success, warning, and destructive variants', () => {
    expect(toastStyles).toContain('--brkta-toast-color: var(--success)');
    expect(toastStyles).toContain('--brkta-toast-color: var(--warning)');
    expect(toastStyles).toContain('--brkta-toast-color: var(--destructive)');
    expect(toastStyles).toContain('var(--brkta-glass-elevated-background)');
    expect(toastStyles).toContain('var(--brkta-glass-elevated-border-color)');
  });

  it('auto-dismisses after the default duration', () => {
    fixture.destroy();
    vi.useFakeTimers();
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    vi.advanceTimersByTime(4000);
    expect(component.closing).toBe(true);
    vi.advanceTimersByTime(200);
    expect(component.visible).toBe(false);

  });

  it('pauses dismissal while hovered and resumes after leaving', () => {
    fixture.destroy();
    vi.useFakeTimers();
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const toast = document.querySelector('[data-brkta-toast]') as HTMLElement;

    toast.dispatchEvent(new MouseEvent('mouseenter'));
    vi.advanceTimersByTime(5000);
    expect(component.visible).toBe(true);

    toast.dispatchEvent(new MouseEvent('mouseleave'));
    vi.advanceTimersByTime(4000);
    expect(component.closing).toBe(true);
    vi.advanceTimersByTime(200);
    expect(component.visible).toBe(false);

  });

  it('announces success politely and destructive feedback assertively', () => {
    expect(document.querySelector('[data-brkta-toast]')?.getAttribute('role')).toBe('status');
    fixture.componentRef.setInput('variant', 'destructive');
    fixture.detectChanges();
    expect(document.querySelector('[data-brkta-toast]')?.getAttribute('aria-live')).toBe('assertive');
  });
});
