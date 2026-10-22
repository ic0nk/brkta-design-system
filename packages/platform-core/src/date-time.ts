export type PlatformDateTimeFormatOptions = Intl.DateTimeFormatOptions & {
  dateStyle?: "full" | "long" | "medium" | "short";
  timeStyle?: "full" | "long" | "medium" | "short";
};

export function resolveTimezone(
  explicit?: string,
  profile?: string,
  detected?: string,
  fallback = "UTC",
): string {
  const candidates = [explicit, profile, detected].filter(
    (value): value is string => Boolean(value),
  );

  for (const candidate of candidates) {
    try {
      new Intl.DateTimeFormat("en", { timeZone: candidate }).format();
      return candidate;
    } catch {
      // Continue to the next signal instead of accepting an invalid zone.
    }
  }

  return fallback;
}

export function formatDateTime(
  value: Date | string | number,
  locale: string,
  timezone?: string,
  options: PlatformDateTimeFormatOptions = {},
): string {
  const formatterOptions = {
    dateStyle: "medium",
    timeStyle: "short",
    ...(timezone ? { timeZone: timezone } : {}),
    ...options,
  } as Intl.DateTimeFormatOptions;

  return new Intl.DateTimeFormat(locale, formatterOptions).format(new Date(value));
}
