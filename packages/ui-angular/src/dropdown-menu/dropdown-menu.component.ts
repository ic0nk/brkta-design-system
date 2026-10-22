import { Component, Input, Output, EventEmitter, HostListener, ElementRef, inject } from '@angular/core';
import { AnimatedTrashComponent } from '../animated-icons/animated-trash.component';
import type {
  DropdownMenuEntry,
  DropdownMenuItemContract,
} from '@brkta/ui-core/dropdown-menu/dropdown-menu-contract';

@Component({
  selector: 'brkta-dropdown-menu',
  standalone: true,
  imports: [AnimatedTrashComponent],
  host: { '[attr.data-open]': 'open ? "true" : null' },
  styles: [':host { display: contents; }'],
  template: `
      <div data-brkta-dropdown-menu="" [attr.data-open]="open ? 'true' : undefined" [attr.data-placement]="placement" [attr.data-align]="align">
      <span data-brkta-dropdown-menu-trigger="" [attr.data-icon-only]="iconOnly ? '' : undefined" [attr.data-bare-icon-trigger]="bareIconTrigger ? '' : undefined" role="button" tabindex="0"
        [attr.aria-label]="iconOnly ? triggerLabel : undefined"
        [attr.aria-expanded]="open" aria-haspopup="menu" [attr.aria-controls]="menuId"
        (click)="toggle()" (keydown.enter)="toggle()" (keydown.space)="toggle(); $event.preventDefault()"
      >@if (iconOnly) { <span data-brkta-dropdown-menu-trigger-icon="" aria-hidden="true"><span></span><span></span><span></span></span> } @else { {{ triggerLabel }} }</span>
      @if (open || closing) {
        <div data-brkta-dropdown-menu-content="" [attr.data-closing]="closing ? '' : undefined"
          [id]="menuId" role="menu" tabindex="-1" (keydown)="onKeyDown($event)">
          @if (items.length > 0) {
            @for (entry of items; track $index) {
              @if ($any(entry).type === 'separator') {
                <div data-brkta-dropdown-menu-separator="" role="separator"></div>
              } @else if ($any(entry).type === 'label') {
                <div data-brkta-dropdown-menu-label="">{{ $any(entry).label }}</div>
              } @else {
                <div data-brkta-dropdown-menu-item=""
                  [attr.data-disabled]="$any(entry).disabled || undefined"
                  [attr.data-destructive]="$any(entry).destructive || undefined"
                  [attr.data-active]="$index === activeIndex || undefined"
                  role="menuitem" [attr.aria-disabled]="$any(entry).disabled || undefined"
                  (click)="selectItem($any(entry))" (mouseenter)="!$any(entry).disabled && (activeIndex = $index)"
                >
                  @if ($any(entry).icon === 'trash') { <span data-brkta-dropdown-menu-item-icon=""><brkta-animated-trash [size]="16"></brkta-animated-trash></span> }
                  <span>{{ $any(entry).label }}</span>
                  @if ($any(entry).shortcut) { <span data-brkta-dropdown-menu-item-shortcut="">{{ $any(entry).shortcut }}</span> }
                </div>
              }
            }
          } @else {
            <ng-content select="[menu-item], [menu-separator], [menu-label]"></ng-content>
          }
        </div>
      }
    </div>
  `,
})
export class DropdownMenuComponent {
  @Input() items: DropdownMenuEntry[] = [];
  @Input() triggerLabel = 'Menu ▾';
  @Input() iconOnly = false;
  @Input() bareIconTrigger = false;
  @Input() placement: 'bottom' | 'top' = 'bottom';
  @Input() align: 'start' | 'end' = 'start';
  @Output() itemSelect = new EventEmitter<string>();
  @Output() openChange = new EventEmitter<boolean>();

  open = false;
  closing = false;
  activeIndex = -1;
  private elRef = inject(ElementRef);
  menuId = `ddm-${Math.random().toString(36).slice(2)}`;

  toggle(): void {
    if (this.closing) return;
    if (this.open) { this.closeAnimated(); } else { this.open = true; this.activeIndex = -1; this.openChange.emit(true); }
  }

  closeAnimated(): void {
    this.closing = true;
    setTimeout(() => { this.open = false; this.closing = false; this.activeIndex = -1; this.openChange.emit(false); }, 160);
  }

  selectItem(item: DropdownMenuItemContract): void {
    if (item.disabled) return;
    this.itemSelect.emit(item.value ?? item.label);
    this.closeAnimated();
  }

  onKeyDown(event: KeyboardEvent): void {
    const itemEntries = this.items.filter(e => !('type' in (e as any)) || (e as any).type !== 'separator');
    switch (event.key) {
      case 'ArrowDown': event.preventDefault(); this.activeIndex = Math.min(this.activeIndex + 1, itemEntries.length - 1); break;
      case 'ArrowUp': event.preventDefault(); this.activeIndex = Math.max(this.activeIndex - 1, 0); break;
      case 'Home': event.preventDefault(); this.activeIndex = 0; break;
      case 'End': event.preventDefault(); this.activeIndex = itemEntries.length - 1; break;
      case 'Enter': case ' ':
        event.preventDefault();
        if (this.activeIndex >= 0 && this.activeIndex < itemEntries.length) {
          const entry = itemEntries[this.activeIndex] as DropdownMenuItemContract;
          if (!entry.disabled) this.selectItem(entry);
        }
        break;
      case 'Escape': event.preventDefault(); this.closeAnimated(); break;
    }
  }

  @HostListener('document:mousedown', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (this.open && !this.closing && !this.elRef.nativeElement.contains(event.target as Node)) this.closeAnimated();
  }

  @HostListener('document:keydown', ['$event'])
  onEscape(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.open && !this.closing) { event.preventDefault(); this.closeAnimated(); }
  }
}
