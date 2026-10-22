'use client'; import type { ReactNode } from 'react'; import type { MessageScrollerContract } from '@brkta/ui-core/message-scroller/message-scroller-contract';
export function MessageScroller({ children }: { children?: ReactNode } & MessageScrollerContract) {
  return <div data-brkta-message-scroller="">{children}</div>;
}
