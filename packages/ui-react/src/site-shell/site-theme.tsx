"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  createBrowserPreferenceStore,
  createThemeEngine,
  isThemeMode,
  PLATFORM_PREFERENCES_STORAGE_KEY,
  type PreferenceStore,
  type ThemeEngine,
  type ThemeMode,
  type ThemeSnapshot,
} from "@brkta/platform-core";

const THEME_MODE_ORDER: readonly ThemeMode[] = ["system", "light", "dark"];
const THEME_TRANSITION_DURATION = 280;

export interface SiteThemeContextValue extends ThemeSnapshot {
  setMode: (mode: ThemeMode) => void;
  cycleMode: () => void;
}

const SiteThemeContext = createContext<SiteThemeContextValue | null>(null);

function applyTheme(snapshot: ThemeSnapshot, transition: boolean) {
  const root = document.documentElement;
  root.classList.toggle("dark", snapshot.resolved === "dark");
  root.dataset.theme = snapshot.resolved;
  root.dataset.themeMode = snapshot.mode;
  root.style.colorScheme = snapshot.resolved;

  const reduced =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!transition || reduced) {
    delete root.dataset.themeTransition;
    delete root.dataset.themeTransitionId;
    return;
  }

  const transitionId = String(
    Number.parseInt(root.dataset.themeTransitionId ?? "0", 10) + 1,
  );
  root.dataset.themeTransitionId = transitionId;
  root.dataset.themeTransition = "on";
  window.setTimeout(() => {
    if (root.dataset.themeTransitionId === transitionId) {
      delete root.dataset.themeTransition;
      delete root.dataset.themeTransitionId;
    }
  }, THEME_TRANSITION_DURATION);
}

export interface SiteThemeProviderProps {
  children: ReactNode;
  defaultMode?: ThemeMode;
}

function getStoredThemeMode(defaultMode: ThemeMode): ThemeMode {
  if (typeof window === "undefined") return defaultMode;

  try {
    const raw = window.localStorage.getItem(PLATFORM_PREFERENCES_STORAGE_KEY);
    const stored = raw ? (JSON.parse(raw) as { theme?: unknown }) : undefined;
    return isThemeMode(stored?.theme) ? stored.theme : defaultMode;
  } catch {
    return defaultMode;
  }
}

function SiteThemeProviderRoot({
  children,
  defaultMode = "system",
}: SiteThemeProviderProps) {
  const storeRef = useRef<PreferenceStore | null>(null);
  const engineRef = useRef<ThemeEngine | null>(null);
  const allowThemeTransitionRef = useRef(false);

  if (!storeRef.current) storeRef.current = createBrowserPreferenceStore();
  if (!engineRef.current) engineRef.current = createThemeEngine(defaultMode);

  const [snapshot, setSnapshot] = useState<ThemeSnapshot>(() =>
    engineRef.current!.getSnapshot(),
  );

  useLayoutEffect(() => {
    const engine = engineRef.current!;
    const mediaQuery =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-color-scheme: dark)")
        : undefined;

    const unsubscribe = engine.subscribe((nextSnapshot) => {
      setSnapshot(nextSnapshot);
      applyTheme(nextSnapshot, allowThemeTransitionRef.current);
    });

    const handleSystemThemeChange = () => {
      engine.setSystemTheme(mediaQuery?.matches ? "dark" : "light");
    };

    engine.setSystemTheme(mediaQuery?.matches ? "dark" : "light");
    engine.setMode(getStoredThemeMode(defaultMode));
    applyTheme(engine.getSnapshot(), false);
    allowThemeTransitionRef.current = true;

    if (mediaQuery) {
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", handleSystemThemeChange);
      } else {
        mediaQuery.addListener(handleSystemThemeChange);
      }
    }

    return () => {
      unsubscribe();
      if (mediaQuery?.removeEventListener) {
        mediaQuery.removeEventListener("change", handleSystemThemeChange);
      } else {
        mediaQuery?.removeListener(handleSystemThemeChange);
      }
    };
  }, []);

  const setMode = useCallback((mode: ThemeMode) => {
    const nextPreferences = storeRef.current!.set({ theme: mode });
    engineRef.current!.setMode(nextPreferences.theme);
  }, []);

  const cycleMode = useCallback(() => {
    const currentIndex = THEME_MODE_ORDER.indexOf(snapshot.mode);
    const nextMode =
      THEME_MODE_ORDER[(currentIndex + 1) % THEME_MODE_ORDER.length];
    setMode(nextMode);
  }, [setMode, snapshot.mode]);

  const value = useMemo(
    () => ({ ...snapshot, setMode, cycleMode }),
    [cycleMode, setMode, snapshot],
  );

  return (
    <SiteThemeContext.Provider value={value}>
      {children}
    </SiteThemeContext.Provider>
  );
}

/**
 * Reuses an app-level provider when one already exists. This keeps the shared
 * SiteExperience self-contained for apps that mount it directly while
 * preventing nested theme engines when a route layout owns the provider.
 */
export function SiteThemeProvider(props: SiteThemeProviderProps) {
  const parentContext = useContext(SiteThemeContext);
  if (parentContext) return <>{props.children}</>;

  return <SiteThemeProviderRoot {...props} />;
}

export function useSiteTheme() {
  const context = useContext(SiteThemeContext);
  if (!context) {
    throw new Error("useSiteTheme must be used within SiteThemeProvider.");
  }
  return context;
}
