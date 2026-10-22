import type { Meta, StoryObj } from "@storybook/react";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { SiteIntro } from "./site-intro";
import { SiteThemeProvider } from "./site-theme";

const meta = {
  title: "Public Site/Site Shell",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const logoLight = "/assets/brand/brkta-logo-light.svg";
const logoDark = "/assets/brand/brkta-logo-dark.svg";

export const Header: Story = {
  render: () => (
    <SiteThemeProvider>
      <SiteHeader
        logoSrc={logoLight}
        logoSrcDark={logoDark}
        logoAlt="BRKTA"
        navItems={[
          { label: "Work", href: "#work" },
          { label: "Products", href: "#products" },
          { label: "Contact", href: "#contact" },
        ]}
        primaryAction={{ label: "Start a project", href: "#contact" }}
        themeLabels={{
          control: "Theme",
          light: "Light",
          dark: "Dark",
          system: "System",
        }}
        introComplete
      />
    </SiteThemeProvider>
  ),
};

export const Intro: Story = {
  render: () => (
    <SiteThemeProvider>
      <SiteIntro
        logoSrc={logoLight}
        logoSrcDark={logoDark}
        logoAlt="BRKTA"
        messageLines={[
          "Websites, platforms, and digital systems",
          "for companies, places, and ambitious teams.",
        ]}
      />
    </SiteThemeProvider>
  ),
};

export const Footer: Story = {
  render: () => (
    <SiteThemeProvider>
      <SiteFooter
        logoSrc={logoLight}
        logoSrcDark={logoDark}
        logoAlt="BRKTA"
        statement="We build websites, platforms, and digital systems that make serious work clearer."
        groups={[
          { label: "Explore", links: [{ label: "Work", href: "#work" }] },
          {
            label: "Capabilities",
            links: [{ label: "Websites", href: "#work" }],
          },
          { label: "Connect", links: [{ label: "Contact", href: "#contact" }] },
        ]}
        action={{ label: "Start a conversation", href: "#contact" }}
      />
    </SiteThemeProvider>
  ),
};
