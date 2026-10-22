import { ComponentFixture, TestBed } from "@angular/core/testing";
import { readFileSync } from "node:fs";
import { ButtonComponent } from "./button.component";

const buttonStyles = readFileSync("../ui-core/button/button.css", "utf8");

describe("ButtonComponent", () => {
  it("aligns icon and label horizontally inside the content wrapper", () => {
    const contentRule = buttonStyles.slice(buttonStyles.indexOf('[data-brkta-button] .brkta-button-content {'));
    expect(contentRule.slice(0, contentRule.indexOf('}'))).toContain('display: inline-flex;');
    expect(contentRule.slice(0, contentRule.indexOf('}'))).toContain('align-items: center;');
    expect(contentRule.slice(0, contentRule.indexOf('}'))).toContain('gap: var(--space-2);');
  });
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let buttonElement: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    buttonElement = fixture.nativeElement.querySelector("button");
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should render a native button element", () => {
    expect(buttonElement).toBeTruthy();
    expect(buttonElement.tagName.toLowerCase()).toBe("button");
  });

  it("accepts a translated loading announcement", () => {
    fixture.componentRef.setInput("loading", true);
    fixture.componentRef.setInput("loadingLabel", "جار التحميل");
    fixture.detectChanges();
    expect(buttonElement.querySelector(".brkta-button-sr-loading")?.textContent).toBe("جار التحميل");
  });

  describe("defaults", () => {
    it('should have default variant "primary"', () => {
      expect(component.variant).toBe("primary");
    });

    it('should have default appearance "default"', () => {
      expect(component.appearance).toBe("default");
      expect(buttonElement.getAttribute("data-appearance")).toBe("default");
    });

    it('should have default size "md"', () => {
      expect(component.size).toBe("md");
    });

    it('should have type="button" by default', () => {
      expect(buttonElement.getAttribute("type")).toBe("button");
    });

    it("should not be loading by default", () => {
      expect(component.loading).toBe(false);
    });

    it("should not be disabled by default", () => {
      expect(component.disabled).toBe(false);
      expect(buttonElement.disabled).toBe(false);
    });

    it("should not be icon-only by default", () => {
      expect(component.iconOnly).toBe(false);
    });
  });

  describe("data attributes", () => {
    it("should set data-brkta-button attribute", () => {
      expect(buttonElement.hasAttribute("data-brkta-button")).toBe(true);
    });

    it("should reflect default data-variant", () => {
      expect(buttonElement.getAttribute("data-variant")).toBe("primary");
    });

    it("should reflect custom variant", () => {
      fixture.componentRef.setInput("variant", "destructive");
      fixture.detectChanges();
      expect(buttonElement.getAttribute("data-variant")).toBe("destructive");
    });

    it("should apply the glass appearance to the inner button element", () => {
      fixture.componentRef.setInput("appearance", "glass");
      fixture.detectChanges();

      expect(buttonElement.getAttribute("data-appearance")).toBe("glass");
      expect(fixture.nativeElement.querySelector(".glass-elevated")).toBeNull();
      expect(buttonElement.matches('[data-brkta-button][data-appearance="glass"]')).toBe(true);
    });

    it("keeps a visible focus ring for the glass appearance", () => {
      fixture.componentRef.setInput("appearance", "glass");
      fixture.detectChanges();
      buttonElement.focus();

      expect(document.activeElement).toBe(buttonElement);
      expect(buttonElement.matches('[data-brkta-button][data-appearance="glass"]')).toBe(true);
    });

    it("should reflect default data-size", () => {
      expect(buttonElement.getAttribute("data-size")).toBe("md");
    });

    it("should reflect custom size", () => {
      fixture.componentRef.setInput("size", "lg");
      fixture.detectChanges();
      expect(buttonElement.getAttribute("data-size")).toBe("lg");
    });

    it("should set data-loading when loading is true", () => {
      fixture.componentRef.setInput("loading", true);
      fixture.detectChanges();
      expect(buttonElement.getAttribute("data-loading")).toBe("true");
    });

    it("should remove data-loading when loading is false", () => {
      fixture.componentRef.setInput("loading", true);
      fixture.detectChanges();
      expect(buttonElement.getAttribute("data-loading")).toBe("true");

      fixture.componentRef.setInput("loading", false);
      fixture.detectChanges();
      expect(buttonElement.getAttribute("data-loading")).toBeNull();
    });

    it("should set data-icon-only when iconOnly is true", () => {
      fixture.componentRef.setInput("iconOnly", true);
      fixture.detectChanges();
      expect(buttonElement.getAttribute("data-icon-only")).toBe("true");
    });

    it("should not set data-icon-only when iconOnly is false", () => {
      fixture.componentRef.setInput("iconOnly", false);
      fixture.detectChanges();
      expect(buttonElement.getAttribute("data-icon-only")).toBeNull();
    });

    it("should set aria-label when provided", () => {
      fixture.componentRef.setInput("ariaLabel", "Close dialog");
      fixture.detectChanges();
      expect(buttonElement.getAttribute("aria-label")).toBe("Close dialog");
    });

    it("should forward the translated disabled hint and native title to the inner button", () => {
      fixture.componentRef.setInput("ariaDescribedBy", "save-hint");
      fixture.componentRef.setInput("title", "No changes to save.");
      fixture.detectChanges();

      expect(buttonElement.getAttribute("aria-describedby")).toBe("save-hint");
      expect(buttonElement.getAttribute("title")).toBe("No changes to save.");
    });
  });

  describe("shared hover fill contract", () => {
    it("gives each variant its own fill colour rather than one shared accent", () => {
      expect(buttonStyles).toContain('[data-brkta-button][data-variant="primary"]');
      expect(buttonStyles).toContain('[data-brkta-button][data-variant="destructive"]');
      expect(buttonStyles).toContain("--brkta-button-fill-color");
      expect(buttonStyles).toContain("var(--brkta-button-fill-foreground)");
      expect(buttonStyles).toContain(
        "color-mix(in oklch, var(--destructive) 72%, var(--foreground))",
      );
    });

    it("expands the fill from the pointer entry point, and excludes link", () => {
      expect(buttonStyles).toContain("var(--brkta-button-fill-x, 50%)");
      expect(buttonStyles).toContain("var(--brkta-button-fill-y, 50%)");
      expect(buttonStyles).toContain('[data-brkta-button]:not([data-variant="link"]):hover');
    });

    it("writes the pointer entry position onto the button for a mouse", () => {
      buttonElement.getBoundingClientRect = () =>
        ({ left: 100, top: 50, width: 200, height: 40 }) as DOMRect;

      buttonElement.dispatchEvent(
        new PointerEvent("pointerenter", { clientX: 160, clientY: 70, pointerType: "mouse" }),
      );

      expect(buttonElement.style.getPropertyValue("--brkta-button-fill-x")).toBe("60px");
      expect(buttonElement.style.getPropertyValue("--brkta-button-fill-y")).toBe("20px");
    });

    it("leaves the origin centred for touch, which has no entry point", () => {
      buttonElement.getBoundingClientRect = () =>
        ({ left: 0, top: 0, width: 200, height: 40 }) as DOMRect;

      buttonElement.dispatchEvent(
        new PointerEvent("pointerenter", { clientX: 10, clientY: 10, pointerType: "touch" }),
      );

      expect(buttonElement.style.getPropertyValue("--brkta-button-fill-x")).toBe("");
    });

    it("makes the fill instant when reduced motion is requested", () => {
      expect(buttonStyles).toContain("[data-brkta-button]::before {");
      expect(buttonStyles).toContain("transition: none;");
      expect(buttonStyles).toContain("--brkta-button-fill-radius: 150%;");
    });
  });

  describe("disabled state", () => {
    it("should disable the button when disabled input is true", () => {
      fixture.componentRef.setInput("disabled", true);
      fixture.detectChanges();
      expect(buttonElement.disabled).toBe(true);
    });

    it("should disable the button when loading is true", () => {
      fixture.componentRef.setInput("loading", true);
      fixture.detectChanges();
      expect(buttonElement.disabled).toBe(true);
    });
  });

  describe("loading state", () => {
    it("should render loader spans when loading is true", () => {
      fixture.componentRef.setInput("loading", true);
      fixture.detectChanges();
      const loader = buttonElement.querySelector(".brkta-button-loader");
      expect(loader).toBeTruthy();
      expect(loader?.getAttribute("aria-hidden")).toBe("true");
      const dots = loader?.querySelectorAll(".brkta-button-loader-dot");
      expect(dots?.length).toBe(3);
    });

    it("should remove loader spans when loading becomes false", () => {
      fixture.componentRef.setInput("loading", true);
      fixture.detectChanges();
      expect(buttonElement.querySelector(".brkta-button-loader")).toBeTruthy();

      fixture.componentRef.setInput("loading", false);
      fixture.detectChanges();
      expect(buttonElement.querySelector(".brkta-button-loader")).toBeFalsy();
    });

    it("should render a screen-reader loading text when loading is true", () => {
      fixture.componentRef.setInput("loading", true);
      fixture.detectChanges();
      const srLoading = buttonElement.querySelector(".brkta-button-sr-loading");
      expect(srLoading).toBeTruthy();
      expect(srLoading?.textContent).toContain("Loading");
    });
  });

  describe("click events", () => {
    it("should emit click when the button is clicked", () => {
      let clicked = false;
      buttonElement.addEventListener("click", () => {
        clicked = true;
      });
      buttonElement.click();
      expect(clicked).toBe(true);
    });

    it("should not emit click when disabled", () => {
      fixture.componentRef.setInput("disabled", true);
      fixture.detectChanges();

      let clicked = false;
      buttonElement.addEventListener("click", () => {
        clicked = true;
      });
      buttonElement.click();
      expect(clicked).toBe(false);
    });

    it("should not emit click when loading", () => {
      fixture.componentRef.setInput("loading", true);
      fixture.detectChanges();

      let clicked = false;
      buttonElement.addEventListener("click", () => {
        clicked = true;
      });
      buttonElement.click();
      expect(clicked).toBe(false);
    });
  });

  describe("icon support", () => {
    it("should render iconBefore when provided", () => {
      fixture.componentRef.setInput("iconBefore", "arrow-right");
      fixture.detectChanges();
      const iconEl = buttonElement.querySelector(".brkta-button-icon-before");
      expect(iconEl).toBeTruthy();
      expect(iconEl?.querySelector("brkta-animated-arrow-right")).toBeTruthy();
    });

    it("should render iconAfter when provided", () => {
      fixture.componentRef.setInput("iconAfter", "arrow-right");
      fixture.detectChanges();
      const iconEl = buttonElement.querySelector(".brkta-button-icon-after");
      expect(iconEl).toBeTruthy();
      expect(iconEl?.querySelector("brkta-animated-arrow-right")).toBeTruthy();
    });

    it("should render the arrow-left icon when provided", () => {
      fixture.componentRef.setInput("iconBefore", "arrow-left");
      fixture.detectChanges();
      const iconEl = buttonElement.querySelector(".brkta-button-icon-before");
      expect(iconEl?.querySelector("brkta-animated-arrow-left")).toBeTruthy();
    });

    it("should render the eye icon variants", () => {
      fixture.componentRef.setInput("iconBefore", "eye-off");
      fixture.detectChanges();
      expect(
        buttonElement.querySelector("brkta-animated-eye-off"),
      ).toBeTruthy();

      fixture.componentRef.setInput("iconBefore", "eye");
      fixture.detectChanges();
      expect(buttonElement.querySelector("brkta-animated-eye")).toBeTruthy();
    });

    it("should map log-out to the governed icon wrapper", () => {
      fixture.componentRef.setInput("iconBefore", "log-out");
      fixture.detectChanges();

      expect(
        buttonElement.querySelector("brkta-animated-log-out"),
      ).toBeTruthy();
    });

    it("should map building-2 to the governed icon wrapper", () => {
      fixture.componentRef.setInput("iconBefore", "building-2");
      fixture.detectChanges();

      expect(
        buttonElement.querySelector("brkta-animated-building-2"),
      ).toBeTruthy();
    });

    it("should map users to the governed icon wrapper", () => {
      fixture.componentRef.setInput("iconBefore", "users");
      fixture.detectChanges();

      expect(buttonElement.querySelector("brkta-animated-users")).toBeTruthy();
    });

    it("should map panel-left to the governed icon wrapper and pass collapsed state", () => {
      fixture.componentRef.setInput("iconBefore", "panel-left");
      fixture.detectChanges();

      let panelIcon = buttonElement.querySelector("brkta-animated-panel-left");
      expect(panelIcon).toBeTruthy();
      expect(panelIcon?.querySelector('path[d="m16 15-3-3 3-3"]')).toBeTruthy();

      fixture.componentRef.setInput("iconCollapsed", true);
      fixture.detectChanges();
      panelIcon = buttonElement.querySelector("brkta-animated-panel-left");
      expect(panelIcon?.querySelector('path[d="m14 9 3 3-3 3"]')).toBeTruthy();
    });

    it("should map dashboard to the governed navigation icon wrapper", () => {
      fixture.componentRef.setInput("iconBefore", "dashboard");
      fixture.detectChanges();

      expect(
        buttonElement.querySelector("brkta-animated-dashboard"),
      ).toBeTruthy();
    });

    it("should map all API-declared icons to governed wrappers", () => {
      const declaredIcons = [
        ["locate", "brkta-animated-locate"],
        ["message-circle", "brkta-animated-message-circle"],
        ["inbox", "brkta-animated-inbox"],
        ["paperclip", "brkta-animated-paperclip"],
        ["calculator", "brkta-animated-calculator"],
        ["palette", "brkta-animated-palette"],
        ["list-filter", "brkta-animated-list-filter"],
        ["history", "brkta-animated-history"],
        ["file-text", "brkta-animated-file-text"],
        ["credit-card", "brkta-animated-credit-card"],
        ["book-open", "brkta-animated-book-open"],
        ["bar-chart-3", "brkta-animated-bar-chart-3"],
      ] as const;

      for (const [icon, selector] of declaredIcons) {
        fixture.componentRef.setInput("iconBefore", icon);
        fixture.detectChanges();
        expect(buttonElement.querySelector(selector)).toBeTruthy();
      }
    });

    it("should render no visible text or icon for unsupported names", () => {
      fixture.componentRef.setInput("iconBefore", "not-a-real-icon");
      fixture.detectChanges();

      expect(buttonElement.textContent).not.toContain("not-a-real-icon");
      expect(
        buttonElement.querySelector(".brkta-button-icon-before"),
      ).toBeNull();
    });
  });

  describe("iconOnly mode", () => {
    it("should not render ng-content container when iconOnly is true", () => {
      fixture.componentRef.setInput("iconOnly", true);
      fixture.detectChanges();
      const labelEl = buttonElement.querySelector(".brkta-button-label");
      expect(labelEl).toBeFalsy();
    });

    it("should render ng-content container when iconOnly is false", () => {
      fixture.componentRef.setInput("iconOnly", false);
      fixture.detectChanges();
      const labelEl = buttonElement.querySelector(".brkta-button-label");
      expect(labelEl).toBeTruthy();
    });
  });
});
