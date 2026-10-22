import type { Meta, StoryObj } from "@storybook/react";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Package,
  BarChart3,
  Settings,
} from "lucide-react";
import { Sidebar } from "./sidebar";

const meta = {
  title: "Components/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const icon = (
  Icon: React.ComponentType<{ size?: number; className?: string }>,
) => <Icon size={20} className="brkta-icon-motion" aria-hidden="true" />;

const items = [
  {
    value: "dash",
    label: "Dashboard",
    active: true,
    badge: 3,
    icon: icon(LayoutDashboard),
  },
  { value: "orders", label: "Orders", badge: 12, icon: icon(ShoppingCart) },
  { value: "customers", label: "Customers", icon: icon(Users) },
  { value: "products", label: "Products", icon: icon(Package) },
  { value: "reports", label: "Reports", disabled: true, icon: icon(BarChart3) },
  { value: "settings", label: "Settings", icon: icon(Settings) },
];

export const Default: Story = {
  args: { items, header: "BRKTA", footer: "v0.1.0" },
};

export const Collapsed: Story = {
  args: { items, header: "BRKTA", footer: "v0.1.0", collapsed: true },
};

export const Embedded: Story = {
  args: { items, header: "BRKTA", footer: "v0.1.0", variant: "embedded" },
};

export const EmbeddedWithoutCollapseToggle: Story = {
  args: {
    items,
    header: "BRKTA",
    footer: "v0.1.0",
    variant: "embedded",
    showCollapseToggle: false,
  },
};

export const StandaloneWithCollapseToggle: Story = {
  args: { items, header: "BRKTA", showCollapseToggle: true },
};

export const Selectable: Story = {
  args: {
    items,
    header: "BRKTA",
    onItemSelect: (item) => console.log(`Selected ${item.value}`),
  },
};
