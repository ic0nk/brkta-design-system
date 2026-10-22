"use client";

import { MessageCircle } from "lucide-react";
import type { SVGAttributes } from "react";

interface Props extends SVGAttributes<SVGSVGElement> {
  size?: number;
}

export function AnimatedMessageCircle({ size = 20, className = "", ...props }: Props) {
  return (
    <MessageCircle
      size={size}
      className={`brkta-icon-motion brkta-icon-motion-message-circle ${className}`}
      {...props}
      aria-hidden="true"
    />
  );
}
