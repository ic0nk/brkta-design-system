import type { Meta, StoryObj } from "@storybook/react";
import { createTranslator } from "@brkta/platform-core/locale";
import { consentBannerStoryMessages } from "@brkta/ui-core/consent-banner/consent-banner-story-messages";
import { ConsentBanner } from "./consent-banner";

const t = createTranslator(consentBannerStoryMessages);
const meta = {
  title: "Components/Consent Banner",
  component: ConsentBanner,
  tags: ["autodocs"],
  args: { title: t("consentBanner.demo.title"), description: t("consentBanner.demo.description"), acceptLabel: t("consentBanner.demo.accept"), rejectLabel: t("consentBanner.demo.reject"), policyLabel: t("consentBanner.demo.policy"), policyHref: "/privacy", placement: "embedded", onAccept: () => {}, onReject: () => {} },
} satisfies Meta<typeof ConsentBanner>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Embedded: Story = {};
export const Fixed: Story = { args: { placement: "fixed" } };
export const LongText: Story = { args: { description: `${t("consentBanner.demo.description")} ${t("consentBanner.demo.description")}` } };
