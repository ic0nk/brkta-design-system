"use client";

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import type { SVGAttributes } from "react";

interface Props extends SVGAttributes<SVGSVGElement> {
  collapsed?: boolean;
  size?: number;
}

export function AnimatedPanelLeft({
  collapsed = false,
  size = 20,
  className = "",
  ...props
}: Props) {
  const Icon = collapsed ? PanelLeftOpen : PanelLeftClose;

  return (
    <Icon
      size={size}
      className={`brkta-icon-motion brkta-icon-motion-panel-left ${className}`}
      {...props}
      aria-hidden="true"
    />
  );
}
