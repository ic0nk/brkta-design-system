import { describe, it, expect, beforeEach } from "vitest";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ComboboxComponent } from "./combobox.component";

const opts = [
  { value: "a", label: "Apple" },
  { value: "b", label: "Banana" },
  { value: "c", label: "Cherry", disabled: true },
];

describe("ComboboxComponent", () => {
  let fixture: ComponentFixture<ComboboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComboboxComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(ComboboxComponent);
    fixture.componentRef.setInput("options", opts);
    fixture.detectChanges();
  });

  it("should render input", () => {
    expect(
      fixture.nativeElement.querySelector("[data-brkta-combobox-input]"),
    ).toBeTruthy();
  });

  it("should have combobox ARIA role", () => {
    expect(
      fixture.nativeElement.querySelector('[role="combobox"]'),
    ).toBeTruthy();
  });

  it("connects a consumer id and accessible name to the searchable input", () => {
    fixture.componentRef.setInput("inputId", "fruit-picker");
    fixture.componentRef.setInput("ariaLabel", "Fruit");
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector(
      "[data-brkta-combobox-input]",
    ) as HTMLInputElement;
    expect(input.id).toBe("fruit-picker");
    expect(input.getAttribute("aria-label")).toBe("Fruit");
    expect(input.getAttribute("aria-controls")).toBe("fruit-picker-list");
  });

  it("filters options as someone types", () => {
    const input = fixture.nativeElement.querySelector(
      "[data-brkta-combobox-input]",
    ) as HTMLInputElement;
    input.dispatchEvent(new Event("focus"));
    input.value = "banana";
    input.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    const options = fixture.nativeElement.querySelectorAll(
      "[data-brkta-combobox-option]",
    );
    expect(options).toHaveLength(1);
    expect(options[0].textContent).toContain("Banana");
  });

  it("should render disabled state", () => {
    fixture.componentRef.setInput("disabled", true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("[data-disabled]")).toBeTruthy();
  });

  it("should show list when open input is true", () => {
    fixture.componentRef.setInput("open", true);
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector("[data-brkta-combobox-list]"),
    ).toBeTruthy();
  });
});
