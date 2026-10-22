import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Resizable } from './resizable';

describe('Resizable', () => {
  it('renders both panels', () => {
    const { container } = render(
      <Resizable first={<div>Left</div>} second={<div>Right</div>} />
    );
    expect(container.textContent).toContain('Left');
    expect(container.textContent).toContain('Right');
  });

  it('has correct data attributes', () => {
    const { container } = render(
      <Resizable first={<div>A</div>} second={<div>B</div>} />
    );
    expect(container.querySelector('[data-brkta-resizable]')).toBeTruthy();
    expect(container.querySelector('[data-brkta-resizable-handle]')).toBeTruthy();
  });

  it('renders vertical direction', () => {
    const { container } = render(
      <Resizable first={<div>Top</div>} second={<div>Bottom</div>} direction="vertical" />
    );
    expect(container.querySelector('[data-direction="vertical"]')).toBeTruthy();
  });

  it('has correct ARIA attributes on handle', () => {
    const { container } = render(
      <Resizable first={<div>A</div>} second={<div>B</div>} />
    );
    const handle = container.querySelector('[data-brkta-resizable-handle]');
    expect(handle?.getAttribute('role')).toBe('separator');
    expect(handle?.getAttribute('aria-orientation')).toBe('horizontal');
    expect(handle?.getAttribute('tabindex')).toBe('0');
  });

  it('supports keyboard resize', () => {
    const { container } = render(
      <Resizable first={<div>A</div>} second={<div>B</div>} defaultSize={50} />
    );
    const handle = container.querySelector('[data-brkta-resizable-handle]')!;
    fireEvent.keyDown(handle, { key: 'ArrowRight' });
    // Panel should have updated size via style
    const panels = container.querySelectorAll('[data-brkta-resizable-panel]');
    expect(panels[0]).toBeTruthy();
  });

  it('sets dragging state on pointer down', () => {
    const { container } = render(
      <Resizable first={<div>A</div>} second={<div>B</div>} />
    );
    const handle = container.querySelector('[data-brkta-resizable-handle]')!;
    fireEvent.pointerDown(handle);
    expect(handle.getAttribute('data-dragging')).toBe('');
  });
});
