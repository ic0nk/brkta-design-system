import type { Meta, StoryObj } from "@storybook/angular";
import { SidebarComponent } from "./sidebar.component";

const meta: Meta<SidebarComponent> = {
  title: "Components/Sidebar",
  component: SidebarComponent,
  tags: ["autodocs"],
  argTypes: {
    itemSelect: { action: "itemSelect" },
  },
};

export default meta;
type Story = StoryObj<SidebarComponent>;

const items = [
  {
    value: "dash",
    label: "Dashboard",
    active: true,
    badge: 3,
    icon: "dashboard",
  },
  { value: "orders", label: "Orders", badge: 12, icon: "shopping-cart" },
  { value: "customers", label: "Customers", icon: "users" },
  { value: "products", label: "Products", icon: "building-2" },
  { value: "reports", label: "Reports", disabled: true, icon: "bar-chart" },
  { value: "settings", label: "Settings", icon: "settings" },
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
  },
};

export const UnknownIcon: Story = {
  args: {
    items: [
      { value: "unknown", label: "Unknown icon", icon: "not-a-real-icon" },
    ],
    header: "BRKTA",
  },
};
