'use client';
import { useState, useRef, useCallback, type ReactNode } from 'react';

export interface HoverCardProps {
  openDelay?: number;
  closeDelay?: number;
  side?: 'top' | 'bottom';
  className?: string;
  trigger: ReactNode;
  children?: ReactNode;
}

export function HoverCard({
  openDelay = 200,
  closeDelay = 150,
  side = 'bottom',
  className,
  trigger,
  children,
}: HoverCardProps) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const openTimer = useRef<ReturnType<typeof setTimeout>>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(null);

  const clearTimers = useCallback(() => {
    if (openTimer.current) { clearTimeout(openTimer.current); openTimer.current = null; }
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
  }, []);

  const doOpen = useCallback(() => {
    clearTimers();
    setClosing(false);
    openTimer.current = setTimeout(() => setOpen(true), openDelay);
  }, [openDelay, clearTimers]);

  const doClose = useCallback(() => {
    clearTimers();
    setClosing(true);
    closeTimer.current = setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, closeDelay);
  }, [closeDelay, clearTimers]);

  return (
    <div data-brkta-hover-card className={className} onMouseEnter={doOpen} onMouseLeave={doClose} onFocus={doOpen} onBlur={doClose}>
      <div data-brkta-hover-card-trigger tabIndex={0} role="button" aria-expanded={open} aria-haspopup="dialog">
        {trigger}
      </div>
      {open && (
        <div data-brkta-hover-card-content data-side={side} data-closing={closing ? '' : undefined} role="dialog">
          {children}
        </div>
      )}
    </div>
  );
}
