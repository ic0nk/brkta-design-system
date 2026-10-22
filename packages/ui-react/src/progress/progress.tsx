import { type HTMLAttributes } from 'react';

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  ariaLabel?: string;
}

export function Progress({
  value,
  max = 100,
  size = 'md',
  ariaLabel,
  className = '',
  ...props
}: ProgressProps) {
  const percent = Math.min(Math.max(0, (value / max) * 100), 100);

  return (
    <div
      data-brkta-progress=""
      data-size={size}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={ariaLabel ?? `${Math.round(percent)}%`}
      className={className}
      {...props}
    >
      <div
        data-brkta-progress-indicator=""
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
