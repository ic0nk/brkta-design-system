import type { Meta, StoryObj } from "@storybook/react";
import { brikStates } from "@brkta/ui-core/brik/brik-contract";
import { Brik } from "./brik";

const meta = {
  title: "Components/Brik",
  component: Brik,
  tags: ["autodocs"],
  argTypes: {
    state: { control: "select", options: [...brikStates] },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 160 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Brik>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Idle: Story = { args: { state: "idle" } };
export const Wave: Story = { args: { state: "wave" } };
export const Think: Story = { args: { state: "think" } };
export const Party: Story = { args: { state: "party" } };
export const Sleep: Story = { args: { state: "sleep" } };
