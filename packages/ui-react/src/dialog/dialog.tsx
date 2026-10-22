'use client';

import { useState, useRef, useEffect, useCallback, type ReactNode } from 'react';

export interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: ReactNode;
  closeLabel?: string;
  title?: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
}

export function Dialog({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  trigger,
  closeLabel = 'Close',
  title,
  description,
  children,
  footer,
  closeOnEscape = true,
  closeOnOutsideClick = true,
}: DialogProps) {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = isControlled ? controlledOpen : internalOpen;
  const [closing, setClosing] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const wasOpen = useRef(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const restoreFocus = useCallback(() => {
    if (!wasOpen.current) return;
    wasOpen.current = false;
    previouslyFocused.current?.focus();
    previouslyFocused.current = null;
  }, []);

  const focusable = useCallback(() => Array.from(overlayRef.current?.querySelectorAll<HTMLElement>(
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
  ) ?? []).filter(element => !element.hidden && element.getAttribute('aria-hidden') !== 'true'), []);

  const setOpen = useCallback((v: boolean) => {
    if (!isControlled) setInternalOpen(v);
    onOpenChange?.(v);
  }, [isControlled, onOpenChange]);

  const close = useCallback(() => {
    setClosing(true);
    closeTimer.current = setTimeout(() => { setOpen(false); setClosing(false); restoreFocus(); }, 200);
  }, [setOpen, restoreFocus]);

  useEffect(() => {
    if (open && !wasOpen.current) {
      wasOpen.current = true;
      previouslyFocused.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      (focusable()[0] ?? overlayRef.current?.querySelector<HTMLElement>('[data-brkta-dialog-content]'))?.focus();
    } else if (!open) restoreFocus();
  }, [open, focusable, restoreFocus]);

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); restoreFocus(); }, [restoreFocus]);

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (closeOnOutsideClick && e.target === overlayRef.current) close();
  }, [close, closeOnOutsideClick]);

  useEffect(() => {
    if (!open || closing) return;
    const h = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEscape) close();
    };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [open, closing, close, closeOnEscape]);

  return (
    <>
      {trigger && <span onClick={() => setOpen(true)}>{trigger}</span>}
      {(open || closing) && (
      <div ref={overlayRef} data-brkta-dialog-overlay="" data-closing={closing ? '' : undefined}
        onClick={handleOverlayClick} role="presentation"
      >
        <div data-brkta-dialog-content="" data-closing={closing ? '' : undefined}
          tabIndex={-1}
          onKeyDown={(event) => {
            if (event.key !== 'Tab') return;
            const controls = focusable();
            if (!controls.length) { event.preventDefault(); event.currentTarget.focus(); return; }
            if (event.shiftKey && document.activeElement === controls[0]) { event.preventDefault(); controls[controls.length - 1].focus(); }
            else if (!event.shiftKey && document.activeElement === controls[controls.length - 1]) { event.preventDefault(); controls[0].focus(); }
          }}
          role="dialog" aria-modal="true" aria-labelledby={title ? 'dlg-title' : undefined}
          aria-describedby={description ? 'dlg-desc' : undefined}
        >
          <button data-brkta-dialog-close="" aria-label={closeLabel} onClick={close}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
          {(title || description) && (
            <div data-brkta-dialog-header="">
              {title && <h2 data-brkta-dialog-title="" id="dlg-title">{title}</h2>}
              {description && <p data-brkta-dialog-description="" id="dlg-desc">{description}</p>}
            </div>
          )}
          {children}
          {footer && <div data-brkta-dialog-footer="">{footer}</div>}
        </div>
      </div>
      )}
    </>
  );
}
