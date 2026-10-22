export const CONSENT_CATEGORIES = [
  "necessary",
  "analytics",
  "marketing",
  "personalization",
  "location",
] as const;

export type ConsentCategory = (typeof CONSENT_CATEGORIES)[number];

export interface ConsentState {
  version: string;
  updatedAt: string;
  grants: Partial<Record<ConsentCategory, boolean>>;
}

export function createConsentState(
  version: string,
  grants: Partial<Record<ConsentCategory, boolean>> = {},
  updatedAt = new Date().toISOString(),
): ConsentState {
  return { version, updatedAt, grants: { necessary: true, ...grants } };
}

export function hasConsent(
  state: ConsentState | undefined,
  category: ConsentCategory,
): boolean {
  return category === "necessary" || state?.grants[category] === true;
}
