export const THEME_MODES = ["light", "dark", "system"] as const;

export type ThemeMode = (typeof THEME_MODES)[number];
export type ResolvedTheme = Exclude<ThemeMode, "system">;

export interface ThemeSnapshot {
  mode: ThemeMode;
  resolved: ResolvedTheme;
}

export interface ThemeEngine {
  getSnapshot(): ThemeSnapshot;
  setMode(mode: ThemeMode): ThemeSnapshot;
  setSystemTheme(theme: ResolvedTheme): ThemeSnapshot;
  subscribe(listener: (snapshot: ThemeSnapshot) => void): () => void;
}

export function isThemeMode(value: unknown): value is ThemeMode {
  return typeof value === "string" && THEME_MODES.includes(value as ThemeMode);
}

export function resolveTheme(
  mode: ThemeMode,
  systemTheme: ResolvedTheme = "light",
): ResolvedTheme {
  return mode === "system" ? systemTheme : mode;
}

export function createThemeEngine(
  initialMode: ThemeMode = "system",
  initialSystemTheme: ResolvedTheme = "light",
): ThemeEngine {
  let mode = initialMode;
  let systemTheme = initialSystemTheme;
  const listeners = new Set<(snapshot: ThemeSnapshot) => void>();

  const getSnapshot = (): ThemeSnapshot => ({
    mode,
    resolved: resolveTheme(mode, systemTheme),
  });

  const notify = () => {
    const snapshot = getSnapshot();
    listeners.forEach((listener) => listener(snapshot));
    return snapshot;
  };

  return {
    getSnapshot,
    setMode(nextMode) {
      mode = nextMode;
      return notify();
    },
    setSystemTheme(nextTheme) {
      systemTheme = nextTheme;
      return notify();
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}
