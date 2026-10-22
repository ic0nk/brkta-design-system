'use client';

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useId,
  type KeyboardEvent,
} from 'react';
import type { SelectVariant, SelectSize } from '@brkta/ui-core/types/variant';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  /** ID of the visible combobox trigger for label association. */
  id?: string;
  /** Available options */
  options: SelectOption[];
  /** Controlled value */
  value?: string;
  /** Uncontrolled default value */
  defaultValue?: string;
  /** Placeholder text when no option is selected */
  placeholder?: string;
  /** Visual variant of the select trigger */
  variant?: SelectVariant;
  /** Size preset */
  size?: SelectSize;
  /** Whether the entire select is disabled */
  disabled?: boolean;
  /** Marks the select as invalid */
  invalid?: boolean;
  /** Whether selection is required */
  required?: boolean;
  /** Name attribute for form submission */
  name?: string;
  /** ID reference for the visible accessible label */
  ariaLabelledBy?: string;
  /** aria-describedby for error/help text */
  ariaDescribedBy?: string;
  /** Callback fired when value changes */
  onValueChange?: (value: string) => void;
}

/**
 * BRKTA Custom Select — renders a custom-designed dropdown that replaces
 * unstyled browser-native `<option>` menus with an BRKTA-branded listbox.
 *
 * Data attributes:
 *   - `data-brkta-select` on wrapper
 *   - `data-brkta-select-trigger` on trigger button
 *   - `data-brkta-select-value` on selected value text
 *   - `data-brkta-select-icon` on chevron
 *   - `data-brkta-select-content` on dropdown
 *   - `data-brkta-select-option` on options
 */
export function Select({
  id,
  options,
  value: controlledValue,
  defaultValue,
  placeholder = 'Select…',
  variant = 'default',
  size = 'md',
  disabled = false,
  invalid = false,
  required = false,
  name,
  ariaLabelledBy,
  ariaDescribedBy,
  onValueChange,
}: SelectProps) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<string>(defaultValue ?? '');
  const selectedValue = isControlled ? controlledValue : internalValue;

  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);
  const closingTimerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const idPrefix = useId();

  const selectedOption = options.find((o) => o.value === selectedValue);
  const selectedLabel = selectedOption?.label ?? placeholder;

  // ---- Close with animation ----
  const close = useCallback(() => {
    setClosing(true);
    // Wait for the closing animation to finish, then fully close
    closingTimerRef.current = setTimeout(() => {
      setOpen(false);
      setClosing(false);
      setActiveIndex(-1);
    }, 160); // slightly longer than --duration-fast (150ms) for safety
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (closingTimerRef.current) clearTimeout(closingTimerRef.current);
    };
  }, []);

  // ---- Close on click outside ----
  useEffect(() => {
    if (!open || closing) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open, close, closing]);

  // ---- Close on Escape ----
  useEffect(() => {
    if (!open || closing) return;
    const handleKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, close, closing]);

  // ---- Select value ----
  const selectValue = useCallback(
    (val: string) => {
      if (!isControlled) {
        setInternalValue(val);
      }
      onValueChange?.(val);
      close();
      triggerRef.current?.focus();
    },
    [isControlled, onValueChange, close],
  );

  // ---- Toggle open ----
  const toggleOpen = useCallback(() => {
    if (disabled || closing) return;
    const next = !open;
    if (next) {
      setOpen(true);
      const idx = options.findIndex(
        (o) => o.value === selectedValue && !o.disabled,
      );
      setActiveIndex(idx >= 0 ? idx : -1);
    } else {
      close();
    }
  }, [disabled, open, closing, options, selectedValue, close]);

  // ---- Keyboard navigation on trigger ----
  const handleTriggerKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowUp':
          e.preventDefault();
          if (!open) {
            const idx = options.findIndex(
              (o) => o.value === selectedValue && !o.disabled,
            );
            setActiveIndex(idx >= 0 ? idx : -1);
            setOpen(true);
          }
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          toggleOpen();
          break;
      }
    },
    [open, options, selectedValue, toggleOpen],
  );

  // ---- Keyboard navigation on listbox ----
  const handleListboxKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const enabledOptions = options.filter((o) => !o.disabled);
      if (enabledOptions.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex((prev) => {
            let next = prev + 1;
            while (next < options.length && options[next].disabled) next++;
            return next < options.length ? next : prev;
          });
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex((prev) => {
            let next = prev - 1;
            while (next >= 0 && options[next].disabled) next--;
            return next >= 0 ? next : prev;
          });
          break;
        case 'Home':
          e.preventDefault();
          setActiveIndex(0);
          break;
        case 'End':
          e.preventDefault();
          setActiveIndex(options.length - 1);
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (activeIndex >= 0 && !options[activeIndex].disabled) {
            selectValue(options[activeIndex].value);
          }
          break;
        case 'Escape':
          e.preventDefault();
          close();
          triggerRef.current?.focus();
          break;
      }
    },
    [activeIndex, options, selectValue, close],
  );

  // ---- Scroll active option into view ----
  useEffect(() => {
    if (!open || activeIndex < 0 || !listboxRef.current) return;
    const optionEl = listboxRef.current.querySelector(
      `[data-index="${activeIndex}"]`,
    );
    optionEl?.scrollIntoView?.({ block: 'nearest' });
  }, [activeIndex, open]);

  const triggerId = id || `${idPrefix}-trigger`;
  const listboxId = `${idPrefix}-listbox`;
  const activeDescendant =
    activeIndex >= 0 ? `${idPrefix}-option-${activeIndex}` : undefined;

  return (
    <div ref={containerRef} data-brkta-select="" data-open={open ? '' : undefined}>
      <button
        ref={triggerRef}
        data-brkta-select-trigger=""
        data-variant={variant}
        data-size={size}
        data-disabled={disabled || undefined}
        data-invalid={invalid || undefined}
        id={triggerId}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-activedescendant={activeDescendant}
        aria-labelledby={ariaLabelledBy || undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={ariaDescribedBy || undefined}
        aria-required={required || undefined}
        disabled={disabled}
        onClick={toggleOpen}
        onKeyDown={handleTriggerKeyDown}
      >
        <span
          data-brkta-select-value=""
          data-placeholder={
            selectedOption === undefined ? '' : undefined
          }
          aria-label={selectedOption === undefined ? placeholder : undefined}
        >
          {selectedLabel}
        </span>
        <span data-brkta-select-icon="" aria-hidden="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </button>

      {(open || closing) && (
        <div
          ref={listboxRef}
          data-brkta-select-content=""
          data-closing={closing ? '' : undefined}
          data-scrollable={options.length > 6 ? '' : undefined}
          id={listboxId}
          role="listbox"
          aria-label={placeholder}
          tabIndex={-1}
          onKeyDown={handleListboxKeyDown}
        >
          {options.map((option, index) => {
            const isSelected = option.value === selectedValue;
            const isActive = index === activeIndex;
            const optionId = `${idPrefix}-option-${index}`;

            return (
              <div
                key={option.value}
                data-brkta-select-option=""
                data-selected={isSelected || undefined}
                data-active={isActive || undefined}
                data-disabled={option.disabled || undefined}
                data-index={index}
                id={optionId}
                role="option"
                aria-selected={isSelected}
                aria-disabled={option.disabled || undefined}
                onClick={() => {
                  if (!option.disabled) selectValue(option.value);
                }}
                onMouseEnter={() => {
                  if (!option.disabled) setActiveIndex(index);
                }}
              >
                <span>{option.label}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Hidden native input for form integration */}
      {name && (
        <input type="hidden" name={name} value={selectedValue ?? ''} />
      )}
    </div>
  );
}
