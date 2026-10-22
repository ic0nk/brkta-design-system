'use client';

import { useState, useCallback, useId } from 'react';
import type { CollapsibleContract } from '@brkta/ui-core/collapsible/collapsible-contract';

export interface CollapsibleProps extends CollapsibleContract {}

export function Collapsible({
  open: controlledOpen,
  defaultOpen = false,
  label,
  content,
  disabled = false,
  compact = false,
  onOpenChange,
}: CollapsibleProps) {
  const id = useId();
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const currentOpen = isControlled ? controlledOpen : internalOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setInternalOpen(next);
      }
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );

  const toggle = useCallback(() => {
    if (!disabled) {
      setOpen(!currentOpen);
    }
  }, [currentOpen, disabled, setOpen]);

  const triggerId = `collapsible-trigger-${id}`;
  const panelId = `collapsible-panel-${id}`;

  return (
    <div data-brkta-collapsible="" data-compact={compact ? '' : undefined}>
      <button
        data-brkta-collapsible-trigger=""
        data-disabled={disabled ? '' : undefined}
        id={triggerId}
        aria-expanded={currentOpen ? 'true' : 'false'}
        aria-controls={panelId}
        aria-disabled={disabled || undefined}
        disabled={disabled}
        onClick={toggle}
        type="button"
      >
        <span>{label}</span>
        <span data-brkta-collapsible-chevron="" aria-hidden="true" />
      </button>
      <div
        data-brkta-collapsible-panel=""
        data-open={currentOpen ? '' : undefined}
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
      >
        <div>
          <div data-brkta-collapsible-content="">
            {content as React.ReactNode}
          </div>
        </div>
      </div>
    </div>
  );
}
