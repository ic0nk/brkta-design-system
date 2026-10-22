"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "../button/button";
import {
  AnimatedFacebook,
  AnimatedInstagram,
  AnimatedLinkedin,
  AnimatedMail,
  AnimatedPhone,
  AnimatedTiktok,
  AnimatedWhatsapp,
} from "../animated-icons";
import {
  AnimatedClose,
  AnimatedMenu,
  AnimatedMonitor,
  AnimatedMoon,
  AnimatedSun,
} from "./site-icons";
import { isSameSitePath, SiteLink } from "./site-link";
import { useSiteTheme } from "./site-theme";

export interface SiteNavigationItem {
  label: string;
  href: string;
  readonly children?: readonly SiteNavigationItem[];
}

export interface SiteHeaderAction {
  label: string;
  href: string;
}

export type SiteHeaderContactIcon =
  | "mail"
  | "phone"
  | "whatsapp"
  | "facebook"
  | "instagram"
  | "tiktok"
  | "linkedin";

export interface SiteHeaderContactLink {
  label: string;
  href: string;
  icon: SiteHeaderContactIcon;
  external?: boolean;
}

export interface SiteThemeLabels {
  control: string;
  light: string;
  dark: string;
  system: string;
}

export interface SiteHeaderProps {
  logoSrc: string;
  logoSrcDark?: string;
  logoAlt: string;
  logoWidth?: number;
  logoHeight?: number;
  navItems: readonly SiteNavigationItem[];
  primaryAction?: SiteHeaderAction;
  contactLinks?: readonly SiteHeaderContactLink[];
  themeLabels: SiteThemeLabels;
  /** Optional route path used by non-home pages for page-level active state. */
  currentPath?: string;
  /** The brand target defaults to the home page's in-page #top anchor. */
  homeHref?: string;
  introComplete?: boolean;
  /*
   * "bar" is the horizontal header every other app uses and stays the default.
   * "rail" moves navigation to a vertical edge and leaves only the mark at the
   * top-left — for pages whose left gutter is already spoken for.
   */
  layout?: "bar" | "rail";
}

const MENU_CONTENT_SELECTOR =
  ".brkta-site-header-menu-link, .brkta-site-header-menu-child-link, .brkta-site-header-menu-contact a, .brkta-site-header-menu-action, .brkta-site-header-menu-theme";

/*
 * From 901px the rail menu is a compact dropdown anchored to the corner, so the
 * page stays visible and clicking it should dismiss the menu. Below that the
 * panel covers the viewport and the toggle is the only way out -- a stray tap
 * while scrolling a full-screen menu must not close it. 901px is the same
 * threshold the site-shell stylesheet uses to switch between those two shapes.
 */
const MENU_DISMISS_ON_OUTSIDE_QUERY = "(min-width: 901px)";

/* The toggles already flip the menu; letting this handler see them would close
   and reopen on one click. */
const MENU_TOGGLE_SELECTOR =
  ".brkta-site-header-menu-toggle, .brkta-site-header-rail-toggle";

const getPrefersReducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function SiteHeader({
  logoSrc,
  logoSrcDark,
  logoAlt,
  logoWidth = 781,
  logoHeight = 213,
  navItems,
  primaryAction,
  contactLinks = [],
  themeLabels,
  currentPath,
  homeHref = "#top",
  introComplete = true,
  layout = "bar",
}: SiteHeaderProps) {
  const { mode, resolved, cycleMode } = useSiteTheme();
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = `brkta-site-header-menu-${useId().replaceAll(":", "")}`;
  const [menuOpen, setMenuOpen] = useState(false);
  // Keep the panel mounted and visible until its reverse timeline completes.
  const [menuClosing, setMenuClosing] = useState(false);
  const menuTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const menuDesiredOpenRef = useRef(false);
  const menuClosingRef = useRef(false);
  const menuMountedRef = useRef(false);
  const menuTriggerRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotionRef = useRef(false);
  const [isScrolled, setIsScrolled] = useState(false);
  /* Filled by the route's own progress, written straight to the DOM. */
  const progressRef = useRef<HTMLSpanElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const navigationItems = useMemo(
    () =>
      navItems.flatMap((item) => [
        item,
        ...(item.children ?? []),
      ]),
    [navItems],
  );
  const currentRouteHref = currentPath
    ? navigationItems.find(
        (item) =>
          currentPath === item.href ||
          (item.href !== "/" && currentPath.startsWith(`${item.href}/`)),
      )?.href
    : undefined;
  const [activeHref, setActiveHref] = useState(
    currentRouteHref ?? (currentPath ? "" : (navItems[0]?.href ?? "")),
  );
  const [isLogoInverted, setIsLogoInverted] = useState(false);
  const normalLogoSrc =
    resolved === "dark" ? (logoSrcDark ?? logoSrc) : logoSrc;
  const oppositeLogoSrc =
    resolved === "dark" ? logoSrc : (logoSrcDark ?? logoSrc);
  const themeLabel = themeLabels[mode];
  const themeIcon =
    mode === "dark" ? (
      <AnimatedMoon size={18} />
    ) : mode === "light" ? (
      <AnimatedSun size={18} />
    ) : (
      <AnimatedMonitor size={18} />
    );

  const renderContactIcon = (icon: SiteHeaderContactIcon) => {
    switch (icon) {
      case "mail":
        return <AnimatedMail size={21} />;
      case "phone":
        return <AnimatedPhone size={21} />;
      case "whatsapp":
        return <AnimatedWhatsapp size={21} />;
      case "facebook":
        return <AnimatedFacebook size={21} />;
      case "instagram":
        return <AnimatedInstagram size={21} />;
      case "tiktok":
        return <AnimatedTiktok size={21} />;
      case "linkedin":
        return <AnimatedLinkedin size={21} />;
    }
  };

  const clearMenuTransforms = useCallback(() => {
    const menu = menuRef.current;
    if (!menu) return;

    gsap.set(menu, { clearProps: "transform,opacity,visibility" });
    const content = menu.querySelectorAll<HTMLElement>(MENU_CONTENT_SELECTOR);
    if (content.length) {
      gsap.set(content, { clearProps: "transform,opacity,visibility" });
    }
  }, []);

  const restoreMenuFocus = useCallback(() => {
    const trigger = menuTriggerRef.current;
    if (trigger?.isConnected) {
      trigger.focus();
      return;
    }

    const fallback = headerRef.current?.querySelector<HTMLElement>(
      ".brkta-site-header-menu-toggle, .brkta-site-header-rail-toggle",
    );
    fallback?.focus();
  }, []);

  const finishMenuOpen = useCallback(() => {
    if (!menuMountedRef.current) return;
    if (!menuDesiredOpenRef.current) {
      menuTimelineRef.current?.reverse?.();
      return;
    }

    clearMenuTransforms();
    menuClosingRef.current = false;
    setMenuClosing(false);
    setMenuOpen(true);
  }, [clearMenuTransforms]);

  const finishMenuClose = useCallback(() => {
    if (!menuMountedRef.current) return;
    if (menuDesiredOpenRef.current) {
      menuTimelineRef.current?.play?.();
      return;
    }

    clearMenuTransforms();
    menuClosingRef.current = false;
    setMenuClosing(false);
    setMenuOpen(false);
    restoreMenuFocus();
  }, [clearMenuTransforms, restoreMenuFocus]);

  const openMenu = useCallback(
    (trigger?: HTMLElement) => {
      if (trigger) menuTriggerRef.current = trigger;

      menuDesiredOpenRef.current = true;
      menuClosingRef.current = false;
      setMenuOpen(true);
      setMenuClosing(false);

      if (prefersReducedMotionRef.current) {
        clearMenuTransforms();
        return;
      }

      const timeline = menuTimelineRef.current;
      if (timeline) {
        timeline.play?.();
      } else {
        clearMenuTransforms();
      }
    },
    [clearMenuTransforms],
  );

  const closeMenu = useCallback(() => {
    if (!menuDesiredOpenRef.current || menuClosingRef.current) return;

    menuDesiredOpenRef.current = false;
    menuClosingRef.current = true;
    setMenuClosing(true);
    restoreMenuFocus();

    if (prefersReducedMotionRef.current) {
      finishMenuClose();
      return;
    }

    const timeline = menuTimelineRef.current;
    if (!timeline || !timeline.reverse) {
      finishMenuClose();
      return;
    }

    timeline.reverse();
  }, [finishMenuClose, restoreMenuFocus]);

  const toggleMenu = useCallback(
    (trigger: HTMLElement) => {
      if (menuDesiredOpenRef.current && !menuClosingRef.current) {
        closeMenu();
      } else {
        openMenu(trigger);
      }
    },
    [closeMenu, openMenu],
  );

  const handleNavClick = useCallback(
    (href: string, event?: MouseEvent<HTMLElement>) => {
      closeMenu();
      if (href === "#top" || isSameSitePath(href, currentPath)) {
        event?.preventDefault();
        if (href !== "#top") window.history.replaceState(null, "", href);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      if (href.startsWith("#")) setActiveHref(href);
    },
    [closeMenu, currentPath],
  );

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header || !introComplete) return undefined;

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set(header, { autoAlpha: 1, y: 0 });
      gsap.set(header, { clearProps: "transform" });
      return undefined;
    }

    const context = gsap.context(() => {
      gsap.set(header, { autoAlpha: 1, y: 0 });
      gsap.set(header, { clearProps: "transform" });
      gsap.timeline().fromTo(
        ".brkta-site-header-nav > *, .brkta-site-header-actions > *",
        { autoAlpha: 0, y: -8 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.06,
          ease: "power2.out",
        },
        "-=0.2",
      );
    }, header);

    return () => context.revert();
  }, [introComplete]);

  useLayoutEffect(() => {
    if (!introComplete) return undefined;

    const targets = navigationItems
      .map((item) => {
        if (!item.href.startsWith("#")) return undefined;
        const element = document.getElementById(item.href.slice(1));
        return element ? { element, href: item.href } : undefined;
      })
      .filter((target): target is { element: HTMLElement; href: string } =>
        Boolean(target),
      );

    let observer: IntersectionObserver | undefined;

    if (targets.length && typeof window.IntersectionObserver === "function") {
      const visibility = new Map<Element, number>();
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            visibility.set(
              entry.target,
              entry.isIntersecting ? entry.intersectionRatio : 0,
            );
          });

          const current = [...visibility.entries()]
            .filter(([, ratio]) => ratio > 0)
            .sort(
              ([, firstRatio], [, secondRatio]) => secondRatio - firstRatio,
            )[0];

          if (current) {
            const target = targets.find(
              ({ element }) => element === current[0],
            );
            if (target) setActiveHref(target.href);
          }
        },
        {
          rootMargin: "-20% 0px -55% 0px",
          threshold: [0, 0.25, 0.5, 0.75, 1],
        },
      );

      targets.forEach(({ element }) => observer?.observe(element));
    }

    gsap.registerPlugin(ScrollTrigger);
    setIsScrolled(window.scrollY > 24);

    const surfaces = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".contact-band, .brkta-site-footer",
      ),
    );
    let lastLogoInverted = false;
    const measureLogoSurface = () => {
      const currentHeader = headerRef.current;
      if (!currentHeader) return;

      const headerBox = currentHeader.getBoundingClientRect();
      const inverted = surfaces.some((surface) => {
        const surfaceBox = surface.getBoundingClientRect();
        return (
          headerBox.left < surfaceBox.right &&
          headerBox.right > surfaceBox.left &&
          headerBox.top < surfaceBox.bottom &&
          headerBox.bottom > surfaceBox.top
        );
      });

      if (inverted !== lastLogoInverted) {
        lastLogoInverted = inverted;
        setIsLogoInverted(inverted);
      }
    };

    /* Measure before the first paint and once more after deep-load layout settles. */
    measureLogoSurface();
    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onRefresh: measureLogoSurface,
      onUpdate: (self) => {
        setIsScrolled(self.scroll() > 24);
        /*
         * Written directly rather than through state: this fires on every
         * scroll frame, and re-rendering the whole header that often would
         * cost far more than it is worth.
         */
        const bar = progressRef.current;
        if (bar) bar.style.transform = `scaleX(${self.progress})`;
        measureLogoSurface();
      },
    });

    const resizeObserver =
      typeof ResizeObserver === "function"
        ? new ResizeObserver(measureLogoSurface)
        : undefined;
    if (resizeObserver) {
      const observed = [headerRef.current, ...surfaces].filter(
        (element): element is HTMLElement => Boolean(element),
      );
      observed.forEach((element) => resizeObserver.observe(element));
    }

    const initialMeasureFrame =
      typeof window.requestAnimationFrame === "function"
        ? window.requestAnimationFrame(measureLogoSurface)
        : undefined;

    return () => {
      observer?.disconnect();
      resizeObserver?.disconnect();
      if (
        initialMeasureFrame !== undefined &&
        typeof window.cancelAnimationFrame === "function"
      ) {
        window.cancelAnimationFrame(initialMeasureFrame);
      }
      trigger.kill();
    };
  }, [introComplete, navigationItems, resolved]);

  /*
   * The fill has to start where the cursor entered, which CSS cannot know on
   * its own — so the pointer position is written to the block as custom
   * properties and the fill circle is positioned from them. The radius is set
   * from the block's own diagonal so it covers the whole face no matter which
   * corner you come in through. Leaving re-writes them, so it collapses back
   * toward wherever the cursor left.
   */
  useLayoutEffect(() => {
    const rail = railRef.current;
    if (layout !== "rail" || !rail) return undefined;

    const blocks = Array.from(
      rail.querySelectorAll<HTMLElement>(
        ".brkta-site-header-rail-toggle, .brkta-site-header-rail-action",
      ),
    );
    if (!blocks.length) return undefined;

    const place = (event: PointerEvent) => {
      const block = event.currentTarget as HTMLElement;
      const box = block.getBoundingClientRect();
      block.style.setProperty("--rail-fill-x", `${event.clientX - box.left}px`);
      block.style.setProperty("--rail-fill-y", `${event.clientY - box.top}px`);
      block.style.setProperty(
        "--rail-fill-size",
        `${2 * Math.hypot(box.width, box.height)}px`,
      );
    };

    blocks.forEach((block) => {
      block.addEventListener("pointerenter", place);
      block.addEventListener("pointerleave", place);
    });

    return () => {
      blocks.forEach((block) => {
        block.removeEventListener("pointerenter", place);
        block.removeEventListener("pointerleave", place);
      });
    };
  }, [layout, primaryAction]);

  /*
   * The rail drops in once the intro is done, one block after the other.
   * clearProps hands the transform back to CSS afterwards — without it the
   * inline value would outrank the hover rule and the blocks would never
   * retreat again.
   */
  useLayoutEffect(() => {
    const rail = railRef.current;
    if (layout !== "rail" || !rail || !introComplete) return undefined;

    const blocks = rail.querySelectorAll<HTMLElement>(
      ".brkta-site-header-rail-toggle, .brkta-site-header-rail-action",
    );
    if (!blocks.length) return undefined;

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set(blocks, { clearProps: "transform" });
      return undefined;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        blocks,
        { yPercent: -100 },
        {
          yPercent: 0,
          duration: 0.55,
          stagger: 0.12,
          ease: "power3.out",
          clearProps: "transform",
        },
      );
    }, rail);

    return () => context.revert();
  }, [introComplete, layout]);

  /*
   * This timeline is created once for the mounted panel. Reversing it naturally
   * sends the staggered content out before the panel's first tween retracts it.
   * Keep the from-state lazy so the CSS open state remains a safe fallback when
   * the timeline cannot run.
   */
  useLayoutEffect(() => {
    const menu = menuRef.current;
    if (!menu) return undefined;

    menuMountedRef.current = true;
    prefersReducedMotionRef.current = getPrefersReducedMotion();

    const context = gsap.context(() => {
      const content = menu.querySelectorAll<HTMLElement>(MENU_CONTENT_SELECTOR);
      const timeline = gsap.timeline({
        paused: true,
        onComplete: finishMenuOpen,
        onReverseComplete: finishMenuClose,
      });

      if (!prefersReducedMotionRef.current) {
        timeline.fromTo(
          menu,
          { autoAlpha: 0, y: -12 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.32,
            ease: "power3.out",
            immediateRender: false,
          },
        );

        if (content.length) {
          timeline.fromTo(
            content,
            { autoAlpha: 0, y: 12 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.32,
              stagger: 0.05,
              ease: "power2.out",
              immediateRender: false,
            },
            "-=0.16",
          );
        }
      } else {
        clearMenuTransforms();
      }

      menuTimelineRef.current = timeline;
    }, menu);

    return () => {
      menuMountedRef.current = false;
      const timeline = menuTimelineRef.current;
      timeline?.kill?.();
      if (menuTimelineRef.current === timeline) {
        menuTimelineRef.current = null;
      }
      context.revert();
    };
  }, [clearMenuTransforms, finishMenuClose, finishMenuOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeMenu, menuOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const menu = menuRef.current;
    if (!menu) return undefined;

    const handleOutsideClick = (event: Event) => {
      if (
        typeof window.matchMedia !== "function" ||
        !window.matchMedia(MENU_DISMISS_ON_OUTSIDE_QUERY).matches
      ) {
        return;
      }

      const target = event.target as Element | null;
      if (!target) return;
      if (target.closest(MENU_TOGGLE_SELECTOR)) return;

      /* Anything the panel owns keeps its own click; only the page around it,
         or the panel's own backdrop when it covers the viewport, dismisses. */
      if (menu.contains(target) && target !== menu) return;

      closeMenu();
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [closeMenu, menuOpen]);

  return (
    <header
      ref={headerRef}
      className="brkta-site-header"
      data-brkta-site-header
      data-ready={introComplete ? "true" : "false"}
      data-scrolled={isScrolled ? "true" : "false"}
      data-layout={layout}
    >
      <div className="brkta-site-header-inner">
        {/*
         * The route, coiled horizontally before it drops into the page: same
         * accent, same weight, filling as you travel.
         */}
        <span className="brkta-site-header-progress" aria-hidden="true">
          <span ref={progressRef} />
        </span>
        <SiteLink
          className="brkta-site-header-brand"
          href={homeHref}
          aria-label={`${logoAlt} home`}
          onClick={(event) => handleNavClick(homeHref, event)}
        >
          <span
            className="brkta-site-header-logo-stack"
            data-inverted={isLogoInverted ? "true" : "false"}
          >
            <img
              className="brkta-site-header-logo brkta-site-header-logo--normal"
              data-brkta-site-header-logo
              src={normalLogoSrc}
              alt={logoAlt}
              width={logoWidth}
              height={logoHeight}
            />
            <img
              className="brkta-site-header-logo brkta-site-header-logo--opposite"
              src={oppositeLogoSrc}
              alt=""
              aria-hidden="true"
              width={logoWidth}
              height={logoHeight}
            />
          </span>
        </SiteLink>

        <nav className="brkta-site-header-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <SiteLink
              key={item.href}
              href={item.href}
              data-active={activeHref === item.href ? "true" : "false"}
              aria-current={
                activeHref === item.href
                  ? currentPath
                    ? "page"
                    : "location"
                  : undefined
              }
              onClick={(event) => handleNavClick(item.href, event)}
            >
              <span>{item.label}</span>
            </SiteLink>
          ))}
        </nav>

        <div className="brkta-site-header-actions">
          {primaryAction && (
            <Button
              asChild
              variant="primary"
              size="sm"
              className="brkta-site-header-action"
              onClick={(event) =>
                handleNavClick(primaryAction.href, event)
              }
            >
              <SiteLink href={primaryAction.href}>
                {primaryAction.label}
              </SiteLink>
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon-md"
            className="brkta-site-theme-control"
            data-theme-mode={mode}
            iconBefore={themeIcon}
            accessibleLabel={`${themeLabels.control}: ${themeLabel}`}
            title={`${themeLabels.control}: ${themeLabel}`}
            onClick={cycleMode}
          />
          <Button
            variant="outline"
            size="icon-md"
            className="brkta-site-header-menu-toggle"
            accessibleLabel={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls={menuId}
            iconBefore={
              menuOpen ? (
                <AnimatedClose size={21} />
              ) : (
                <AnimatedMenu size={21} />
              )
            }
            onClick={(event) => toggleMenu(event.currentTarget)}
          />
        </div>
      </div>

      {layout === "rail" && (
        <div className="brkta-site-header-rail" ref={railRef}>
          <button
            type="button"
            className="brkta-site-header-rail-toggle"
            data-inverted={isLogoInverted ? "true" : "false"}
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={(event) => toggleMenu(event.currentTarget)}
          >
            {/* Upright: writing-mode does not rotate replaced elements, but
                the strip's 180deg does, so the icon counters it in CSS. */}
            <span className="brkta-site-header-rail-label">
              {menuOpen ? "Close" : "Menu"}
            </span>
            <span className="brkta-site-header-rail-icon" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </span>
          </button>

          {primaryAction && (
            <SiteLink
              className="brkta-site-header-rail-action"
              href={primaryAction.href}
              onClick={(event) => handleNavClick(primaryAction.href, event)}
            >
              <span className="brkta-site-header-rail-label">
                {primaryAction.label}
              </span>
              <span
                className="brkta-site-header-rail-plus"
                aria-hidden="true"
              />
            </SiteLink>
          )}
        </div>
      )}

      <div
        ref={menuRef}
        className="brkta-site-header-menu"
        id={menuId}
        data-open={menuOpen ? "true" : "false"}
        data-closing={menuClosing ? "true" : "false"}
        aria-hidden={!menuOpen}
      >
        <nav
          aria-label={
            layout === "rail" ? "Site navigation" : "Mobile navigation"
          }
        >
          <ul className="brkta-site-header-menu-list">
            {navItems.map((item) => (
              <li className="brkta-site-header-menu-item" key={item.href}>
                <SiteLink
                  className="brkta-site-header-menu-link"
                  href={item.href}
                  data-active={activeHref === item.href ? "true" : "false"}
                  aria-current={
                    activeHref === item.href
                      ? currentPath
                        ? "page"
                        : "location"
                      : undefined
                  }
                  onClick={(event) => handleNavClick(item.href, event)}
                  tabIndex={menuOpen && !menuClosing ? 0 : -1}
                >
                  {item.label}
                </SiteLink>
                {!currentPath && item.children?.length ? (
                  <ul className="brkta-site-header-menu-children">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <SiteLink
                          className="brkta-site-header-menu-link brkta-site-header-menu-child-link"
                          href={child.href}
                          data-active={
                            activeHref === child.href ? "true" : "false"
                          }
                          aria-current={
                            activeHref === child.href
                              ? "location"
                              : undefined
                          }
                          onClick={(event) => handleNavClick(child.href, event)}
                          tabIndex={menuOpen && !menuClosing ? 0 : -1}
                        >
                          {child.label}
                        </SiteLink>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>
        {primaryAction && (
          <Button
            asChild
            variant="primary"
            size="lg"
            className="brkta-site-header-menu-action"
            onClick={(event) =>
              handleNavClick(primaryAction.href, event)
            }
            tabIndex={menuOpen && !menuClosing ? 0 : -1}
          >
            <SiteLink
              href={primaryAction.href}
              onClick={(event) => handleNavClick(primaryAction.href, event)}
            >
              {primaryAction.label}
            </SiteLink>
          </Button>
        )}
        <div className="brkta-site-header-menu-footer">
          {contactLinks.length > 0 && (
            <div className="brkta-site-header-menu-contact">
              {contactLinks.map((link) => (
                <SiteLink
                  key={`${link.icon}-${link.href}`}
                  className="brkta-icon-motion-trigger"
                  href={link.href}
                  aria-label={link.label}
                  title={link.label}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  onClick={closeMenu}
                  tabIndex={menuOpen && !menuClosing ? 0 : -1}
                >
                  {renderContactIcon(link.icon)}
                </SiteLink>
              ))}
            </div>
          )}
          <Button
            variant="ghost"
            size="icon-md"
            className="brkta-site-header-menu-theme"
            data-theme-mode={mode}
            iconBefore={themeIcon}
            accessibleLabel={`${themeLabels.control}: ${themeLabel}`}
            title={`${themeLabels.control}: ${themeLabel}`}
            onClick={cycleMode}
            tabIndex={menuOpen && !menuClosing ? 0 : -1}
          />
        </div>
      </div>
    </header>
  );
}
