import { describe, it, expect, beforeEach } from "vitest";
import { readFileSync } from "node:fs";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SidebarComponent } from "./sidebar.component";

const items = [
  { value: "dash", label: "Dashboard", active: true, badge: 3 },
  { value: "orders", label: "Orders", badge: 12 },
  { value: "customers", label: "Customers" },
  { value: "reports", label: "Reports", disabled: true },
];
const sidebarStyles = readFileSync("../ui-core/sidebar/sidebar.css", "utf8");

describe("SidebarComponent", () => {
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
    expect(sidebarStyles).toContain("color: var(--navigation-active-foreground);");
    expect(sidebarStyles).toContain("font-weight: 600");
  });
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    fixture.componentRef.setInput("items", items);
    fixture.detectChanges();
  });

  it("should render all items", () => {
    const navItems = fixture.nativeElement.querySelectorAll(
      "[data-brkta-sidebar-item]",
    );
    expect(navItems.length).toBe(4);
  });

  it("should render header and footer", () => {
    fixture.componentRef.setInput("header", "App Name");
    fixture.componentRef.setInput("footer", "v1.0.0");
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain("App Name");
    expect(fixture.nativeElement.textContent).toContain("v1.0.0");
  });

  it("should mark active item", () => {
    const activeItem = fixture.nativeElement.querySelector("[data-active]");
    expect(activeItem.textContent).toContain("Dashboard");
  });

  it("should toggle collapsed state", () => {
    fixture.componentRef.setInput("header", "App");
    fixture.detectChanges();
    const toggle = fixture.nativeElement.querySelector(
      "[data-brkta-sidebar-toggle]",
    );
    expect(toggle).toBeTruthy();
    (toggle as HTMLElement).click();
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector("[data-collapsed]"),
    ).toBeTruthy();
  });

  it("should retain the standalone collapse control by default", () => {
    fixture.componentRef.setInput("header", "App");
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector("[data-brkta-sidebar-toggle]"),
    ).toBeTruthy();
  });

  it("should hide the collapse control for an embedded sidebar when disabled", () => {
    fixture.componentRef.setInput("header", "App");
    fixture.componentRef.setInput("variant", "embedded");
    fixture.componentRef.setInput("collapsed", true);
    fixture.componentRef.setInput("showCollapseToggle", false);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain("App");
    expect(fixture.nativeElement.querySelector("[data-collapsed]")).toBeTruthy();
    expect(
      fixture.nativeElement.querySelector("[data-brkta-sidebar-toggle]"),
    ).toBeNull();
  });

  it("should render the panel-left close and open states", () => {
    fixture.componentRef.setInput("header", "App");
    fixture.componentRef.setInput("collapsed", false);
    fixture.detectChanges();

    let panelIcon = fixture.nativeElement.querySelector(
      "brkta-animated-panel-left",
    );
    expect(panelIcon).toBeTruthy();
    expect(panelIcon.querySelector('path[d="m16 15-3-3 3-3"]')).toBeTruthy();

    fixture.componentRef.setInput("collapsed", true);
    fixture.detectChanges();
    panelIcon = fixture.nativeElement.querySelector(
      "brkta-animated-panel-left",
    );
    expect(panelIcon.querySelector('path[d="m14 9 3 3-3 3"]')).toBeTruthy();
  });

  it("should map governed navigation icons and omit unknown names", () => {
    fixture.componentRef.setInput("items", [
      { value: "building", label: "Building", icon: "building-2" },
      { value: "developers", label: "Developers", icon: "users" },
      { value: "units", label: "Units", icon: "package" },
      { value: "map", label: "Market map", icon: "locate" },
      { value: "ai-settings", label: "AI settings", icon: "sparkles" },
      { value: "unknown", label: "Unknown", icon: "not-a-real-icon" },
    ]);
    fixture.detectChanges();

    const navItems = fixture.nativeElement.querySelectorAll(
      "[data-brkta-sidebar-item]",
    );
    expect(navItems[0].querySelector("brkta-animated-building-2")).toBeTruthy();
    expect(navItems[1].querySelector("brkta-animated-users")).toBeTruthy();
    expect(navItems[2].querySelector("brkta-animated-package")).toBeTruthy();
    expect(navItems[3].querySelector("brkta-animated-locate")).toBeTruthy();
    expect(navItems[4].querySelector("brkta-animated-sparkles")).toBeTruthy();
    expect(
      navItems[5].querySelector("[data-brkta-sidebar-item-icon]"),
    ).toBeNull();
    expect(navItems[5].querySelector("brkta-animated-dashboard")).toBeNull();
  });

  it("should render badges", () => {
    const badges = fixture.nativeElement.querySelectorAll(
      "[data-brkta-sidebar-item-badge]",
    );
    expect(badges.length).toBe(2);
  });

  it("should emit the selected enabled item and ignore disabled items", () => {
    const selected: string[] = [];
    fixture.componentInstance.itemSelect.subscribe((item) =>
      selected.push(item.value),
    );
    const navItems = fixture.nativeElement.querySelectorAll(
      "[data-brkta-sidebar-item]",
    );

    (navItems[1] as HTMLElement).click();
    (navItems[3] as HTMLElement).click();

    expect(selected).toEqual(["orders"]);
  });

  it("should use aside element", () => {
    expect(fixture.nativeElement.querySelector("aside")).toBeTruthy();
  });

  it("should preserve standalone appearance by default", () => {
    const sidebar = fixture.nativeElement.querySelector("aside");

    expect(fixture.componentInstance.variant).toBe("standalone");
    expect(sidebar.getAttribute("data-variant")).toBeNull();
  });

  it("should forward the embedded variant to the root", () => {
    fixture.componentRef.setInput("variant", "embedded");
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector("aside").getAttribute("data-variant"),
    ).toBe("embedded");
  });
});
