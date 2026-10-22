import type { Meta, StoryObj } from "@storybook/react";
import { Combobox } from "./combobox";

const meta = {
  title: "Components/Combobox",
  component: Combobox,
  tags: ["autodocs"],
} satisfies Meta<typeof Combobox>;
export default meta;
type Story = StoryObj<typeof meta>;

const opts = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry (disabled)", disabled: true },
  { value: "date", label: "Date" },
  { value: "elderberry", label: "Elderberry" },
];

export const Default: Story = {
  args: {
    inputId: "fruit-picker",
    ariaLabel: "Fruit",
    options: opts,
    placeholder: "Search fruit...",
  },
};
export const WithValue: Story = {
  args: { options: opts, defaultValue: "banana" },
};
export const Empty: Story = {
  args: { options: [], emptyText: "No fruits found" },
};
