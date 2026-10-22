import type { Meta, StoryObj } from "@storybook/angular";
import { ButtonComponent } from "../button/button.component";

/**
 * Icon name strings accepted by iconBefore / iconAfter:
 * arrow-right, arrow-left, locate, plus, search, settings, bell, copy, send, check, save, pen, trash, eye, eye-off, sun, moon, monitor, package, log-out, building-2, users, panel-left, dashboard
 */

const meta: Meta<ButtonComponent> = {
  title: "Components/Button",
  component: ButtonComponent,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "outline",
        "ghost",
        "destructive",
        "link",
      ],
    },
    appearance: {
      control: "select",
      options: ["default", "glass"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    iconOnly: { control: "boolean" },
    ariaLabel: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

// ── Variants ───────────────────────────────────────────────────────────

export const Primary: Story = {
  render: () => ({
    template: `<brkta-button variant="primary">Primary</brkta-button>`,
  }),
};

export const Secondary: Story = {
  render: () => ({
    template: `<brkta-button variant="secondary">Secondary</brkta-button>`,
  }),
};

export const Outline: Story = {
  render: () => ({
    template: `<brkta-button variant="outline">Outline</brkta-button>`,
  }),
};

export const Ghost: Story = {
  render: () => ({
    template: `<brkta-button variant="ghost">Ghost</brkta-button>`,
  }),
};

export const Destructive: Story = {
  render: () => ({
    template: `<brkta-button variant="destructive">Destructive</brkta-button>`,
  }),
};

export const Link: Story = {
  render: () => ({
    template: `<brkta-button variant="link">Link</brkta-button>`,
  }),
};

export const GlassAppearance: Story = {
  render: () => ({
    template: `<brkta-button appearance="glass">Over media</brkta-button>`,
  }),
};

export const HoverFill: Story = {
  render: () => ({
    template: `<div style="display:flex;gap:12px;flex-wrap:wrap"><brkta-button variant="primary">Primary</brkta-button><brkta-button variant="outline">Outline</brkta-button><brkta-button variant="ghost">Ghost</brkta-button><brkta-button appearance="glass">Over media</brkta-button></div>`,
  }),
};

// ── Sizes ──────────────────────────────────────────────────────────────

export const Small: Story = {
  render: () => ({
    template: `<brkta-button variant="primary" size="sm">Small</brkta-button>`,
  }),
};

export const Medium: Story = {
  render: () => ({
    template: `<brkta-button variant="primary" size="md">Medium</brkta-button>`,
  }),
};

export const Large: Story = {
  render: () => ({
    template: `<brkta-button variant="primary" size="lg">Large</brkta-button>`,
  }),
};

// ── States ─────────────────────────────────────────────────────────────

export const Loading: Story = {
  render: () => ({
    template: `<brkta-button variant="primary" [loading]="true">Submit</brkta-button>`,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `<brkta-button variant="primary" [disabled]="true">Disabled</brkta-button>`,
  }),
};

// ── Icon variants ──────────────────────────────────────────────────────

export const IconOnly: Story = {
  render: () => ({
    template: `<brkta-button variant="outline" size="md" [iconOnly]="true" ariaLabel="Next page" [iconBefore]="'arrow-right'"></brkta-button>`,
  }),
};

export const WithIconBefore: Story = {
  render: () => ({
    template: `<brkta-button variant="primary" [iconBefore]="'arrow-right'">Next</brkta-button>`,
  }),
};

export const WithArrowLeftIcon: Story = {
  render: () => ({
    template: `<brkta-button variant="ghost" [iconBefore]="'arrow-left'">Back</brkta-button>`,
  }),
};

export const WithLocateIcon: Story = {
  render: () => ({
    template: `<brkta-button variant="ghost" [iconBefore]="'locate'">Current location</brkta-button>`,
  }),
};

export const WithIconAfter: Story = {
  render: () => ({
    template: `<brkta-button variant="primary" [iconAfter]="'arrow-right'">Back</brkta-button>`,
  }),
};

export const WithLogoutIcon: Story = {
  render: () => ({
    template: `<brkta-button variant="ghost" size="icon-md" [iconOnly]="true" ariaLabel="Sign out" [iconBefore]="'log-out'"></brkta-button>`,
  }),
};

export const WithBuildingIcon: Story = {
  render: () => ({
    template: `<brkta-button variant="primary" [iconBefore]="'building-2'">Real estate</brkta-button>`,
  }),
};

export const WithUsersIcon: Story = {
  render: () => ({
    template: `<brkta-button variant="primary" [iconBefore]="'users'">CRM</brkta-button>`,
  }),
};

export const WithPanelLeftIcon: Story = {
  render: () => ({
    template: `<brkta-button variant="ghost" size="icon-md" [iconOnly]="true" ariaLabel="Toggle sidebar" [iconBefore]="'panel-left'" [iconCollapsed]="true"></brkta-button>`,
  }),
};

export const WithDashboardIcon: Story = {
  render: () => ({
    template: `<brkta-button variant="ghost" size="icon-md" [iconOnly]="true" ariaLabel="Navigation coming soon" [iconBefore]="'dashboard'" [disabled]="true"></brkta-button>`,
  }),
};
