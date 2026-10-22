"use client";

import { useState, useCallback, useRef, useEffect, useId } from "react";
import type {
  ComboboxContract,
  ComboboxOption,
} from "@brkta/ui-core/combobox/combobox-contract";

export interface ComboboxProps extends ComboboxContract {}

export function Combobox({
  inputId: providedInputId,
  ariaLabel,
  options,
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  placeholder = "Search...",
  disabled = false,
  invalid = false,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  emptyText = "No results found.",
}: ComboboxProps) {
  const generatedId = useId();
  const inputId = providedInputId ?? `brkta-combobox-${generatedId}`;
  const listId = `${inputId}-list`;
  const isValueControlled = controlledValue !== undefined;
  const isOpenControlled = controlledOpen !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentValue = isValueControlled ? controlledValue : internalValue;
  const open = isOpenControlled ? controlledOpen : internalOpen;

  const setOpen = useCallback(
    (o: boolean) => {
      if (!isOpenControlled) setInternalOpen(o);
      onOpenChange?.(o);
      if (!o) setSearch("");
    },
    [isOpenControlled, onOpenChange],
  );

  const selectValue = useCallback(
    (v: string) => {
      if (!isValueControlled) setInternalValue(v);
      onValueChange?.(v);
      setOpen(false);
      setSearch("");
    },
    [isValueControlled, onValueChange, setOpen],
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      )
        setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, setOpen]);

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase()),
  );
  const selectedLabel =
    options.find((o) => o.value === currentValue)?.label ?? "";

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter")) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (!open) return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        if (filtered[activeIndex]) selectValue(filtered[activeIndex].value);
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
    }
  };

  return (
    <div
      ref={containerRef}
      data-brkta-combobox=""
      data-disabled={disabled ? "" : undefined}
    >
      <div
        data-brkta-combobox-trigger=""
        data-open={open ? "" : undefined}
        data-invalid={invalid ? "" : undefined}
        onClick={() => !disabled && inputRef.current?.focus()}
      >
        <input
          ref={inputRef}
          data-brkta-combobox-input=""
          type="text"
          role="combobox"
          id={inputId}
          aria-label={ariaLabel}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={
            filtered.length > 0 ? `${inputId}-option-${activeIndex}` : undefined
          }
          value={open ? search : selectedLabel}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpen(true);
            setActiveIndex(0);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => !disabled && setOpen(true)}
        />
      </div>
      {open && (
        <div data-brkta-combobox-list="" id={listId} role="listbox">
          {filtered.length === 0 ? (
            <div data-brkta-combobox-empty="">{emptyText}</div>
          ) : (
            filtered.map((opt, i) => (
              <div
                key={opt.value}
                id={`${inputId}-option-${i}`}
                data-brkta-combobox-option=""
                data-active={i === activeIndex ? "" : undefined}
                data-disabled={opt.disabled ? "" : undefined}
                role="option"
                aria-selected={opt.value === currentValue}
                onClick={() => !opt.disabled && selectValue(opt.value)}
              >
                {opt.label}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
