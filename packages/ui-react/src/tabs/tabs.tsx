'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import type { TabItemContract } from '@brkta/ui-core/tabs/tabs-contract';

export interface TabsProps {
  items: TabItemContract[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  variant?: 'default' | 'segmented';
  orientation?: 'horizontal' | 'vertical';
}

export function Tabs({ items, value: controlledValue, defaultValue, onValueChange, variant = 'default', orientation = 'horizontal' }: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? (items[0]?.value ?? ''));
  const activeValue = controlledValue ?? internalValue;
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = items.findIndex(i => i.value === activeValue);
  const itemsSignature = JSON.stringify(items.map(({ label, value, disabled }) => [label, value, !!disabled]));
  const indicatorIdx = hoveredIdx !== null ? hoveredIdx : activeIndex >= 0 ? activeIndex : -1;

  const handleSelect = useCallback((val: string) => {
    if (controlledValue === undefined) setInternalValue(val);
    onValueChange?.(val);
  }, [controlledValue, onValueChange]);

  // Measure and position indicator
  useEffect(() => {
    const list = listRef.current;
    if (indicatorIdx < 0 || !list) return;
    const measure = () => {
      const target = triggerRefs.current[indicatorIdx];
      if (!target) return;
      const listRect = list.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      if (orientation === 'horizontal') {
        list.style.setProperty('--tabs-indicator-x', `${targetRect.left - listRect.left}px`);
        list.style.setProperty('--tabs-indicator-width', `${targetRect.width}px`);
      } else {
        list.style.setProperty('--tabs-indicator-y', `${targetRect.top - listRect.top}px`);
        list.style.setProperty('--tabs-indicator-height', `${targetRect.height}px`);
      }
    };
    measure();
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : undefined;
    observer?.observe(list);
    triggerRefs.current.forEach((trigger) => { if (trigger) observer?.observe(trigger); });
    const directionObserver = typeof MutationObserver !== 'undefined' ? new MutationObserver(measure) : undefined;
    // Direction may be set by either the document or a nested workspace shell.
    for (let ancestor: HTMLElement | null = list; ancestor; ancestor = ancestor.parentElement) {
      directionObserver?.observe(ancestor, { attributes: true, attributeFilter: ['dir'] });
    }
    window.addEventListener('resize', measure);
    return () => { observer?.disconnect(); directionObserver?.disconnect(); window.removeEventListener('resize', measure); };
  }, [indicatorIdx, orientation, activeValue, items]);

  useEffect(() => { setHoveredIdx(null); }, [itemsSignature, activeValue, orientation]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, currentIndex: number) => {
    const enabled = items.filter(i => !i.disabled);
    if (!enabled.length) return;
    const enabledIndex = enabled.findIndex(i => i.value === items[currentIndex].value);
    let nextEnabled = enabledIndex;
    const list = listRef.current;
    const rtl = !!list && (getComputedStyle(list).direction === 'rtl' || list.closest('[dir]')?.getAttribute('dir') === 'rtl');
    if (orientation === 'horizontal') {
      if (e.key === 'ArrowRight') nextEnabled = (enabledIndex + (rtl ? -1 : 1) + enabled.length) % enabled.length;
      else if (e.key === 'ArrowLeft') nextEnabled = (enabledIndex + (rtl ? 1 : -1) + enabled.length) % enabled.length;
      else if (e.key !== 'Home' && e.key !== 'End') return;
    } else {
      if (e.key === 'ArrowDown') nextEnabled = (enabledIndex + 1) % enabled.length;
      else if (e.key === 'ArrowUp') nextEnabled = (enabledIndex - 1 + enabled.length) % enabled.length;
      else if (e.key !== 'Home' && e.key !== 'End') return;
    }
    if (e.key === 'Home') nextEnabled = 0;
    else if (e.key === 'End') nextEnabled = enabled.length - 1;
    e.preventDefault();
    handleSelect(enabled[nextEnabled].value);
    triggerRefs.current[items.findIndex(item => item.value === enabled[nextEnabled].value)]?.focus();
  }, [items, handleSelect, orientation]);

  const activeItem = items[activeIndex];

  return (
    <div data-brkta-tabs="" data-variant={variant} data-orientation={orientation}>
      <div ref={listRef} data-brkta-tabs-list="" role="tablist" aria-orientation={orientation}
        onMouseLeave={() => setHoveredIdx(null)}
      >
        {/* Moving indicator */}
        <span data-brkta-tabs-indicator="" aria-hidden="true" />

        {items.map((item, i) => (
          <button key={item.value} data-brkta-tabs-trigger="" role="tab"
            ref={(el) => { triggerRefs.current[i] = el; }}
            data-active={item.value === activeValue ? 'true' : undefined}
            data-disabled={item.disabled || undefined}
            aria-selected={item.value === activeValue}
            aria-disabled={item.disabled || undefined}
            tabIndex={item.value === activeValue ? 0 : -1}
            disabled={item.disabled}
            onClick={() => !item.disabled && handleSelect(item.value)}
            onFocus={() => { if (!item.disabled) setHoveredIdx(i); }}
            onMouseEnter={() => { if (!item.disabled) setHoveredIdx(i); }}
            onKeyDown={(e) => handleKeyDown(e, i)}
          >{item.label}</button>
        ))}
      </div>
      {activeItem && (
        <div data-brkta-tabs-panel="" role="tabpanel">{activeItem.content as React.ReactNode}</div>
      )}
    </div>
  );
}
