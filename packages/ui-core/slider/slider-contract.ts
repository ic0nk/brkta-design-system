export interface SliderContract {
  /** Current value */
  value?: number;
  /** Default value (uncontrolled) */
  defaultValue?: number;
  /** Minimum value (applies to both thumbs in range mode) */
  min?: number;
  /** Maximum value (applies to both thumbs in range mode) */
  max?: number;
  /** Step increment (applies to both thumbs in range mode) */
  step?: number;
  /** Whether the slider is disabled (applies to both thumbs in range mode) */
  disabled?: boolean;
  /** Callback when value changes */
  onValueChange?: (value: number) => void;
  /** Accessible label for the slider */
  ariaLabel?: string;
  /** Accessible labelledby for the slider */
  ariaLabelledby?: string;

  /**
   * Opts into two-thumb range mode. Defaults to false (single-thumb behavior,
   * unchanged). In range mode, `value`/`defaultValue`/`onValueChange` are
   * ignored in favor of the `lowerValue`/`upperValue` pair below.
   */
  range?: boolean;
  /** Controlled lower-bound value (range mode) */
  lowerValue?: number;
  /** Controlled upper-bound value (range mode) */
  upperValue?: number;
  /** Default lower-bound value, uncontrolled (range mode) */
  defaultLowerValue?: number;
  /** Default upper-bound value, uncontrolled (range mode) */
  defaultUpperValue?: number;
  /** Callback when either bound changes (range mode); fires with both bounds together */
  onRangeChange?: (range: { lower: number; upper: number }) => void;
  /** Accessible label for the lower-bound thumb (range mode) */
  lowerAriaLabel?: string;
  /** Accessible labelledby for the lower-bound thumb (range mode) */
  lowerAriaLabelledby?: string;
  /** Accessible label for the upper-bound thumb (range mode) */
  upperAriaLabel?: string;
  /** Accessible labelledby for the upper-bound thumb (range mode) */
  upperAriaLabelledby?: string;
}
