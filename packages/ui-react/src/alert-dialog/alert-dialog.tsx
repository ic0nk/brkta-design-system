'use client';

import { useState, useRef, useEffect, useCallback, type ReactNode } from 'react';
import { Button } from '../button/button';

export interface AlertDialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: ReactNode;
  title: string;
  description: string;
  cancelLabel?: string;
  confirmLabel?: string;
  destructive?: boolean;
  loading?: boolean;
  loadingLabel?: string;
  disabled?: boolean;
  closeOnConfirm?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export function AlertDialog({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  trigger,
  title,
  description,
  cancelLabel = 'Cancel',
  confirmLabel = 'Continue',
  destructive = false,
  loading = false,
  loadingLabel = 'Loading',
  disabled = false,
  closeOnConfirm = true,
  onConfirm,
  onCancel,
}: AlertDialogProps) {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = isControlled ? controlledOpen : internalOpen;
  const [closing, setClosing] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const setOpen = useCallback((v: boolean) => {
    if (!isControlled) setInternalOpen(v);
    onOpenChange?.(v);
  }, [isControlled, onOpenChange]);

  const close = useCallback(() => {
    setClosing(true);
    setTimeout(() => { setOpen(false); setClosing(false); }, 200);
  }, [setOpen]);

  const handleConfirm = useCallback(() => {
    if (loading || disabled || closing) return;
    onConfirm?.();
    if (closeOnConfirm) close();
  }, [close, closeOnConfirm, closing, disabled, loading, onConfirm]);

  const handleCancel = useCallback(() => {
    onCancel?.();
    close();
  }, [close, onCancel]);

  useEffect(() => {
    if (!open || closing) {
      if (!open && previouslyFocused.current) {
        previouslyFocused.current.focus();
        previouslyFocused.current = null;
      }
      return;
    }
    previouslyFocused.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const content = overlayRef.current?.querySelector<HTMLElement>('[data-brkta-dialog-content]');
    const first = content?.querySelector<HTMLElement>('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
    first?.focus();
    const h = (e: globalThis.KeyboardEvent) => { if (e.key === 'Escape') handleCancel(); };
    document.addEventListener('keydown', h);
    return () => {
      document.removeEventListener('keydown', h);
    };
  }, [open, closing, handleCancel]);

  if (!open && !closing) return trigger ? <span onClick={() => setOpen(true)}>{trigger}</span> : null;

  return (
    <>
      {trigger && <span onClick={() => setOpen(true)}>{trigger}</span>}
      <div ref={overlayRef} data-brkta-dialog-overlay="" data-closing={closing ? '' : undefined}
        onClick={(e) => { if (e.target === overlayRef.current) handleCancel(); }} role="presentation"
      >
        <div data-brkta-dialog-content="" data-closing={closing ? '' : undefined}
          onKeyDown={(e) => {
            if (e.key !== 'Tab') return;
            const nodes = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'));
            if (!nodes.length) return;
            const first = nodes[0];
            const last = nodes[nodes.length - 1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
          }}
          role="alertdialog" aria-modal="true" aria-labelledby="adlg-title" aria-describedby="adlg-desc"
        >
          <div data-brkta-dialog-header="">
            <h2 data-brkta-dialog-title="" id="adlg-title">{title}</h2>
            <p data-brkta-dialog-description="" id="adlg-desc">{description}</p>
          </div>
          <div data-brkta-dialog-footer="">
            <Button variant="outline" size="sm" onClick={handleCancel}>{cancelLabel}</Button>
            <Button variant={destructive ? 'destructive' : 'primary'} size="sm" loading={loading} loadingLabel={loadingLabel} disabled={disabled} onClick={handleConfirm}>{confirmLabel}</Button>
          </div>
        </div>
      </div>
    </>
  );
}
