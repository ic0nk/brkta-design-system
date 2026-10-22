import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ScrollArea } from './scroll-area';

describe('ScrollArea', () => {
  it('renders children', () => {
    const { container } = render(
      <ScrollArea>
        <p>Scroll content</p>
      </ScrollArea>
    );
    expect(container.textContent).toContain('Scroll content');
  });

  it('has correct data attributes', () => {
    const { container } = render(<ScrollArea><p>test</p></ScrollArea>);
    expect(container.querySelector('[data-brkta-scroll-area]')).toBeTruthy();
    expect(container.querySelector('[data-brkta-scroll-area-viewport]')).toBeTruthy();
    expect(container.querySelector('[data-brkta-scroll-area-content]')).toBeTruthy();
  });

  it('supports horizontal scroll mode', () => {
    const { container } = render(<ScrollArea horizontalScroll><p>test</p></ScrollArea>);
    expect(container.querySelector('[data-scroll="horizontal"]')).toBeTruthy();
  });

  it('applies custom max height', () => {
    const { container } = render(<ScrollArea maxHeight="200px"><p>test</p></ScrollArea>);
    const el = container.querySelector('[data-brkta-scroll-area]') as HTMLElement;
    expect(el.style.getPropertyValue('--scroll-area-max-height')).toBe('200px');
  });
});
