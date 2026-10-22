import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { AnimatedPanelLeft } from "../animated-icons/animated-panel-left";

/**
 * SVG arrow icon reused across icon-button stories.
 */
const ArrowIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const meta = {
  title: "Components/Button",
  component: Button,
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
    accessibleLabel: { control: "text" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Variants ───────────────────────────────────────────────────────────

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    children: "Link",
  },
};

export const GlassAppearance: Story = {
  args: {
    appearance: "glass",
    children: "Over media",
  },
};

export const HoverFill: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Button variant="primary">Primary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button appearance="glass">Over media</Button>
    </div>
  ),
};

// ── Sizes ──────────────────────────────────────────────────────────────

export const Small: Story = {
  args: {
    size: "sm",
    children: "Small",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    children: "Medium",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "Large",
  },
};

// ── States ─────────────────────────────────────────────────────────────

export const Loading: Story = {
  args: {
    loading: true,
    children: "Submit",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled",
  },
};

// ── Icon variants ──────────────────────────────────────────────────────

export const IconOnly: Story = {
  args: {
    iconBefore: ArrowIcon,
    accessibleLabel: "Next page",
    variant: "outline",
  },
};

export const WithIconBefore: Story = {
  args: {
    iconBefore: ArrowIcon,
    children: "Next",
  },
};

export const WithIconAfter: Story = {
  args: {
    iconAfter: ArrowIcon,
    children: "Back",
  },
};

export const WithPanelLeftIcon: Story = {
  args: {
    iconBefore: <AnimatedPanelLeft collapsed />,
    accessibleLabel: "Toggle sidebar",
  },
};

// ── Composition ────────────────────────────────────────────────────────

export const AsChildAnchor: Story = {
  render: () => (
    <Button asChild variant="outline">
      <a href="https://brkta.io">Visit website</a>
    </Button>
  ),
};
