import { describe, it, expect, vi } from "vitest";
import { readFileSync } from "node:fs";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { Button, ButtonLink, type ButtonProps } from "./button";
import { AnimatedPanelLeft } from "../animated-icons/animated-panel-left";

const buttonStyles = readFileSync("../ui-core/button/button.css", "utf8");

// --------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------

const renderButton = (props: Partial<ButtonProps> = {}) =>
  render(<Button {...props}>Click me</Button>);

const getButton = () => screen.getByRole("button", { name: /click me/i });

// --------------------------------------------------------------------------
// Tests
// --------------------------------------------------------------------------

describe("Button", () => {
  it("aligns icon and label horizontally inside the shared content wrapper", () => {
    const contentRule = buttonStyles.slice(buttonStyles.indexOf('[data-brkta-button] .brkta-button-content {'));
    expect(contentRule.slice(0, contentRule.indexOf('}'))).toContain('display: inline-flex;');
    expect(contentRule.slice(0, contentRule.indexOf('}'))).toContain('align-items: center;');
    expect(contentRule.slice(0, contentRule.indexOf('}'))).toContain('gap: var(--space-2);');
  });
  it("accepts a translated loading announcement", () => {
    const { container } = render(<Button loading loadingLabel="جار التحميل">Save</Button>);
    expect(container.querySelector(".brkta-button-sr-loading")?.textContent).toBe("جار التحميل");
  });

  describe("render", () => {
    it("renders children", () => {
      renderButton();
      expect(getButton()).toHaveTextContent("Click me");
    });

    it("renders without children (icon-only)", () => {
      render(<Button iconBefore={<span data-testid="icon" />} />);
      const btn = screen.getByRole("button");
      expect(btn).toBeInTheDocument();
      expect(screen.getByTestId("icon")).toBeInTheDocument();
    });
  });

  describe("data attributes", () => {
    it("applies data-brkta-button attribute", () => {
      renderButton();
      expect(getButton()).toHaveAttribute("data-brkta-button");
    });

    it('applies default variant ("primary") and size ("md")', () => {
      renderButton();
      expect(getButton()).toHaveAttribute("data-variant", "primary");
      expect(getButton()).toHaveAttribute("data-size", "md");
    });

    it("applies custom variant and size", () => {
      renderButton({ variant: "destructive", size: "lg" });
      expect(getButton()).toHaveAttribute("data-variant", "destructive");
      expect(getButton()).toHaveAttribute("data-size", "lg");
    });

    it("applies the glass appearance to the inner button element", () => {
      renderButton({ appearance: "glass" });
      const btn = getButton();

      expect(btn).toHaveAttribute("data-appearance", "glass");
      expect(btn).not.toHaveClass("glass-elevated");
    });

    it("applies icon-only sizes", () => {
      render(<Button size="icon-md" iconBefore={<span />} />);
      const btn = screen.getByRole("button");
      expect(btn).toHaveAttribute("data-size", "icon-md");
    });

    it("forwards the disabled hint and title to the inner button contract", () => {
      renderButton({ title: "No changes to save.", "aria-describedby": "save-hint" });
      expect(getButton()).toHaveAttribute("title", "No changes to save.");
      expect(getButton()).toHaveAttribute("aria-describedby", "save-hint");
    });

    it("gives each variant its own fill colour rather than one shared accent", () => {
      // A single accent for every variant made primary and ghost look identical on
      // hover, so each variant now states its own fill and the label colour to match.
      expect(buttonStyles).toContain('[data-brkta-button][data-variant="primary"]');
      expect(buttonStyles).toContain('[data-brkta-button][data-variant="destructive"]');
      expect(buttonStyles).toContain("--brkta-button-fill-color");
      expect(buttonStyles).toContain("--brkta-button-fill-foreground");
      // Destructive stays in its own family; an accent wash would read as another action.
      expect(buttonStyles).toContain(
        "color-mix(in oklch, var(--destructive) 72%, var(--foreground))",
      );
    });

    it("expands the fill from the pointer entry point, and excludes link", () => {
      expect(buttonStyles).toContain("var(--brkta-button-fill-x, 50%)");
      expect(buttonStyles).toContain("var(--brkta-button-fill-y, 50%)");
      // A link is text; a spreading block behind it is wrong.
      expect(buttonStyles).toContain('[data-brkta-button]:not([data-variant="link"]):hover');
      expect(buttonStyles).toContain("[data-brkta-button]::before {");
      expect(buttonStyles).toContain("transition: none;");
    });
  });

  describe("interaction", () => {
    it("calls onClick handler", async () => {
      const onClick = vi.fn();
      renderButton({ onClick });
      await userEvent.click(getButton());
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("disabled button does not fire onClick", async () => {
      const onClick = vi.fn();
      renderButton({ disabled: true, onClick });
      await userEvent.click(getButton());
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe("loading state", () => {
    it("sets data-loading attribute and disables button", () => {
      renderButton({ loading: true });
      const btn = getButton();
      expect(btn).toHaveAttribute("data-loading");
      expect(btn).toBeDisabled();
    });

    it("renders screen-reader loading text", () => {
      renderButton({ loading: true });
      expect(
        screen.getByText("Loading", { selector: ".sr-only" }),
      ).toBeInTheDocument();
    });

    it("preserves content in the DOM during loading (opacity toggle via CSS)", () => {
      renderButton({ loading: true });
      const btn = getButton();
      const content = btn.querySelector(".brkta-button-content");
      expect(content).toBeInTheDocument();
      expect(content).toContainHTML("Click me");
    });

    it("removes data-loading when loading completes", () => {
      const { rerender } = render(<Button loading>Click me</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("data-loading");

      rerender(<Button loading={false}>Click me</Button>);
      expect(screen.getByRole("button")).not.toHaveAttribute("data-loading");
    });
  });

  describe("icon-only mode", () => {
    it("sets data-icon-only when no children but icon is present", () => {
      render(<Button iconBefore={<span />} />);
      expect(screen.getByRole("button")).toHaveAttribute("data-icon-only");
    });

    it("does not set data-icon-only when children exist alongside icons", () => {
      renderButton({ iconBefore: <span /> });
      expect(screen.getByRole("button")).not.toHaveAttribute("data-icon-only");
    });

    it("does not set data-icon-only when only children are present", () => {
      renderButton();
      expect(screen.getByRole("button")).not.toHaveAttribute("data-icon-only");
    });
  });

  describe("governed icons", () => {
    it("renders the governed panel-left wrapper as a ReactNode icon", () => {
      render(
        <Button
          iconBefore={<AnimatedPanelLeft collapsed />}
          accessibleLabel="Toggle sidebar"
        />,
      );

      expect(
        screen
          .getByRole("button", { name: "Toggle sidebar" })
          .querySelector(".brkta-icon-motion-panel-left"),
      ).toBeInTheDocument();
      expect(
        screen
          .getByRole("button", { name: "Toggle sidebar" })
          .querySelector(".lucide-panel-left-open"),
      ).toBeInTheDocument();
    });
  });

  describe("default type", () => {
    it('defaults type to "button"', () => {
      renderButton();
      expect(getButton()).toHaveAttribute("type", "button");
    });

    it("accepts explicit type override", () => {
      renderButton({ type: "submit" });
      expect(getButton()).toHaveAttribute("type", "submit");
    });
  });

  describe("className", () => {
    it("applies custom className alongside defaults", () => {
      renderButton({ className: "my-custom-class" });
      const btn = getButton();
      expect(btn).toHaveClass("my-custom-class");
    });
  });

  describe("forwardRef", () => {
    it("forwards ref to the underlying button element", () => {
      const ref = createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Click me</Button>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current).toHaveTextContent("Click me");
    });
  });

  describe("accessibleLabel", () => {
    it("sets aria-label when provided", () => {
      render(<Button iconBefore={<span />} accessibleLabel="Add item" />);
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-label",
        "Add item",
      );
    });

    it("does not set aria-label when omitted", () => {
      renderButton();
      expect(screen.getByRole("button")).not.toHaveAttribute("aria-label");
    });
  });

  describe("asChild", () => {
    it("renders the child element instead of a button", () => {
      render(
        <Button asChild>
          <a href="/test">Link button</a>
        </Button>,
      );
      const link = screen.getByRole("link", { name: /link button/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/test");
      expect(link).toHaveAttribute("data-brkta-button");
    });

    it("throws when asChild has no valid element child", () => {
      // Suppress console.error from the React error boundary
      const spy = vi.spyOn(console, "error").mockImplementation(() => {});
      expect(() => render(<Button asChild>plain text</Button>)).toThrow();
      spy.mockRestore();
    });

    it("merges data attributes onto the child", () => {
      render(
        <Button asChild variant="outline" size="lg">
          <a href="/">Home</a>
        </Button>,
      );
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("data-brkta-button");
      expect(link).toHaveAttribute("data-variant", "outline");
      expect(link).toHaveAttribute("data-size", "lg");
    });
  });
});

describe("ButtonLink", () => {
  it("renders a design-system anchor without child cloning", () => {
    render(
      <ButtonLink href="/test" variant="outline" size="lg">
        Link button
      </ButtonLink>,
    );

    const link = screen.getByRole("link", { name: /link button/i });
    expect(link).toHaveAttribute("href", "/test");
    expect(link).toHaveAttribute("data-brkta-button");
    expect(link).toHaveAttribute("data-variant", "outline");
    expect(link).toHaveAttribute("data-size", "lg");
  });
});
