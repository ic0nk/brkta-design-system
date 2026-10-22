export const DEFAULT_CURRENCY = "EGP";

export type CurrencyCode = string;

export interface Money {
  amountMinor: number;
  currency: CurrencyCode;
}

export interface CurrencySignals {
  explicit?: CurrencyCode;
  profile?: CurrencyCode;
  stored?: CurrencyCode;
  regionDefault?: CurrencyCode;
  applicationDefault?: CurrencyCode;
}

export function normalizeCurrency(
  value: string | undefined,
  fallback = DEFAULT_CURRENCY,
): CurrencyCode {
  if (!value) return fallback;
  const normalized = value.trim().toUpperCase();
  return /^[A-Z]{3}$/.test(normalized) ? normalized : fallback;
}

export function resolveCurrency(
  signals: CurrencySignals,
  fallback = DEFAULT_CURRENCY,
): CurrencyCode {
  return normalizeCurrency(
    signals.explicit ??
      signals.profile ??
      signals.stored ??
      signals.regionDefault ??
      signals.applicationDefault,
    fallback,
  );
}

export function createMoney(
  amountMinor: number,
  currency: CurrencyCode,
): Money {
  if (!Number.isSafeInteger(amountMinor)) {
    throw new RangeError("Money amountMinor must be a safe integer");
  }

  return { amountMinor, currency: normalizeCurrency(currency) };
}

export function getCurrencyMinorUnit(currency: CurrencyCode): number {
  try {
    return (
      new Intl.NumberFormat("en", {
        style: "currency",
        currency: normalizeCurrency(currency),
      }).resolvedOptions().minimumFractionDigits ?? 2
    );
  } catch {
    return 2;
  }
}

export function formatMoney(
  money: Money,
  locale: string,
  options: Intl.NumberFormatOptions = {},
): string {
  const currency = normalizeCurrency(money.currency);
  const amount = money.amountMinor / 10 ** getCurrencyMinorUnit(currency);
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    ...options,
  }).format(amount);
}
