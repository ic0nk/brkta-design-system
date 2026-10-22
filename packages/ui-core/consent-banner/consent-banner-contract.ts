/** Presentation contract only. Consent state and tracking belong to consumers. */
export type ConsentBannerPlacement = "fixed" | "embedded";

export interface ConsentBannerContent {
  title: string;
  description: string;
  acceptLabel: string;
  rejectLabel: string;
  policyLabel: string;
  policyHref: string;
}
