import { render, screen, fireEvent, act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Tabs } from './tabs';

const items = [{ label: 'First', value: 'one' }, { label: 'Disabled', value: 'disabled', disabled: true }, { label: 'Last', value: 'last' }];
describe('Tabs responsive and keyboard behavior', () => {
  let callback: () => void;
  let disconnect: ReturnType<typeof vi.fn>;
  beforeEach(() => {
    disconnect = vi.fn();
    vi.stubGlobal('ResizeObserver', class { constructor(cb: () => void) { callback = cb; } disconnect = disconnect; observe = vi.fn(); });
  });
  afterEach(() => { document.documentElement.removeAttribute('dir'); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

  it('remeasures resized triggers and cleans up its observer', () => {
    const { unmount } = render(<Tabs items={items} />);
    const list = screen.getByRole('tablist');
    vi.spyOn(list, 'getBoundingClientRect').mockReturnValue({ left: 10 } as DOMRect);
    const rect = vi.spyOn(screen.getByText('First'), 'getBoundingClientRect').mockReturnValue({ left: 20, width: 80 } as DOMRect);
    act(() => callback()); expect(list.style.getPropertyValue('--tabs-indicator-x')).toBe('10px');
    rect.mockReturnValue({ left: 120, width: 110 } as DOMRect); act(() => callback());
    expect(list.style.getPropertyValue('--tabs-indicator-x')).toBe('110px'); expect(list.style.getPropertyValue('--tabs-indicator-width')).toBe('110px');
    const before = disconnect.mock.calls.length; unmount(); expect(disconnect.mock.calls.length).toBe(before + 1);
  });
  it('remeasures on document and shell direction changes without a resize', async () => {
    const { container } = render(<div data-test-shell><Tabs items={items} /></div>);
    const list = screen.getByRole('tablist');
    const shell = container.querySelector('[data-test-shell]')!;
    vi.spyOn(list, 'getBoundingClientRect').mockReturnValue({ left: 10 } as DOMRect);
    const rect = vi.spyOn(screen.getByText('First'), 'getBoundingClientRect').mockReturnValue({ left: 220, width: 80 } as DOMRect);
    await act(async () => { document.documentElement.setAttribute('dir', 'rtl'); });
    expect(list.style.getPropertyValue('--tabs-indicator-x')).toBe('210px');
    rect.mockReturnValue({ left: 30, width: 80 } as DOMRect);
    await act(async () => { shell.setAttribute('dir', 'ltr'); });
    expect(list.style.getPropertyValue('--tabs-indicator-x')).toBe('20px');
    rect.mockReturnValue({ left: 220, width: 80 } as DOMRect);
    await act(async () => { shell.removeAttribute('dir'); });
    expect(list.style.getPropertyValue('--tabs-indicator-x')).toBe('210px');
  });
  it('disconnects direction observation on unmount', async () => {
    const { unmount } = render(<Tabs items={items} />);
    const measure = vi.spyOn(screen.getByText('First'), 'getBoundingClientRect');
    const disconnectDirection = vi.spyOn(MutationObserver.prototype, 'disconnect');
    unmount();
    expect(disconnectDirection).toHaveBeenCalled();
    await act(async () => { document.documentElement.setAttribute('dir', 'rtl'); });
    expect(measure).not.toHaveBeenCalled();
  });
  it('remeasures programmatic selection and changed item labels', () => {
    const { rerender } = render(<Tabs items={items} value="one" />);
    const list = screen.getByRole('tablist');
    vi.spyOn(list, 'getBoundingClientRect').mockReturnValue({ left: 10 } as DOMRect);
    vi.spyOn(screen.getByText('Last'), 'getBoundingClientRect').mockReturnValue({ left: 160, width: 100 } as DOMRect);
    fireEvent.mouseEnter(screen.getByText('First'));
    rerender(<Tabs items={items} value="last" />);
    expect(list.style.getPropertyValue('--tabs-indicator-x')).toBe('150px');
    rerender(<Tabs items={items.map(item => item.value === 'last' ? { ...item, label: 'Longer translated label' } : item)} value="last" />);
    expect(list.style.getPropertyValue('--tabs-indicator-width')).toBe('100px');
  });
  it('uses RTL arrows and moves keyboard focus past disabled tabs', () => {
    render(<div dir="rtl"><Tabs items={items} /></div>);
    const first = screen.getByText('First'); const last = screen.getByText('Last');
    first.focus(); fireEvent.keyDown(first, { key: 'ArrowLeft' });
    expect(last.getAttribute('aria-selected')).toBe('true'); expect(document.activeElement).toBe(last);
    fireEvent.keyDown(last, { key: 'ArrowRight' });
    expect(first.getAttribute('aria-selected')).toBe('true'); expect(document.activeElement).toBe(first);
  });
  it('preserves hover when equivalent item arrays are passed', () => {
    const { rerender } = render(<Tabs items={items} value="one" />);
    const list = screen.getByRole('tablist');
    vi.spyOn(list, 'getBoundingClientRect').mockReturnValue({ left: 10 } as DOMRect);
    vi.spyOn(screen.getByText('Last'), 'getBoundingClientRect').mockReturnValue({ left: 160, width: 100 } as DOMRect);
    fireEvent.mouseEnter(screen.getByText('Last'));
    rerender(<Tabs items={items.map(item => ({ ...item }))} value="one" />);
    expect(list.style.getPropertyValue('--tabs-indicator-x')).toBe('150px');
  });
  it('moves selection and focus for Home, End and vertical arrows', () => {
    render(<Tabs items={items} orientation="vertical" />);
    const first = screen.getByText('First'); const last = screen.getByText('Last');
    fireEvent.keyDown(first, { key: 'End' }); expect(document.activeElement).toBe(last);
    fireEvent.keyDown(last, { key: 'Home' }); expect(document.activeElement).toBe(first);
    fireEvent.keyDown(first, { key: 'ArrowDown' }); expect(document.activeElement).toBe(last);
  });
});
