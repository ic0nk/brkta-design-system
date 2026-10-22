export type ThemeToggleMode = 'light' | 'dark' | 'system';
export type ThemeToggleResolved = 'light' | 'dark';

export interface ThemeToggleContract {
  mode: ThemeToggleMode;
  resolved: ThemeToggleResolved;
  ariaLabel: string;
  disabled?: boolean;
}
