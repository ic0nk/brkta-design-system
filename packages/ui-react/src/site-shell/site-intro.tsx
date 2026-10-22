"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useSiteTheme } from "./site-theme";

export interface SiteIntroProps {
  logoSrc: string;
  logoSrcDark?: string;
  logoAlt: string;
  logoWidth?: number;
  logoHeight?: number;
  kicker?: string;
  messageLines?: readonly string[];
  meta?: string;
  onComplete?: () => void;
}

const defaultMessageLines = [
  "Websites, platforms, and digital systems",
  "for companies, places, and ambitious teams.",
];

const introLineCount = 28;
const INTRO_WATCHDOG_MS = 8_000;

export function SiteIntro({
  logoSrc,
  logoSrcDark,
  logoAlt,
  logoWidth = 781,
  logoHeight = 213,
  kicker = "BRKTA / SOFTWARE COMPANY",
  messageLines = defaultMessageLines,
  meta = "Preparing your experience",
  onComplete,
}: SiteIntroProps) {
  const { resolved } = useSiteTheme();
  const rootRef = useRef<HTMLDivElement>(null);
  const handoffRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);
  const activeLogoSrc =
    resolved === "dark" ? logoSrc : (logoSrcDark ?? logoSrc);
  const headerLogoSrc =
    resolved === "dark" ? (logoSrcDark ?? logoSrc) : logoSrc;

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const complete = () => {
      if (completedRef.current) return;
      completedRef.current = true;
      onComplete?.();
    };

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set(root, { autoAlpha: 0, pointerEvents: "none" });
      root.dataset.brktaSiteIntroState = "complete";
      complete();
      return undefined;
    }

    root.dataset.brktaSiteIntroState = "running";

    let isActive = true;
    let nextLineTimer: gsap.core.Tween | undefined;
    let activeLineTimeline: gsap.core.Timeline | undefined;
    let handoffFade: gsap.core.Tween | undefined;
    let completionTimer: number | undefined;
    const logoStage = root.querySelector<HTMLElement>(
      ".brkta-site-intro-logo-stage",
    );
    const headerLogo = document.querySelector<HTMLElement>(
      "[data-brkta-site-header-logo]",
    );
    const handoffOverlay = handoffRef.current;
    const introHandoffLogo = handoffOverlay?.querySelector<HTMLImageElement>(
      ".brkta-site-intro-logo-handoff-intro",
    );
    const headerHandoffLogo = handoffOverlay?.querySelector<HTMLImageElement>(
      ".brkta-site-intro-logo-handoff-header",
    );
    const logoHandoff =
      logoStage &&
      headerLogo &&
      handoffOverlay &&
      introHandoffLogo &&
      headerHandoffLogo
        ? {
            stageRect: logoStage.getBoundingClientRect(),
            headerRect: headerLogo.getBoundingClientRect(),
            introHandoffLogo,
            headerHandoffLogo,
          }
        : undefined;

    const finishIntro = () => {
      if (completedRef.current) return;
      if (completionTimer !== undefined) {
        window.clearTimeout(completionTimer);
        completionTimer = undefined;
      }
      root.dataset.brktaSiteIntroState = "complete";
      gsap.set(root, { autoAlpha: 0, pointerEvents: "none" });
      complete();
      if (logoHandoff) {
        handoffFade = gsap.to(handoffOverlay, {
          autoAlpha: 0,
          duration: 0.2,
          delay: 0.1,
          ease: "power2.out",
        });
      }
    };

    const context = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>(
        ".brkta-site-intro-grid-line",
      );
      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: finishIntro,
      });

      if (lines.length) {
        let previousLine: HTMLElement | undefined;

        const scheduleNextLine = (delay: number) => {
          if (isActive) {
            nextLineTimer = gsap.delayedCall(delay, animateNextLine);
          }
        };

        function animateNextLine() {
          if (!isActive) return;

          const visibleLines = lines.filter((line) => line.offsetParent);
          const candidates = visibleLines.length ? visibleLines : lines;
          const availableLines = candidates.filter(
            (line) => line !== previousLine,
          );
          const pool = availableLines.length ? availableLines : candidates;
          const line = pool[Math.floor(Math.random() * pool.length)];
          previousLine = line;

          activeLineTimeline = gsap
            .timeline({
              onComplete: () => scheduleNextLine(gsap.utils.random(0.8, 1.8)),
            })
            .to(line, {
              scaleY: gsap.utils.random(0.16, 0.38),
              duration: gsap.utils.random(1.4, 2.2),
              ease: "sine.inOut",
            })
            .to(line, {
              scaleY: 1,
              duration: gsap.utils.random(1.8, 2.8),
              ease: "sine.inOut",
            });
        }

        scheduleNextLine(0.65);
      }

      timeline
        .fromTo(
          ".brkta-site-intro-logo",
          { autoAlpha: 0, scale: 0.9, y: 16 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 0.65 },
        )
        .fromTo(
          ".brkta-site-intro-kicker",
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.35 },
          "-=0.2",
        )
        .fromTo(
          ".brkta-site-intro-line",
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.08 },
          "-=0.12",
        )
        .fromTo(
          ".brkta-site-intro-progress-fill",
          { scaleX: 0 },
          { scaleX: 1, duration: 1.05, ease: "power2.inOut" },
          "-=0.1",
        );

      if (logoHandoff) {
        gsap.set(handoffOverlay, {
          left: logoHandoff.stageRect.left,
          top: logoHandoff.stageRect.top,
          width: logoHandoff.stageRect.width,
          height: logoHandoff.stageRect.height,
        });

        timeline
          .to(handoffOverlay, {
            left: logoHandoff.headerRect.left,
            top: logoHandoff.headerRect.top,
            width: logoHandoff.headerRect.width,
            height: logoHandoff.headerRect.height,
            duration: 0.72,
            ease: "power4.inOut",
            delay: 0.12,
            onStart: () => {
              gsap.set(handoffOverlay, { autoAlpha: 1 });
              gsap.set(logoStage, { autoAlpha: 0 });
            },
          })
          .to(
            logoHandoff.introHandoffLogo,
            { autoAlpha: 0, duration: 0.28, ease: "power2.inOut" },
            "<0.42",
          )
          .to(
            logoHandoff.headerHandoffLogo,
            { autoAlpha: 1, duration: 0.28, ease: "power2.inOut" },
            "<",
          )
          .to(
            root,
            {
              clipPath: "inset(0 0 100% 0)",
              duration: 0.72,
              ease: "power4.inOut",
            },
            "<",
          );
      } else {
        timeline.to(root, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.72,
          ease: "power4.inOut",
          delay: 0.12,
        });
      }

      /*
       * The intro's longest normal path is about 3.42 seconds with the logo
       * handoff. Keep the overlay recoverable if a mobile browser stalls a
       * tween or never delivers its completion callback.
       */
      completionTimer = window.setTimeout(finishIntro, INTRO_WATCHDOG_MS);
    }, root);

    return () => {
      isActive = false;
      nextLineTimer?.kill();
      activeLineTimeline?.kill();
      handoffFade?.kill();
      if (completionTimer !== undefined) {
        window.clearTimeout(completionTimer);
      }
      context.revert();
    };
  }, [onComplete]);

  return (
    <>
      <div
        ref={rootRef}
        className="brkta-site-intro"
        data-brkta-site-intro
        data-brkta-site-intro-theme={resolved === "dark" ? "light" : "dark"}
        data-brkta-site-intro-state="pending"
        role="status"
        aria-live="polite"
      >
        <div className="brkta-site-intro-grid" aria-hidden="true">
          {Array.from({ length: introLineCount }, (_, index) => (
            <span
              className="brkta-site-intro-grid-line"
              key={index}
              style={{
                left: `${(index / (introLineCount - 1)) * 100}%`,
              }}
            />
          ))}
        </div>
        <div className="brkta-site-intro-top">
          <span>BRKTA / 2026</span>
        </div>
        <div className="brkta-site-intro-content">
          <span
            className="brkta-site-intro-logo-stage"
            data-brkta-site-intro-logo-stage
          >
            <img
              className="brkta-site-intro-logo"
              src={activeLogoSrc}
              alt={logoAlt}
              width={logoWidth}
              height={logoHeight}
            />
          </span>
          <p className="brkta-site-intro-kicker">{kicker}</p>
          <p className="brkta-site-intro-message">
            {messageLines.map((line, index) => (
              <span className="brkta-site-intro-line" key={`${line}-${index}`}>
                {line}
              </span>
            ))}
          </p>
        </div>
        <div className="brkta-site-intro-bottom">
          <span>{meta}</span>
          <span className="brkta-site-intro-progress" role="presentation">
            <span className="brkta-site-intro-progress-fill" />
          </span>
        </div>
      </div>
      <div
        ref={handoffRef}
        className="brkta-site-intro-logo-handoff"
        data-brkta-site-logo-handoff
        aria-hidden="true"
      >
        <img
          className="brkta-site-intro-logo-handoff-intro"
          src={activeLogoSrc}
          alt=""
          width={logoWidth}
          height={logoHeight}
        />
        <img
          className="brkta-site-intro-logo-handoff-header"
          src={headerLogoSrc}
          alt=""
          width={logoWidth}
          height={logoHeight}
        />
      </div>
    </>
  );
}
