import { Component, Input, Output, EventEmitter, HostListener, ElementRef, inject } from '@angular/core';
import type { OverlayAlign, OverlaySide } from '@brkta/ui-core/types/variant';

@Component({
  selector: 'brkta-popover',
  standalone: true,
  styles: [':host { display: contents; }'],
  template: `
    <div data-brkta-popover="" [attr.data-open]="open ? '' : undefined">
      <span data-brkta-popover-trigger="" role="button" tabindex="0"
        [attr.aria-expanded]="open" (click)="toggle()"
        (keydown.enter)="toggle()" (keydown.space)="toggle(); $event.preventDefault()"
      ><ng-content select="[trigger]"></ng-content></span>
      @if (open || closing) {
        <div data-brkta-popover-content="" [attr.data-side]="side" [attr.data-align]="align" [attr.data-closing]="closing ? '' : undefined" role="dialog" aria-modal="false">
          <ng-content></ng-content>
        </div>
      }
    </div>
  `,
})
export class PopoverComponent {
  @Input() open = false;
  @Input() side: OverlaySide = 'bottom';
  @Input() align: OverlayAlign = 'start';
  @Output() openChange = new EventEmitter<boolean>();
  closing = false;
  private elRef = inject(ElementRef);

  toggle(): void {
    if (this.closing) return;
    if (this.open) { this.closeAnimated(); } else { this.open = true; this.openChange.emit(true); }
  }
  closeAnimated(): void {
    this.closing = true;
    setTimeout(() => { this.open = false; this.closing = false; this.openChange.emit(false); }, 160);
  }
  @HostListener('document:mousedown', ['$event'])
  onClickOutside(e: MouseEvent): void {
    if (this.open && !this.closing && !this.elRef.nativeElement.contains(e.target as Node)) this.closeAnimated();
  }
  @HostListener('document:keydown', ['$event'])
  onEscape(e: KeyboardEvent): void {
    if (e.key === 'Escape' && this.open && !this.closing) { e.preventDefault(); this.closeAnimated(); }
  }
}
