'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { DEFAULT_TOAST_DURATION } from '@brkta/ui-core/toast/toast-contract';
import type { ToastVariant } from '@brkta/ui-core/types/variant';

export interface ToastProps {
  open?: boolean;
  dismissLabel?: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export function Toast({
  open = true,
  dismissLabel = 'Dismiss',
  title,
  description,
  variant = 'default',
  duration,
  dismissible = true,
  onDismiss,
}: ToastProps) {
  const [visible, setVisible] = useState(open);
  const [closing, setClosing] = useState(false);
  const autoDismissTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const closingTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const autoDismissStartedAtRef = useRef(0);
  const remainingDurationRef = useRef(duration ?? DEFAULT_TOAST_DURATION);
  const autoDismissPausedRef = useRef(false);
  const dismissStartedRef = useRef(false);

  const dismiss = useCallback(() => {
    if (dismissStartedRef.current) return;
    dismissStartedRef.current = true;
    if (autoDismissTimerRef.current) clearTimeout(autoDismissTimerRef.current);
    setClosing(true);
    closingTimerRef.current = setTimeout(() => { setVisible(false); setClosing(false); onDismiss?.(); }, 200);
  }, [onDismiss]);

  const scheduleAutoDismiss = useCallback(() => {
    if (remainingDurationRef.current <= 0) return;
    autoDismissStartedAtRef.current = Date.now();
    autoDismissTimerRef.current = setTimeout(dismiss, remainingDurationRef.current);
  }, [dismiss]);

  const pauseAutoDismiss = useCallback(() => {
    if (autoDismissPausedRef.current || !autoDismissTimerRef.current || dismissStartedRef.current) return;

    clearTimeout(autoDismissTimerRef.current);
    autoDismissTimerRef.current = undefined;
    remainingDurationRef.current = Math.max(0, remainingDurationRef.current - (Date.now() - autoDismissStartedAtRef.current));
    autoDismissPausedRef.current = true;
  }, []);

  const resumeAutoDismiss = useCallback(() => {
    if (!autoDismissPausedRef.current || dismissStartedRef.current) return;

    autoDismissPausedRef.current = false;
    if (remainingDurationRef.current <= 0) {
      dismiss();
      return;
    }
    scheduleAutoDismiss();
  }, [dismiss, scheduleAutoDismiss]);

  useEffect(() => {
    if (!visible || closing || duration === 0) return;

    remainingDurationRef.current = duration ?? DEFAULT_TOAST_DURATION;
    dismissStartedRef.current = false;
    scheduleAutoDismiss();

    return () => {
      if (autoDismissTimerRef.current) clearTimeout(autoDismissTimerRef.current);
      autoDismissTimerRef.current = undefined;
    };
  }, [closing, duration, scheduleAutoDismiss, visible]);

  useEffect(() => () => {
    if (autoDismissTimerRef.current) clearTimeout(autoDismissTimerRef.current);
    if (closingTimerRef.current) clearTimeout(closingTimerRef.current);
  }, []);

  if (!visible && !closing) return null;

  return (
    <div className="glass-elevated" data-brkta-toast="" data-variant={variant} role={variant === 'destructive' ? 'alert' : 'status'} aria-live={variant === 'destructive' ? 'assertive' : 'polite'} data-closing={closing ? '' : undefined} onMouseEnter={pauseAutoDismiss} onMouseLeave={resumeAutoDismiss}>
      <div>
        {title && <div data-brkta-toast-title="">{title}</div>}
        {description && <div data-brkta-toast-description="">{description}</div>}
      </div>
      {dismissible && (
        <button data-brkta-toast-close="" aria-label={dismissLabel} onClick={dismiss}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      )}
    </div>
  );
}

// Toast viewport container for stacking
export function ToastViewport({ children }: { children: React.ReactNode }) {
  return <div data-brkta-toast-viewport="">{children}</div>;
}
