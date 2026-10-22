"use client";

import { Menu, Monitor, Moon, Sun, X } from "lucide-react";
import type { SVGAttributes } from "react";

interface SiteIconProps extends SVGAttributes<SVGSVGElement> {
  size?: number;
}

export function AnimatedMenu({
  size = 20,
  className = "",
  ...props
}: SiteIconProps) {
  return (
    <Menu
      size={size}
      className={`brkta-icon-motion brkta-icon-motion-menu ${className}`}
      aria-hidden="true"
      {...props}
    />
  );
}

export function AnimatedClose({
  size = 20,
  className = "",
  ...props
}: SiteIconProps) {
  return (
    <X
      size={size}
      className={`brkta-icon-motion brkta-icon-motion-close ${className}`}
      aria-hidden="true"
      {...props}
    />
  );
}

export function AnimatedMonitor({
  size = 20,
  className = "",
  ...props
}: SiteIconProps) {
  return (
    <Monitor
      size={size}
      className={`brkta-icon-motion brkta-icon-motion-theme brkta-icon-motion-monitor ${className}`}
      aria-hidden="true"
      {...props}
    />
  );
}

export function AnimatedMoon({
  size = 20,
  className = "",
  ...props
}: SiteIconProps) {
  return (
    <Moon
      size={size}
      className={`brkta-icon-motion brkta-icon-motion-theme brkta-icon-motion-moon ${className}`}
      aria-hidden="true"
      {...props}
    />
  );
}

export function AnimatedSun({
  size = 20,
  className = "",
  ...props
}: SiteIconProps) {
  return (
    <Sun
      size={size}
      className={`brkta-icon-motion brkta-icon-motion-theme brkta-icon-motion-sun ${className}`}
      aria-hidden="true"
      {...props}
    />
  );
}
