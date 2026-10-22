import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Accordion } from './accordion';

const items = [
  { value: 'item-1', label: 'Section 1', content: 'Content for section one.' },
  { value: 'item-2', label: 'Section 2', content: 'Content for section two.' },
  { value: 'item-3', label: 'Section 3', content: 'Content for section three.', disabled: true },
];

describe('Accordion', () => {
  it('renders all accordion triggers', () => {
    render(<Accordion items={items} />);
    expect(screen.getByText('Section 1')).toBeTruthy();
    expect(screen.getByText('Section 2')).toBeTruthy();
    expect(screen.getByText('Section 3')).toBeTruthy();
  });

  it('opens a section on trigger click', () => {
    render(<Accordion items={items} />);
    const trigger = screen.getByText('Section 1');
    fireEvent.click(trigger);
    expect(screen.getByText('Content for section one.')).toBeTruthy();
  });

  it('closes when clicking same trigger again', () => {
    render(<Accordion items={items} />);
    const trigger = screen.getByText('Section 1');
    fireEvent.click(trigger);
    expect(screen.getByText('Content for section one.')).toBeTruthy();
    fireEvent.click(trigger);
    // After re-click, panel should not have data-open
    const panels = document.querySelectorAll('[data-brkta-accordion-panel]');
    expect(panels[0].hasAttribute('data-open')).toBe(false);
  });

  it('supports multiple open mode', () => {
    render(<Accordion items={items} multiple />);
    fireEvent.click(screen.getByText('Section 1'));
    fireEvent.click(screen.getByText('Section 2'));
    expect(screen.getByText('Content for section one.')).toBeTruthy();
    expect(screen.getByText('Content for section two.')).toBeTruthy();
  });

  it('respects default value', () => {
    render(<Accordion items={items} defaultValue="item-2" />);
    expect(screen.getByText('Content for section two.')).toBeTruthy();
  });

  it('does not open disabled items', () => {
    render(<Accordion items={items} />);
    const disabledTrigger = screen.getByText('Section 3');
    fireEvent.click(disabledTrigger);
    // Panel is always in DOM but should not have data-open
    const panels = document.querySelectorAll('[data-brkta-accordion-panel]');
    const disabledPanel = panels[2]; // third item
    expect(disabledPanel.hasAttribute('data-open')).toBe(false);
  });

  it('has correct ARIA attributes on trigger', () => {
    render(<Accordion items={items} />);
    const trigger = screen.getByText('Section 1');
    // Check panel exists with correct role
    const panel = document.getElementById('accordion-panel-item-1');
    expect(panel).toBeTruthy();
    expect(panel?.getAttribute('role')).toBe('region');
    // Check panel opens on click
    fireEvent.click(trigger);
    expect(panel?.hasAttribute('data-open')).toBe(true);
  });

  it('has data-brkta-accordion attribute on root', () => {
    const { container } = render(<Accordion items={items} />);
    expect(container.querySelector('[data-brkta-accordion]')).toBeTruthy();
  });

  it('supports keyboard navigation', () => {
    render(<Accordion items={items} />);
    const trigger1 = screen.getByText('Section 1');
    fireEvent.keyDown(trigger1, { key: 'ArrowDown' });
    // Focus should move to next enabled trigger (Section 2)
    expect(document.activeElement?.textContent).toContain('Section 2');
  });
});
