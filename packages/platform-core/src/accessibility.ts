export const REDUCED_MOTION_PREFERENCES = [
  "system",
  "reduce",
  "no-preference",
] as const;

export type ReducedMotionPreference =
  (typeof REDUCED_MOTION_PREFERENCES)[number];

export function resolveReducedMotion(
  preference: ReducedMotionPreference = "system",
  systemPrefersReducedMotion = false,
): boolean {
  if (preference === "system") return systemPrefersReducedMotion;
  return preference === "reduce";
}
