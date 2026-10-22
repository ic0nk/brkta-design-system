'use client';

import { useState, useRef, useEffect, useCallback, type ReactNode } from 'react';
import type { OverlayAlign, OverlaySide } from '@brkta/ui-core/types/variant';

export interface PopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: OverlaySide;
  align?: OverlayAlign;
}

export function Popover({
  trigger,
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  side = 'bottom',
  align = 'start',
}: PopoverProps) {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = isControlled ? controlledOpen : internalOpen;
  const [closing, setClosing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const setOpen = useCallback((v: boolean) => {
    if (!isControlled) setInternalOpen(v);
    onOpenChange?.(v);
  }, [isControlled, onOpenChange]);

  const close = useCallback(() => {
    setClosing(true);
    setTimeout(() => { setOpen(false); setClosing(false); }, 160);
  }, [setOpen]);

  const toggle = useCallback(() => {
    if (closing) return;
    if (open) close(); else setOpen(true);
  }, [open, closing, setOpen, close]);

  useEffect(() => {
    if (!open || closing) return;
    const h = (e: MouseEvent) => { if (containerRef.current && !containerRef.current.contains(e.target as Node)) close(); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open, close, closing]);

  useEffect(() => {
    if (!open || closing) return;
    const h = (e: globalThis.KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [open, close, closing]);

  return (
    <div ref={containerRef} data-brkta-popover="" data-open={open ? '' : undefined}>
      <span data-brkta-popover-trigger="" onClick={toggle} role="button" tabIndex={0} aria-expanded={open}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } }}
      >
        {trigger}
      </span>
      {(open || closing) && (
        <div data-brkta-popover-content="" data-side={side} data-align={align} data-closing={closing ? '' : undefined} role="dialog" aria-modal="false">
          {children}
        </div>
      )}
    </div>
  );
}
