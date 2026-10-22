import { type HTMLAttributes } from 'react';

export interface KbdProps extends HTMLAttributes<HTMLSpanElement> {
  keys: string;
}

export function Kbd({
  keys,
  className = '',
  ...props
}: KbdProps) {
  return (
    <kbd data-brkta-kbd="" className={className} {...props}>
      {keys}
    </kbd>
  );
}
