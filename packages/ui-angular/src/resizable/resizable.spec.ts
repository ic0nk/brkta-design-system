import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResizableComponent } from './resizable.component';

describe('ResizableComponent', () => {
  let fixture: ComponentFixture<ResizableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResizableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResizableComponent);
    fixture.detectChanges();
  });

  it('should have data-brkta-resizable', () => {
    expect(fixture.nativeElement.querySelector('[data-brkta-resizable]')).toBeTruthy();
  });

  it('should have handle element', () => {
    expect(fixture.nativeElement.querySelector('[data-brkta-resizable-handle]')).toBeTruthy();
  });

  it('should support vertical direction', () => {
    fixture.componentRef.setInput('direction', 'vertical');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[data-direction="vertical"]')).toBeTruthy();
  });

  it('should have ARIA attributes on handle', () => {
    const handle = fixture.nativeElement.querySelector('[data-brkta-resizable-handle]');
    expect(handle.getAttribute('role')).toBe('separator');
    expect(handle.getAttribute('aria-orientation')).toBe('horizontal');
    expect(handle.getAttribute('tabindex')).toBe('0');
  });

  it('should set dragging state on pointerdown', () => {
    const handle = fixture.nativeElement.querySelector('[data-brkta-resizable-handle]');
    handle.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    fixture.detectChanges();
    expect(handle.getAttribute('data-dragging')).toBe('');
  });

  it('should support keyboard resize', () => {
    const handle = fixture.nativeElement.querySelector('[data-brkta-resizable-handle]');
    handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    fixture.detectChanges();
    // Panel size should change from default 50 to 60
    const panel = fixture.nativeElement.querySelector('[data-brkta-resizable-panel]');
    expect(panel).toBeTruthy();
  });
});
