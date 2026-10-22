"use client";

import {
  createContext,
  forwardRef,
  useContext,
  type AnchorHTMLAttributes,
  type ComponentType,
  type ReactNode,
} from "react";

export interface SiteLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export type SiteLinkComponent = ComponentType<SiteLinkProps>;

const DefaultSiteLink: SiteLinkComponent = ({ href, ...props }) => (
  <a href={href} {...props} />
);

const SiteLinkContext = createContext<SiteLinkComponent>(DefaultSiteLink);

export interface SiteLinkProviderProps {
  children: ReactNode;
  linkComponent?: SiteLinkComponent;
}

export function SiteLinkProvider({
  children,
  linkComponent = DefaultSiteLink,
}: SiteLinkProviderProps) {
  return (
    <SiteLinkContext.Provider value={linkComponent}>
      {children}
    </SiteLinkContext.Provider>
  );
}

export function useSiteLinkComponent() {
  return useContext(SiteLinkContext);
}

const EXTERNAL_SCHEME = /^[a-z][a-z\d+.-]*:/i;

export function isExternalSiteLink(href: string, target?: string) {
  return target === "_blank" || href.startsWith("//") || EXTERNAL_SCHEME.test(href);
}

function normalizeSitePath(path: string) {
  const pathname = path.split(/[?#]/, 1)[0] || "/";
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
}

export function isSameSitePath(href: string, currentPath?: string) {
  if (!currentPath || isExternalSiteLink(href) || !href.startsWith("/")) {
    return false;
  }

  return normalizeSitePath(href) === normalizeSitePath(currentPath);
}

export const SiteLink = forwardRef<HTMLAnchorElement, SiteLinkProps>(
  ({ href, target, ...props }, ref) => {
    const LinkComponent = useSiteLinkComponent();

    if (isExternalSiteLink(href, target)) {
      return <a ref={ref} href={href} target={target} {...props} />;
    }

    return <LinkComponent href={href} target={target} {...props} />;
  },
);

SiteLink.displayName = "SiteLink";
