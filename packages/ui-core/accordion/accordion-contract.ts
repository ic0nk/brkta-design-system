export interface AccordionItemContract {
  /** Unique identifier for the item */
  value: string;
  /** Trigger label displayed in the header */
  label: string;
  /** Content rendered when expanded */
  content?: unknown;
  /** Whether this item is disabled */
  disabled?: boolean;
}

export interface AccordionContract {
  /** Accordion items */
  items: AccordionItemContract[];
  /** Controlled: the value(s) of the currently open item(s) */
  value?: string | string[];
  /** Uncontrolled: the default open item value(s) */
  defaultValue?: string | string[];
  /** Whether multiple items can be open simultaneously */
  multiple?: boolean;
  /** Callback when value changes */
  onValueChange?: (value: string | string[]) => void;
}
