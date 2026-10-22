"use client";

import { useId, type HTMLAttributes } from "react";
import type { ConsentBannerContent, ConsentBannerPlacement } from "@brkta/ui-core/consent-banner/consent-banner-contract";
import { Button } from "../button/button";

export interface ConsentBannerProps extends ConsentBannerContent, Omit<HTMLAttributes<HTMLElement>, "title"> {
  placement?: ConsentBannerPlacement;
  onAccept: () => void;
  onReject: () => void;
}

/** Consumer supplies translated content and owns consent persistence. */
export function ConsentBanner({ title, description, acceptLabel, rejectLabel, policyLabel, policyHref, placement = "fixed", onAccept, onReject, ...props }: ConsentBannerProps) {
  const id = useId();
  return (
    <section {...props} data-brkta-consent-banner="" data-placement={placement} aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`}>
      <h2 id={`${id}-title`} data-brkta-consent-banner-title="">{title}</h2>
      <p id={`${id}-description`} data-brkta-consent-banner-description="">{description}</p>
      <a data-brkta-consent-banner-policy="" href={policyHref}>{policyLabel}</a>
      <div data-brkta-consent-banner-actions="">
        <Button variant="secondary" onClick={onAccept}>{acceptLabel}</Button>
        <Button variant="secondary" onClick={onReject}>{rejectLabel}</Button>
      </div>
    </section>
  );
}
