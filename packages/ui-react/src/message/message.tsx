'use client'; import type { MessageContract } from '@brkta/ui-core/message/message-contract';
export function Message({ variant='incoming', avatar, name, timestamp, body, status }: MessageContract) {
  return <div data-brkta-message="" data-variant={variant}>
    {variant!=='system'&&<div data-brkta-message-avatar="">{avatar||name?.[0]||'?'}</div>}
    <div data-brkta-message-content="">
      {name&&<div data-brkta-message-name="">{name}</div>}
      <div>{body as React.ReactNode}</div>
      {timestamp&&<div data-brkta-message-time="">{timestamp}{status&&` · ${status}`}</div>}
    </div>
  </div>;
}
