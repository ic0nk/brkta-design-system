'use client';

import { useState, useRef, useEffect, useCallback, useId, type KeyboardEvent, type ReactNode } from 'react';
import type {
  DropdownMenuEntry,
  DropdownMenuItemContract,
} from '@brkta/ui-core/dropdown-menu/dropdown-menu-contract';

export type { DropdownMenuEntry, DropdownMenuItemContract } from '@brkta/ui-core/dropdown-menu/dropdown-menu-contract';

export interface DropdownMenuProps {
  items: DropdownMenuEntry[];
  trigger?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onItemSelect?: (value: string) => void;
}

export function DropdownMenu({
  items,
  trigger,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  onItemSelect,
}: DropdownMenuProps) {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = isControlled ? controlledOpen : internalOpen;
  const [closing, setClosing] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const idPrefix = useId();

  const setOpen = useCallback(
    (v: boolean) => {
      if (!isControlled) setInternalOpen(v);
      onOpenChange?.(v);
    },
    [isControlled, onOpenChange],
  );

  const close = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
      setActiveIndex(-1);
    }, 160);
  }, [setOpen]);

  useEffect(() => {
    if (!open || closing) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, close, closing]);

  useEffect(() => {
    if (!open || closing) return;
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, close, closing]);

  const itemEntries = items.filter(
    (e) => !('type' in e) || e.type !== 'separator',
  );

  const handleSelect = useCallback(
    (entry: DropdownMenuItemContract) => {
      if (entry.disabled) return;
      onItemSelect?.(entry.value ?? entry.label);
      close();
    },
    [close, onItemSelect],
  );

  const toggleOpen = useCallback(() => {
    if (closing) return;
    const next = !open;
    setOpen(next);
    if (!next) close();
    else setActiveIndex(-1);
  }, [open, closing, setOpen, close]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      switch (e.key) {
        case 'ArrowDown': e.preventDefault(); setActiveIndex((p) => Math.min(p + 1, itemEntries.length - 1)); break;
        case 'ArrowUp': e.preventDefault(); setActiveIndex((p) => Math.max(p - 1, 0)); break;
        case 'Home': e.preventDefault(); setActiveIndex(0); break;
        case 'End': e.preventDefault(); setActiveIndex(itemEntries.length - 1); break;
        case 'Enter': case ' ':
          e.preventDefault();
          if (activeIndex >= 0 && activeIndex < itemEntries.length) {
            const entry = itemEntries[activeIndex] as DropdownMenuItemContract;
            if (!entry.disabled) handleSelect(entry);
          }
          break;
        case 'Escape': e.preventDefault(); close(); break;
      }
    },
    [activeIndex, itemEntries, handleSelect, close],
  );

  const menuId = `${idPrefix}-menu`;

  return (
    <div ref={containerRef} data-brkta-dropdown-menu="" data-open={open ? '' : undefined}>
      <span
        data-brkta-dropdown-menu-trigger=""
        role="button"
        tabIndex={0}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={toggleOpen}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleOpen(); } }}
      >
        {trigger ?? 'Menu ▾'}
      </span>
      {(open || closing) && (
        <div
          ref={menuRef}
          data-brkta-dropdown-menu-content=""
          data-closing={closing ? '' : undefined}
          id={menuId}
          role="menu"
          tabIndex={-1}
          onKeyDown={handleKeyDown}
        >
          {items.map((entry, i) => {
            if ('type' in entry && entry.type === 'separator') {
              return <div key={`sep-${i}`} data-brkta-dropdown-menu-separator="" role="separator" />;
            }
            if ('type' in entry && entry.type === 'label') {
              return <div key={`lbl-${i}`} data-brkta-dropdown-menu-label="">{entry.label}</div>;
            }
            const item = entry as DropdownMenuItemContract;
            const itemIcon = item.icon as ReactNode | undefined;
            const isActive = itemEntries.indexOf(item as any) === activeIndex;
            return (
              <div
                key={item.value ?? item.label}
                data-brkta-dropdown-menu-item=""
                data-disabled={item.disabled || undefined}
                data-destructive={item.destructive || undefined}
                data-active={isActive || undefined}
                role="menuitem"
                aria-disabled={item.disabled || undefined}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => {
                  if (!item.disabled) setActiveIndex(itemEntries.indexOf(item as any));
                }}
              >
                {itemIcon && <span data-brkta-dropdown-menu-item-icon="" aria-hidden="true">{itemIcon}</span>}
                <span>{item.label}</span>
                {item.shortcut && <span data-brkta-dropdown-menu-item-shortcut="">{item.shortcut}</span>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
