import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ConsentBannerComponent } from "./consent-banner.component";

describe("ConsentBannerComponent", () => {
  let fixture: ComponentFixture<ConsentBannerComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ConsentBannerComponent] }).compileComponents();
    fixture = TestBed.createComponent(ConsentBannerComponent);
    const content = { title: "Analytics choices", description: "Optional analytics stays off until accepted.", acceptLabel: "Accept analytics", rejectLabel: "Reject analytics", policyLabel: "Privacy policy", policyHref: "/privacy" };
    for (const [name, value] of Object.entries(content)) fixture.componentRef.setInput(name, value);
    fixture.detectChanges();
  });

  it("exposes a nonmodal named region and independent native button actions", () => {
    const root: HTMLElement = fixture.nativeElement;
    const region = root.querySelector("section")!;
    expect(region.getAttribute("aria-label")).toBe("Analytics choices");
    expect(region.getAttribute("aria-description")).toBe("Optional analytics stays off until accepted.");
    expect(region.getAttribute("role")).not.toBe("dialog");
    const buttons = root.querySelectorAll("button");
    let accepted = 0;
    let rejected = 0;
    fixture.componentInstance.accepted.subscribe(() => accepted++);
    fixture.componentInstance.rejected.subscribe(() => rejected++);
    buttons[0].focus();
    expect(document.activeElement).toBe(buttons[0]);
    buttons[0].click();
    buttons[1].focus();
    buttons[1].click();
    expect(accepted).toBe(1);
    expect(rejected).toBe(1);
    for (const button of buttons) {
      expect(button.type).toBe("button");
      expect(button.getAttribute("data-variant")).toBe("secondary");
      expect(button.tabIndex).toBe(0);
    }
  });

  it("keeps long RTL text, policy destination, and embedded placement", () => {
    const title = "خيارات التحليلات والخصوصية ".repeat(6);
    fixture.nativeElement.setAttribute("dir", "rtl");
    fixture.componentRef.setInput("title", title);
    fixture.componentRef.setInput("placement", "embedded");
    fixture.detectChanges();
    const region: HTMLElement = fixture.nativeElement.querySelector("section");
    expect(region.getAttribute("aria-label")).toBe(title);
    expect(region.querySelector("h2")!.textContent).toBe(title);
    expect(region.getAttribute("data-placement")).toBe("embedded");
    expect(region.querySelector("a")!.getAttribute("href")).toBe("/privacy");
    expect(fixture.nativeElement.getAttribute("dir")).toBe("rtl");
  });
});
