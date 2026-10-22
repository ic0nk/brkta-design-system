import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { SiteIntro } from "./site-intro";
import { SiteExperience } from "./site-shell";
import { SiteLinkProvider, type SiteLinkProps } from "./site-link";
import { SiteThemeProvider } from "./site-theme";

vi.mock("gsap", () => {
  const chain = {
    fromTo: vi.fn(() => chain),
    to: vi.fn(() => chain),
  };
  const timeline = vi.fn(() => chain);

  return {
    default: {
      context: (callback: () => void) => {
        callback();
        return { revert: vi.fn() };
      },
      registerPlugin: vi.fn(),
      set: vi.fn(),
      to: vi.fn(),
      fromTo: vi.fn(),
      delayedCall: vi.fn(),
      timeline,
      utils: {
        random: vi.fn((min: number) => min),
        toArray: vi.fn(() => []),
      },
    },
  };
});

vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {
    create: vi.fn(() => ({ kill: vi.fn() })),
  },
}));

const headerProps = {
  logoSrc: "/assets/brand/brkta-logo-light.svg",
  logoSrcDark: "/assets/brand/brkta-logo-dark.svg",
  logoAlt: "BRKTA",
  navItems: [
    { label: "Work", href: "#work" },
    { label: "Products", href: "#products" },
  ],
  primaryAction: { label: "Start a project", href: "#contact" },
  themeLabels: {
    control: "Theme",
    light: "Light",
    dark: "Dark",
    system: "System",
  },
};

describe("site shell", () => {
  it("renders a configurable header with an accessible mobile menu", async () => {
    const user = userEvent.setup();
    render(
      <SiteThemeProvider>
        <SiteHeader {...headerProps} introComplete />
      </SiteThemeProvider>,
    );

    expect(screen.getByRole("img", { name: "BRKTA" })).toHaveAttribute(
      "src",
      headerProps.logoSrc,
    );
    expect(
      screen.getByRole("button", { name: "Open navigation menu" }),
    ).toBeInTheDocument();
    expect(
      screen
        .getByRole("button", { name: "Theme: System" })
        .querySelector("svg"),
    ).toHaveClass("brkta-icon-motion", "brkta-icon-motion-theme");
    expect(
      screen
        .getByRole("button", { name: "Open navigation menu" })
        .querySelector("svg"),
    ).toHaveClass("brkta-icon-motion", "brkta-icon-motion-menu");

    await user.click(
      screen.getByRole("button", { name: "Open navigation menu" }),
    );

    expect(
      screen.getByRole("button", { name: "Close navigation menu" }),
    ).toBeInTheDocument();
    expect(
      within(
        screen.getByRole("navigation", { name: "Mobile navigation" }),
      ).getByRole("link", { name: "Work" }),
    ).toBeInTheDocument();
    expect(
      within(
        screen.getByRole("navigation", { name: "Primary navigation" }),
      ).getByRole("link", { name: "Work" }),
    ).toHaveAttribute("data-active", "true");
  });

  /* Width drives the behaviour, so the query itself is what the stub answers. */
  const stubViewport = (isDesktop: boolean) => {
    const original = window.matchMedia;
    window.matchMedia = ((query: string) => ({
      matches: isDesktop && query.includes("min-width: 901px"),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })) as unknown as typeof window.matchMedia;

    return () => {
      window.matchMedia = original;
    };
  };

  const openMenuPanel = async (user: ReturnType<typeof userEvent.setup>) => {
    render(
      <SiteThemeProvider>
        <SiteHeader {...headerProps} introComplete />
        <main>
          <button type="button">Page button</button>
          <p>Page copy</p>
        </main>
      </SiteThemeProvider>,
    );

    await user.click(
      screen.getByRole("button", { name: "Open navigation menu" }),
    );
    expect(
      screen.getByRole("button", { name: "Close navigation menu" }),
    ).toBeInTheDocument();

    const panel = document.querySelector(".brkta-site-header-menu");
    expect(panel).not.toBeNull();
    return panel as HTMLElement;
  };

  const expectMenuClosed = () =>
    expect(
      screen.getByRole("button", { name: "Open navigation menu" }),
    ).toBeInTheDocument();

  it("closes the desktop dropdown when a click lands on the page behind it", async () => {
    const restore = stubViewport(true);
    const user = userEvent.setup();

    try {
      await openMenuPanel(user);
      /* From 901px the rail menu is a corner dropdown, so the page stays
         visible and clickable next to it. */
      await user.click(screen.getByText("Page copy"));

      expectMenuClosed();
    } finally {
      restore();
    }
  });

  it("closes the desktop menu when its own backdrop is clicked", async () => {
    const restore = stubViewport(true);
    const user = userEvent.setup();

    try {
      const panel = await openMenuPanel(user);
      await user.click(panel);

      expectMenuClosed();
    } finally {
      restore();
    }
  });

  it("keeps the menu open when the page is tapped on a small screen", async () => {
    const restore = stubViewport(false);
    const user = userEvent.setup();

    try {
      await openMenuPanel(user);
      await user.click(screen.getByText("Page copy"));

      /* Below the breakpoint the panel covers the viewport and the toggle is
         the only way out. */
      expect(
        screen.getByRole("button", { name: "Close navigation menu" }),
      ).toBeInTheDocument();
    } finally {
      restore();
    }
  });

  it("leaves the toggle closing the menu exactly once", async () => {
    const restore = stubViewport(true);
    const user = userEvent.setup();

    try {
      await openMenuPanel(user);
      /* The toggle must not close and immediately reopen via this handler. */
      await user.click(
        screen.getByRole("button", { name: "Close navigation menu" }),
      );

      expectMenuClosed();
    } finally {
      restore();
    }
  });

  it("leaves menu links working while outside dismissal is active", async () => {
    const restore = stubViewport(true);
    const user = userEvent.setup();

    try {
      await openMenuPanel(user);
      const menuNav = screen.getByRole("navigation", {
        name: "Mobile navigation",
      });

      await user.click(within(menuNav).getByRole("link", { name: "Work" }));

      expectMenuClosed();
    } finally {
      restore();
    }
  });

  it("cycles light, dark, and system through the platform theme engine", async () => {
    window.localStorage.clear();
    document.documentElement.classList.remove("dark");
    const user = userEvent.setup();

    render(
      <SiteThemeProvider>
        <SiteHeader {...headerProps} introComplete />
      </SiteThemeProvider>,
    );

    expect(
      screen.getByRole("button", { name: "Theme: System" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Theme: System" }));
    expect(
      screen.getByRole("button", { name: "Theme: Light" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Theme: Light" }));
    expect(
      screen.getByRole("button", { name: "Theme: Dark" }),
    ).toBeInTheDocument();
    expect(document.documentElement).toHaveClass("dark");

    await user.click(screen.getByRole("button", { name: "Theme: Dark" }));
    expect(document.documentElement).not.toHaveClass("dark");
  });

  it("keeps the theme control in the rail menu and marks the current route", async () => {
    window.localStorage.clear();
    const user = userEvent.setup();
    const railNavigation = [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
    ];

    render(
      <SiteThemeProvider>
        <SiteHeader
          {...headerProps}
          navItems={railNavigation}
          layout="rail"
          currentPath="/services/business-systems"
          introComplete
        />
      </SiteThemeProvider>,
    );

    expect(
      within(
        screen.getByRole("navigation", { name: "Primary navigation" }),
      ).getByRole("link", { name: "Services" }),
    ).toHaveAttribute("aria-current", "page");

    await user.click(
      document.querySelector(".brkta-site-header-rail-toggle") as HTMLElement,
    );

    const menu = document.querySelector(
      ".brkta-site-header-menu",
    ) as HTMLElement;
    const menuTheme = within(menu).getByRole("button", {
      name: "Theme: System",
    });

    await user.click(menuTheme);

    expect(menu).toHaveAttribute("data-open", "true");
    expect(
      within(menu).getByRole("button", { name: "Theme: Light" }),
    ).toBeInTheDocument();
  });

  it("renders home navigation children as a nested, keyboard-reachable list", async () => {
    const user = userEvent.setup();

    render(
      <SiteThemeProvider>
        <SiteHeader
          {...headerProps}
          navItems={[
            {
              label: "Home",
              href: "#top",
              children: [{ label: "Work", href: "#work" }],
            },
          ]}
          layout="rail"
          introComplete
        />
      </SiteThemeProvider>,
    );

    await user.click(
      document.querySelector(".brkta-site-header-rail-toggle") as HTMLElement,
    );

    const menu = document.querySelector(
      ".brkta-site-header-menu",
    ) as HTMLElement;
    const child = within(menu).getByRole("link", { name: "Work" });

    expect(child).toHaveAttribute("href", "#work");
    expect(child).toHaveAttribute("tabindex", "0");
    expect(child.closest("ul")).toHaveClass("brkta-site-header-menu-children");
  });

  it("uses an injected link component and scrolls same-route navigation home", async () => {
    const user = userEvent.setup();
    const scrollTo = vi
      .spyOn(window, "scrollTo")
      .mockImplementation(() => undefined);
    const RoutedLink = ({ href, ...props }: SiteLinkProps) => (
      <a data-routed-link="true" href={href} {...props} />
    );

    render(
      <SiteThemeProvider>
        <SiteLinkProvider linkComponent={RoutedLink}>
          <SiteHeader
            {...headerProps}
            navItems={[{ label: "Services", href: "/services" }]}
            currentPath="/services"
            introComplete
          />
        </SiteLinkProvider>
      </SiteThemeProvider>,
    );

    const servicesLink = within(
      screen.getByRole("navigation", { name: "Primary navigation" }),
    ).getByRole("link", { name: "Services" });

    expect(servicesLink).toHaveAttribute("data-routed-link", "true");
    await user.click(servicesLink);
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });

    scrollTo.mockRestore();
  });

  it("locks document scrolling while the intro is active", () => {
    const { unmount } = render(
      <SiteExperience
        intro={{
          logoSrc: "/assets/brand/brkta-logo-light.svg",
          logoAlt: "BRKTA",
        }}
        header={headerProps}
      >
        <main>Company content</main>
      </SiteExperience>,
    );

    expect(document.documentElement.style.overflow).toBe("hidden");
    expect(document.body.style.overflow).toBe("hidden");

    unmount();

    expect(document.documentElement.style.overflow).toBe("");
    expect(document.body.style.overflow).toBe("");
  });

  it("provides a shared logo target for the intro-to-header handoff", () => {
    const { unmount } = render(
      <SiteExperience
        intro={{
          logoSrc: "/assets/brand/brkta-logo-light.svg",
          logoSrcDark: "/assets/brand/brkta-logo-dark.svg",
          logoAlt: "BRKTA",
        }}
        header={headerProps}
      >
        <main>Company content</main>
      </SiteExperience>,
    );

    expect(
      document.querySelector("[data-brkta-site-intro-logo-stage]"),
    ).toBeInTheDocument();
    expect(
      document.querySelector("[data-brkta-site-logo-handoff]"),
    ).toBeInTheDocument();
    expect(
      document.querySelector("[data-brkta-site-header-logo]"),
    ).toBeInTheDocument();

    unmount();
  });

  it("renders intro copy and progress content", () => {
    render(
      <SiteThemeProvider>
        <SiteIntro
          logoSrc="/assets/brand/brkta-logo-light.svg"
          logoSrcDark="/assets/brand/brkta-logo-dark.svg"
          logoAlt="BRKTA"
          messageLines={["Websites for companies", "and places."]}
        />
      </SiteThemeProvider>,
    );

    expect(screen.getByRole("img", { name: "BRKTA" })).toBeInTheDocument();
    expect(screen.getByText("Websites for companies")).toBeInTheDocument();
    expect(screen.getByText("Preparing your experience")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveAttribute(
      "data-brkta-site-intro-state",
      "running",
    );
  });

  it("force-completes a stalled intro after the watchdog ceiling", () => {
    vi.useFakeTimers();
    let view: ReturnType<typeof render> | undefined;

    try {
      const onComplete = vi.fn();
      view = render(
        <SiteThemeProvider>
          <SiteIntro
            logoSrc="/assets/brand/brkta-logo-light.svg"
            logoAlt="BRKTA"
            onComplete={onComplete}
          />
        </SiteThemeProvider>,
      );

      const intro = screen.getByRole("status");
      expect(intro).toHaveAttribute("data-brkta-site-intro-state", "running");

      vi.advanceTimersByTime(8_000);

      expect(intro).toHaveAttribute("data-brkta-site-intro-state", "complete");
      expect(onComplete).toHaveBeenCalledTimes(1);
    } finally {
      view?.unmount();
      vi.useRealTimers();
    }
  });

  it("uses the inverse palette and logo for the startup intro", () => {
    window.localStorage.setItem(
      "brkta:platform-preferences",
      JSON.stringify({ theme: "light" }),
    );

    const { unmount } = render(
      <SiteThemeProvider defaultMode="light">
        <SiteIntro
          logoSrc="/assets/brand/brkta-logo-light.svg"
          logoSrcDark="/assets/brand/brkta-logo-dark.svg"
          logoAlt="BRKTA"
        />
      </SiteThemeProvider>,
    );

    expect(screen.getByRole("status")).toHaveAttribute(
      "data-brkta-site-intro-theme",
      "dark",
    );
    expect(screen.getByRole("img", { name: "BRKTA" })).toHaveAttribute(
      "src",
      "/assets/brand/brkta-logo-dark.svg",
    );

    unmount();

    window.localStorage.setItem(
      "brkta:platform-preferences",
      JSON.stringify({ theme: "dark" }),
    );

    const second = render(
      <SiteThemeProvider defaultMode="dark">
        <SiteIntro
          logoSrc="/assets/brand/brkta-logo-light.svg"
          logoSrcDark="/assets/brand/brkta-logo-dark.svg"
          logoAlt="BRKTA"
        />
      </SiteThemeProvider>,
    );

    expect(screen.getByRole("status")).toHaveAttribute(
      "data-brkta-site-intro-theme",
      "light",
    );
    expect(screen.getByRole("img", { name: "BRKTA" })).toHaveAttribute(
      "src",
      "/assets/brand/brkta-logo-light.svg",
    );

    second.unmount();
    window.localStorage.clear();
  });

  it("renders footer groups and its primary action", () => {
    render(
      <SiteThemeProvider defaultMode="light">
        <SiteFooter
          logoSrc="/assets/brand/brkta-logo-light.svg"
          logoSrcDark="/assets/brand/brkta-logo-dark.svg"
          logoAlt="BRKTA"
          statement="Websites, platforms, and digital systems."
          groups={[
            { label: "Explore", links: [{ label: "Work", href: "#work" }] },
          ]}
          action={{ label: "Start a conversation", href: "#contact" }}
        />
      </SiteThemeProvider>,
    );

    expect(screen.getByText("Explore")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Start a conversation" }),
    ).toHaveAttribute("href", "#contact");
  });

  it("uses the dark footer logo when the resolved theme is dark", () => {
    render(
      <SiteThemeProvider defaultMode="dark">
        <SiteFooter
          logoSrc="/assets/brand/brkta-logo-light.svg"
          logoSrcDark="/assets/brand/brkta-logo-dark.svg"
          logoAlt="BRKTA"
          groups={[]}
        />
      </SiteThemeProvider>,
    );

    expect(screen.getByRole("img", { name: "BRKTA" })).toHaveAttribute(
      "src",
      "/assets/brand/brkta-logo-dark.svg",
    );
  });
});
