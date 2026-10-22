import { Component, Input, Output, EventEmitter } from "@angular/core";
import type { SidebarItemContract } from "@brkta/ui-core/sidebar/sidebar-contract";
import { AnimatedDashboardComponent } from "../animated-icons/animated-dashboard.component";
import { AnimatedUsersComponent } from "../animated-icons/animated-users.component";
import { AnimatedShoppingCartComponent } from "../animated-icons/animated-shopping-cart.component";
import { AnimatedPackageComponent } from "../animated-icons/animated-package.component";
import { AnimatedBarChartComponent } from "../animated-icons/animated-bar-chart.component";
import { AnimatedSettingsComponent } from "../animated-icons/animated-settings.component";
import { AnimatedArrowRightComponent } from "../animated-icons/animated-arrow-right.component";
import { AnimatedPlusComponent } from "../animated-icons/animated-plus.component";
import { AnimatedSearchComponent } from "../animated-icons/animated-search.component";
import { AnimatedBellComponent } from "../animated-icons/animated-bell.component";
import { AnimatedMessageCircleComponent } from "../animated-icons/animated-message-circle.component";
import { AnimatedInboxComponent } from "../animated-icons/animated-inbox.component";
import { AnimatedCopyComponent } from "../animated-icons/animated-copy.component";
import { AnimatedSendComponent } from "../animated-icons/animated-send.component";
import { AnimatedCheckComponent } from "../animated-icons/animated-check.component";
import { AnimatedSaveComponent } from "../animated-icons/animated-save.component";
import { AnimatedPenComponent } from "../animated-icons/animated-pen.component";
import { AnimatedTrashComponent } from "../animated-icons/animated-trash.component";
import { AnimatedPanelLeftComponent } from "../animated-icons/animated-panel-left.component";
import { AnimatedBuilding2Component } from "../animated-icons/animated-building-2.component";
import { AnimatedPaperclipComponent } from "../animated-icons/animated-paperclip.component";
import { AnimatedCalculatorComponent } from "../animated-icons/animated-calculator.component";
import { AnimatedPaletteComponent } from "../animated-icons/animated-palette.component";
import { AnimatedListFilterComponent } from "../animated-icons/animated-list-filter.component";
import { AnimatedHistoryComponent } from "../animated-icons/animated-history.component";
import { AnimatedFileTextComponent } from "../animated-icons/animated-file-text.component";
import { AnimatedCreditCardComponent } from "../animated-icons/animated-credit-card.component";
import { AnimatedBookOpenComponent } from "../animated-icons/animated-book-open.component";
import { AnimatedBarChart3Component } from "../animated-icons/animated-bar-chart-3.component";
import { AnimatedSparklesComponent } from "../animated-icons/animated-sparkles.component";
import { AnimatedLocateComponent } from "../animated-icons/animated-locate.component";
import { isSupportedIconName } from "../animated-icons/supported-icons";

export type SidebarVariant = "standalone" | "embedded";

@Component({
  selector: "brkta-sidebar",
  standalone: true,
  imports: [
    AnimatedDashboardComponent,
    AnimatedUsersComponent,
    AnimatedShoppingCartComponent,
    AnimatedPackageComponent,
    AnimatedBarChartComponent,
    AnimatedSettingsComponent,
    AnimatedArrowRightComponent,
    AnimatedPlusComponent,
    AnimatedSearchComponent,
    AnimatedBellComponent,
    AnimatedMessageCircleComponent,
    AnimatedInboxComponent,
    AnimatedCopyComponent,
    AnimatedSendComponent,
    AnimatedCheckComponent,
    AnimatedSaveComponent,
    AnimatedPenComponent,
    AnimatedTrashComponent,
    AnimatedPanelLeftComponent,
    AnimatedBuilding2Component,
    AnimatedPaperclipComponent,
    AnimatedCalculatorComponent,
    AnimatedPaletteComponent,
    AnimatedListFilterComponent,
    AnimatedHistoryComponent,
    AnimatedFileTextComponent,
    AnimatedCreditCardComponent,
    AnimatedBookOpenComponent,
    AnimatedBarChart3Component,
    AnimatedSparklesComponent,
    AnimatedLocateComponent,
  ],
  template: `
    <aside
      data-brkta-sidebar=""
      [attr.data-variant]="variant === 'embedded' ? 'embedded' : undefined"
      [attr.data-collapsed]="currentCollapsed ? '' : undefined"
    >
      @if (header) {
        <div data-brkta-sidebar-header="">
          <span data-brkta-sidebar-header-label="">{{ header }}</span>
          @if (showCollapseToggle) {
            <button
              data-brkta-sidebar-toggle=""
              (click)="toggle()"
              [attr.aria-label]="
                currentCollapsed ? 'Expand sidebar' : 'Collapse sidebar'
              "
              type="button"
            >
              <brkta-animated-panel-left
                [collapsed]="currentCollapsed"
                [size]="16"
              ></brkta-animated-panel-left>
            </button>
          }
        </div>
      }
      <nav data-brkta-sidebar-nav="">
        @for (item of items; track item.value) {
          <button
            class="brkta-icon-motion-trigger"
            data-brkta-sidebar-item=""
            [attr.data-active]="item.active ? '' : undefined"
            [attr.data-disabled]="item.disabled ? '' : undefined"
            [attr.aria-current]="item.active ? 'page' : undefined"
            [disabled]="item.disabled"
            (click)="select(item)"
            (pointerenter)="placeFillOrigin($event)"
            type="button"
          >
            @if (isSupportedIcon(item.icon)) {
              <span data-brkta-sidebar-item-icon="" aria-hidden="true">
                @if (item.icon === "dashboard") {
                  <brkta-animated-dashboard></brkta-animated-dashboard>
                } @else if (item.icon === "users") {
                  <brkta-animated-users></brkta-animated-users>
                } @else if (item.icon === "shopping-cart") {
                  <brkta-animated-shopping-cart></brkta-animated-shopping-cart>
                } @else if (item.icon === "package") {
                  <brkta-animated-package></brkta-animated-package>
                } @else if (item.icon === "building-2") {
                  <brkta-animated-building-2></brkta-animated-building-2>
                } @else if (item.icon === "bar-chart") {
                  <brkta-animated-bar-chart></brkta-animated-bar-chart>
                } @else if (item.icon === "settings") {
                  <brkta-animated-settings></brkta-animated-settings>
                } @else if (item.icon === "arrow-right") {
                  <brkta-animated-arrow-right></brkta-animated-arrow-right>
                } @else if (item.icon === "plus") {
                  <brkta-animated-plus></brkta-animated-plus>
                } @else if (item.icon === "search") {
                  <brkta-animated-search></brkta-animated-search>
                } @else if (item.icon === "bell") {
                  <brkta-animated-bell></brkta-animated-bell>
                } @else if (item.icon === "message-circle") {
                  <brkta-animated-message-circle></brkta-animated-message-circle>
                } @else if (item.icon === "inbox") {
                  <brkta-animated-inbox></brkta-animated-inbox>
                } @else if (item.icon === "copy") {
                  <brkta-animated-copy></brkta-animated-copy>
                } @else if (item.icon === "send") {
                  <brkta-animated-send></brkta-animated-send>
                } @else if (item.icon === "check") {
                  <brkta-animated-check></brkta-animated-check>
                } @else if (item.icon === "save") {
                  <brkta-animated-save></brkta-animated-save>
                } @else if (item.icon === "pen") {
                  <brkta-animated-pen></brkta-animated-pen>
                } @else if (item.icon === "trash") {
                  <brkta-animated-trash></brkta-animated-trash>
                } @else if (item.icon === "paperclip") {
                  <brkta-animated-paperclip></brkta-animated-paperclip>
                } @else if (item.icon === "calculator") {
                  <brkta-animated-calculator></brkta-animated-calculator>
                } @else if (item.icon === "palette") {
                  <brkta-animated-palette></brkta-animated-palette>
                } @else if (item.icon === "list-filter") {
                  <brkta-animated-list-filter></brkta-animated-list-filter>
                } @else if (item.icon === "history") {
                  <brkta-animated-history></brkta-animated-history>
                } @else if (item.icon === "file-text") {
                  <brkta-animated-file-text></brkta-animated-file-text>
                } @else if (item.icon === "credit-card") {
                  <brkta-animated-credit-card></brkta-animated-credit-card>
                } @else if (item.icon === "book-open") {
                  <brkta-animated-book-open></brkta-animated-book-open>
                } @else if (item.icon === "bar-chart-3") {
                  <brkta-animated-bar-chart-3></brkta-animated-bar-chart-3>
                } @else if (item.icon === "sparkles") {
                  <brkta-animated-sparkles></brkta-animated-sparkles>
                } @else if (item.icon === "locate") {
                  <brkta-animated-locate></brkta-animated-locate>
                }
              </span>
            }
            <span data-brkta-sidebar-item-label="">{{ item.label }}</span>
            @if (item.badge !== undefined) {
              <span data-brkta-sidebar-item-badge="">{{ item.badge }}</span>
            }
          </button>
        }
      </nav>
      @if (footer) {
        <div data-brkta-sidebar-footer="">{{ footer }}</div>
      }
    </aside>
  `,
})
export class SidebarComponent {
  @Input() items: SidebarItemContract[] = [];
  @Input() collapsed: boolean | undefined = undefined;
  @Input() variant: SidebarVariant = "standalone";
  @Input() header?: string;
  @Input() footer?: string;
  @Input() showCollapseToggle = true;
  @Output() collapsedChange = new EventEmitter<boolean>();
  @Output() itemSelect = new EventEmitter<SidebarItemContract>();

  private internalCollapsed = false;
  get currentCollapsed(): boolean {
    return this.collapsed !== undefined
      ? this.collapsed
      : this.internalCollapsed;
  }

  isSupportedIcon(icon: unknown): boolean {
    return isSupportedIconName(icon);
  }

  toggle(): void {
    const next = !this.currentCollapsed;
    if (this.collapsed === undefined) {
      this.internalCollapsed = next;
    }
    this.collapsedChange.emit(next);
  }

  /**
   * Sidebar items share the Button's hover fill, so they need the same pointer origin.
   * Bound in the template, so Angular removes it with the view.
   */
  placeFillOrigin(event: PointerEvent): void {
    if (event.pointerType !== "mouse") return;
    const target = event.currentTarget as HTMLElement | null;
    if (!target) return;
    const box = target.getBoundingClientRect();
    if (box.width === 0 || box.height === 0) return;
    target.style.setProperty("--brkta-sidebar-fill-x", `${event.clientX - box.left}px`);
    target.style.setProperty("--brkta-sidebar-fill-y", `${event.clientY - box.top}px`);
  }

  select(item: SidebarItemContract): void {
    if (!item.disabled) this.itemSelect.emit(item);
  }
}
