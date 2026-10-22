import type { HTMLAttributes } from 'react';
import { Progress } from '../progress/progress';

export interface PasswordStrengthProps extends HTMLAttributes<HTMLDivElement> {
  score: number;
  max?: number;
  label: string;
  description: string;
  ariaLabel?: string;
}

export function PasswordStrength({ score, max = 4, label, description, ariaLabel, className = '', ...props }: PasswordStrengthProps) {
  return (
    <div data-brkta-password-strength="" className={className} {...props}>
      <Progress value={score} max={max} size="sm" ariaLabel={ariaLabel ?? `${label}: ${description}`} />
      <span data-brkta-password-strength-status="" role="status" aria-live="polite">
        {label}: {description}
      </span>
    </div>
  );
}
