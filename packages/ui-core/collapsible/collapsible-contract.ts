export interface CollapsibleContract {
  /** Whether the collapsible is open */
  open?: boolean;
  /** Uncontrolled default open state */
  defaultOpen?: boolean;
  /** Trigger label */
  label: string;
  /** Content when expanded */
  content?: unknown;
  /** Whether the collapsible is disabled */
  disabled?: boolean;
  /**
   * Renders the trigger as a compact, content-sized control (small chevron +
   * short label) instead of the default full-width bar. The expanded panel
   * still spans the full width of the container. Defaults to false, which
   * preserves the existing full-width trigger behavior unchanged.
   */
  compact?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
}
