import { normalizeCurrency, type CurrencyCode } from "./currency";
import { normalizeLocale } from "./locale";
import { normalizeRegion } from "./region";
import { isThemeMode, type ThemeMode } from "./theme";
import {
  REDUCED_MOTION_PREFERENCES,
  type ReducedMotionPreference,
} from "./accessibility";

export const PLATFORM_PREFERENCES_STORAGE_KEY = "brkta:platform-preferences";

export interface PlatformPreferences {
  theme: ThemeMode;
  locale: string;
  currency: CurrencyCode;
  region: string;
  timezone: string;
  reducedMotion: ReducedMotionPreference;
  sidebarCollapsed: boolean;
}

export type PreferenceLayer = Partial<PlatformPreferences>;

export interface PreferenceSignals {
  explicit?: PreferenceLayer;
  profile?: PreferenceLayer;
  stored?: PreferenceLayer;
  detected?: PreferenceLayer;
  defaults?: PreferenceLayer;
}

export const DEFAULT_PLATFORM_PREFERENCES: PlatformPreferences = {
  theme: "system",
  locale: "en",
  currency: "EGP",
  region: "EG",
  timezone: "UTC",
  reducedMotion: "system",
  sidebarCollapsed: false,
};

function firstValue<Key extends keyof PlatformPreferences>(
  key: Key,
  signals: PreferenceSignals,
) {
  return (
    signals.explicit?.[key] ??
    signals.profile?.[key] ??
    signals.stored?.[key] ??
    signals.detected?.[key] ??
    signals.defaults?.[key] ??
    DEFAULT_PLATFORM_PREFERENCES[key]
  );
}

export function resolvePlatformPreferences(
  signals: PreferenceSignals = {},
): PlatformPreferences {
  const theme = firstValue("theme", signals);
  const reducedMotion = firstValue("reducedMotion", signals);

  return {
    theme: isThemeMode(theme) ? theme : DEFAULT_PLATFORM_PREFERENCES.theme,
    locale: normalizeLocale(String(firstValue("locale", signals))),
    currency: normalizeCurrency(String(firstValue("currency", signals))),
    region: normalizeRegion(String(firstValue("region", signals))),
    timezone: String(firstValue("timezone", signals)),
    sidebarCollapsed: firstValue("sidebarCollapsed", signals) === true,
    reducedMotion:
      typeof reducedMotion === "string" &&
      REDUCED_MOTION_PREFERENCES.includes(
        reducedMotion as ReducedMotionPreference,
      )
        ? (reducedMotion as ReducedMotionPreference)
        : DEFAULT_PLATFORM_PREFERENCES.reducedMotion,
  };
}

export interface PreferenceStore {
  get(): PlatformPreferences;
  set(next: PreferenceLayer): PlatformPreferences;
  subscribe(listener: (preferences: PlatformPreferences) => void): () => void;
}

export function createMemoryPreferenceStore(
  initial: PreferenceLayer = {},
): PreferenceStore {
  let current = resolvePlatformPreferences({ explicit: initial });
  const listeners = new Set<(preferences: PlatformPreferences) => void>();

  return {
    get: () => current,
    set(next) {
      current = resolvePlatformPreferences({ explicit: next, stored: current });
      listeners.forEach((listener) => listener(current));
      return current;
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

export function createBrowserPreferenceStore(
  storage: Storage | undefined = typeof window === "undefined"
    ? undefined
    : window.localStorage,
  key = PLATFORM_PREFERENCES_STORAGE_KEY,
): PreferenceStore {
  let stored: PreferenceLayer = {};

  try {
    const raw = storage?.getItem(key);
    stored = raw ? (JSON.parse(raw) as PreferenceLayer) : {};
  } catch {
    stored = {};
  }

  const store = createMemoryPreferenceStore(stored);
  const originalSet = store.set;

  return {
    get: store.get,
    set(next) {
      const preferences = originalSet(next);
      try {
        storage?.setItem(key, JSON.stringify(preferences));
      } catch {
        // Storage can be unavailable in private or restricted browser contexts.
      }
      return preferences;
    },
    subscribe: store.subscribe,
  };
}
