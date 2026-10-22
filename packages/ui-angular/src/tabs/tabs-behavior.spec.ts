import { TestBed } from '@angular/core/testing';
import { readFileSync } from 'node:fs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TabsComponent } from './tabs.component';

const items = [{ label: 'First', value: 'one' }, { label: 'Disabled', value: 'disabled', disabled: true }, { label: 'Last', value: 'last' }];
describe('Tabs responsive and keyboard behavior', () => {
  let callback: () => void;
  let disconnect: ReturnType<typeof vi.fn>;
  let observe: ReturnType<typeof vi.fn>;
  let fixture: ReturnType<typeof TestBed.createComponent<TabsComponent>>;
  let list: HTMLElement;
  let buttons: HTMLButtonElement[];
  beforeEach(() => {
    disconnect = vi.fn(); observe = vi.fn();
    vi.stubGlobal('ResizeObserver', class { constructor(cb: () => void) { callback = cb; } disconnect = disconnect; observe = observe; });
    fixture = TestBed.createComponent(TabsComponent);
    fixture.componentRef.setInput('items', items); fixture.detectChanges();
    list = fixture.nativeElement.querySelector('[role=tablist]');
    buttons = [...list.querySelectorAll<HTMLButtonElement>('[role=tab]')];
    vi.spyOn(list, 'getBoundingClientRect').mockReturnValue({ left: 10, top: 5 } as DOMRect);
  });
  afterEach(() => { fixture.destroy(); document.documentElement.removeAttribute('dir'); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

  it('remeasures the active indicator when its list or trigger resizes', () => {
    const rect = vi.spyOn(buttons[0], 'getBoundingClientRect').mockReturnValue({ left: 20, width: 80 } as DOMRect);
    callback(); expect(list.style.getPropertyValue('--tabs-indicator-x')).toBe('10px');
    rect.mockReturnValue({ left: 220, width: 120 } as DOMRect); callback();
    expect(list.style.getPropertyValue('--tabs-indicator-x')).toBe('210px');
    expect(list.style.getPropertyValue('--tabs-indicator-width')).toBe('120px');
    expect(observe).toHaveBeenCalledWith(list);
    for (const button of buttons) expect(observe).toHaveBeenCalledWith(button);
  });
  it('remeasures on document and shell direction changes without a resize', async () => {
    await Promise.resolve();
    const rect = vi.spyOn(buttons[0], 'getBoundingClientRect').mockReturnValue({ left: 220, width: 80 } as DOMRect);
    document.documentElement.setAttribute('dir', 'rtl');
    await Promise.resolve();
    expect(list.style.getPropertyValue('--tabs-indicator-x')).toBe('210px');
    rect.mockReturnValue({ left: 30, width: 80 } as DOMRect);
    fixture.nativeElement.setAttribute('dir', 'ltr');
    await Promise.resolve();
    expect(list.style.getPropertyValue('--tabs-indicator-x')).toBe('20px');
    rect.mockReturnValue({ left: 220, width: 80 } as DOMRect);
    fixture.nativeElement.removeAttribute('dir');
    await Promise.resolve();
    expect(list.style.getPropertyValue('--tabs-indicator-x')).toBe('210px');
  });
  it('disconnects direction observation on destroy', async () => {
    await Promise.resolve();
    const measure = vi.spyOn(fixture.componentInstance, 'updateIndicator');
    const disconnectDirection = vi.spyOn(MutationObserver.prototype, 'disconnect');
    fixture.destroy();
    expect(disconnectDirection).toHaveBeenCalled();
    document.documentElement.setAttribute('dir', 'rtl');
    await Promise.resolve();
    expect(measure).not.toHaveBeenCalled();
  });
  it('updates a programmatic selection after rendering and clears old hover', async () => {
    vi.spyOn(buttons[2], 'getBoundingClientRect').mockReturnValue({ left: 180, width: 90 } as DOMRect);
    fixture.componentInstance.hoveredIdx = 0;
    fixture.componentRef.setInput('value', 'last'); fixture.detectChanges(); await Promise.resolve();
    expect(list.style.getPropertyValue('--tabs-indicator-x')).toBe('170px');
    expect(fixture.componentInstance.hoveredIdx).toBeNull();
  });
  it('preserves hover when equivalent item arrays are passed on unrelated change detection', async () => {
    fixture.componentInstance.hoveredIdx = 2;
    fixture.componentRef.setInput('items', items.map(item => ({ ...item }))); fixture.detectChanges(); await Promise.resolve();
    expect(fixture.componentInstance.hoveredIdx).toBe(2);
  });
  it('remeasures changed labels and orientation after rendering', async () => {
    vi.spyOn(buttons[0], 'getBoundingClientRect').mockReturnValue({ left: 20, width: 180, top: 35, height: 44 } as DOMRect);
    fixture.componentRef.setInput('items', [{ ...items[0], label: 'A longer translated label' }]);
    fixture.componentRef.setInput('orientation', 'vertical'); fixture.detectChanges(); await Promise.resolve();
    expect(list.style.getPropertyValue('--tabs-indicator-y')).toBe('30px');
    expect(list.style.getPropertyValue('--tabs-indicator-height')).toBe('44px');
  });
  it('moves selection and focus with RTL arrows while skipping disabled tabs', () => {
    fixture.nativeElement.setAttribute('dir', 'rtl'); buttons[0].focus();
    buttons[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true })); fixture.detectChanges();
    expect(fixture.componentInstance.activeValue).toBe('last'); expect(document.activeElement).toBe(buttons[2]);
    buttons[2].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    expect(fixture.componentInstance.activeValue).toBe('one'); expect(document.activeElement).toBe(buttons[0]);
  });
  it('handles Home and End and does not hijack vertical arrows in a horizontal list', () => {
    buttons[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    expect(document.activeElement).toBe(buttons[2]);
    buttons[2].dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    expect(document.activeElement).toBe(buttons[0]);
    const unrelated = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true });
    buttons[0].dispatchEvent(unrelated); expect(unrelated.defaultPrevented).toBe(false);
  });
  it('disconnects its observer on destroy', () => {
    const before = disconnect.mock.calls.length; fixture.destroy(); expect(disconnect.mock.calls.length).toBe(before + 1);
  });
  it('reserves the governed 44px minimum touch target in both variants', () => {
    const css = readFileSync('../ui-core/tabs/tabs.css', 'utf8');
    expect(css).toContain('min-block-size: var(--height-md)'); expect(css).toContain('min-inline-size: var(--height-md)');
    expect(readFileSync('../design-tokens/theme.css', 'utf8')).toContain('--height-md: 2.75rem;');
  });
});
