export const DEFAULT_REGION = "EG";

export type RegionSource =
  "explicit" | "profile" | "stored" | "browser" | "ip" | "default";

export interface RegionSignals {
  explicit?: string;
  profile?: string;
  stored?: string;
  browser?: string;
  ip?: string;
}

export interface RegionResolution {
  code: string;
  source: RegionSource;
}

export function normalizeRegion(
  value: string | undefined,
  fallback = DEFAULT_REGION,
) {
  if (!value) return fallback;
  const normalized = value.trim().toUpperCase();
  return /^[A-Z]{2}$/.test(normalized) ? normalized : fallback;
}

export function resolveRegion(
  signals: RegionSignals,
  fallback = DEFAULT_REGION,
): RegionResolution {
  const ordered: Array<[RegionSource, string | undefined]> = [
    ["explicit", signals.explicit],
    ["profile", signals.profile],
    ["stored", signals.stored],
    ["browser", signals.browser],
    ["ip", signals.ip],
  ];

  for (const [source, value] of ordered) {
    const normalized = normalizeRegion(value, "");
    if (normalized) return { code: normalized, source };
  }

  return { code: normalizeRegion(fallback), source: "default" };
}
