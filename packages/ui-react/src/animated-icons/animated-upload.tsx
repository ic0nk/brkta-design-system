"use client";

import { Upload } from "lucide-react";
import type { SVGAttributes } from "react";

interface Props extends SVGAttributes<SVGSVGElement> {
  size?: number;
}

export function AnimatedUpload({ size = 32, className = "", ...props }: Props) {
  return (
    <Upload
      size={size}
      className={`brkta-icon-motion brkta-icon-motion-upload ${className}`}
      aria-hidden="true"
      {...props}
    />
  );
}
