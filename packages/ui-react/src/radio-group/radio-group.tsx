'use client';

import {
  createContext,
  useContext,
  useCallback,
  type HTMLAttributes,
  type InputHTMLAttributes,
} from 'react';

// ── Context ──────────────────────────────────────────────────────────────

interface RadioGroupContextValue {
  name?: string;
  value?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  onValueChange?: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue>({});

// ── RadioGroup ───────────────────────────────────────────────────────────

export interface RadioGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Currently selected value */
  value?: string;
  /** Name attribute applied to all radio inputs */
  name?: string;
  /** Whether the entire group is disabled */
  disabled?: boolean;
  /** Whether the group is in an invalid state */
  invalid?: boolean;
  /** Whether a selection is required */
  required?: boolean;
  /** Orientation of the radio group */
  orientation?: 'horizontal' | 'vertical';
  /** Callback fired when the selected value changes */
  onValueChange?: (value: string) => void;
}

/**
 * BRKTA RadioGroup — renders a `<div>` wrapper with framework-neutral
 * data attributes (`data-brkta-radio-group`, `data-orientation`,
 * `data-invalid`) that are targeted by the CSS
 * in `@brkta/ui-core/radio-group/radio-group.css`.
 */
export function RadioGroup({
  value,
  name,
  disabled = false,
  invalid = false,
  required = false,
  orientation = 'vertical',
  onValueChange,
  className = '',
  children,
  ...props
}: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider
      value={{ name, value, disabled, invalid, required, onValueChange }}
    >
      <div
        data-brkta-radio-group=""
        data-orientation={orientation}
        data-invalid={invalid || undefined}
        className={className}
        role="radiogroup"
        aria-invalid={invalid || undefined}
        {...props}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

// ── Radio ────────────────────────────────────────────────────────────────

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value'> {
  /** The value of this radio option */
  value: string;
  /** Label text displayed beside the radio */
  label?: string;
}

/**
 * BRKTA Radio — renders a `<label>` containing a hidden
 * `<input type="radio">` and a styled indicator span,
 * with framework-neutral data attributes (`data-brkta-radio`)
 * targeted by the CSS in `@brkta/ui-core/radio-group/radio-group.css`.
 */
export function Radio({
  value,
  label,
  disabled: radioDisabled,
  checked: radioChecked,
  className = '',
  ...props
}: RadioProps) {
  const group = useContext(RadioGroupContext);

  const isDisabled = radioDisabled ?? group.disabled;
  const isChecked = radioChecked ?? group.value === value;

  const handleChange = useCallback(() => {
    group.onValueChange?.(value);
  }, [group, value]);

  return (
    <label
      data-brkta-radio=""
      data-disabled={isDisabled || undefined}
      data-checked={isChecked || undefined}
      className={className}
    >
      <input
        type="radio"
        name={group.name}
        value={value}
        checked={isChecked}
        disabled={isDisabled}
        required={group.required}
        aria-invalid={group.invalid || undefined}
        onChange={handleChange}
        {...props}
      />
      <span className="brkta-radio-indicator" aria-hidden="true" />
      {label && <span className="brkta-radio-label">{label}</span>}
    </label>
  );
}
