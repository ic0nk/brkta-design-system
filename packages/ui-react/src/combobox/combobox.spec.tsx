import { describe, it, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { Combobox } from "./combobox";

const opts = [
  { value: "a", label: "Apple" },
  { value: "b", label: "Banana" },
  { value: "c", label: "Cherry", disabled: true },
];

describe("Combobox", () => {
  it("renders input", () => {
    const { container } = render(<Combobox options={opts} />);
    expect(container.querySelector("[data-brkta-combobox-input]")).toBeTruthy();
  });

  it("opens list on focus", () => {
    const { container } = render(<Combobox options={opts} />);
    const input = container.querySelector("[data-brkta-combobox-input]")!;
    fireEvent.focus(input);
    expect(container.querySelector("[data-brkta-combobox-list]")).toBeTruthy();
  });

  it("renders options in list", () => {
    const { container } = render(<Combobox options={opts} />);
    fireEvent.focus(container.querySelector("[data-brkta-combobox-input]")!);
    const options = container.querySelectorAll("[data-brkta-combobox-option]");
    expect(options.length).toBe(3);
  });

  it("selects option on click", () => {
    const onValueChange = vi.fn();
    const { container } = render(
      <Combobox options={opts} onValueChange={onValueChange} />,
    );
    fireEvent.focus(container.querySelector("[data-brkta-combobox-input]")!);
    const opt = container.querySelector("[data-brkta-combobox-option]")!;
    fireEvent.click(opt);
    expect(onValueChange).toHaveBeenCalledWith("a");
  });

  it("renders disabled state", () => {
    const { container } = render(<Combobox options={opts} disabled />);
    expect(container.querySelector("[data-disabled]")).toBeTruthy();
  });

  it("has combobox ARIA role", () => {
    const { container } = render(<Combobox options={opts} />);
    const input = container.querySelector("[data-brkta-combobox-input]")!;
    expect(input.getAttribute("role")).toBe("combobox");
  });

  it("connects a consumer id and accessible name to the searchable input", () => {
    const { container } = render(
      <Combobox inputId="fruit-picker" ariaLabel="Fruit" options={opts} />,
    );
    const input = container.querySelector("[data-brkta-combobox-input]")!;
    expect(input.id).toBe("fruit-picker");
    expect(input.getAttribute("aria-label")).toBe("Fruit");
    expect(input.getAttribute("aria-controls")).toBe("fruit-picker-list");
  });

  it("filters options as someone types", () => {
    const { container } = render(<Combobox options={opts} />);
    const input = container.querySelector("[data-brkta-combobox-input]")!;
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "banana" } });

    const options = container.querySelectorAll("[data-brkta-combobox-option]");
    expect(options).toHaveLength(1);
    expect(options[0].textContent).toContain("Banana");
  });
});
