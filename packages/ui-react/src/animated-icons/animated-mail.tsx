"use client";

import { Mail } from "lucide-react";
import type { SVGAttributes } from "react";

interface Props extends SVGAttributes<SVGSVGElement> {
  size?: number;
}

export function AnimatedMail({ size = 20, className = "", ...props }: Props) {
  return (
    <Mail
      size={size}
      className={`brkta-icon-motion brkta-icon-motion-mail ${className}`}
      aria-hidden="true"
      {...props}
    />
  );
}
