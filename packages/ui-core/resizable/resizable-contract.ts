export interface ResizableContract {
  /** Direction of the split */
  direction?: 'horizontal' | 'vertical';
  /** Initial size of the first panel (percentage or px) */
  defaultSize?: number;
  /** Minimum size of the first panel in pixels */
  minSize?: number;
  /** Maximum size of the first panel in pixels */
  maxSize?: number;
  /** Callback when panel sizes change */
  onResize?: (sizes: number[]) => void;
}
