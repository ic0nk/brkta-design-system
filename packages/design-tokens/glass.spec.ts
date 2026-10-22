import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const glassStylesheet = readFileSync(
  new URL("./glass.css", import.meta.url),
  "utf8",
);

describe("glass reduced-transparency fallback", () => {
  it("makes elevated glass opaque and removes blur", () => {
    expect(glassStylesheet).toContain('[data-brkta-button][data-appearance="glass"]');
    expect(glassStylesheet).toMatch(
      /@media \(prefers-reduced-transparency: reduce\)[\s\S]*\.glass-elevated,[\s\S]*backdrop-filter:\s*none;[\s\S]*background-color:\s*var\(--surface\);/,
    );
    expect(glassStylesheet).toContain("--brkta-glass-elevated-backdrop-filter: none;");
  });
});
