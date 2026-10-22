import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-pressed'> {
  pressed?: boolean;
  disabled?: boolean;
  'aria-label'?: string;
  className?: string;
  children?: ReactNode;
  onPressedChange?: (pressed: boolean) => void;
}

export function Toggle({ pressed = false, disabled, 'aria-label': ariaLabel, className, children, onPressedChange, onClick, ...props }: ToggleProps) {
  return (
    <button
      type="button"
      data-brkta-toggle
      data-pressed={pressed ? '' : undefined}
      data-disabled={disabled ? '' : undefined}
      aria-pressed={pressed}
      aria-label={ariaLabel}
      disabled={disabled}
      className={className}
      onClick={(event) => {
        onPressedChange?.(!pressed);
        onClick?.(event);
      }}
      {...props}
    >
      {children}
    </button>
  );
}
