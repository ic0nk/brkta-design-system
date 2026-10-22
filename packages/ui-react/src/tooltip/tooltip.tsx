'use client';

import { useState, useRef, useCallback, useId, type ReactNode } from 'react';

export interface TooltipProps {
  content: string;
  children: ReactNode;
  delay?: number;
}

export function Tooltip({ content, children, delay = 500 }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const tooltipId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  const show = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    timerRef.current = setTimeout(() => { setOpen(true); setClosing(false); }, delay);
  }, [delay]);

  const hide = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setClosing(true);
    closeTimerRef.current = setTimeout(() => { setOpen(false); setClosing(false); }, 160);
  }, []);

  return (
    <div ref={containerRef} data-brkta-tooltip="" data-open={open ? '' : undefined}
      onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}
    >
      <span data-brkta-tooltip-trigger="" aria-describedby={tooltipId} tabIndex={0}>
        {children}
      </span>
      {(open || closing) && (
        <div data-brkta-tooltip-content="" data-closing={closing ? '' : undefined} id={tooltipId} role="tooltip">
          {content}
        </div>
      )}
    </div>
  );
}
