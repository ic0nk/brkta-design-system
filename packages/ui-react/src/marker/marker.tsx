'use client'; import type { MarkerContract } from '@brkta/ui-core/marker/marker-contract';
export function Marker({ variant='default', label, size='md' }: MarkerContract) {
  return <span data-brkta-marker="" data-size={size}>
    <span data-brkta-marker-dot="" data-variant={variant} />
    {label&&<span>{label}</span>}
  </span>;
}
