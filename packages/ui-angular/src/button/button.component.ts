import { Component, Input } from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
import type {
  ButtonAppearance,
  ButtonVariant,
  ButtonSize,
} from "@brkta/ui-core/types/variant";
import { AnimatedArrowRightComponent } from "../animated-icons/animated-arrow-right.component";
import { AnimatedArrowLeftComponent } from "../animated-icons/animated-arrow-left.component";
import { AnimatedLocateComponent } from "../animated-icons/animated-locate.component";
import { AnimatedPlusComponent } from "../animated-icons/animated-plus.component";
import { AnimatedSearchComponent } from "../animated-icons/animated-search.component";
import { AnimatedSettingsComponent } from "../animated-icons/animated-settings.component";
import { AnimatedBellComponent } from "../animated-icons/animated-bell.component";
import { AnimatedMessageCircleComponent } from "../animated-icons/animated-message-circle.component";
import { AnimatedInboxComponent } from "../animated-icons/animated-inbox.component";
import { AnimatedCopyComponent } from "../animated-icons/animated-copy.component";
import { AnimatedSendComponent } from "../animated-icons/animated-send.component";
import { AnimatedCheckComponent } from "../animated-icons/animated-check.component";
import { AnimatedSaveComponent } from "../animated-icons/animated-save.component";
import { AnimatedPenComponent } from "../animated-icons/animated-pen.component";
import { AnimatedScissorsComponent } from "../animated-icons/animated-scissors.component";
import { AnimatedSparklesComponent } from "../animated-icons/animated-sparkles.component";
import { AnimatedTrashComponent } from "../animated-icons/animated-trash.component";
import { AnimatedEyeComponent } from "../animated-icons/animated-eye.component";
import { AnimatedEyeOffComponent } from "../animated-icons/animated-eye-off.component";
import { AnimatedSunComponent } from "../animated-icons/animated-sun.component";
import { AnimatedMoonComponent } from "../animated-icons/animated-moon.component";
import { AnimatedMonitorComponent } from "../animated-icons/animated-monitor.component";
import { AnimatedPackageComponent } from "../animated-icons/animated-package.component";
import { AnimatedLogOutComponent } from "../animated-icons/animated-log-out.component";
import { AnimatedBuilding2Component } from "../animated-icons/animated-building-2.component";
import { AnimatedUsersComponent } from "../animated-icons/animated-users.component";
import { AnimatedPanelLeftComponent } from "../animated-icons/animated-panel-left.component";
import { AnimatedDashboardComponent } from "../animated-icons/animated-dashboard.component";
import { AnimatedPaperclipComponent } from "../animated-icons/animated-paperclip.component";
import { AnimatedCalculatorComponent } from "../animated-icons/animated-calculator.component";
import { AnimatedPaletteComponent } from "../animated-icons/animated-palette.component";
import { AnimatedListFilterComponent } from "../animated-icons/animated-list-filter.component";
import { AnimatedHistoryComponent } from "../animated-icons/animated-history.component";
import { AnimatedFileTextComponent } from "../animated-icons/animated-file-text.component";
import { AnimatedCreditCardComponent } from "../animated-icons/animated-credit-card.component";
import { AnimatedBookOpenComponent } from "../animated-icons/animated-book-open.component";
import { AnimatedBarChart3Component } from "../animated-icons/animated-bar-chart-3.component";
import { isSupportedIconName } from "../animated-icons/supported-icons";

@Component({
  selector: "brkta-button",
  standalone: true,
  imports: [
    NgTemplateOutlet,
    AnimatedArrowRightComponent,
    AnimatedArrowLeftComponent,
    AnimatedLocateComponent,
    AnimatedPlusComponent,
    AnimatedSearchComponent,
    AnimatedSettingsComponent,
    AnimatedBellComponent,
    AnimatedMessageCircleComponent,
    AnimatedInboxComponent,
    AnimatedCopyComponent,
    AnimatedSendComponent,
    AnimatedCheckComponent,
    AnimatedSaveComponent,
    AnimatedPenComponent,
    AnimatedScissorsComponent,
    AnimatedSparklesComponent,
    AnimatedTrashComponent,
    AnimatedEyeComponent,
    AnimatedEyeOffComponent,
    AnimatedSunComponent,
    AnimatedMoonComponent,
    AnimatedMonitorComponent,
    AnimatedPackageComponent,
    AnimatedLogOutComponent,
    AnimatedBuilding2Component,
    AnimatedUsersComponent,
    AnimatedPanelLeftComponent,
    AnimatedDashboardComponent,
    AnimatedPaperclipComponent,
    AnimatedCalculatorComponent,
    AnimatedPaletteComponent,
    AnimatedListFilterComponent,
    AnimatedHistoryComponent,
    AnimatedFileTextComponent,
    AnimatedCreditCardComponent,
    AnimatedBookOpenComponent,
    AnimatedBarChart3Component,
  ],
  template: `
    <button
      [attr.data-brkta-button]="' '"
      [attr.data-variant]="variant"
      [attr.data-appearance]="appearance"
      [attr.data-size]="size"
      [attr.data-loading]="loading || null"
      [attr.data-icon-only]="iconOnly || null"
      (pointerenter)="placeFillOrigin($event)"
      [attr.aria-label]="ariaLabel || null"
      [attr.aria-describedby]="ariaDescribedBy || null"
      [attr.title]="title || null"
      [disabled]="disabled || loading"
      [attr.type]="type"
    >
      @if (loading) {
        <span class="brkta-button-loader" aria-hidden="true">
          <span class="brkta-button-loader-dot"></span>
          <span class="brkta-button-loader-dot"></span>
          <span class="brkta-button-loader-dot"></span>
        </span>
        <span class="brkta-button-sr-loading">{{ loadingLabel }}</span>
      }
      <span class="brkta-button-content">
        @if (iconBefore && isSupportedIcon(iconBefore)) {
          <span class="brkta-button-icon-before" aria-hidden="true">
            <ng-container
              *ngTemplateOutlet="iconTpl; context: { $implicit: iconBefore }"
            />
          </span>
        }
        @if (!iconOnly) {
          <span class="brkta-button-label"><ng-content></ng-content></span>
        }
        @if (iconAfter && isSupportedIcon(iconAfter)) {
          <span class="brkta-button-icon-after" aria-hidden="true">
            <ng-container
              *ngTemplateOutlet="iconTpl; context: { $implicit: iconAfter }"
            />
          </span>
        }
      </span>
    </button>

    <ng-template #iconTpl let-iconName>
      @if (iconName === "arrow-right") {
        <brkta-animated-arrow-right
          [size]="iconSize"
        ></brkta-animated-arrow-right>
      } @else if (iconName === "arrow-left") {
        <brkta-animated-arrow-left
          [size]="iconSize"
        ></brkta-animated-arrow-left>
      } @else if (iconName === "locate") {
        <brkta-animated-locate [size]="iconSize"></brkta-animated-locate>
      } @else if (iconName === "plus") {
        <brkta-animated-plus [size]="iconSize"></brkta-animated-plus>
      } @else if (iconName === "search") {
        <brkta-animated-search [size]="iconSize"></brkta-animated-search>
      } @else if (iconName === "settings") {
        <brkta-animated-settings [size]="iconSize"></brkta-animated-settings>
      } @else if (iconName === "bell") {
        <brkta-animated-bell [size]="iconSize"></brkta-animated-bell>
      } @else if (iconName === "message-circle") {
        <brkta-animated-message-circle [size]="iconSize"></brkta-animated-message-circle>
      } @else if (iconName === "inbox") {
        <brkta-animated-inbox [size]="iconSize"></brkta-animated-inbox>
      } @else if (iconName === "copy") {
        <brkta-animated-copy [size]="iconSize"></brkta-animated-copy>
      } @else if (iconName === "send") {
        <brkta-animated-send [size]="iconSize"></brkta-animated-send>
      } @else if (iconName === "check") {
        <brkta-animated-check [size]="iconSize"></brkta-animated-check>
      } @else if (iconName === "save") {
        <brkta-animated-save [size]="iconSize"></brkta-animated-save>
      } @else if (iconName === "pen") {
        <brkta-animated-pen [size]="iconSize"></brkta-animated-pen>
      } @else if (iconName === "sparkles") {
        <brkta-animated-sparkles [size]="iconSize"></brkta-animated-sparkles>
      } @else if (iconName === "scissors") {
        <brkta-animated-scissors [size]="iconSize"></brkta-animated-scissors>
      } @else if (iconName === "trash") {
        <brkta-animated-trash [size]="iconSize"></brkta-animated-trash>
      } @else if (iconName === "eye") {
        <brkta-animated-eye [size]="iconSize"></brkta-animated-eye>
      } @else if (iconName === "eye-off") {
        <brkta-animated-eye-off [size]="iconSize"></brkta-animated-eye-off>
      } @else if (iconName === "sun") {
        <brkta-animated-sun [size]="iconSize"></brkta-animated-sun>
      } @else if (iconName === "moon") {
        <brkta-animated-moon [size]="iconSize"></brkta-animated-moon>
      } @else if (iconName === "monitor") {
        <brkta-animated-monitor [size]="iconSize"></brkta-animated-monitor>
      } @else if (iconName === "package") {
        <brkta-animated-package [size]="iconSize"></brkta-animated-package>
      } @else if (iconName === "log-out") {
        <brkta-animated-log-out [size]="iconSize"></brkta-animated-log-out>
      } @else if (iconName === "building-2") {
        <brkta-animated-building-2
          [size]="iconSize"
        ></brkta-animated-building-2>
      } @else if (iconName === "users") {
        <brkta-animated-users [size]="iconSize"></brkta-animated-users>
      } @else if (iconName === "panel-left") {
        <brkta-animated-panel-left
          [size]="iconSize"
          [collapsed]="iconCollapsed"
        ></brkta-animated-panel-left>
      } @else if (iconName === "dashboard") {
        <brkta-animated-dashboard [size]="iconSize"></brkta-animated-dashboard>
      } @else if (iconName === "paperclip") {
        <brkta-animated-paperclip [size]="iconSize"></brkta-animated-paperclip>
      } @else if (iconName === "calculator") {
        <brkta-animated-calculator
          [size]="iconSize"
        ></brkta-animated-calculator>
      } @else if (iconName === "palette") {
        <brkta-animated-palette [size]="iconSize"></brkta-animated-palette>
      } @else if (iconName === "list-filter") {
        <brkta-animated-list-filter
          [size]="iconSize"
        ></brkta-animated-list-filter>
      } @else if (iconName === "history") {
        <brkta-animated-history [size]="iconSize"></brkta-animated-history>
      } @else if (iconName === "file-text") {
        <brkta-animated-file-text [size]="iconSize"></brkta-animated-file-text>
      } @else if (iconName === "credit-card") {
        <brkta-animated-credit-card
          [size]="iconSize"
        ></brkta-animated-credit-card>
      } @else if (iconName === "book-open") {
        <brkta-animated-book-open [size]="iconSize"></brkta-animated-book-open>
      } @else if (iconName === "bar-chart-3") {
        <brkta-animated-bar-chart-3
          [size]="iconSize"
        ></brkta-animated-bar-chart-3>
      }
    </ng-template>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
      }
    `,
  ],
})
export class ButtonComponent {
  /**
   * The hover fill expands from where the pointer entered, matching the site header's
   * rail controls. Bound in the template rather than added as a listener, so Angular
   * removes it with the view and nothing outlives the component.
   *
   * Keyboard focus and touch never call this, so the CSS default of 50% stands — there
   * is no meaningful entry point for either.
   */
  placeFillOrigin(event: PointerEvent): void {
    if (event.pointerType !== "mouse") return;
    const target = event.currentTarget as HTMLElement | null;
    if (!target) return;
    const box = target.getBoundingClientRect();
    if (box.width === 0 || box.height === 0) return;
    target.style.setProperty("--brkta-button-fill-x", `${event.clientX - box.left}px`);
    target.style.setProperty("--brkta-button-fill-y", `${event.clientY - box.top}px`);
  }

  /** Button visual variant — maps to data-variant attribute */
  @Input() variant: ButtonVariant = "primary";

  /** Surface treatment; use glass for labelled controls floating over media. */
  @Input() appearance: ButtonAppearance = "default";

  /** Button size — maps to data-size attribute */
  @Input() size: ButtonSize = "md";

  /** Show loading indicator and disable interaction */
  @Input() loading = false;

  /** Translated screen-reader announcement while a request is pending. */
  @Input() loadingLabel = "Loading, please wait...";

  /** Disable the button */
  @Input() disabled = false;

  /** Native button type; defaults to the non-submitting button behavior. */
  @Input() type: "button" | "submit" | "reset" = "button";

  /**
   * Icon name rendered before the label text.
   * Accepted: registered names from the shared animated-icon registry.
   */
  @Input() iconBefore?: string;

  /**
   * Icon name rendered after the label text.
   * Accepted: registered names from the shared animated-icon registry.
   */
  @Input() iconAfter?: string;

  /** Accessible label, required for icon-only buttons */
  @Input() ariaLabel = "";

  /** Optional description for disabled or otherwise contextual controls. */
  @Input() ariaDescribedBy = "";

  /** Native tooltip/hint, forwarded to the rendered button. */
  @Input() title = "";

  /** Mark the button as icon-only (hides ng-content, sets data-icon-only) */
  @Input() iconOnly = false;

  /** Collapsed state used by the panel-left icon; ignored by other icons. */
  @Input() iconCollapsed = false;

  isSupportedIcon(icon: unknown): boolean {
    return isSupportedIconName(icon);
  }

  /** Computed icon size based on button size */
  get iconSize(): number {
    switch (this.size) {
      case "sm":
        return 14;
      case "lg":
        return 20;
      default:
        return 16;
    }
  }
}
