import { describe, expect, it } from "vitest";
import {
  createMoney,
  createThemeEngine,
  createTranslator,
  formatMoney,
  getLocaleDirection,
  resolveCurrency,
  resolveLocale,
  resolvePlatformPreferences,
  resolveRegion,
} from "./index";

describe("platform core engines", () => {
  it("resolves preferences from explicit values down to defaults", () => {
    expect(
      resolvePlatformPreferences({
        explicit: { theme: "dark", sidebarCollapsed: true },
        profile: { locale: "ar", currency: "EUR", region: "DE" },
        stored: { theme: "light" },
      }),
    ).toMatchObject({
      theme: "dark",
      locale: "ar",
      currency: "EUR",
      region: "DE",
      sidebarCollapsed: true,
    });
  });

  it("keeps locale, region, and currency resolution deterministic", () => {
    expect(resolveLocale({ browser: "fr-FR" }, ["en", "fr"])).toBe("fr");
    expect(getLocaleDirection("ar-EG")).toBe("rtl");
    expect(resolveRegion({ ip: "de", stored: "EG" })).toEqual({
      code: "EG",
      source: "stored",
    });
    expect(resolveCurrency({ regionDefault: "EUR", explicit: "USD" })).toBe(
      "USD",
    );
  });

  it("formats integer minor-unit money without floating-point input", () => {
    const money = createMoney(1250, "EGP");
    expect(formatMoney(money, "en-EG")).toContain("12.50");
  });

  it("supports future catalogs and reactive theme resolution", () => {
    const translate = createTranslator({ greeting: "Hello {{name}}" });
    expect(translate("greeting", { name: "BRKTA" })).toBe("Hello BRKTA");

    const engine = createThemeEngine("system", "light");
    expect(engine.getSnapshot().resolved).toBe("light");
    engine.setSystemTheme("dark");
    expect(engine.getSnapshot().resolved).toBe("dark");
  });
});
