"use client";

import { Inbox } from "lucide-react";
import type { SVGAttributes } from "react";

interface Props extends SVGAttributes<SVGSVGElement> {
  size?: number;
}

export function AnimatedInbox({ size = 20, className = "", ...props }: Props) {
  return (
    <Inbox
      size={size}
      className={`brkta-icon-motion brkta-icon-motion-inbox ${className}`}
      {...props}
      aria-hidden="true"
    />
  );
}
