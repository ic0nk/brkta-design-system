export interface UserProfileSignals {
  locale?: string;
  residenceCountry?: string;
  billingCountry?: string;
  currency?: string;
  timezone?: string;
}

export interface UserIdentity {
  id: string;
  profile?: UserProfileSignals;
}

export function getProfilePreferenceSignals(identity?: UserIdentity) {
  const profile = identity?.profile;
  return {
    locale: profile?.locale,
    region: profile?.residenceCountry ?? profile?.billingCountry,
    currency: profile?.currency,
    timezone: profile?.timezone,
  };
}
