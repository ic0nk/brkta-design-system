import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AnimatedLocate } from "./animated-locate";

describe("AnimatedLocate", () => {
  it("uses the shared locate motion class and decorative semantics", () => {
    const { container } = render(<AnimatedLocate />);
    const icon = container.querySelector("svg");
    expect(icon).toHaveClass("brkta-icon-motion", "brkta-icon-motion-locate");
    expect(icon).toHaveAttribute("aria-hidden", "true");
  });
});
