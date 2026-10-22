export const DEFAULT_LOCALE = "en";
export const RTL_LANGUAGE_CODES = new Set(["ar", "fa", "he", "ur"]);

export type Direction = "ltr" | "rtl";

export interface LocaleSignals {
  explicit?: string;
  profile?: string;
  stored?: string;
  browser?: string;
  detected?: string;
}

export function normalizeLocale(
  value: string | undefined,
  fallback = DEFAULT_LOCALE,
): string {
  if (!value) return fallback;

  try {
    const LocaleConstructor = (
      Intl as typeof Intl & {
        Locale: new (locale: string) => { toString(): string };
      }
    ).Locale;
    return new LocaleConstructor(value.replace(/_/g, "-")).toString();
  } catch {
    return fallback;
  }
}

export function getLocaleLanguage(locale: string): string {
  return normalizeLocale(locale).split("-")[0].toLowerCase();
}

export function getLocaleDirection(locale: string): Direction {
  return RTL_LANGUAGE_CODES.has(getLocaleLanguage(locale)) ? "rtl" : "ltr";
}

function findSupportedLocale(value: string, supported: readonly string[]) {
  const normalized = normalizeLocale(value);
  const language = getLocaleLanguage(normalized);
  return (
    supported.find((candidate) => normalizeLocale(candidate) === normalized) ??
    supported.find((candidate) => getLocaleLanguage(candidate) === language)
  );
}

export function resolveLocale(
  signals: LocaleSignals,
  supported: readonly string[] = [],
  fallback = DEFAULT_LOCALE,
): string {
  const candidates = [
    signals.explicit,
    signals.profile,
    signals.stored,
    signals.browser,
    signals.detected,
  ].filter((value): value is string => Boolean(value));

  if (!supported.length) return normalizeLocale(candidates[0], fallback);

  for (const candidate of candidates) {
    const match = findSupportedLocale(candidate, supported);
    if (match) return normalizeLocale(match, fallback);
  }

  return normalizeLocale(supported[0] ?? fallback, fallback);
}

export type MessageCatalog = Record<string, string>;

export function createTranslator(
  catalog: MessageCatalog,
  fallbackCatalog: MessageCatalog = {},
) {
  return (key: string, values: Record<string, string | number> = {}) => {
    const template = catalog[key] ?? fallbackCatalog[key] ?? key;
    return template.replace(/\{\{(\w+)\}\}/g, (_, name: string) =>
      String(values[name] ?? `{{${name}}}`),
    );
  };
}
