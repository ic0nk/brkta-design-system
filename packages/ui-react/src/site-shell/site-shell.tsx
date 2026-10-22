"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { SiteFooter, type SiteFooterProps } from "./site-footer";
import { SiteHeader, type SiteHeaderProps } from "./site-header";
import { SiteIntro, type SiteIntroProps } from "./site-intro";
import { SiteThemeProvider } from "./site-theme";
import { mountFloatingScrollbar } from "@brkta/ui-core/scrollbar/floating-scrollbar";

export interface SiteExperienceProps {
  children: ReactNode;
  intro: Omit<SiteIntroProps, "onComplete">;
  header: Omit<SiteHeaderProps, "introComplete">;
  footer?: SiteFooterProps;
}

export function SiteExperience({
  children,
  intro,
  header,
  footer,
}: SiteExperienceProps) {
  const [introComplete, setIntroComplete] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);

  useEffect(() => {
    contentRef.current?.toggleAttribute("inert", !introComplete);
  }, [introComplete]);

  /*
   * Replaces the native scrollbar with the floating one, which reserves no
   * layout width. Mounted here so both Next.js sites get it from the shell;
   * the Angular dashboard calls mountFloatingScrollbar() from its own root.
   */
  useEffect(() => mountFloatingScrollbar(), []);

  useEffect(() => {
    if (introComplete) return undefined;

    const documentElementStyle = document.documentElement.style;
    const bodyStyle = document.body.style;
    const previousDocumentOverflow = documentElementStyle.overflow;
    const previousBodyOverflow = bodyStyle.overflow;
    const previousDocumentOverscrollBehavior =
      documentElementStyle.overscrollBehavior;
    const previousBodyOverscrollBehavior = bodyStyle.overscrollBehavior;

    documentElementStyle.overflow = "hidden";
    bodyStyle.overflow = "hidden";
    documentElementStyle.overscrollBehavior = "none";
    bodyStyle.overscrollBehavior = "none";

    return () => {
      documentElementStyle.overflow = previousDocumentOverflow;
      bodyStyle.overflow = previousBodyOverflow;
      documentElementStyle.overscrollBehavior =
        previousDocumentOverscrollBehavior;
      bodyStyle.overscrollBehavior = previousBodyOverscrollBehavior;
    };
  }, [introComplete]);

  return (
    <SiteThemeProvider>
      <div
        className="brkta-site-experience"
        data-brkta-site-experience
        data-intro-active={introComplete ? "false" : "true"}
      >
        <SiteIntro {...intro} onComplete={handleIntroComplete} />
        <SiteHeader {...header} introComplete={introComplete} />
        <div ref={contentRef} className="brkta-site-experience-content">
          {children}
          {footer && <SiteFooter {...footer} />}
        </div>
      </div>
    </SiteThemeProvider>
  );
}
