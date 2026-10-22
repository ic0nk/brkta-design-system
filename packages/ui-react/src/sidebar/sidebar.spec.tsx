import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { render, fireEvent, screen } from "@testing-library/react";
import { Sidebar } from "./sidebar";

const items = [
  { value: "dash", label: "Dashboard", active: true, badge: 3 },
  { value: "orders", label: "Orders", badge: 12 },
  { value: "customers", label: "Customers" },
  { value: "reports", label: "Reports", disabled: true },
];
const sidebarStyles = readFileSync("../ui-core/sidebar/sidebar.css", "utf8");

describe("Sidebar", () => {
  it("fills from the pointer on hover and marks the active row with a solid navigation role", () => {
    // Hover is painted by the fill circle, not a background-color — setting both would
    // make the item accent before the fill arrived and hide the animation entirely.
    expect(sidebarStyles).toContain("[data-brkta-sidebar-item]::before");
    expect(sidebarStyles).toContain("var(--brkta-sidebar-fill-x, 50%)");
    expect(sidebarStyles).toContain("var(--brkta-sidebar-fill-y, 50%)");
    expect(sidebarStyles).toContain("color: var(--navigation-active-foreground)");
    expect(sidebarStyles).toContain(
      "background-color: var(--navigation-active);",
    );
    expect(sidebarStyles).toContain("font-weight: 600");
  });
  it("renders all items", () => {
    render(<Sidebar items={items} />);
    expect(screen.getByText("Dashboard")).toBeTruthy();
    expect(screen.getByText("Orders")).toBeTruthy();
    expect(screen.getByText("Customers")).toBeTruthy();
    expect(screen.getByText("Reports")).toBeTruthy();
  });

  it("renders header and footer", () => {
    const { container } = render(
      <Sidebar items={items} header="App Name" footer="v1.0.0" />,
    );
    expect(container.textContent).toContain("App Name");
    expect(container.textContent).toContain("v1.0.0");
  });

  it("marks active item", () => {
    const { container } = render(<Sidebar items={items} />);
    const activeItem = container.querySelector("[data-active]");
    expect(activeItem?.textContent).toContain("Dashboard");
  });

  it("toggles collapsed state", () => {
    const { container } = render(<Sidebar items={items} header="App" />);
    const toggle = container.querySelector("[data-brkta-sidebar-toggle]");
    expect(container.querySelector("[data-collapsed]")).toBeFalsy();
    fireEvent.click(toggle!);
    expect(container.querySelector("[data-collapsed]")).toBeTruthy();
  });

  it("retains the standalone collapse control by default", () => {
    const { container } = render(<Sidebar items={items} header="App" />);

    expect(container.querySelector("[data-brkta-sidebar-toggle]")).toBeTruthy();
  });

  it("hides the collapse control for an embedded sidebar when disabled", () => {
    const { container } = render(
      <Sidebar
        items={items}
        header="App"
        variant="embedded"
        collapsed
        showCollapseToggle={false}
      />,
    );

    expect(container.textContent).toContain("App");
    expect(container.querySelector("[data-collapsed]")).toBeTruthy();
    expect(container.querySelector("[data-brkta-sidebar-toggle]")).toBeFalsy();
  });

  it("renders the panel-left icon and switches its state after toggle", () => {
    const { container } = render(<Sidebar items={items} header="App" />);
    const toggle = container.querySelector("[data-brkta-sidebar-toggle]");
    const panelIcon = () =>
      container.querySelector(".brkta-icon-motion-panel-left");

    expect(panelIcon()).toBeTruthy();
    expect(panelIcon()?.classList.contains("lucide-panel-left-close")).toBe(
      true,
    );

    fireEvent.click(toggle!);

    expect(panelIcon()?.classList.contains("lucide-panel-left-open")).toBe(
      true,
    );
  });

  it("renders badges", () => {
    const { container } = render(<Sidebar items={items} />);
    const badges = container.querySelectorAll(
      "[data-brkta-sidebar-item-badge]",
    );
    expect(badges.length).toBe(2);
  });

  it("calls onItemSelect with the selected enabled item", () => {
    const onItemSelect = vi.fn();
    render(<Sidebar items={items} onItemSelect={onItemSelect} />);

    fireEvent.click(screen.getByText("Orders"));
    expect(onItemSelect).toHaveBeenCalledWith(items[1]);

    fireEvent.click(screen.getByText("Reports"));
    expect(onItemSelect).toHaveBeenCalledTimes(1);
  });

  it("has aside element", () => {
    const { container } = render(<Sidebar items={items} />);
    expect(container.querySelector("aside")).toBeTruthy();
  });

  it("preserves standalone appearance by default", () => {
    const { container } = render(<Sidebar items={items} />);
    const sidebar = container.querySelector("aside");

    expect(sidebar?.getAttribute("data-variant")).toBeNull();
  });

  it("forwards the embedded variant to the root", () => {
    const { container } = render(<Sidebar items={items} variant="embedded" />);

    expect(container.querySelector("aside")?.getAttribute("data-variant")).toBe(
      "embedded",
    );
  });
});
