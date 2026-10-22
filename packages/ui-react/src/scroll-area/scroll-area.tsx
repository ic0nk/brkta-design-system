'use client';

import type { ReactNode } from 'react';
import type { ScrollAreaContract } from '@brkta/ui-core/scroll-area/scroll-area-contract';

export interface ScrollAreaProps extends ScrollAreaContract {
  children: ReactNode;
}

export function ScrollArea({
  children,
  maxHeight = '300px',
  maxWidth = '100%',
  horizontalScroll = false,
}: ScrollAreaProps) {
  const style: Record<string, string> = {
    '--scroll-area-max-height': maxHeight,
    '--scroll-area-max-width': maxWidth,
  } as Record<string, string>;

  return (
    <div
      data-brkta-scroll-area=""
      data-scroll={horizontalScroll ? 'horizontal' : undefined}
      style={style}
    >
      <div data-brkta-scroll-area-viewport="">
        <div data-brkta-scroll-area-content="">
          {children}
        </div>
      </div>
    </div>
  );
}
