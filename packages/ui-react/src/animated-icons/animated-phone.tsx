"use client";

import { Phone } from "lucide-react";
import type { SVGAttributes } from "react";

interface Props extends SVGAttributes<SVGSVGElement> {
  size?: number;
}

export function AnimatedPhone({ size = 20, className = "", ...props }: Props) {
  return (
    <Phone
      size={size}
      className={`brkta-icon-motion brkta-icon-motion-phone ${className}`}
      aria-hidden="true"
      {...props}
    />
  );
}
