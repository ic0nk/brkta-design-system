"use client";

import { useState, useCallback } from "react";
import type { ReactNode } from "react";
import type {
  SidebarContract,
  SidebarItemContract,
} from "@brkta/ui-core/sidebar/sidebar-contract";
import { AnimatedPanelLeft } from "../animated-icons/animated-panel-left";

/** React-specific sidebar item: icon is a ReactNode */
interface SidebarItem extends Omit<SidebarItemContract, "icon"> {
  icon?: ReactNode;
}

export type SidebarVariant = "standalone" | "embedded";

export interface SidebarProps extends Omit<SidebarContract, "items"> {
  items: SidebarItem[];
  /** Layout context for the governed sidebar recipe. */
  variant?: SidebarVariant;
  /** Whether to render the header collapse control. */
  showCollapseToggle?: boolean;
}

/**
 * Sidebar items share the Button's hover fill, so they need the same pointer origin.
 * Touch and keyboard fall back to the CSS default of 50%, having no entry point.
 */
function placeSidebarFillOrigin(event: React.PointerEvent<HTMLElement>): void {
  if (event.pointerType !== "mouse") return;
  const target = event.currentTarget;
  const box = target.getBoundingClientRect();
  if (box.width === 0 || box.height === 0) return;
  target.style.setProperty("--brkta-sidebar-fill-x", `${event.clientX - box.left}px`);
  target.style.setProperty("--brkta-sidebar-fill-y", `${event.clientY - box.top}px`);
}

export function Sidebar({
  items,
  collapsed: controlledCollapsed,
  header,
  footer,
  onCollapsedChange,
  onItemSelect,
  variant = "standalone",
  showCollapseToggle = true,
}: SidebarProps) {
  const isControlled = controlledCollapsed !== undefined;
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const collapsed = isControlled ? controlledCollapsed : internalCollapsed;

  const toggleCollapsed = useCallback(() => {
    const next = !collapsed;
    if (!isControlled) {
      setInternalCollapsed(next);
    }
    onCollapsedChange?.(next);
  }, [collapsed, isControlled, onCollapsedChange]);

  return (
    <aside
      data-brkta-sidebar=""
      data-variant={variant === "embedded" ? "embedded" : undefined}
      data-collapsed={collapsed ? "" : undefined}
    >
      {header && (
        <div data-brkta-sidebar-header="">
          <span data-brkta-sidebar-header-label="">{header}</span>
          {showCollapseToggle && (
            <button
              data-brkta-sidebar-toggle=""
              onClick={toggleCollapsed}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              type="button"
            >
              <AnimatedPanelLeft collapsed={collapsed} size={16} />
            </button>
          )}
        </div>
      )}
      <nav data-brkta-sidebar-nav="">
        {items.map((item) => (
          <button
            key={item.value}
            className="brkta-icon-motion-trigger"
            data-brkta-sidebar-item=""
            data-active={item.active ? "" : undefined}
            data-disabled={item.disabled ? "" : undefined}
            aria-current={item.active ? "page" : undefined}
            disabled={item.disabled}
            onClick={() => onItemSelect?.(item)}
            onPointerEnter={placeSidebarFillOrigin}
            type="button"
          >
            {item.icon && (
              <span data-brkta-sidebar-item-icon="" aria-hidden="true">
                {item.icon}
              </span>
            )}
            <span data-brkta-sidebar-item-label="">{item.label}</span>
            {item.badge !== undefined && (
              <span data-brkta-sidebar-item-badge="">{item.badge}</span>
            )}
          </button>
        ))}
      </nav>
      {footer && <div data-brkta-sidebar-footer="">{footer}</div>}
    </aside>
  );
}
