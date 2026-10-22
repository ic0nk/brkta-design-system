import type { ThemeToggleMode, ThemeToggleResolved } from '@brkta/ui-core/theme-toggle/theme-toggle-contract';
import { Button } from '../button/button';
import { AnimatedMonitor, AnimatedMoon, AnimatedSun } from '../site-shell/site-icons';

const MODE_ORDER: readonly ThemeToggleMode[] = ['system', 'light', 'dark'];

export interface ThemeToggleProps {
  mode?: ThemeToggleMode;
  resolved?: ThemeToggleResolved;
  ariaLabel: string;
  disabled?: boolean;
  onModeChange?: (mode: ThemeToggleMode) => void;
}

export function ThemeToggle({
  mode = 'system',
  resolved = 'light',
  ariaLabel,
  disabled,
  onModeChange,
}: ThemeToggleProps) {
  const cycleMode = () => {
    const nextIndex = (MODE_ORDER.indexOf(mode) + 1) % MODE_ORDER.length;
    onModeChange?.(MODE_ORDER[nextIndex]);
  };

  const icon = mode === 'system'
    ? <AnimatedMonitor size={18} />
    : mode === 'dark'
      ? <AnimatedMoon size={18} />
      : <AnimatedSun size={18} />;

  return <Button
    variant="ghost"
    size="icon-md"
    disabled={disabled}
    accessibleLabel={ariaLabel}
    iconBefore={icon}
    onClick={cycleMode}
    data-brkta-theme-toggle=""
  />;
}
