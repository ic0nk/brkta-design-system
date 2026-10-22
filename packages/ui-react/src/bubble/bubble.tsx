'use client'; import type { BubbleContract } from '@brkta/ui-core/bubble/bubble-contract';
export function Bubble({ variant='incoming', children, timestamp, status }: BubbleContract) {
  return <div data-brkta-bubble="" data-variant={variant}>
    <div>{children as React.ReactNode}</div>
    {(timestamp||status)&&<div data-brkta-bubble-time="">{timestamp}{status&&` · ${status}`}</div>}
  </div>;
}
