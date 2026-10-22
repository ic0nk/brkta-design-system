import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollapsibleComponent } from './collapsible.component';

describe('CollapsibleComponent', () => {
  let fixture: ComponentFixture<CollapsibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollapsibleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CollapsibleComponent);
    fixture.componentRef.setInput('label', 'Toggle me');
    fixture.componentRef.setInput('content', 'Hidden content');
    fixture.detectChanges();
  });

  it('should render the trigger label', () => {
    expect(fixture.nativeElement.textContent).toContain('Toggle me');
  });

  it('should show content when clicked', () => {
    const btn = fixture.nativeElement.querySelector('[data-brkta-collapsible-trigger]');
    (btn as HTMLElement).click();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Hidden content');
  });

  it('should hide content when toggled again', () => {
    const btn = fixture.nativeElement.querySelector('[data-brkta-collapsible-trigger]');
    (btn as HTMLElement).click();
    fixture.detectChanges();
    (btn as HTMLElement).click();
    fixture.detectChanges();
    expect(btn.getAttribute('aria-expanded')).toBe('false');
  });

  it('should start open when defaultOpen is true', () => {
    const f2 = TestBed.createComponent(CollapsibleComponent);
    f2.componentRef.setInput('label', 'Toggle');
    f2.componentRef.setInput('content', 'Visible');
    f2.componentRef.setInput('defaultOpen', true);
    f2.detectChanges();
    expect(f2.nativeElement.textContent).toContain('Visible');
  });

  it('should have aria-expanded', () => {
    const btn = fixture.nativeElement.querySelector('[data-brkta-collapsible-trigger]');
    expect(btn.getAttribute('aria-expanded')).toBe('false');
  });

  it('should not toggle when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('[data-brkta-collapsible-trigger]');
    (btn as HTMLElement).click();
    fixture.detectChanges();
    const panel = fixture.nativeElement.querySelector('[data-brkta-collapsible-panel]');
    expect(panel.hasAttribute('data-open')).toBe(false);
  });

  it('should have data-brkta-collapsible on root', () => {
    expect(fixture.nativeElement.querySelector('[data-brkta-collapsible]')).toBeTruthy();
  });

  it('should not render data-compact when compact is not set', () => {
    const root = fixture.nativeElement.querySelector('[data-brkta-collapsible]');
    expect(root.hasAttribute('data-compact')).toBe(false);
  });

  it('should render data-compact on root when compact is true', () => {
    fixture.componentRef.setInput('compact', true);
    fixture.detectChanges();
    const root = fixture.nativeElement.querySelector('[data-brkta-collapsible]');
    expect(root.hasAttribute('data-compact')).toBe(true);
  });

  it('should preserve expand/collapse and ARIA behavior in compact mode', () => {
    fixture.componentRef.setInput('compact', true);
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('[data-brkta-collapsible-trigger]');
    expect(btn.getAttribute('aria-expanded')).toBe('false');
    (btn as HTMLElement).click();
    fixture.detectChanges();
    expect(btn.getAttribute('aria-expanded')).toBe('true');
    expect(fixture.nativeElement.textContent).toContain('Hidden content');
  });

  it('should not toggle in compact mode when disabled', () => {
    fixture.componentRef.setInput('compact', true);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('[data-brkta-collapsible-trigger]');
    (btn as HTMLElement).click();
    fixture.detectChanges();
    const panel = fixture.nativeElement.querySelector('[data-brkta-collapsible-panel]');
    expect(panel.hasAttribute('data-open')).toBe(false);
  });
});
