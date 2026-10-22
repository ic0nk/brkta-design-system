'use client';

import { useState, useRef, useCallback, type ReactNode } from 'react';
import type { ResizableContract } from '@brkta/ui-core/resizable/resizable-contract';

export interface ResizableProps extends ResizableContract {
  first: ReactNode;
  second: ReactNode;
}

export function Resizable({
  first,
  second,
  direction = 'horizontal',
  defaultSize = 50,
  minSize = 100,
  maxSize = Infinity,
  onResize,
}: ResizableProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const [panelSize, setPanelSize] = useState(defaultSize);
  const [dragging, setDragging] = useState(false);
  const isPercentage = defaultSize <= 100 && defaultSize > 0;

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    const handle = handleRef.current;
    if (!handle) return;
    if (typeof handle.setPointerCapture === 'function') {
      handle.setPointerCapture(e.pointerId);
    }
    setDragging(true);

    const startPos = direction === 'horizontal' ? e.clientX : e.clientY;
    const startSize = panelSize;
    const containerSize = direction === 'horizontal'
      ? containerRef.current?.offsetWidth ?? window.innerWidth
      : containerRef.current?.offsetHeight ?? window.innerHeight;

    const onPointerMove = (moveEvent: PointerEvent) => {
      const delta = direction === 'horizontal'
        ? moveEvent.clientX - startPos
        : moveEvent.clientY - startPos;

      let newSize: number;
      if (isPercentage) {
        const deltaPercent = (delta / containerSize) * 100;
        newSize = Math.max(10, Math.min(90, startSize + deltaPercent));
      } else {
        newSize = Math.max(minSize, Math.min(maxSize, startSize + delta));
      }

      setPanelSize(newSize);
      onResize?.([newSize, 100 - (isPercentage ? newSize : 0)]);
    };

    const onPointerUp = () => {
      setDragging(false);
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('pointercancel', onPointerUp);
      if (handle && typeof handle.releasePointerCapture === 'function') {
        handle.releasePointerCapture(e.pointerId);
      }
    };

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
    document.addEventListener('pointercancel', onPointerUp);
  }, [direction, panelSize, minSize, maxSize, isPercentage, onResize]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const delta = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 10
      : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -10 : 0;
    if (delta === 0) return;
    e.preventDefault();
    const newSize = Math.max(minSize, Math.min(maxSize, panelSize + delta));
    setPanelSize(newSize);
    onResize?.([newSize, 100 - (isPercentage ? newSize : 0)]);
  }, [panelSize, minSize, maxSize, isPercentage, onResize]);

  const firstStyle: React.CSSProperties = isPercentage
    ? { flexBasis: `${panelSize}%`, flexGrow: 0 }
    : { width: direction === 'horizontal' ? `${panelSize}px` : undefined, height: direction === 'vertical' ? `${panelSize}px` : undefined };

  const secondStyle: React.CSSProperties = { flex: 1, minWidth: 0, minHeight: 0 };

  return (
    <div ref={containerRef} data-brkta-resizable="" data-direction={direction}>
      <div data-brkta-resizable-panel="" style={firstStyle}>
        {first}
      </div>
      <div
        ref={handleRef}
        data-brkta-resizable-handle=""
        data-dragging={dragging ? '' : undefined}
        onPointerDown={handlePointerDown}
        onKeyDown={handleKeyDown}
        role="separator"
        aria-label="Resize panels"
        aria-orientation={direction}
        aria-valuenow={Math.round(panelSize)}
        aria-valuemin={10}
        aria-valuemax={90}
        tabIndex={0}
        style={{ touchAction: 'none' }}
      />
      <div data-brkta-resizable-panel="" style={secondStyle}>
        {second}
      </div>
    </div>
  );
}
