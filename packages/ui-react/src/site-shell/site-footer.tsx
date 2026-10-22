"use client";

import {
  useCallback,
  useLayoutEffect,
  useRef,
  type MouseEvent,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "../button/button";
import {
  AnimatedMail,
  AnimatedPhone,
  AnimatedWhatsapp,
} from "../animated-icons";
import { isSameSitePath, SiteLink } from "./site-link";
import { useSiteTheme } from "./site-theme";

export interface SiteFooterLink {
  label: string;
  href: string;
}

export interface SiteFooterGroup {
  label: string;
  links: readonly SiteFooterLink[];
}

export interface SiteFooterContactLink extends SiteFooterLink {
  icon: "mail" | "phone" | "whatsapp";
}

/*
 * Phone layout (below 40rem): the seven link groups collapse into one outlined
 * contact card plus two short link columns. Desktop is unchanged.
 */
export interface SiteFooterMobile {
  label: string;
  action: SiteFooterLink;
  contactLinks?: readonly SiteFooterContactLink[];
  groups: readonly SiteFooterGroup[];
}

export interface SiteFooterProps {
  logoSrc: string;
  logoSrcDark?: string;
  logoAlt: string;
  logoWidth?: number;
  logoHeight?: number;
  /* Omit in the compact variant — the footer carries no pitch of its own. */
  statement?: string;
  groups: readonly SiteFooterGroup[];
  action?: SiteFooterLink;
  legalLinks?: readonly SiteFooterLink[];
  /** Optional route path used to make same-page links scroll instead of reload. */
  currentPath?: string;
  /*
   * "compact" drops the statement and action and shrinks the brand: a
   * sign-off, not a second conversion block. The default is unchanged for
   * existing callers.
   */
  variant?: "default" | "compact";
  /*
   * Rendered absolutely behind the footer content — the stage for page-level
   * decoration (the company site's route tree and falling letters). The slot
   * div exists even when empty so decoration can also portal into it.
   */
  backdrop?: ReactNode;
  /** Compact phone layout; when omitted the regular groups stay on phones. */
  mobile?: SiteFooterMobile;
}

export function SiteFooter({
  logoSrc,
  logoSrcDark,
  logoAlt,
  logoWidth = 781,
  logoHeight = 213,
  statement,
  groups,
  action,
  legalLinks = [],
  currentPath,
  variant = "default",
  backdrop,
  mobile,
}: SiteFooterProps) {
  const footerRef = useRef<HTMLElement>(null);
  const compact = variant === "compact";
  const { resolved } = useSiteTheme();
  const activeLogoSrc =
    resolved === "dark" ? (logoSrcDark ?? logoSrc) : logoSrc;
  const handleLinkClick = useCallback(
    (href: string, event: MouseEvent<HTMLAnchorElement>) => {
      if (!isSameSitePath(href, currentPath)) return;

      event.preventDefault();
      window.history.replaceState(null, "", href);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [currentPath],
  );

  useLayoutEffect(() => {
    const footer = footerRef.current;
    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!footer || prefersReducedMotion) {
      return undefined;
    }

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      /* Only animate what this variant actually rendered. */
      const lead = [
        ".brkta-site-footer-brand",
        ".brkta-site-footer-copy",
      ].flatMap((selector) => gsap.utils.toArray<HTMLElement>(selector));
      const trail = gsap.utils.toArray<HTMLElement>(".brkta-site-footer-group");

      ScrollTrigger.create({
        trigger: footer,
        start: "top 84%",
        once: true,
        onEnter: () => {
          const timeline = gsap.timeline();
          if (lead.length) {
            timeline.fromTo(
              lead,
              { autoAlpha: 0, y: 18 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.42,
                stagger: 0.07,
                ease: "power3.out",
              },
            );
          }
          if (trail.length) {
            timeline.fromTo(
              trail,
              { autoAlpha: 0, y: 14 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.35,
                stagger: 0.06,
                ease: "power2.out",
              },
              lead.length ? "-=0.2" : 0,
            );
          }
        },
      });
    }, footer);

    return () => context.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="brkta-site-footer"
      data-brkta-site-footer
      data-variant={variant}
      data-mobile-layout={mobile ? "compact" : undefined}
    >
      <div
        className="brkta-site-footer-backdrop"
        data-brkta-site-footer-backdrop
        aria-hidden="true"
      >
        {backdrop}
      </div>
      <div className="brkta-site-footer-grid">
        <div className="brkta-site-footer-intro">
          <img
            className="brkta-site-footer-brand"
            src={activeLogoSrc}
            alt={logoAlt}
            width={logoWidth}
            height={logoHeight}
          />
          {!compact && statement && (
            <p className="brkta-site-footer-copy">{statement}</p>
          )}
          {!compact && action && (
            <Button
              asChild
              variant="outline"
              size="md"
              className="brkta-site-footer-action"
            >
              <SiteLink
                href={action.href}
                onClick={(event) => handleLinkClick(action.href, event)}
              >
                {action.label}
              </SiteLink>
            </Button>
          )}
        </div>
        <div className="brkta-site-footer-groups">
          {groups.map((group) => (
            <div className="brkta-site-footer-group" key={group.label}>
              <p>{group.label}</p>
              <nav aria-label={`${group.label} links`}>
                {group.links.map((link) => (
                  <SiteLink
                    href={link.href}
                    key={[group.label, link.label, link.href].join("-")}
                    onClick={(event) => handleLinkClick(link.href, event)}
                  >
                    {link.label}
                  </SiteLink>
                ))}
              </nav>
            </div>
          ))}
        </div>
        {mobile && (
          <div className="brkta-site-footer-mobile">
            <div className="fm-card">
              <p className="fm-card-label">{mobile.label}</p>
              <SiteLink
                className="fm-card-link"
                href={mobile.action.href}
                onClick={(event) => handleLinkClick(mobile.action.href, event)}
              >
                <span>{mobile.action.label}</span>
                <span className="fm-card-arrow" aria-hidden="true">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17 17 7" />
                    <path d="M8 7h9v9" />
                  </svg>
                </span>
              </SiteLink>
              {mobile.contactLinks && mobile.contactLinks.length > 0 && (
                <div className="fm-card-icons">
                  {mobile.contactLinks.map((link) => (
                    <SiteLink
                      href={link.href}
                      key={`${link.icon}-${link.href}`}
                      aria-label={link.label}
                    >
                      {link.icon === "mail" ? (
                        <AnimatedMail size={20} />
                      ) : link.icon === "phone" ? (
                        <AnimatedPhone size={20} />
                      ) : (
                        <AnimatedWhatsapp size={20} />
                      )}
                    </SiteLink>
                  ))}
                </div>
              )}
            </div>
            <div className="fm-cols">
              {mobile.groups.map((group) => (
                <div className="fm-col" key={group.label}>
                  <p>{group.label}</p>
                  <nav aria-label={`${group.label} links`}>
                    {group.links.map((link) => (
                      <SiteLink
                        href={link.href}
                        key={[group.label, link.label, link.href].join("-")}
                        onClick={(event) => handleLinkClick(link.href, event)}
                      >
                        {link.label}
                      </SiteLink>
                    ))}
                  </nav>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="brkta-site-footer-bottom">
        <span>BRKTA / Software company</span>
        <span>© 2026 BRKTA</span>
        <nav aria-label="Legal links">
          {legalLinks.map((link) => (
            <SiteLink
              href={link.href}
              key={[link.label, link.href].join("-")}
              onClick={(event) => handleLinkClick(link.href, event)}
            >
              {link.label}
            </SiteLink>
          ))}
        </nav>
      </div>
    </footer>
  );
}
