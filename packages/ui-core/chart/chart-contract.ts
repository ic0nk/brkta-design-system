export interface ChartContract {
  /** Chart type */
  type?: 'bar' | 'line' | 'donut' | 'metric';
  /** Chart title */
  title?: string;
  /** Chart description for accessibility */
  description?: string;
  /** Data array */
  data?: { label: string; value: number | string; color?: string }[];
  /** Height in pixels */
  height?: number;
  /** Show values on chart */
  showValues?: boolean;
}
