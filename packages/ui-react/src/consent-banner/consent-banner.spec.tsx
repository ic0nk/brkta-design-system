import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ConsentBanner } from "./consent-banner";

const content = { title: "Analytics choices", description: "Optional analytics stays off until accepted.", acceptLabel: "Accept analytics", rejectLabel: "Reject analytics", policyLabel: "Privacy policy", policyHref: "/privacy" };

describe("ConsentBanner", () => {
  it("allows keyboard access to the policy and both equally styled choices without trapping focus", async () => {
    const user = userEvent.setup();
    const onAccept = vi.fn();
    const onReject = vi.fn();
    render(<><ConsentBanner {...content} onAccept={onAccept} onReject={onReject} /><button>Continue</button></>);
    expect(screen.getByRole("region", { name: content.title })).toHaveAccessibleDescription(content.description);
    await user.tab();
    expect(screen.getByRole("link")).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button", { name: content.acceptLabel })).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(onAccept).toHaveBeenCalledOnce();
    await user.tab();
    await user.keyboard(" ");
    expect(onReject).toHaveBeenCalledOnce();
    expect(screen.getByRole("button", { name: content.acceptLabel })).toHaveAttribute("data-variant", "secondary");
    expect(screen.getByRole("button", { name: content.rejectLabel })).toHaveAttribute("data-variant", "secondary");
    await user.tab();
    expect(screen.getByRole("button", { name: "Continue" })).toHaveFocus();
  });

  it("preserves long translated text and RTL in embedded placement", () => {
    const title = "خيارات التحليلات والخصوصية ".repeat(6);
    render(<ConsentBanner {...content} title={title} dir="rtl" placement="embedded" onAccept={() => {}} onReject={() => {}} />);
    const region = screen.getByRole("region");
    expect(region).toHaveAccessibleName(title.trim());
    expect(region).toHaveAttribute("dir", "rtl");
    expect(region).toHaveAttribute("data-placement", "embedded");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
