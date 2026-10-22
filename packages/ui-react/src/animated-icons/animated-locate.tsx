"use client";

import { Locate } from "lucide-react";
import type { SVGAttributes } from "react";

interface Props extends SVGAttributes<SVGSVGElement> {
  size?: number;
}

export function AnimatedLocate({
  size = 20,
  className = "",
  ...props
}: Props) {
  return (
    <Locate
      size={size}
      className={`brkta-icon-motion brkta-icon-motion-locate ${className}`}
      aria-hidden="true"
      {...props}
    />
  );
}
