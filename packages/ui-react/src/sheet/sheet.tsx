'use client';

import { useState, useRef, useEffect, useCallback, type ReactNode } from 'react';
import type { SheetSize } from '@brkta/ui-core/types/variant';

export interface SheetProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: ReactNode;
  title?: string;
  description?: string;
  children?: ReactNode;
  side?: 'left' | 'right' | 'top' | 'bottom';
  size?: SheetSize;
  footer?: ReactNode;
}

export function Sheet({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  side = 'right',
  size = 'md',
  footer,
}: SheetProps) {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = isControlled ? controlledOpen : internalOpen;
  const [closing, setClosing] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const setOpen = useCallback((v: boolean) => {
    if (!isControlled) setInternalOpen(v);
    onOpenChange?.(v);
  }, [isControlled, onOpenChange]);

  const close = useCallback(() => {
    setClosing(true);
    setTimeout(() => { setOpen(false); setClosing(false); }, 200);
  }, [setOpen]);

  useEffect(() => {
    if (!open || closing) return;
    const h = (e: globalThis.KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [open, closing, close]);

  if (!open && !closing) return trigger ? <span onClick={() => setOpen(true)}>{trigger}</span> : null;

  return (
    <>
      {trigger && <span onClick={() => setOpen(true)}>{trigger}</span>}
      <div ref={overlayRef} data-brkta-sheet-overlay="" data-closing={closing ? '' : undefined}
        onClick={(e) => { if (e.target === overlayRef.current) close(); }} role="presentation"
      >
        <div data-brkta-sheet-content="" data-side={side} data-size={size} data-closing={closing ? '' : undefined}
          role="dialog" aria-modal="true" aria-labelledby={title ? 'sht-title' : undefined}
        >
          <button data-brkta-dialog-close="" aria-label="Close" onClick={close}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
          {title && <div data-brkta-sheet-header="" id="sht-title">{title}</div>}
          {description && <p data-brkta-dialog-description="">{description}</p>}
          <div data-brkta-sheet-body="">{children}</div>
          <div data-brkta-sheet-footer="">{footer}</div>
        </div>
      </div>
    </>
  );
}
