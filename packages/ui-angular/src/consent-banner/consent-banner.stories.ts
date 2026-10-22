import type { Meta, StoryObj } from "@storybook/angular";
import { createTranslator } from "@brkta/platform-core/locale";
import { consentBannerStoryMessages } from "@brkta/ui-core/consent-banner/consent-banner-story-messages";
import { ConsentBannerComponent } from "./consent-banner.component";

const t = createTranslator(consentBannerStoryMessages);
const meta: Meta<ConsentBannerComponent> = {
  title: "Components/Consent Banner",
  component: ConsentBannerComponent,
  tags: ["autodocs"],
  args: { title: t("consentBanner.demo.title"), description: t("consentBanner.demo.description"), acceptLabel: t("consentBanner.demo.accept"), rejectLabel: t("consentBanner.demo.reject"), policyLabel: t("consentBanner.demo.policy"), policyHref: "/privacy", placement: "embedded" },
};
export default meta;
type Story = StoryObj<ConsentBannerComponent>;
export const Embedded: Story = {};
export const Fixed: Story = { args: { placement: "fixed" } };
export const LongText: Story = { args: { description: `${t("consentBanner.demo.description")} ${t("consentBanner.demo.description")}` } };
