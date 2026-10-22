import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { AnimatedMessageCircle } from "./animated-message-circle";
import { AnimatedInbox } from "./animated-inbox";
import { Sidebar } from "../sidebar/sidebar";

describe("messaging icons", () => {
  for (const [name, Icon] of [
    ["message-circle", AnimatedMessageCircle],
    ["inbox", AnimatedInbox],
  ] as const) {
    it(`renders ${name} as a decorative currentColor SVG with custom size`, () => {
      const { container } = render(<Icon size={32} className="custom" />);
      const svg = container.querySelector("svg")!;
      expect(svg).toHaveClass("brkta-icon-motion", `brkta-icon-motion-${name}`, "custom");
      expect(svg).toHaveAttribute("aria-hidden", "true");
      expect(svg).toHaveAttribute("stroke", "currentColor");
      expect(svg).toHaveAttribute("width", "32");
      expect(svg).toHaveAttribute("height", "32");
    });

    it(`matches the ${name} Angular Lucide geometry`, () => {
      const { container } = render(<Icon />);
      const angular = readFileSync(`../ui-angular/src/animated-icons/animated-${name}.component.ts`, "utf8");
      for (const element of container.querySelectorAll("path, polyline")) {
        const attribute = element.tagName.toLowerCase() === "path" ? "d" : "points";
        expect(angular).toContain(`${attribute}="${element.getAttribute(attribute)}"`);
      }
      expect(container.querySelector("svg")).toHaveAttribute("width", "20");
    });

    it(`renders ${name} inside the governed sidebar`, () => {
      const { container } = render(<Sidebar variant="embedded" items={[{ value: name, label: name, icon: <Icon /> }]} />);
      expect(container.querySelector(`[data-brkta-sidebar-item] .brkta-icon-motion-${name}`)).toBeTruthy();
    });
  }

  it("uses parent motion triggers and retains disabled and reduced-motion suppression", () => {
    const css = readFileSync("../ui-core/icon-motion/icon-motion.css", "utf8");
    for (const trigger of ["[data-brkta-button]", "[data-brkta-sidebar-item]", "[data-brkta-dropdown-menu-item]", ".brkta-icon-motion-trigger"]) {
      expect(css).toContain(`${trigger}:hover :is(.brkta-icon-motion-message-circle, .brkta-icon-motion-inbox)`);
      expect(css).toContain(`${trigger}:focus-visible :is(.brkta-icon-motion-message-circle, .brkta-icon-motion-inbox)`);
    }
    expect(css).toContain('@media (prefers-reduced-motion: reduce)');
    expect(css).toContain('[data-brkta-sidebar-item][data-disabled] .brkta-icon-motion');
    expect(css).toContain('animation: none !important');
  });
});
