import { ComponentFixture, TestBed } from "@angular/core/testing";
// @ts-expect-error The package test tsconfig does not include Node typings.
import { readFileSync } from "node:fs";
import { PopoverComponent } from "./popover.component";

const popoverStyles = readFileSync("../ui-core/popover/popover.css", "utf8");

describe("PopoverComponent", () => {
  let component: PopoverComponent;
  let fixture: ComponentFixture<PopoverComponent>;

  function open(): void {
    const trigger = fixture.nativeElement.querySelector(
      "[data-brkta-popover-trigger]",
    );
    trigger.click();
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopoverComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(PopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => expect(component).toBeTruthy());
  it("should render wrapper", () =>
    expect(
      fixture.nativeElement.querySelector("[data-brkta-popover]"),
    ).toBeTruthy());

  it("should open on trigger click", () => {
    open();
    expect(component.open).toBe(true);
    expect(
      fixture.nativeElement.querySelector("[data-brkta-popover-content]"),
    ).toBeTruthy();
  });

  it("should emit openChange on open", () => {
    let emitted = false;
    component.openChange.subscribe((v) => (emitted = v));
    open();
    expect(emitted).toBe(true);
  });

  it("should set aria-expanded", () => {
    const trigger = fixture.nativeElement.querySelector(
      "[data-brkta-popover-trigger]",
    );
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    open();
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
  });

  it('should set role="dialog"', () => {
    open();
    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeTruthy();
  });

  it("should set data-open on wrapper when open", () => {
    open();
    expect(
      fixture.nativeElement.querySelector("[data-brkta-popover][data-open]"),
    ).toBeTruthy();
  });

  it("should render the requested top side on content", () => {
    component.side = "top";
    open();
    expect(
      fixture.nativeElement
        .querySelector("[data-brkta-popover-content]")
        .getAttribute("data-side"),
    ).toBe("top");
  });

  it("should use the boolean open attribute selector and logical viewport-safe positioning", () => {
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
