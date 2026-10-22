import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs } from './tabs';

const items = [
  { label: 'Tab 1', value: 't1', content: 'Panel 1' },
  { label: 'Tab 2', value: 't2', content: 'Panel 2' },
  { label: 'Tab 3', value: 't3', content: 'Panel 3', disabled: true },
];

describe('Tabs', () => {
  it('renders all tab triggers', () => { render(<Tabs items={items} />); expect(screen.getByText('Tab 1')).toBeTruthy(); expect(screen.getByText('Tab 2')).toBeTruthy(); });
  it('shows first panel by default', () => { render(<Tabs items={items} />); expect(screen.getByText('Panel 1')).toBeTruthy(); });
  it('switches panel on click', () => { render(<Tabs items={items} />); fireEvent.click(screen.getByText('Tab 2')); expect(screen.getByText('Panel 2')).toBeTruthy(); });
  it('does not select disabled tab', () => { render(<Tabs items={items} />); fireEvent.click(screen.getByText('Tab 3')); expect(screen.getByText('Panel 1')).toBeTruthy(); });
  it('has role="tablist"', () => { render(<Tabs items={items} />); expect(screen.getByRole('tablist')).toBeTruthy(); });
  it('marks active tab with aria-selected', () => { render(<Tabs items={items} />); expect(screen.getByText('Tab 1').getAttribute('aria-selected')).toBe('true'); });
  it('ArrowRight skips disabled tab', () => { render(<Tabs items={items} />); const t2 = screen.getByText('Tab 2'); t2.focus(); fireEvent.keyDown(t2, { key: 'ArrowRight' }); expect(screen.getByText('Panel 1')).toBeTruthy(); });
  it('renders default variant', () => { const { container } = render(<Tabs items={items} />); expect(container.querySelector('[data-variant="default"]')).toBeTruthy(); });
  it('renders segmented variant', () => { const { container } = render(<Tabs items={items} variant="segmented" />); expect(container.querySelector('[data-variant="segmented"]')).toBeTruthy(); });
  it('renders vertical orientation', () => { render(<Tabs items={items} orientation="vertical" />); expect(screen.getByRole('tablist').getAttribute('aria-orientation')).toBe('vertical'); });
  it('vertical uses ArrowDown', () => { render(<Tabs items={items} orientation="vertical" />); const t1 = screen.getByText('Tab 1'); t1.focus(); fireEvent.keyDown(t1, { key: 'ArrowDown' }); expect(screen.getByText('Panel 2')).toBeTruthy(); });
  it('renders indicator element', () => { const { container } = render(<Tabs items={items} />); expect(container.querySelector('[data-brkta-tabs-indicator]')).toBeTruthy(); });
  it('sets indicator CSS variables', () => { render(<Tabs items={items} />); const list = document.querySelector('[data-brkta-tabs-list]'); expect(list?.style.getPropertyValue('--tabs-indicator-x')).toBeTruthy(); });
});
