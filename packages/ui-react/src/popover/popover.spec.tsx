import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { readFileSync } from "node:fs";
import { Popover } from "./popover";

const popoverStyles = readFileSync("../ui-core/popover/popover.css", "utf8");

describe("Popover", () => {
  it("renders trigger", () => {
    render(<Popover trigger="More info">Content</Popover>);
    expect(screen.getByText("More info")).toBeTruthy();
  });

  it("opens on trigger click", async () => {
    render(<Popover trigger="Open">Panel content</Popover>);
    await userEvent.click(screen.getByRole("button"));
    expect(screen.getByText("Panel content")).toBeTruthy();
  });

  it("closes on Escape", async () => {
    render(<Popover trigger="Open">Content</Popover>);
    await userEvent.click(screen.getByRole("button"));
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });

  it("click outside closes", async () => {
    render(<Popover trigger="Open">Content</Popover>);
    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(document.body);
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });

  it('has role="dialog"', async () => {
    render(<Popover trigger="Open">Content</Popover>);
    await userEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("dialog")).toBeTruthy();
  });

  it("data-brkta-popover on wrapper", () => {
    const { container } = render(<Popover trigger="Open">Content</Popover>);
    expect(container.querySelector("[data-brkta-popover]")).toBeTruthy();
  });

  it("renders the requested top side on content", async () => {
    const { container } = render(
      <Popover trigger="Open" side="top">
        Content
      </Popover>,
    );
    await userEvent.click(screen.getByRole("button"));
    expect(
      container.querySelector("[data-brkta-popover-content]"),
    ).toHaveAttribute("data-side", "top");
  });

  it("emits the boolean open attribute and uses logical viewport-safe positioning", async () => {
    const { container } = render(<Popover trigger="Open">Content</Popover>);
    await userEvent.click(screen.getByRole("button"));

    expect(
      container.querySelector("[data-brkta-popover][data-open]"),
    ).toBeTruthy();
    expect(popoverStyles).toContain("[data-brkta-popover][data-open]");
    expect(popoverStyles).not.toContain('[data-open="true"]');
    expect(popoverStyles).toContain("inset-inline-start");
    expect(popoverStyles).toContain("inset-inline-end");
    expect(popoverStyles).toContain('[data-brkta-popover-content][data-side="top"]');
    expect(popoverStyles).toContain("inset-block-end: calc(100% + var(--space-1))");
    expect(popoverStyles).toContain("max-inline-size: min(var(--space-80)");
    expect(popoverStyles).not.toMatch(/\b(left|right):/);
  });
});
