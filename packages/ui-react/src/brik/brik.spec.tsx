import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { brikStates } from "@brkta/ui-core/brik/brik-contract";
import { Brik } from "./brik";

describe("Brik", () => {
  it("renders an svg with data-brkta-brik", () => {
    const { container } = render(<Brik />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("data-brkta-brik");
  });

  it('defaults state to "idle"', () => {
    const { container } = render(<Brik />);
    expect(container.querySelector("svg")).toHaveAttribute(
      "data-state",
      "idle",
    );
  });

  it.each(brikStates)('applies state "%s"', (state) => {
    const { container } = render(<Brik state={state} />);
    expect(container.querySelector("svg")).toHaveAttribute("data-state", state);
  });

  it("is decorative (aria-hidden) without a label", () => {
    const { container } = render(<Brik />);
    expect(container.querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("exposes an accessible name when labelled", () => {
    const { getByRole } = render(<Brik label="Brik waving" />);
    expect(getByRole("img", { name: "Brik waving" })).toBeInTheDocument();
  });

  it("passes className through", () => {
    const { container } = render(<Brik className="custom" />);
    expect(container.querySelector("svg")).toHaveClass("custom");
  });
});
