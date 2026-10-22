'use client';

import { useState, useCallback, useRef, type KeyboardEvent } from 'react';
import type { AccordionContract, AccordionItemContract } from '@brkta/ui-core/accordion/accordion-contract';

type AccordionValue = string | string[];

export interface AccordionProps extends Omit<AccordionContract, 'onValueChange'> {
  onValueChange?: (value: AccordionValue) => void;
}

export function Accordion({
  items,
  value: controlledValue,
  defaultValue,
  multiple = false,
  onValueChange,
}: AccordionProps) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<AccordionValue>(
    defaultValue ?? (multiple ? [] : '')
  );
  const currentValue = isControlled ? controlledValue : internalValue;
  const triggerRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const isOpen = useCallback(
    (itemValue: string): boolean => {
      if (multiple) {
        return Array.isArray(currentValue) && currentValue.includes(itemValue);
      }
      return currentValue === itemValue;
    },
    [currentValue, multiple]
  );

  const setValue = useCallback(
    (newValue: AccordionValue) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [isControlled, onValueChange]
  );

  const handleToggle = useCallback(
    (itemValue: string) => {
      if (multiple) {
        const arr = Array.isArray(currentValue) ? [...currentValue] : [];
        if (arr.includes(itemValue)) {
          setValue(arr.filter((v) => v !== itemValue));
        } else {
          setValue([...arr, itemValue]);
        }
      } else {
        setValue(currentValue === itemValue ? '' : itemValue);
      }
    },
    [currentValue, multiple, setValue]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
      const enabledItems = items.filter((item) => !item.disabled);
      const currentEnabledIndex = enabledItems.findIndex(
        (_, i) => items.indexOf(enabledItems[i]) === index
      );
      let nextIndex = -1;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          nextIndex = (currentEnabledIndex + 1) % enabledItems.length;
          break;
        case 'ArrowUp':
          e.preventDefault();
          nextIndex =
            (currentEnabledIndex - 1 + enabledItems.length) % enabledItems.length;
          break;
        case 'Home':
          e.preventDefault();
          nextIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          nextIndex = enabledItems.length - 1;
          break;
        default:
          return;
      }

      const targetItem = enabledItems[nextIndex];
      if (targetItem) {
        const btn = triggerRefs.current.get(targetItem.value);
        btn?.focus();
      }
    },
    [items]
  );

  return (
    <div data-brkta-accordion="">
      {items.map((item, index) => (
        <AccordionItem
          key={item.value}
          item={item}
          open={isOpen(item.value)}
          onToggle={() => {
            if (!item.disabled) handleToggle(item.value);
          }}
          onKeyDown={(e) => handleKeyDown(e, index)}
          triggerRef={(el) => {
            if (el) triggerRefs.current.set(item.value, el);
          }}
        />
      ))}
    </div>
  );
}

function AccordionItem({
  item,
  open,
  onToggle,
  onKeyDown,
  triggerRef,
}: {
  item: AccordionItemContract;
  open: boolean;
  onToggle: () => void;
  onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => void;
  triggerRef: (el: HTMLButtonElement | null) => void;
}) {
  const triggerId = `accordion-trigger-${item.value}`;
  const panelId = `accordion-panel-${item.value}`;

  return (
    <div data-brkta-accordion-item="">
      <button
        ref={triggerRef}
        data-brkta-accordion-trigger=""
        data-disabled={item.disabled ? '' : undefined}
        id={triggerId}
        aria-expanded={open ? 'true' : 'false'}
        aria-controls={panelId}
        aria-disabled={item.disabled || undefined}
        disabled={item.disabled}
        onClick={onToggle}
        onKeyDown={onKeyDown}
        type="button"
      >
        <span>{item.label}</span>
        <span data-brkta-accordion-chevron="" aria-hidden="true" />
      </button>
      <div data-brkta-accordion-panel="" data-open={open ? '' : undefined} id={panelId} role="region" aria-labelledby={triggerId}>
        <div>
          <div data-brkta-accordion-content="">
            {item.content as React.ReactNode}
          </div>
        </div>
      </div>
    </div>
  );
}
