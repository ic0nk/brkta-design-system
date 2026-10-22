import { Component, EventEmitter, Input, Output } from "@angular/core";
import type { ConsentBannerPlacement } from "@brkta/ui-core/consent-banner/consent-banner-contract";
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: "brkta-consent-banner",
  standalone: true,
  imports: [ButtonComponent],
  styles: [":host { display: contents; }"],
  template: `
    <section data-brkta-consent-banner="" [attr.data-placement]="placement" [attr.aria-label]="title" [attr.aria-description]="description">
      <h2 data-brkta-consent-banner-title="">{{ title }}</h2>
      <p data-brkta-consent-banner-description="">{{ description }}</p>
      <a data-brkta-consent-banner-policy="" [href]="policyHref">{{ policyLabel }}</a>
      <div data-brkta-consent-banner-actions="">
        <brkta-button variant="secondary" (click)="accepted.emit()">{{ acceptLabel }}</brkta-button>
        <brkta-button variant="secondary" (click)="rejected.emit()">{{ rejectLabel }}</brkta-button>
      </div>
    </section>
  `,
})
export class ConsentBannerComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) acceptLabel!: string;
  @Input({ required: true }) rejectLabel!: string;
  @Input({ required: true }) policyLabel!: string;
  @Input({ required: true }) policyHref!: string;
  @Input() placement: ConsentBannerPlacement = "fixed";
  @Output() readonly accepted = new EventEmitter<void>();
  @Output() readonly rejected = new EventEmitter<void>();
}
